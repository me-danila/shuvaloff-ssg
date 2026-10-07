import { notFound } from "next/navigation";
import LandingShell from "@/components/landing/LandingShell";
import { LANDING_DICTIONARIES } from "@/data/landing";
import { isLandingOnlyLocale, LANDING_ONLY_LOCALES } from "@/lib/i18n/routing";

/**
 * Лендинги языков без полного сайта: /it/, /de/, /fr/, /es/. Route group —
 * на URL не влияет. Статичные сегменты основного сайта (/rooms/, /en/, …)
 * имеют приоритет над [lang]; всё вне LANDING_ONLY_LOCALES — 404.
 */
export const dynamicParams = false;

export const generateStaticParams = () =>
    LANDING_ONLY_LOCALES.map((lang) => ({ lang }));

export default async function LandingLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}>) {
    const { lang } = await params;
    if (!isLandingOnlyLocale(lang)) notFound();

    return (
        <LandingShell dict={LANDING_DICTIONARIES[lang]}>
            {children}
        </LandingShell>
    );
}
