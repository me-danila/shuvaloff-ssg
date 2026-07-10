import type { Metadata } from "next";
import RoomsPage from "@/components/pages/RoomsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/rooms/",
    title: "Категории номеров — ACADEMIA Особняк Шувалова",
    description:
        "Номера и люксы отеля ACADEMIA Особняк Шувалова в Санкт-Петербурге",
});

export default function Rooms() {
    return <RoomsPage locale="ru" />;
}
