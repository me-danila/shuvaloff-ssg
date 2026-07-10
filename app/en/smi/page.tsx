import type { Metadata } from "next";
import SmiPage from "@/components/pages/SmiPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/smi/",
    title: "Media About Us — ACADEMIA Shuvaloff Mansion",
    description: "Media publications about ACADEMIA Shuvaloff Mansion hotel",
});

export default function EnSmi() {
    return <SmiPage locale="en" />;
}
