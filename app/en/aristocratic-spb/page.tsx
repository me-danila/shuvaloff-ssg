import type { Metadata } from "next";
import AristocraticSpbPage from "@/components/pages/AristocraticSpbPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Aristocratic St. Petersburg — ACADEMIA Mansion Shuvaloff",
    description:
        "A special getaway in the style of grand aristocratic traditions",
    alternates: getLocaleAlternates("/aristocratic-spb/", "en"),
};

export default function EnAristocraticSpb() {
    return <AristocraticSpbPage locale="en" />;
}
