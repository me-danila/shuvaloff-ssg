import type { Metadata } from "next";
import SmiPage from "@/components/pages/SmiPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "СМИ о нас — ACADEMIA Особняк Шувалова",
    description: "Публикации СМИ об отеле ACADEMIA Особняк Шувалова",
    alternates: getLocaleAlternates("/smi/", "ru"),
};

export default function Smi() {
    return <SmiPage locale="ru" />;
}
