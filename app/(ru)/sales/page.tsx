import type { Metadata } from "next";
import SalesPage from "@/components/pages/SalesPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/sales/",
    title: "Специальные предложения — ACADEMIA Особняк Шувалова",
    description:
        "Специальные предложения и скидки для гостей отеля ACDEMIA Особняк Шувалова",
});

export default function Sales() {
    return <SalesPage locale="ru" />;
}
