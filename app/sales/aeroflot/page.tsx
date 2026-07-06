import type { Metadata } from "next";
import AeroflotSalePage from "@/components/pages/AeroflotSalePage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Аэрофлот Бонус — ACADEMIA Особняк Шувалова",
    description:
        "Отдыхайте в Коллекции особняков ACADEMIA и копите мили «Аэрофлот Бонус» за каждую ночь проживания.",
    alternates: getLocaleAlternates("/sales/aeroflot/", "ru"),
};

export default function AeroflotSale() {
    return <AeroflotSalePage locale="ru" />;
}
