import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/routing";
import {
    hasEnglishVersion,
    normalizePath,
    stripLocalePrefix,
} from "@/lib/i18n/routing";
import {
    DEFAULT_OG_IMAGE,
    getAbsoluteUrl,
    getSiteName,
    SITE_URL,
} from "@/lib/seo/site";

export const siteMetadataBase = new URL(SITE_URL);

const OG_DEFAULT_IMAGE_DIMENSIONS = { width: 1200, height: 630 } as const;

const toAbsoluteImage = (image: string): string =>
    image.startsWith("http") ? image : getAbsoluteUrl(image);

const withTrailingSlash = (value: string): string => {
    return value.endsWith("/") ? value : `${value}/`;
};

export const getLocaleAlternates = (path: string, locale: Locale) => {
    const stripped = stripLocalePrefix(normalizePath(path));
    const ruPath = withTrailingSlash(stripped);

    // RU-only sections (/blog, /policy, /legal) have no /en/ twin: never emit an
    // `en` hreflang, and point x-default at the Russian page.
    if (!hasEnglishVersion(stripped)) {
        return {
            canonical: ruPath,
            languages: {
                ru: ruPath,
                "x-default": ruPath,
            },
        };
    }

    const enPath = ruPath === "/" ? "/en/" : `/en${ruPath}`;

    return {
        canonical: locale === "en" ? enPath : ruPath,
        languages: {
            ru: ruPath,
            en: enPath,
            "x-default": ruPath,
        },
    };
};

/**
 * Build a page-level Metadata object with a full, self-contained openGraph +
 * twitter block. A child openGraph replaces (not deep-merges) the root
 * layout's openGraph, so title/description/type are re-emitted here to avoid
 * losing them. `ogImage` lets detail routes surface an image already present
 * on the page; when omitted the site-wide default is used.
 */
export const buildPageMetadata = ({
    locale,
    path,
    title,
    description,
    ogImage,
    ogType = "website",
}: {
    locale: Locale;
    path: string;
    title: string;
    description: string;
    ogImage?: string;
    ogType?: "website" | "article";
}): Metadata => {
    const imageUrl = toAbsoluteImage(ogImage ?? DEFAULT_OG_IMAGE);
    const ogImageEntry = ogImage
        ? { url: imageUrl, alt: title }
        : { url: imageUrl, ...OG_DEFAULT_IMAGE_DIMENSIONS, alt: title };

    return {
        title,
        description,
        alternates: getLocaleAlternates(path, locale),
        openGraph: {
            type: ogType,
            url: getAbsoluteUrl(path, locale),
            siteName: getSiteName(locale),
            locale: locale === "en" ? "en_US" : "ru_RU",
            alternateLocale: locale === "en" ? ["ru_RU"] : ["en_US"],
            title,
            description,
            images: [ogImageEntry],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
};
