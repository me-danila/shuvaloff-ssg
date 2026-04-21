import type { Metadata } from "next";
import SpasiboWeddingPage from "@/components/pages/SpasiboWeddingPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Thank you for your request! — ACADEMIA Mansion Shuvaloff",
    description: "Our manager will contact you shortly",
    alternates: getLocaleAlternates("/spasibo_wedding/", "en"),
};

export default function EnSpasiboWedding() {
    return <SpasiboWeddingPage locale="en" />;
}
