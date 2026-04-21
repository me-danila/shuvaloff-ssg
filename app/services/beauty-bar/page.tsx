import type { Metadata } from "next";
import BeautyBarPage from "@/components/pages/BeautyBarPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Девайсы для красоты и здоровья — ACADEMIA Особняк Шувалова",
    description:
        "Сделайте ваш отдых еще более приятным — закажите в номер девайсы для красоты и здоровья от бренда GESS",
    alternates: getLocaleAlternates("/services/beauty-bar/", "ru"),
};

export default function BeautyBar() {
    return <BeautyBarPage locale="ru" />;
}
