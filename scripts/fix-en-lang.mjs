// Post-build fix: rewrite <html lang="ru"> -> <html lang="en"> in the EN export.
//
// The single shared root layout hardcodes <html lang="ru"> and Next.js'
// Metadata API cannot set the <html lang> attribute, so every statically
// exported out/en/**/*.html ships lang="ru". Crawlers read the static HTML,
// so we rewrite ONLY the opening <html> tag's lang attribute for EN pages.
//
// Scope guarantees:
//   - Only files under out/en/ are touched (RU output is left alone).
//   - Only the first <html ...> opening tag per document is rewritten.
//   - Only its lang attribute changes -- og:locale and any other lang= values
//     (e.g. inside the RSC flight payload) are left untouched. This is NOT
//     Phase 4's metadata / og:locale work.
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

// The opening <html ...> tag, attribute order irrelevant. `<html` never matches
// `<!DOCTYPE html>` (space before "html") nor the RSC payload's quoted "html",
// so exactly one tag matches per document.
const HTML_TAG = /<html\b[^>]*>/i;
// The lang attribute inside that tag (single- or double-quoted), value "ru".
const LANG_ATTR = /(\blang\s*=\s*["'])ru(["'])/i;

if (!fs.existsSync(EN_DIR)) {
    console.error(`fix-en-lang: ${EN_DIR} not found -- did the export run?`);
    process.exit(1);
}

let scanned = 0;
let changed = 0;
for (const file of htmlFiles(EN_DIR)) {
    scanned++;
    const html = fs.readFileSync(file, "utf8");
    // Non-global regex -> only the first <html> tag; the replacer rewrites lang
    // inside just that tag, so nothing else in the document can change.
    const next = html.replace(HTML_TAG, (tag) =>
        tag.replace(LANG_ATTR, "$1en$2"),
    );
    if (next !== html) {
        fs.writeFileSync(file, next);
        changed++;
    }
}

console.log(
    `fix-en-lang: set <html lang="en"> in ${changed}/${scanned} file(s) under out/en/`,
);
