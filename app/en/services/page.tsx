import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/services/",
    title: "Hotel Services — ACADEMIA Shuvaloff Mansion",
    description:
        "Additional services of ACADEMIA Shuvaloff Mansion: transfer, SPA, special services and personal relaxation options",
});

export default function EnServices() {
    return <ServicesPage locale="en" />;
}
