import type { Metadata } from "next";
import EventsPage, { EVENTS_HERO_IMAGE } from "@/components/pages/EventsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/events/",
    title: "Афиша мероприятий — ACADEMIA Особняк Шувалова",
    description:
        "Приглашаем вас на мероприятия в особняке Шувалова в центре Санкт-Петербурга.",
    ogImage: EVENTS_HERO_IMAGE,
});

export default function Events() {
    return <EventsPage locale="ru" />;
}
