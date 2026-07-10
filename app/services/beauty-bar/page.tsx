import type { Metadata } from "next";
import BeautyBarPage from "@/components/pages/BeautyBarPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/services/beauty-bar/",
    title: "Девайсы для красоты и здоровья — ACADEMIA Особняк Шувалова",
    description:
        "Сделайте ваш отдых еще более приятным — закажите в номер девайсы для красоты и здоровья от бренда GESS",
});

export default function BeautyBar() {
    return <BeautyBarPage locale="ru" />;
}
