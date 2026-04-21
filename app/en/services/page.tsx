import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Hotel Services — ACADEMIA Shuvaloff Mansion",
    description:
        "Additional services of ACADEMIA Shuvaloff Mansion: transfer, SPA, special services and personal relaxation options",
    alternates: getLocaleAlternates("/services/", "en"),
};

export default function EnServices() {
    return <ServicesPage locale="en" />;
}
