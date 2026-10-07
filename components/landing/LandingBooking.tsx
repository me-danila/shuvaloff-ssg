import { Suspense } from "react";
import TravelLineBookingForm from "@/components/sections/TravelLineBookingForm";
import GeniusLink from "@/components/ui/GeniusLink";
import { FadeUp } from "@/components/ui/Motion";
import type { LandingDictionary } from "@/data/landing";
import { landingHref } from "@/lib/i18n/routing";

/**
 * Бронирование лендинга (/it/booking/ …) — разметка BookingPage основного
 * сайта (заголовок, строка про GENIUS, модуль TravelLine), но в хедере и
 * футере лендинга. TravelLine берет язык из адреса страницы, а оффер,
 * категорию и промокод — из query (be-offer, be-room, promo-code-plain).
 */
export default function LandingBooking({ dict }: { dict: LandingDictionary }) {
    const copy = dict.booking;

    return (
        // Отступ сверху — под фиксированный хедер лендинга.
        <div className="flex flex-col gap-8 pt-28 pb-10 xl:gap-12 xl:pt-32 xl:pb-12">
            <FadeUp className="px-4 text-center xl:mx-auto xl:w-full xl:max-w-7xl">
                <h1>{copy.title}</h1>
                <p className="mt-2 leading-5">
                    {copy.line1}
                    <br />
                    {copy.line2}{" "}
                    <Suspense fallback={<span>GENIUS</span>}>
                        <GeniusLink
                            bookingPath={landingHref("/booking/", dict.locale)}
                        />
                    </Suspense>{" "}
                    {copy.line3}
                </p>
            </FadeUp>
            <TravelLineBookingForm />
        </div>
    );
}
