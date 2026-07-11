import type { Metadata } from "next";
import ReferralPage from "@/components/pages/ReferralPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/rewards/referral/",
    title: "Реферальная программа привилегий — ACADEMIA Особняк Шувалова",
    description:
        "Каждый участник программы привилегий ACADEMIA REWARDS может приглашать друзей присоединиться к программе и получать за это приятные бонусы для обоих.",
});

export default function Referral() {
    return <ReferralPage locale="ru" />;
}
