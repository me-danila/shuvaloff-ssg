import type { Metadata } from "next";
import CountsAutumnPage from "@/components/pages/CountsAutumnPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/counts-autumn/",
    title: "Count's Autumn — ACADEMIA Mansion Shuvaloff",
    description: "An aristocratic getaway in St. Petersburg",
});

export default function EnCountsAutumn() {
    return <CountsAutumnPage locale="en" />;
}
