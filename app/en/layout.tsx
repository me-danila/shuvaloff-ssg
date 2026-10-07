import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, getSiteName } from "@/lib/seo/site";

/**
 * EN segment layout. Re-emits the full OpenGraph block in English as the
 * default (openGraph on a child REPLACES the parent's, so it must be complete)
 * — so EN pages get `og:locale=en_US` natively even without a per-page
 * override. `<html lang>` still comes from the single root and is corrected by
 * HtmlLangSync + the post-build lang rewrite.
 *
 * Chrome lives one level down, so the two EN trees stay independent:
 *   - app/en/(site)/    — full EN site in the shared SiteShell
 *   - app/en/(landing)/ — /en/visit/ landing in the LandingShell
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
    return children;
}
