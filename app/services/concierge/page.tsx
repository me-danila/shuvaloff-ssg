import type { Metadata } from "next";
import ConciergePage from "@/components/pages/ConciergePage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/services/concierge/",
    title: "Консьерж-сервис — ACADEMIA Особняк Шувалова",
    description:
        "Персональный консьерж-сервис ACADEMIA Особняк Шувалова: организация отдыха, событий, трансфера и индивидуальных запросов",
});

export default function Concierge() {
    return <ConciergePage locale="ru" />;
}
