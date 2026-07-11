import type { Metadata } from "next";
import AristocraticSpbPage from "@/components/pages/AristocraticSpbPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/aristocratic-spb/",
    title: "Aristocratic St. Petersburg — ACADEMIA Mansion Shuvaloff",
    description:
        "A special getaway in the style of grand aristocratic traditions",
});

export default function EnAristocraticSpb() {
    return <AristocraticSpbPage locale="en" />;
}
