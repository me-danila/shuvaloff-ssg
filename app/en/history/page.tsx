import type { Metadata } from "next";
import HistoryPage from "@/components/pages/HistoryPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/history/",
    title: "History of Count Shuvalov Mansion — ACADEMIA Shuvaloff Mansion",
    description:
        "A journey through time: the history of Count Shuvalov Mansion in Saint Petersburg",
    ogImage:
        "https://academia.spb.ru/wp-content/uploads/2026/03/Антиквариат-в-резиденциях-Дашковой-и-Шувалова_page-0003.jpg",
    ogType: "article",
});

export default function EnHistory() {
    return <HistoryPage locale="en" />;
}
