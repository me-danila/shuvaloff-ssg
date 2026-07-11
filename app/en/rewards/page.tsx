import type { Metadata } from "next";
import RewardsPage from "@/components/pages/RewardsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/rewards/",
    title: "Loyalty Program — ACADEMIA Mansion Shuvaloff",
    description:
        "The ACADEMIA REWARDS loyalty program with special privileges for guests of ACADEMIA hotels.",
});

export default function Rewards() {
    return <RewardsPage locale="en" />;
}
