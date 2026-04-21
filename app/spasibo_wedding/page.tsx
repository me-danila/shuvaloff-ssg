import type { Metadata } from "next";
import SpasiboWeddingPage from "@/components/pages/SpasiboWeddingPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Спасибо за вашу заявку! — ACADEMIA Особняк Шувалова",
    description: "Наш менеджер свяжется с вами в ближайшее время",
    alternates: getLocaleAlternates("/spasibo_wedding/", "ru"),
};

export default function SpasiboWedding() {
    return <SpasiboWeddingPage locale="ru" />;
}
