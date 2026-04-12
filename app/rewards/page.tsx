import type { Metadata } from "next";
import RewardsPage from "@/components/pages/RewardsPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Программа лояльности — ACADEMIA Особняк Шувалова",
    description:
        "Программа лояльности ACADEMIA REWARDS с привилегиями для гостей отелей сети ACADEMIA",
    alternates: getLocaleAlternates("/rewards/", "ru"),
};

export default function Rewards() {
    return <RewardsPage locale="ru" />;
}
