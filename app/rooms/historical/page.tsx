import type { Metadata } from "next";
import HistoricalRoomsPage from "@/components/pages/HistoricalRoomsPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Исторические люксы — ACADEMIA Особняк Шувалова",
    description:
        "Уникальные исторические люксы отеля ACADEMIA Особняк Шувалова в Санкт-Петербурге",
    alternates: getLocaleAlternates("/rooms/historical/", "ru"),
};

export default function HistoricalRooms() {
    return <HistoricalRoomsPage locale="ru" />;
}
