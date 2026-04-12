export type Locale = "ru" | "en";

export const DEFAULT_LOCALE: Locale = "ru";

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
