import type { Metadata } from "next";
import HistoricalRoomsPage from "@/components/pages/HistoricalRoomsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/rooms/historical/",
    title: "Исторические люксы — ACADEMIA Особняк Шувалова",
    description:
        "Уникальные исторические люксы отеля ACADEMIA Особняк Шувалова в Санкт-Петербурге",
});

export default function HistoricalRooms() {
    return <HistoricalRoomsPage locale="ru" />;
}
