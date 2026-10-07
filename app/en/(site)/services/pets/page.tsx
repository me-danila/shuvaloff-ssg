import type { Metadata } from "next";
import PetsPage from "@/components/pages/PetsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/services/pets/",
    title: "Pet-Friendly Stay — ACADEMIA Shuvaloff Mansion",
    description:
        "Stay with cats and dogs at ACADEMIA Shuvaloff Mansion: prepared pet essentials, thoughtful care, and a comfortable stay together.",
});

export default function EnPets() {
    return <PetsPage locale="en" />;
}
