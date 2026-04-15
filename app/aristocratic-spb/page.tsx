import type { Metadata } from "next";
import AristocraticSpbPage from "@/components/pages/AristocraticSpbPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Графский Петербург — ACADEMIA Особняк Шувалова",
    description: "Особый отдых в формате пышных аристократических традиций",
    alternates: getLocaleAlternates("/aristocratic-spb/", "ru"),
};

export default function Meet() {
    return <AristocraticSpbPage locale="ru" />;
}
