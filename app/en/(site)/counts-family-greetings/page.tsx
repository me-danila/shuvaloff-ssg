import type { Metadata } from "next";
import MovedPage, { movedPageMetadata } from "@/components/seo/MovedPage";
import { COUNTS_FAMILY_GREETINGS_PATH } from "@/data/countsFamilyGreetingsData";

// Старый адрес: страница переехала внутрь услуги.
export const metadata: Metadata = movedPageMetadata(
    COUNTS_FAMILY_GREETINGS_PATH,
    "en",
);

export default function CountsFamilyGreetingsMoved() {
    return <MovedPage target={COUNTS_FAMILY_GREETINGS_PATH} locale="en" />;
}
