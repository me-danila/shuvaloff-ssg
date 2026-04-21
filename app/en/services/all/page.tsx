import type { Metadata } from "next";
import AllServicesPage from "@/components/pages/AllServicesPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "All Services — ACADEMIA Shuvaloff Mansion",
    description:
        "Full catalog of additional services and opportunities for guests of ACADEMIA Shuvaloff Mansion",
    alternates: getLocaleAlternates("/services/all/", "en"),
};

export default function EnAllServices() {
    return <AllServicesPage locale="en" />;
}
