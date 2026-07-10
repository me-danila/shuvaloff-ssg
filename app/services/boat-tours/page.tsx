import type { Metadata } from "next";
import BoatToursPage from "@/components/pages/BoatToursPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/services/boat-tours/",
    title: "Водные прогулки и экскурсии — ACADEMIA Особняк Шувалова",
    description:
        "Есть особенная магия в облике Петербурга, когда смотришь на него с воды.",
});

export default function Meet() {
    return <BoatToursPage locale="ru" />;
}
