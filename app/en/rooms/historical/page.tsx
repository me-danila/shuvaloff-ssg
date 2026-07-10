import type { Metadata } from "next";
import HistoricalRoomsPage from "@/components/pages/HistoricalRoomsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/rooms/historical/",
    title: "Historical Suites — ACADEMIA Shuvaloff Mansion",
    description:
        "Unique historical suites at ACADEMIA Shuvaloff Mansion in Saint Petersburg",
});

export default function HistoricalRoomsEn() {
    return <HistoricalRoomsPage locale="en" />;
}
