import type { Metadata } from "next";
import PetsPage from "@/components/pages/PetsPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Pet-Friendly Stay — ACADEMIA Shuvaloff Mansion",
    description:
        "Stay with cats and dogs at ACADEMIA Shuvaloff Mansion: prepared pet essentials, thoughtful care, and a comfortable stay together.",
    alternates: getLocaleAlternates("/services/pets/", "en"),
};

export default function EnPets() {
    return <PetsPage locale="en" />;
}
