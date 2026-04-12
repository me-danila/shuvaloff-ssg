import type { Metadata } from "next";
import TransferPage from "@/components/pages/TransferPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Transfer — ACADEMIA Shuvaloff Mansion",
    description: "Individual executive transfer to ACADEMIA Shuvaloff Mansion",
    alternates: getLocaleAlternates("/services/transfer/", "en"),
};

export default function EnTransfer() {
    return <TransferPage locale="en" />;
}
