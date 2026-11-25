import type { Metadata } from "next";
import GiveawayPage from "@/components/giveaway/GiveawayPage";
import { giveawayImages } from "@/data/giveaway";
import { poseidon } from "@/data/poseidonData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: poseidon.path,
    title: poseidon.seo.title,
    description: poseidon.seo.description,
    ogImage: giveawayImages.og,
});

export default function PoseidonPage() {
    return <GiveawayPage campaign={poseidon} />;
}
