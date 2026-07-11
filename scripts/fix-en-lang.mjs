// Post-build fix: correct <html lang> on the statically-exported EN pages.
//
// The site keeps ONE root layout (app/layout.tsx) so the global not-found stays
// intact; that root hardcodes <html lang="ru"> and the Metadata API cannot set
// <html lang> per route. Every EN page therefore inherits lang="ru" in the raw
// static HTML. Crawlers read that HTML, so we rewrite lang -> "en" for EN pages.
//
// The other two locale signals are now emitted natively and DON'T need patching:
//   - og:locale=en_US   -> per-page buildPageMetadata + app/en/layout.tsx OG
//   - WebSite inLanguage -> app/en/layout.tsx renders SiteShell(locale="en"),
//                           so buildSiteSchema("en") emits inLanguage:"en".
// (Both were verified at 0 rewrites once the per-locale layouts landed.)
//
// Scope guarantees:
//   - Only files under out/en/ are touched (RU output is left alone).
//   - Only the first <html> opening tag's lang attribute changes; `<html` never
//     matches `<!DOCTYPE html>` nor the RSC flight-payload's quoted "html".
//
// Node built-ins only (fs, path). Runs as the final step of `build`,
// after next-image-export-optimizer.

import fs from "node:fs";
import path from "node:path";

const EN_DIR = path.join(process.cwd(), "out", "en");

// Recursively collect every *.html file under a directory.
function htmlFiles(dir) {
    const files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...htmlFiles(full));
        } else if (entry.isFile() && entry.name.endsWith(".html")) {
            files.push(full);
        }
    }
    return files;
}

// The opening <html ...> tag, attribute order irrelevant.
const HTML_TAG = /<html\b[^>]*>/i;
// The lang attribute inside that tag (single- or double-quoted), value "ru".
const LANG_ATTR = /(\blang\s*=\s*["'])ru(["'])/i;

if (!fs.existsSync(EN_DIR)) {
    console.error(`fix-en-lang: ${EN_DIR} not found -- did the export run?`);
    process.exit(1);
}

let scanned = 0;
let langChanged = 0;
for (const file of htmlFiles(EN_DIR)) {
    scanned++;
    const html = fs.readFileSync(file, "utf8");

    // Non-global regex -> only the first <html> tag; the replacer rewrites lang
    // inside just that tag, so nothing else in the document can change.
    const next = html.replace(HTML_TAG, (tag) =>
        tag.replace(LANG_ATTR, "$1en$2"),
    );

    if (next !== html) {
        langChanged++;
        fs.writeFileSync(file, next);
    }
}

console.log(
    `fix-en-lang: out/en/ (${scanned} file(s)) -- html lang=en: ${langChanged}`,
);
