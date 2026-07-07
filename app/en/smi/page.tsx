import type { Metadata } from "next";
import SmiPage from "@/components/pages/SmiPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Media About Us — ACADEMIA Shuvaloff Mansion",
    description: "Media publications about ACADEMIA Shuvaloff Mansion hotel",
    alternates: getLocaleAlternates("/smi/", "en"),
};

export default function EnSmi() {
    return <SmiPage locale="en" />;
}
