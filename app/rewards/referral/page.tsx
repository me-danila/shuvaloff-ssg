import type { Metadata } from "next";
import ReferralPage from "@/components/pages/ReferralPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Реферальная программа привилегий — ACADEMIA Особняк Шувалова",
    description:
        "Каждый участник программы привилегий ACADEMIA REWARDS может приглашать друзей присоединиться к программе и получать за это приятные бонусы для обоих.",
    alternates: getLocaleAlternates("/referral/", "ru"),
};

export default function Referral() {
    return <ReferralPage locale="ru" />;
}
