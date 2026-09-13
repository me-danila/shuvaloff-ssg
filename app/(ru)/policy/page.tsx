import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/policy/",
    title: "Политика обработки персональных данных — ACADEMIA Особняк Шувалова",
    description:
        "Политика обработки персональных данных и условия конфиденциальности ACADEMIA Особняк Шувалова",
});

export default function Policy() {
    return <PolicyPage />;
}
