import type { Metadata } from "next";
import AeroflotSalePage from "@/components/pages/AeroflotSalePage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/sales/aeroflot/",
    title: "Аэрофлот Бонус — ACADEMIA Особняк Шувалова",
    description:
        "Отдыхайте в Коллекции особняков ACADEMIA и копите мили «Аэрофлот Бонус» за каждую ночь проживания.",
});

export default function AeroflotSale() {
    return <AeroflotSalePage locale="ru" />;
}
