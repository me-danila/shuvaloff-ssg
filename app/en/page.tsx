import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/",
    title: "ACADEMIA Mansion Shuvaloff Hotel — Saint Petersburg",
    description:
        "An elegant hotel in a restored 19th-century mansion in central Saint Petersburg",
});

export default function EnPage() {
    return (
        <div className="v2-fonts">
            <HomePage locale="en" />
        </div>
    );
}
