import type { Metadata } from "next";
import TransferPage from "@/components/pages/TransferPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/services/transfer/",
    title: "Трансфер — ACADEMIA Особняк Шувалова",
    description:
        "Индивидуальный представительский трансфер в ACADEMIA Особняк Шувалова",
});

export default function Transfer() {
    return <TransferPage locale="ru" />;
}
