export type Locale = "ru" | "en";

export const normalizePath = (value: string): string => {
    const normalized = value.replace(/\/+$/, "");
    return normalized || "/";
};

/**
 * Языки одностраничных лендингов. `en` — /en/visit/ внутри EN-ветки, остальные
 * живут в собственном корне (/it/, /de/, …) и полного сайта не имеют.
 */
export const LANDING_LOCALES = ["en", "it", "de", "fr", "es"] as const;
export type LandingLocale = (typeof LANDING_LOCALES)[number];

/** Языки, у которых есть только лендинг (без полного сайта). */
export const LANDING_ONLY_LOCALES = ["it", "de", "fr", "es"] as const;
export type LandingOnlyLocale = (typeof LANDING_ONLY_LOCALES)[number];

export const LANDING_PATHS: Record<LandingLocale, string> = {
    en: "/en/visit/",
    it: "/it/",
    de: "/de/",
    fr: "/fr/",
    es: "/es/",
};

/** Язык документа: всё, что может стоять в `<html lang>`. */
export type HtmlLang = Locale | LandingOnlyLocale;

export const isLandingOnlyLocale = (
    value: string,
): value is LandingOnlyLocale =>
    (LANDING_ONLY_LOCALES as readonly string[]).includes(value);

/** `it` для /it и /it/…, иначе null (граница по сегменту: /italy — null). */
export const detectLandingOnlyLocale = (
    value: string,
): LandingOnlyLocale | null => {
    const segment = value.split("/")[1] ?? "";
    return isLandingOnlyLocale(segment) ? segment : null;
};

/**
 * Локаль контента полного сайта (ru | en). Лендинги без полного сайта
 * (/it/, /de/, …) получают `en`: общие компоненты и виджеты (TravelLine,
 * модалки) умеют только ru/en, и иностранцу английский ближе русского.
 */
export const detectLocaleFromPath = (value: string): Locale => {
    if (detectLandingOnlyLocale(value)) return "en";
    return value === "/en" || value.startsWith("/en/") ? "en" : "ru";
};

/** Язык для `<html lang>`: точный язык лендинга или ru/en полного сайта. */
export const detectHtmlLang = (value: string): HtmlLang =>
    detectLandingOnlyLocale(value) ?? detectLocaleFromPath(value);

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
export const RU_ONLY_SEGMENTS = [
    "/blog",
    "/policy",
    "/legal",
    "/consent",
] as const;

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

/**
 * Ссылка с лендинга. EN-лендинг ведет на страницы полного EN-сайта
 * (/en/booking/…), остальные — на свои страницы под префиксом языка
 * (/it/booking/…). Query и hash сохраняются: TravelLine читает be-offer,
 * be-room, promo-code-plain из адреса страницы.
 */
export const landingHref = (href: string, locale: LandingLocale): string => {
    if (locale === "en" || isExternalHref(href)) {
        return localizeHref(href, "en");
    }

    const url = new URL(href, "https://academia.local");
    const path = stripLocalePrefix(url.pathname);
    return `/${locale}${path}${url.search}${url.hash}`;
};
