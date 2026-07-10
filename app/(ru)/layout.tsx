import SiteShell from "@/components/layout/SiteShell";

/**
 * RU locale layout (route group — does not affect URLs). Wraps every Russian
 * route in the shared per-locale chrome with an explicit `locale="ru"`.
 */
export default function RuLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <SiteShell locale="ru">{children}</SiteShell>;
}
