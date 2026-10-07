import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingBooking from "@/components/landing/LandingBooking";
import { LANDING_DICTIONARIES } from "@/data/landing";
import {
    isLandingOnlyLocale,
    LANDING_ONLY_LOCALES,
    landingHref,
} from "@/lib/i18n/routing";

/**
 * Бронирование на языке лендинга: /it/booking/, /de/booking/, … Служебная
 * страница (форма TravelLine) — не индексируем, в sitemap не попадает.
 */
export const dynamicParams = false;

export const generateStaticParams = () =>
    LANDING_ONLY_LOCALES.map((lang) => ({ lang }));

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    if (!isLandingOnlyLocale(lang)) return {};
    const { booking } = LANDING_DICTIONARIES[lang];
    return {
        title: { absolute: booking.metaTitle },
        description: booking.metaDescription,
        alternates: { canonical: landingHref("/booking/", lang) },
        robots: { index: false, follow: true },
    };
}

export default async function Page({ params }: Props) {
    const { lang } = await params;
    if (!isLandingOnlyLocale(lang)) notFound();

    return <LandingBooking dict={LANDING_DICTIONARIES[lang]} />;
}
