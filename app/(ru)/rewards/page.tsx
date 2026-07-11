import type { Metadata } from "next";
import RewardsPage from "@/components/pages/RewardsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/rewards/",
    title: "Программа лояльности — ACADEMIA Особняк Шувалова",
    description:
        "Программа лояльности ACADEMIA REWARDS с привилегиями для гостей отелей сети ACADEMIA",
});

export default function Rewards() {
    return <RewardsPage locale="ru" />;
}
