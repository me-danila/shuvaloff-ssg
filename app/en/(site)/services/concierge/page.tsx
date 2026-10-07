import type { Metadata } from "next";
import ConciergePage from "@/components/pages/ConciergePage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/services/concierge/",
    title: "Concierge Service — ACADEMIA Shuvaloff Mansion",
    description:
        "Personal concierge service ACADEMIA Shuvaloff Mansion: organization of recreation, events, transfer and individual requests",
});

export default function EnConcierge() {
    return <ConciergePage locale="en" />;
}
