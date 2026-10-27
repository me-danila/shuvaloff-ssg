import type { Metadata } from "next";
import CountsFamilyGreetingsPage from "@/components/pages/CountsFamilyGreetingsPage";
import {
    COUNTS_FAMILY_GREETINGS_PATH,
    countsFamilyImages,
    countsFamilySeo,
} from "@/data/countsFamilyGreetingsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: COUNTS_FAMILY_GREETINGS_PATH,
    title: countsFamilySeo.ru.title,
    description: countsFamilySeo.ru.description,
    ogImage: countsFamilyImages.hero,
});

export default function CountsFamilyGreetings() {
    return <CountsFamilyGreetingsPage locale="ru" />;
}
