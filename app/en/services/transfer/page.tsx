import type { Metadata } from "next";
import TransferPage from "@/components/pages/TransferPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/services/transfer/",
    title: "Transfer — ACADEMIA Shuvaloff Mansion",
    description: "Individual executive transfer to ACADEMIA Shuvaloff Mansion",
});

export default function EnTransfer() {
    return <TransferPage locale="en" />;
}
