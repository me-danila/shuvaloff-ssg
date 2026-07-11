import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import { DEFAULT_OG_IMAGE, getSiteName } from "@/lib/seo/site";

/**
 * EN locale layout. Wraps every /en route in the shared chrome with an explicit
 * `locale="en"`, and re-emits the full OpenGraph block in English as the
 * default (openGraph on a child REPLACES the parent's, so it must be complete)
 * — so EN pages get `og:locale=en_US` natively even without a per-page
 * override. `<html lang>` still comes from the single root and is corrected for
 * EN by HtmlLangSync + the post-build lang rewrite.
 */
export const metadata: Metadata = {
    openGraph: {
        type: "website",
        locale: "en_US",
        alternateLocale: ["ru_RU"],
        siteName: getSiteName("en"),
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
};

export default function EnLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <SiteShell locale="en">{children}</SiteShell>;
}
