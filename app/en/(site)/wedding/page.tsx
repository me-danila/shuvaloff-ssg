import type { Metadata } from "next";
import WeddingPage from "@/components/pages/WeddingPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/wedding/",
    title: "Wedding Banquet at the Mansion Hotel in St. Petersburg",
    description:
        "Planning a wedding banquet in a special atmosphere? Our hotel in St. Petersburg offers the perfect venue for an intimate, stylish, and cozy wedding. Here you can order a wedding banquet with restaurant service, signature menu, and premium service.",
});

export default function EnWedding() {
    return <WeddingPage locale="en" />;
}
