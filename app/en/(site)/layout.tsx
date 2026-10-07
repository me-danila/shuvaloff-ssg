import SiteShell from "@/components/layout/SiteShell";

/**
 * EN full-site layout (route group — does not affect URLs). Wraps every /en
 * route except the /en/visit/ landing in the shared chrome with `locale="en"`.
 */
export default function EnSiteLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <SiteShell locale="en">{children}</SiteShell>;
}
