import type { Metadata } from "next";
import { Suspense } from "react";
import GeniusLink from "@/components/ui/GeniusLink";

export const metadata: Metadata = {
    title: "Бронирование номеров — ACADEMIA Особняк Шувалова",
    description:
        "Гарантия лучшей цены при бронировании номеров в отеле ACADEMIA Особняк Шувалова на официальном сайте",
};

export default function Booking() {
    return (
        <main className="flex flex-col gap-8 xl:gap-12 my-10 xl:my-12">
            <section className="xl:w-full xl:max-w-6xl xl:mx-auto text-center px-4">
                <h1>Бронирование номеров</h1>
                <p className="leading-5 mt-2">
                    Мы&nbsp;гарантируем Вам лучшие условия при бронировании
                    на&nbsp;официальном сайте.
                    <br />
                    Кликните на&nbsp;
                    <Suspense fallback={<span>GENIUS</span>}>
                        <GeniusLink />
                    </Suspense>{" "}
                    для применения автоматической скидки.
                </p>
            </section>
            <section
                id="tl-booking-form"
                className="max-w-xl:px-4 xl:w-full xl:mx-auto xl:max-w-6xl"
            ></section>
        </main>
    );
}
