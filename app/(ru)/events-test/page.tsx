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
            heroSrc="https://academia.spb.ru/wp-content/uploads/2026/10/%D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D0%B0%D0%BB%D0%BE%D0%BD_%D0%B2_%D0%B1%D1%83%D0%BC%D0%B0%D0%B6%D0%BD%D0%BE%D0%BC_%D0%BA%D0%BE%D0%BB%D0%BB%D0%B0%D0%B6%D0%B5.png"
        />
    );
}
