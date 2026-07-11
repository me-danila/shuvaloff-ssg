import type { Metadata } from "next";
import HistoricalSuitePage from "@/components/pages/HistoricalSuitePage";
import { AllRooms } from "@/data/RoomsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/rooms/historical/dashkova/",
    title: "Dashkova Residence — ACADEMIA Shuvaloff Mansion",
    description:
        "Historical suite 'Dashkova Residence' with authentic antiques and the atmosphere of classic Saint Petersburg",
    ogImage: AllRooms.en.find((r) => r.slug === "dashkova")?.image.src,
});

export default function HistoricalDashkovaEn() {
    return <HistoricalSuitePage locale="en" slug="dashkova" />;
}
