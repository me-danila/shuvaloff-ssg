import { Suspense } from "react";
import SkipLink from "@/components/a11y/SkipLink";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import StructuredData from "@/components/seo/StructuredData";
import type { Locale } from "@/lib/i18n/routing";
import { buildSiteSchema } from "@/lib/seo/schema";

/**
 * Per-locale chrome: skip-link, site JSON-LD, header, main-content wrapper and
 * footer. Rendered by the two locale layouts (app/(ru)/layout, app/en/layout),
 * so locale flows from the server as a prop instead of being detected client-
 * side. Server component — Header/Footer stay client (interactivity), SkipLink
 * and the site schema are now server-rendered with the correct locale, and the
 * WebSite `inLanguage` is emitted natively per locale (no post-build patch).
 */
export default function SiteShell({
    locale,
    children,
}: {
    locale: Locale;
    children: React.ReactNode;
}) {
    return (
        <>
            <SkipLink locale={locale} />
            <StructuredData data={buildSiteSchema(locale)} />
            <Header locale={locale} />
            <div
                id="main-content"
                tabIndex={-1}
                className="scroll-mt-24 focus:outline-none"
            >
                <Suspense fallback={null}>{children}</Suspense>
            </div>
            <Footer locale={locale} />
        </>
    );
}
