import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/routing";
import { getAbsoluteUrl, getLocalizedPath } from "@/lib/seo/site";

/**
 * Страница-заглушка на старом адресе, переехавшем в другой раздел (например,
 * /tea-party/ → /services/tea-party/details/). Хостинг статический, без
 * серверных 301, поэтому: мгновенный meta refresh + JS-переход, canonical на
 * новый адрес и noindex — поисковики склеят адреса.
 */
export function movedPageMetadata(target: string, locale: Locale): Metadata {
    return {
        robots: { index: false, follow: true },
        alternates: { canonical: getAbsoluteUrl(target, locale) },
    };
}

export default function MovedPage({
    target,
    locale,
}: {
    target: string;
    locale: Locale;
}) {
    const href = getLocalizedPath(target, locale);
    return (
        <main className="px-6 py-24 text-center">
            <meta httpEquiv="refresh" content={`0; url=${href}`} />
            <script>{`location.replace(${JSON.stringify(href)});`}</script>
            <a href={href} className="underline underline-offset-4">
                {locale === "ru"
                    ? "Страница переехала — перейти"
                    : "This page has moved — continue"}
            </a>
        </main>
    );
}
