import type { Metadata } from "next";
import SalesPage from "@/components/pages/SalesPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Special Offers — ACADEMIA Shuvaloff Mansion",
    description:
        "Special offers and discounts for guests of the ACADEMIA Shuvaloff Mansion hotel",
    alternates: getLocaleAlternates("/sales/", "en"),
};

export default function EnSales() {
    return <SalesPage locale="en" />;
}
