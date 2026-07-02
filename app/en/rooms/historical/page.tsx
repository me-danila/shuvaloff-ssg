import type { Metadata } from "next";
import HistoricalRoomsPage from "@/components/pages/HistoricalRoomsPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Historical Suites — ACADEMIA Shuvaloff Mansion",
    description:
        "Unique historical suites at ACADEMIA Shuvaloff Mansion in Saint Petersburg",
    alternates: getLocaleAlternates("/rooms/historical/", "en"),
};

export default function HistoricalRoomsEn() {
    return <HistoricalRoomsPage locale="en" />;
}
