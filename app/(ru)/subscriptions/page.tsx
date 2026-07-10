import type { Metadata } from "next";
import SubscriptionsPage from "@/components/pages/SubscriptionsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/subscriptions/",
    title: "Абонемент на проживание в отеле — ACADEMIA Особняк Шувалова",
    description:
        "Единый абонемент на несколько проживаний по фиксированной цене с гибкими датами заезда.",
});

export default function Rewards() {
    return <SubscriptionsPage locale="ru" />;
}
