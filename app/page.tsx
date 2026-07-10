import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/",
    title: "Отель ACADEMIA Особняк Шувалова — Санкт-Петербург",
    description:
        "Отель в историческом особняке XIX века в центре Санкт-Петербурга",
});

export default function Page() {
    return (
        <div className="v2-fonts">
            <HomePage locale="ru" />
        </div>
    );
}
