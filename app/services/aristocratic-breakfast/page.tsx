import type { Metadata } from "next";
import AristocraticBreakfastPage from "@/components/pages/AristocraticBreakfastPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/services/aristocratic-breakfast/",
    title: "Графский завтрак — ACADEMIA Особняк Шувалова",
    description:
        "Гастрономия как искусство. Это традиция и история. Это утро, которое вы запомните надолго!",
});

export default function AristocraticBreakfast() {
    return <AristocraticBreakfastPage locale="ru" />;
}
