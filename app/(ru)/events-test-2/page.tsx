import type { Metadata } from "next";
import EventsPage from "@/components/pages/EventsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

// Тестовый дубль /events/ с другой картинкой в hero. Не индексируется.
export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: "/events-test-2/",
        title: "Афиша мероприятий — ACADEMIA Особняк Шувалова",
        description:
            "Приглашаем вас на мероприятия в особняке Шувалова в центре Санкт-Петербурга.",
    }),
    robots: { index: false, follow: false },
};

export default function EventsTest2() {
    return (
        <EventsPage
            locale="ru"
            heroSrc="https://academia.spb.ru/wp-content/uploads/2026/10/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%BD%D1%8B%D0%B9_%D1%81%D0%B0%D0%BB%D0%BE%D0%BD%D0%BD%D1%8B%D0%B9_%D0%B2%D0%B5%D1%87%D0%B5%D1%80_%D0%B7%D0%B0_%D1%81%D1%82%D0%BE%D0%BB%D0%BE%D0%BC.png"
        />
    );
}
