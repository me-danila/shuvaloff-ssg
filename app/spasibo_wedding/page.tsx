import type { Metadata } from "next";
import SpasiboWeddingPage from "@/components/pages/SpasiboWeddingPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/spasibo_wedding/",
    title: "Спасибо за вашу заявку! — ACADEMIA Особняк Шувалова",
    description: "Наш менеджер свяжется с вами в ближайшее время",
});

export default function SpasiboWedding() {
    return <SpasiboWeddingPage locale="ru" />;
}
