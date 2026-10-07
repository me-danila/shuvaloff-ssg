// Post-build fix: correct <html lang> on the statically-exported non-RU pages.
//
// The site keeps ONE root layout (app/layout.tsx) so the global not-found stays
// intact; that root hardcodes <html lang="ru"> and the Metadata API cannot set
// <html lang> per route. Every non-RU page therefore inherits lang="ru" in the
// raw static HTML. Crawlers read that HTML, so we rewrite lang per locale dir:
//   out/en/** -> en   (full EN site + the /en/visit/ landing)
//   out/it/** -> it, out/de/** -> de, out/fr/** -> fr, out/es/** -> es
//
// The other locale signals are emitted natively and DON'T need patching:
//   - og:locale         -> buildPageMetadata / buildLandingMetadata
//   - WebSite inLanguage -> SiteShell(locale) -> buildSiteSchema(locale)
//
// Scope guarantees:
//   - Only files under the listed locale dirs are touched (RU output is left alone).
//   - Only the first <html> opening tag's lang attribute changes; `<html` never
//     matches `<!DOCTYPE html>` nor the RSC flight-payload's quoted "html".
//
// Node built-ins only (fs, path). Runs as the final step of `build`,
// after next-image-export-optimizer. Keep LOCALES in sync with
// LANDING_ONLY_LOCALES in lib/i18n/routing.tsx (+ "en").

import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");
const LOCALES = ["en", "it", "de", "fr", "es"];
// The en dir is always exported; landing dirs may be absent in a partial build.
const REQUIRED = new Set(["en"]);

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

for (const locale of LOCALES) {
    const dir = path.join(OUT_DIR, locale);
    if (!fs.existsSync(dir)) {
        if (REQUIRED.has(locale)) {
            console.error(
                `fix-locale-lang: ${dir} not found -- did the export run?`,
            );
            process.exit(1);
        }
        continue;
    }

    let scanned = 0;
    let langChanged = 0;
    for (const file of htmlFiles(dir)) {
        scanned++;
        const html = fs.readFileSync(file, "utf8");

        // Non-global regex -> only the first <html> tag; the replacer rewrites
        // lang inside just that tag, so nothing else in the document can change.
        const next = html.replace(HTML_TAG, (tag) =>
            tag.replace(LANG_ATTR, `$1${locale}$2`),
        );

        if (next !== html) {
            langChanged++;
            fs.writeFileSync(file, next);
        }
    }

    console.log(
        `fix-locale-lang: out/${locale}/ (${scanned} file(s)) -- html lang=${locale}: ${langChanged}`,
    );
}
