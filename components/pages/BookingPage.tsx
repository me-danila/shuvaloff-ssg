import { Suspense } from "react";
import GeniusLink from "@/components/ui/GeniusLink";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";

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

export default function BookingPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    return (
        <main className="flex flex-col gap-8 xl:gap-12 my-10 xl:my-12">
            <FadeUp className="xl:w-full xl:max-w-6xl xl:mx-auto text-center px-4">
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
            <section
                id="tl-booking-form"
                className="max-w-xl:px-4 xl:w-full xl:mx-auto xl:max-w-6xl"
            ></section>
        </main>
    );
}
