import type { Metadata } from "next";
import SalesPage from "@/components/pages/SalesPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Специальные предложения — ACADEMIA Особняк Шувалова",
    description:
        "Специальные предложения и скидки для гостей отеля ACDEMIA Особняк Шувалова",
    alternates: getLocaleAlternates("/sales/", "ru"),
};

export default function Sales() {
    return <SalesPage locale="ru" />;
}
