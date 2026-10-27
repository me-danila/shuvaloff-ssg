import type { Metadata } from "next";
import MovedPage, { movedPageMetadata } from "@/components/seo/MovedPage";
import { TEA_PARTY_PATH } from "@/data/teaPartyData";

// Старый адрес: страница переехала внутрь услуги.
export const metadata: Metadata = movedPageMetadata(TEA_PARTY_PATH, "ru");

export default function TeaPartyMoved() {
    return <MovedPage target={TEA_PARTY_PATH} locale="ru" />;
}
