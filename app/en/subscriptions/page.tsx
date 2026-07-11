import type { Metadata } from "next";
import SubscriptionsPage from "@/components/pages/SubscriptionsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/subscriptions/",
    title: "Business accommodation subscription — ACADEMIA Mansion Shuvaloff",
    description:
        "A single subscription for several stays at a fixed price with flexible arrival dates.",
});

export default function Rewards() {
    return <SubscriptionsPage locale="en" />;
}
