import type { Metadata } from "next";
import BookingPage from "@/components/pages/BookingPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Бронирование номеров — ACADEMIA Особняк Шувалова",
    description:
        "Гарантия лучшей цены при бронировании номеров в отеле ACADEMIA Особняк Шувалова на официальном сайте",
    alternates: getLocaleAlternates("/booking/", "ru"),
};

export default function Booking() {
    return <BookingPage locale="ru" />;
}
