import type { Metadata } from "next";
import TransferPage from "@/components/pages/TransferPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Трансфер — ACADEMIA Особняк Шувалова",
    description:
        "Индивидуальный представительский трансфер в ACADEMIA Особняк Шувалова",
    alternates: getLocaleAlternates("/services/transfer/", "ru"),
};

export default function Transfer() {
    return <TransferPage locale="ru" />;
}
