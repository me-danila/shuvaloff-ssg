import type { Metadata } from "next";
import GiveawayPage from "@/components/giveaway/GiveawayPage";
import { giveawayImages } from "@/data/giveaway";
import { siberianLights } from "@/data/siberianLightsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: siberianLights.path,
    title: siberianLights.seo.title,
    description: siberianLights.seo.description,
    ogImage: giveawayImages.og,
});

export default function SiberianLightsPage() {
    return <GiveawayPage campaign={siberianLights} />;
}
