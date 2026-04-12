import type { Metadata } from "next";
import ConciergePage from "@/components/pages/ConciergePage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Concierge Service — ACADEMIA Shuvaloff Mansion",
    description:
        "Personal concierge service ACADEMIA Shuvaloff Mansion: organization of recreation, events, transfer and individual requests",
    alternates: getLocaleAlternates("/services/concierge/", "en"),
};

export default function EnConcierge() {
    return <ConciergePage locale="en" />;
}
