import type { Metadata } from "next";
import BeautyBarPage from "@/components/pages/BeautyBarPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Beauty & Health Devices — ACADEMIA Shuvaloff Mansion",
    description:
        "Make your stay even more pleasant — order beauty and health devices from the GESS brand to your room",
    alternates: getLocaleAlternates("/services/beauty-bar/", "en"),
};

export default function EnBeautyBar() {
    return <BeautyBarPage locale="en" />;
}
