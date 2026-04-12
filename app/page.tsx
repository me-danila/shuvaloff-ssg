import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Отель ACADEMIA Особняк Шувалова — Санкт-Петербург",
    description:
        "Отель в историческом особняке XIX века в центре Санкт-Петербурга",
    alternates: getLocaleAlternates("/", "ru"),
};

export default function Page() {
    return <HomePage locale="ru" />;
}
