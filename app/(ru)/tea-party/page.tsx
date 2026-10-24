import type { Metadata } from "next";
import TeaPartyPage from "@/components/pages/TeaPartyPage";
import {
    TEA_PARTY_PATH,
    teaPartyImages,
    teaPartySeo,
} from "@/data/teaPartyData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: TEA_PARTY_PATH,
    title: teaPartySeo.title,
    description: teaPartySeo.description,
    ogImage: teaPartyImages.hero,
});

export default function TeaParty() {
    return <TeaPartyPage />;
}
