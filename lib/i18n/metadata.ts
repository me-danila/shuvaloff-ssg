import type { Metadata } from "next";
import type { LandingLocale, Locale } from "@/lib/i18n/routing";
import {
    hasEnglishVersion,
    LANDING_LOCALES,
    LANDING_PATHS,
    normalizePath,
    stripLocalePrefix,
} from "@/lib/i18n/routing";
import { resolveOgImage } from "@/lib/seo/ogImages";
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

/**
 * Хвост документного <title>: имя отеля + пометка «Официальный сайт».
 * Тайтлы без бренда (свадьба, фотосессия) сначала получают имя отеля, чтобы
 * концовка везде читалась одинаково: «… — <отель> — Официальный сайт».
 */
const OFFICIAL_SITE_SUFFIX: Record<Locale, string> = {
    ru: " — Официальный сайт",
    en: " — Official website",
};

export const withOfficialSiteSuffix = (
    title: string,
    locale: Locale,
): string => {
    const suffix = OFFICIAL_SITE_SUFFIX[locale];

    if (title.endsWith(suffix)) {
        return title;
    }

    const withBrand = /academia/i.test(title)
        ? title
        : `${title} — ${getSiteName(locale)}`;

    return `${withBrand}${suffix}`;
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
 * on the page; when omitted the site-wide default is used. Entries in
 * lib/seo/ogImages.ts can override or replace it (see resolveOgImage).
 */
export const buildPageMetadata = ({
    locale,
    path,
    title,
    description,
    ogImage: pageOgImage,
    ogType = "website",
}: {
    locale: Locale;
    path: string;
    title: string;
    description: string;
    ogImage?: string;
    ogType?: "website" | "article";
}): Metadata => {
    const ogImage = resolveOgImage(path, pageOgImage);
    const imageUrl = toAbsoluteImage(ogImage ?? DEFAULT_OG_IMAGE);
    const docTitle = withOfficialSiteSuffix(title, locale);
    const ogImageEntry = ogImage
        ? { url: imageUrl, alt: title }
        : { url: imageUrl, ...OG_DEFAULT_IMAGE_DIMENSIONS, alt: title };

    return {
        title: docTitle,
        description,
        alternates: getLocaleAlternates(path, locale),
        openGraph: {
            type: ogType,
            url: getAbsoluteUrl(path, locale),
            siteName: getSiteName(locale),
            locale: locale === "en" ? "en_US" : "ru_RU",
            alternateLocale: locale === "en" ? ["ru_RU"] : ["en_US"],
            title: docTitle,
            description,
            images: [ogImageEntry],
        },
        twitter: {
            card: "summary_large_image",
            title: docTitle,
            description,
            images: [imageUrl],
        },
    };
};

const LANDING_OG_LOCALE: Record<LandingLocale, string> = {
    en: "en_US",
    it: "it_IT",
    de: "de_DE",
    fr: "fr_FR",
    es: "es_ES",
};

/**
 * hreflang-кластер лендингов: /en/visit/ ↔ /it/ ↔ /de/ ↔ /fr/ ↔ /es/.
 * Отдельный от кластера полного сайта (ru ↔ en): одна страница не может быть
 * `en` в двух кластерах, поэтому /en/ и /en/visit/ друг на друга не ссылаются.
 * x-default — английский лендинг: иностранцу без своего языка он ближе всего.
 */
export const getLandingAlternates = (locale: LandingLocale) => ({
    canonical: LANDING_PATHS[locale],
    languages: {
        ...(Object.fromEntries(
            LANDING_LOCALES.map((l) => [l, LANDING_PATHS[l]]),
        ) as Record<LandingLocale, string>),
        "x-default": LANDING_PATHS.en,
    },
});

/**
 * Metadata лендинга. Тайтл берётся из словаря как есть (без суффикса
 * «Официальный сайт» — он есть только на ru/en). `draft` — пока тексты
 * не утверждены: noindex, и лендинг не попадает в sitemap/llms.
 */
export const buildLandingMetadata = ({
    locale,
    title,
    description,
    ogImage,
    draft,
}: {
    locale: LandingLocale;
    title: string;
    description: string;
    ogImage?: string;
    draft?: boolean;
}): Metadata => {
    const imageUrl = toAbsoluteImage(ogImage ?? DEFAULT_OG_IMAGE);
    const ogImageEntry = ogImage
        ? { url: imageUrl, alt: title }
        : { url: imageUrl, ...OG_DEFAULT_IMAGE_DIMENSIONS, alt: title };

    return {
        title,
        description,
        alternates: getLandingAlternates(locale),
        ...(draft ? { robots: { index: false, follow: false } } : {}),
        openGraph: {
            type: "website",
            url: getAbsoluteUrl(LANDING_PATHS[locale]),
            siteName: getSiteName("en"),
            locale: LANDING_OG_LOCALE[locale],
            alternateLocale: LANDING_LOCALES.filter((l) => l !== locale).map(
                (l) => LANDING_OG_LOCALE[l],
            ),
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
