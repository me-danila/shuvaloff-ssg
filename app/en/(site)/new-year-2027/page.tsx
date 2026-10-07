import type { Metadata } from "next";
import NewYear2027Page, {
    NEW_YEAR_2027_HERO_IMAGE,
} from "@/components/pages/NewYear2027Page";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/new-year-2027/",
    title: "Count's New Year 2027 at the Mansion in Saint Petersburg",
    description:
        "New Year's Eve in Saint Petersburg at Count Shuvalov's mansion: 31 December, a theatrical 19th-century salon programme, a festive dinner and live music.",
    ogImage: NEW_YEAR_2027_HERO_IMAGE,
});

export default function EnNewYear2027() {
    return <NewYear2027Page locale="en" />;
}
