import type { Metadata } from "next";
import NewYear2027Page, {
    NEW_YEAR_2027_HERO_IMAGE,
} from "@/components/pages/NewYear2027Page";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/new-year-2027/",
    title: "Графский Новый год 2027 в особняке в Петербурге",
    description:
        "Новый год в Петербурге в особняке графа Шувалова: 31 декабря, театрализованная программа в духе светского салона XIX века, праздничный ужин и живая музыка.",
    ogImage: NEW_YEAR_2027_HERO_IMAGE,
});

export default function NewYear2027() {
    return <NewYear2027Page locale="ru" />;
}
