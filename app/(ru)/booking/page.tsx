import type { Metadata } from "next";
import BookingPage from "@/components/pages/BookingPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/booking/",
    title: "Бронирование номеров — ACADEMIA Особняк Шувалова",
    description:
        "Гарантия лучшей цены при бронировании номеров в отеле ACADEMIA Особняк Шувалова на официальном сайте",
});

export default function Booking() {
    return <BookingPage locale="ru" />;
}
