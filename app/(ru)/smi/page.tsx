import type { Metadata } from "next";
import SmiPage from "@/components/pages/SmiPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/smi/",
    title: "СМИ о нас — ACADEMIA Особняк Шувалова",
    description: "Публикации СМИ об отеле ACADEMIA Особняк Шувалова",
});

export default function Smi() {
    return <SmiPage locale="ru" />;
}
