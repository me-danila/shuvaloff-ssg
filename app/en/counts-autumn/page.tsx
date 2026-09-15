import type { Metadata } from "next";
import CountsAutumnPage from "@/components/pages/CountsAutumnPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/counts-autumn/",
    title: "Count's Autumn — ACADEMIA Mansion Shuvaloff",
    description:
        "An atmospheric getaway scripted around aristocratic traditions",
    ogImage:
        "https://academia.spb.ru/wp-content/uploads/2026/09/горизонталь-1.png",
});

export default function EnCountsAutumn() {
    return <CountsAutumnPage locale="en" />;
}
