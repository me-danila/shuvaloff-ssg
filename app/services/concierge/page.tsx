import type { Metadata } from "next";
import ConciergePage from "@/components/pages/ConciergePage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Консьерж-сервис — ACADEMIA Особняк Шувалова",
    description:
        "Персональный консьерж-сервис ACADEMIA Особняк Шувалова: организация отдыха, событий, трансфера и индивидуальных запросов",
    alternates: getLocaleAlternates("/services/concierge/", "ru"),
};

export default function Concierge() {
    return <ConciergePage locale="ru" />;
}
