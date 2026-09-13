import type { Metadata } from "next";
import ConsentPage from "@/components/pages/ConsentPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/consent/",
    title: "Согласие на рекламные и информационные рассылки — ACADEMIA Особняк Шувалова",
    description:
        "Согласие на получение рекламных и информационных рассылок ACADEMIA Особняк Шувалова",
});

export default function Consent() {
    return <ConsentPage />;
}
