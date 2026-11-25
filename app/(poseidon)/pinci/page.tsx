import type { Metadata } from "next";
import GiveawayPage from "@/components/giveaway/GiveawayPage";
import { giveawayImages } from "@/data/giveaway";
import { pinci } from "@/data/pinciData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: pinci.path,
    title: pinci.seo.title,
    description: pinci.seo.description,
    ogImage: giveawayImages.og,
});

export default function PinciPage() {
    return <GiveawayPage campaign={pinci} />;
}
