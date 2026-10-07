import LandingShell from "@/components/landing/LandingShell";
import { LANDING_DICTIONARIES } from "@/data/landing";

/** EN-лендинг /en/visit/ — в общем LandingShell, вне хедера полного EN-сайта. */
export default function EnVisitLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <LandingShell dict={LANDING_DICTIONARIES.en}>{children}</LandingShell>
    );
}
