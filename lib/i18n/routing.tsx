export type Locale = "ru" | "en";

export const normalizePath = (value: string): string => {
    const normalized = value.replace(/\/+$/, "");
    return normalized || "/";
};

export const detectLocaleFromPath = (value: string): Locale => {
    return value === "/en" || value.startsWith("/en/") ? "en" : "ru";
};

export const stripLocalePrefix = (value: string): string => {
    if (value === "/en" || value === "/en/") {
        return "/";
    }

    if (value.startsWith("/en/")) {
        return value.slice(3);
    }

    return value;
};

/**
 * Path segments that exist only in Russian (no /en/ twin). Pages under these
 * roots must not emit an `en` hreflang or offer a language switch to /en.
 */
export const RU_ONLY_SEGMENTS = ["/blog", "/policy", "/legal"] as const;

/**
 * True when the given path has an English counterpart. Accepts either a raw
 * or locale-prefixed path; RU-only sections (see RU_ONLY_SEGMENTS) return false.
 */
export const hasEnglishVersion = (path: string): boolean => {
    const p = stripLocalePrefix(normalizePath(path));
    return !RU_ONLY_SEGMENTS.some(
        (seg) => p === seg || p.startsWith(`${seg}/`),
    );
};

export const isExternalHref = (href: string): boolean => {
    return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href);
};

export const localizeHref = (href: string, locale: Locale): string => {
    if (isExternalHref(href)) {
        return href;
    }

    const url = new URL(href, "https://academia.local");
    const path = stripLocalePrefix(url.pathname);

    if (locale === "ru") {
        return `${path}${url.search}${url.hash}`;
    }

    const enPath = path === "/" ? "/en/" : `/en${path}`;
    return `${enPath}${url.search}${url.hash}`;
};
