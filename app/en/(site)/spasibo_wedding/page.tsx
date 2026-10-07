import type { Metadata } from "next";
import SpasiboWeddingPage from "@/components/pages/SpasiboWeddingPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/spasibo_wedding/",
    title: "Thank you for your request! — ACADEMIA Mansion Shuvaloff",
    description: "Our manager will contact you shortly",
});

export default function EnSpasiboWedding() {
    return <SpasiboWeddingPage locale="en" />;
}
