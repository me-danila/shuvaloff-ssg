import type { Metadata } from "next";
import RewardsPage from "@/components/pages/RewardsPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Loyalty Program — ACADEMIA Mansion Shuvaloff",
    description:
        "The ACADEMIA REWARDS loyalty program with special privileges for guests of ACADEMIA hotels.",
    alternates: getLocaleAlternates("/rewards/", "en"),
};

export default function Rewards() {
    return <RewardsPage locale="en" />;
}
