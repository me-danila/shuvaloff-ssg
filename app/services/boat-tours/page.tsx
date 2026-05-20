import type { Metadata } from "next";
import BoatToursPage from "@/components/pages/BoatToursPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Водные прогулки и экскурсии — ACADEMIA Особняк Шувалова",
    description:
        "Есть особенная магия в облике Петербурга, когда смотришь на него с воды.",
    alternates: getLocaleAlternates("/boat-tours/", "ru"),
};

export default function Meet() {
    return <BoatToursPage locale="ru" />;
}
