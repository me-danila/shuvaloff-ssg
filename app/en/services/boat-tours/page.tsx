import type { Metadata } from "next";
import BoatToursPage from "@/components/pages/BoatToursPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Boat tours and excursions — ACADEMIA Mansion SHUVALOFF",
    description:
        "There is a special magic to the sight of St. Petersburg when viewed from the water.",
    alternates: getLocaleAlternates("/boat-tours/", "en"),
};

export default function Meet() {
    return <BoatToursPage locale="en" />;
}
