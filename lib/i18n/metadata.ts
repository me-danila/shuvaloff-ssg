import type { Locale } from "@/lib/i18n/routing";
import { normalizePath, stripLocalePrefix } from "@/lib/i18n/routing";

const SITE_URL = "https://academia-shuvaloff.ru";

export const siteMetadataBase = new URL(SITE_URL);

const withTrailingSlash = (value: string): string => {
    return value.endsWith("/") ? value : `${value}/`;
};

export const getLocaleAlternates = (path: string, locale: Locale) => {
    const stripped = stripLocalePrefix(normalizePath(path));
    const ruPath = withTrailingSlash(stripped);
    const enPath = ruPath === "/" ? "/en/" : `/en${ruPath}`;

    return {
        canonical: locale === "en" ? enPath : ruPath,
        languages: {
            ru: ruPath,
            en: enPath,
        },
    };
};
