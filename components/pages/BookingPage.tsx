import { Suspense } from "react";
import TravelLineBookingForm from "@/components/sections/TravelLineBookingForm";
import StructuredData from "@/components/seo/StructuredData";
import GeniusLink from "@/components/ui/GeniusLink";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";
import { buildWebPageSchema } from "@/lib/seo/schema";

const copyByLocale = {
    ru: {
        title: "Бронирование номеров",
        line1: "Мы гарантируем Вам лучшие условия при бронировании на официальном сайте.",
        line2: "Кликните на",
        line3: "для применения автоматической скидки.",
    },
    en: {
        title: "Room booking",
        line1: "We guarantee you the best terms when booking on the official website.",
        line2: "Click",
        line3: "to apply the automatic discount.",
    },
} as const;

const seo = {
    ru: {
        name: "Бронирование номеров",
        description:
            "Гарантия лучшей цены при бронировании номеров в отеле ACADEMIA Особняк Шувалова на официальном сайте",
        crumbs: ["Главная"],
    },
    en: {
        name: "Room Booking",
        description:
            "Best price guarantee when booking rooms at ACADEMIA Mansion Shuvaloff on the official website",
        crumbs: ["Home"],
    },
} as const;

const CRUMB_PATHS = ["/"];

export default function BookingPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const pageSeo = seo[locale];

    return (
        <main className="flex flex-col gap-8 xl:gap-12 my-10 xl:my-12">
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: "/booking/",
                    name: pageSeo.name,
                    description: pageSeo.description,
                    breadcrumbs: [
                        ...pageSeo.crumbs.map((name, i) => ({
                            name,
                            path: CRUMB_PATHS[i],
                        })),
                        { name: pageSeo.name, path: "/booking/" },
                    ],
                })}
            />
            <FadeUp className="xl:w-full xl:max-w-7xl xl:mx-auto text-center px-4">
                <h1>{copy.title}</h1>
                <p className="leading-5 mt-2">
                    {copy.line1}
                    <br />
                    {copy.line2}{" "}
                    <Suspense fallback={<span>GENIUS</span>}>
                        <GeniusLink />
                    </Suspense>{" "}
                    {copy.line3}
                </p>
            </FadeUp>
            <TravelLineBookingForm />
        </main>
    );
}
