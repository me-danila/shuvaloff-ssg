import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Услуги отеля — ACADEMIA Особняк Шувалова",
    description:
        "Дополнительные услуги ACADEMIA Особняк Шувалова: трансфер, SPA, special-сервисы и персональные опции отдыха",
    alternates: getLocaleAlternates("/services/", "ru"),
};

export default function Services() {
    return <ServicesPage locale="ru" />;
}
