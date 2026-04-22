import type { Metadata } from "next";
import SubscriptionsPage from "@/components/pages/SubscriptionsPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Абонемент на проживание в отеле — ACADEMIA Особняк Шувалова",
    description:
        "Единый абонемент на несколько проживаний по фиксированной цене с гибкими датами заезда.",
    alternates: getLocaleAlternates("/abonements/", "ru"),
};

export default function Rewards() {
    return <SubscriptionsPage locale="ru" />;
}
