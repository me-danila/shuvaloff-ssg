import type { Metadata } from "next";
import SalesPage from "@/components/pages/SalesPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/sales/",
    title: "Special Offers — ACADEMIA Shuvaloff Mansion",
    description:
        "Special offers and discounts for guests of the ACADEMIA Shuvaloff Mansion hotel",
});

export default function EnSales() {
    return <SalesPage locale="en" />;
}
