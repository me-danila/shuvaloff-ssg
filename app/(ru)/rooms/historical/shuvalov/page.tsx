import type { Metadata } from "next";
import HistoricalSuitePage from "@/components/pages/HistoricalSuitePage";
import { AllRooms } from "@/data/RoomsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/rooms/historical/shuvalov/",
    title: "Резиденция графа Шувалова — ACADEMIA Особняк Шувалова",
    description:
        "Исторический люкс «Резиденция графа Шувалова» с антикварными деталями и атмосферой аристократического Петербурга",
    ogImage: AllRooms.ru.find((r) => r.slug === "shuvalov")?.image.src,
});

export default function HistoricalShuvalov() {
    return <HistoricalSuitePage locale="ru" slug="shuvalov" />;
}
