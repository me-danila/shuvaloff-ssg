import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/services/",
    title: "Услуги отеля — ACADEMIA Особняк Шувалова",
    description:
        "Дополнительные услуги ACADEMIA Особняк Шувалова: трансфер, SPA, special-сервисы и персональные опции отдыха",
});

export default function Services() {
    return <ServicesPage locale="ru" />;
}
