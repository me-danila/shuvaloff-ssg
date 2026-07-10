import type { Metadata } from "next";
import BoatToursPage from "@/components/pages/BoatToursPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/services/boat-tours/",
    title: "Boat tours and excursions — ACADEMIA Mansion SHUVALOFF",
    description:
        "There is a special magic to the sight of St. Petersburg when viewed from the water.",
});

export default function Meet() {
    return <BoatToursPage locale="en" />;
}
