import type { Metadata } from "next";
import AristocraticBreakfastPage from "@/components/pages/AristocraticBreakfastPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/services/aristocratic-breakfast/",
    title: "Aristocratic breakfast — ACADEMIA Mansion Shuvaloff",
    description:
        "Gastronomy as an art form. It’s tradition and history. It’s a morning you’ll remember for a long time!",
});

export default function AristocraticBreakfast() {
    return <AristocraticBreakfastPage locale="en" />;
}
