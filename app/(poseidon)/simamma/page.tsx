import type { Metadata } from "next";
import GiveawayPage from "@/components/giveaway/GiveawayPage";
import { giveawayImages } from "@/data/giveaway";
import { simamma } from "@/data/simammaData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: simamma.path,
    title: simamma.seo.title,
    description: simamma.seo.description,
    ogImage: giveawayImages.og,
});

export default function SimammaPage() {
    return <GiveawayPage campaign={simamma} />;
}
