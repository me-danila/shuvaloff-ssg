import type { Metadata } from "next";
import AllServicesPage from "@/components/pages/AllServicesPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/services/all/",
    title: "All Services — ACADEMIA Shuvaloff Mansion",
    description:
        "Full catalog of additional services and opportunities for guests of ACADEMIA Shuvaloff Mansion",
});

export default function EnAllServices() {
    return <AllServicesPage locale="en" />;
}
