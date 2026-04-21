import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "ACADEMIA Mansion Shuvaloff Hotel — Saint Petersburg",
    description:
        "An elegant hotel in a restored 19th-century mansion in central Saint Petersburg",
    alternates: getLocaleAlternates("/", "en"),
};

export default function EnPage() {
    return <HomePage locale="en" />;
}
