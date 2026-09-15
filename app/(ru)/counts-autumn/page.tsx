import type { Metadata } from "next";
import CountsAutumnPage from "@/components/pages/CountsAutumnPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/counts-autumn/",
    title: "Графская осень — ACADEMIA Особняк Шувалова",
    description: "Атмосферный сценарий отдыха с аристократическими традициями",
});

export default function CountsAutumn() {
    return <CountsAutumnPage locale="ru" />;
}
