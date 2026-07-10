import type { Metadata } from "next";
import EventsPage from "@/components/pages/EventsPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Афиша мероприятий — ACADEMIA Особняк Шувалова",
    description:
        "Приглашаем вас на мероприятия в особняке Шувалова в центре Санкт-Петербурга.",
    alternates: getLocaleAlternates("/events/", "ru"),
};

export default function Events() {
    return <EventsPage locale="ru" />;
}
