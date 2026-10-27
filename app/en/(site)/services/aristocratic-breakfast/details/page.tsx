import type { Metadata } from "next";
import AristocraticBreakfastPage from "@/components/pages/AristocraticBreakfastPage";
import { ARISTOCRATIC_BREAKFAST_PATH } from "@/data/aristocraticBreakfastPaths";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: ARISTOCRATIC_BREAKFAST_PATH,
    title: "Aristocratic breakfast — ACADEMIA Mansion Shuvaloff",
    description:
        "Gastronomy as an art form. It’s tradition and history. It’s a morning you’ll remember for a long time!",
});

export default function AristocraticBreakfast() {
    return <AristocraticBreakfastPage locale="en" />;
}
