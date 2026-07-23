import type { Metadata } from "next";
import PhotoShootPage from "@/components/pages/PhotoShootPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/photo-shoot/",
    title: "Фотосъёмка в исторических интерьерах особняка Шувалова",
    description:
        "Изысканный исторический антураж для ваших эффектных кадров в атмосфере графского особняка XIX века в центре Санкт-Петербурга.",
});

export default function PhotoShoot() {
    return <PhotoShootPage locale="ru" />;
}
