import type { Metadata } from "next";
import AristocraticBreakfastPage from "@/components/pages/AristocraticBreakfastPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Графский завтрак — ACADEMIA Особняк Шувалова",
    description:
        "Гастрономия как искусство. Это традиция и история. Это утро, которое вы запомните надолго!",
    alternates: getLocaleAlternates("/services/aristocratic-breakfast/", "ru"),
};

export default function AristocraticBreakfast() {
    return <AristocraticBreakfastPage locale="ru" />;
}
