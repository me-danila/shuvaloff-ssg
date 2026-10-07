import type { Metadata } from "next";
import NationalAward2026Page from "@/components/pages/NationalAward2026Page";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/national-award-2026/",
    title: "Nomination for «Best Boutique Hotel 2026» — ACADEMIA Mansion Shuvaloff",
    description:
        "Shuvaloff Mansion is nominated for «Best Boutique Hotel 2026» at the National Hotel Award. Support us with your vote!",
});

export default function NationalAward2026() {
    return <NationalAward2026Page locale="en" />;
}
