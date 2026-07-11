import type { Metadata } from "next";
import AristocraticSpbPage from "@/components/pages/AristocraticSpbPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/aristocratic-spb/",
    title: "Графский Петербург — ACADEMIA Особняк Шувалова",
    description: "Особый отдых в формате пышных аристократических традиций",
});

export default function Meet() {
    return <AristocraticSpbPage locale="ru" />;
}
