import type { Metadata } from "next";
import EventsPage from "@/components/pages/EventsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

// Тестовый дубль /events/ с другой картинкой в hero. Не индексируется.
export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: "/events-test/",
        title: "Афиша мероприятий — ACADEMIA Особняк Шувалова",
        description:
            "Приглашаем вас на мероприятия в особняке Шувалова в центре Санкт-Петербурга.",
    }),
    robots: { index: false, follow: false },
};

export default function EventsTest() {
    return (
        <EventsPage
            locale="ru"
            heroSrc="https://academia.spb.ru/wp-content/uploads/2026/10/2-4.png"
        />
    );
}
