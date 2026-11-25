import type { Metadata } from "next";
import GiveawayPage from "@/components/giveaway/GiveawayPage";
import { giveawayImages } from "@/data/giveaway";
import { mskIst } from "@/data/mskIstData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: mskIst.path,
    title: mskIst.seo.title,
    description: mskIst.seo.description,
    ogImage: giveawayImages.og,
});

export default function MskIstPage() {
    return <GiveawayPage campaign={mskIst} />;
}
