import type { Metadata } from "next";
import AeroflotSalePage from "@/components/pages/AeroflotSalePage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/sales/aeroflot/",
    title: "Aeroflot Bonus — ACADEMIA Mansion SHUVALOFF",
    description:
        "Stay at the ACADEMIA Collection of Mansions and earn Aeroflot Bonus miles for every night of your stay.",
});

export default function AeroflotSale() {
    return <AeroflotSalePage locale="en" />;
}
