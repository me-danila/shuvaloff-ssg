import type { Metadata } from "next";
import HistoryPage from "@/components/pages/HistoryPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/history/",
    title: "История особняка графа Шувалова — ACADEMIA Особняк Шувалова",
    description:
        "Путешествие во времени — История особняка графа Шувалова в Санкт-Петербурге",
    ogImage:
        "https://academia.spb.ru/wp-content/uploads/2026/03/Антиквариат-в-резиденциях-Дашковой-и-Шувалова_page-0003.jpg",
    ogType: "article",
});

export default function History() {
    return <HistoryPage locale="ru" />;
}
