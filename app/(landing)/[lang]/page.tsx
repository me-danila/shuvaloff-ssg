import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "@/components/landing/LandingPage";
import { LANDING_DICTIONARIES } from "@/data/landing";
import { buildLandingMetadata } from "@/lib/i18n/metadata";
import { isLandingOnlyLocale, LANDING_ONLY_LOCALES } from "@/lib/i18n/routing";

export const dynamicParams = false;

export const generateStaticParams = () =>
    LANDING_ONLY_LOCALES.map((lang) => ({ lang }));

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    if (!isLandingOnlyLocale(lang)) return {};
    const dict = LANDING_DICTIONARIES[lang];
    return buildLandingMetadata({
        locale: lang,
        draft: dict.draft,
        ...dict.meta,
    });
}

export default async function Page({ params }: Props) {
    const { lang } = await params;
    if (!isLandingOnlyLocale(lang)) notFound();

    return <LandingPage dict={LANDING_DICTIONARIES[lang]} />;
}
