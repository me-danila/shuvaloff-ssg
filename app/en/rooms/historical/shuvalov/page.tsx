import type { Metadata } from "next";
import HistoricalSuitePage from "@/components/pages/HistoricalSuitePage";
import { AllRooms } from "@/data/RoomsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/rooms/historical/shuvalov/",
    title: "Count Shuvalov Residence — ACADEMIA Shuvaloff Mansion",
    description:
        "Historical suite 'Count Shuvalov Residence' with authentic antiques and aristocratic Saint Petersburg atmosphere",
    ogImage: AllRooms.en.find((r) => r.slug === "shuvalov")?.image.src,
});

export default function HistoricalShuvalovEn() {
    return <HistoricalSuitePage locale="en" slug="shuvalov" />;
}
