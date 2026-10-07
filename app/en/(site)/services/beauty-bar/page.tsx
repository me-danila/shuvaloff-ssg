import type { Metadata } from "next";
import BeautyBarPage from "@/components/pages/BeautyBarPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/services/beauty-bar/",
    title: "Beauty & Health Devices — ACADEMIA Shuvaloff Mansion",
    description:
        "Make your stay even more pleasant — order beauty and health devices from the GESS brand to your room",
});

export default function EnBeautyBar() {
    return <BeautyBarPage locale="en" />;
}
