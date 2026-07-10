// Post-build fix: correct locale signals in the statically-exported EN pages.
//
// The site has ONE shared root layout (no app/en/layout.tsx), so that layout
// cannot know whether it is rendering an RU or EN route at build time. It
// therefore hardcodes RU-flavoured locale signals that every EN page inherits:
//
//   1. <html lang="ru">                         (Metadata API can't set <html lang>)
//   2. <meta property="og:locale" content="ru_RU">        (layout openGraph.locale)
//      <meta property="og:locale:alternate" content="en_US">
//   3. WebSite JSON-LD "inLanguage":"ru"          (layout buildSiteSchema("ru"))
//
// Per-page metadata cannot fix (2): Next.js OVERWRITES the whole `openGraph`
// object when a child segment defines it (nested objects are not deep-merged),
// so a page-level `openGraph:{locale}` would drop the layout's og:image /
// og:type / og:site_name. Per-page cannot fix (3) either: the site schema is
// emitted only by the shared layout. Crawlers read the static HTML, so we
// rewrite these three signals in place for EN pages only.
//
// Scope guarantees:
//   - Only files under out/en/ are touched (RU output is left alone).
//   - <html lang>: only the first <html> opening tag's lang attribute changes.
//   - og:locale: only the real <head> <meta> tags are rewritten (double-quoted,
//     Next's static output); the escaped RSC flight-payload copies (\"...\")
//     are left untouched — same as the proven <html lang> rewrite.
//   - inLanguage: only the WebSite node's value is rewritten. On EN pages the
//     page-level JSON-LD already emits "inLanguage":"en" (locale="en"), so the
//     WebSite node from the shared layout is the only stray "ru"; the regex is
//     additionally anchored on "@type":"WebSite" so nothing else can match.
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

// (1) The opening <html ...> tag, attribute order irrelevant. `<html` never
// matches `<!DOCTYPE html>` (space before "html") nor the RSC payload's quoted
// "html", so exactly one tag matches per document.
const HTML_TAG = /<html\b[^>]*>/i;
// The lang attribute inside that tag (single- or double-quoted), value "ru".
const LANG_ATTR = /(\blang\s*=\s*["'])ru(["'])/i;

// (2) og:locale <meta> tags in <head> (Next emits double-quoted attributes).
// The primary tag: ru_RU -> en_US. `property="og:locale"` (closing quote right
// after "og:locale") never matches `property="og:locale:alternate"`.
const OG_LOCALE = /(<meta[^>]*\bproperty="og:locale"\s+content=")ru_RU(")/gi;
// The alternate tag: en_US -> ru_RU (the EN page's alternate is RU).
const OG_LOCALE_ALT =
    /(<meta[^>]*\bproperty="og:locale:alternate"\s+content=")en_US(")/gi;

// (3) The WebSite node's inLanguage in the application/ld+json script: ru -> en.
// Anchored on "@type":"WebSite" then a lazy span to its own "inLanguage":"ru"
// (inLanguage is the last key of that node). Real double quotes only, so the
// escaped flight-payload copy (\"inLanguage\":\"ru\") is not matched.
const WEBSITE_INLANG = /("@type":"WebSite"[\s\S]*?"inLanguage":")ru(")/;

if (!fs.existsSync(EN_DIR)) {
    console.error(`fix-en-lang: ${EN_DIR} not found -- did the export run?`);
    process.exit(1);
}

let scanned = 0;
let langChanged = 0;
let ogChanged = 0;
let inLangChanged = 0;
for (const file of htmlFiles(EN_DIR)) {
    scanned++;
    const html = fs.readFileSync(file, "utf8");

    // Non-global regex -> only the first <html> tag; the replacer rewrites lang
    // inside just that tag, so nothing else in the document can change.
    let next = html.replace(HTML_TAG, (tag) =>
        tag.replace(LANG_ATTR, "$1en$2"),
    );
    if (next !== html) langChanged++;

    const beforeOg = next;
    next = next
        .replace(OG_LOCALE, "$1en_US$2")
        .replace(OG_LOCALE_ALT, "$1ru_RU$2");
    if (next !== beforeOg) ogChanged++;

    const beforeInLang = next;
    next = next.replace(WEBSITE_INLANG, "$1en$2");
    if (next !== beforeInLang) inLangChanged++;

    if (next !== html) {
        fs.writeFileSync(file, next);
    }
}

console.log(
    `fix-en-lang: out/en/ (${scanned} file(s)) -- ` +
        `html lang=en: ${langChanged}, og:locale=en_US: ${ogChanged}, ` +
        `WebSite inLanguage=en: ${inLangChanged}`,
);
