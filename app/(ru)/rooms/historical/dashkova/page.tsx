import type { Metadata } from "next";
import HistoricalSuitePage from "@/components/pages/HistoricalSuitePage";
import { AllRooms } from "@/data/RoomsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/rooms/historical/dashkova/",
    title: "Резиденция Дашковой — ACADEMIA Особняк Шувалова",
    description:
        "Исторический люкс «Резиденция Дашковой» в атмосфере классического Петербурга с подлинными антикварными элементами",
    ogImage: AllRooms.ru.find((r) => r.slug === "dashkova")?.image.src,
});

export default function HistoricalDashkova() {
    return <HistoricalSuitePage locale="ru" slug="dashkova" />;
}
