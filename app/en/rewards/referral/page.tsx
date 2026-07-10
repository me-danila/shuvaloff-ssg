import type { Metadata } from "next";
import ReferralPage from "@/components/pages/ReferralPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/rewards/referral/",
    title: "Referral Rewards Program — ACADEMIA Mansion SHUVALOFF",
    description:
        "Every member of the ACADEMIA REWARDS loyalty program can invite friends to join the program and receive great rewards for both of you.",
});

export default function Referral() {
    return <ReferralPage locale="en" />;
}
