import type { Metadata } from "next";
import RunPage from "@/components/pages/RunPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Your morning route with ACADEMIA philosophy — ACADEMIA Mansion Shuvaloff",
    description:
        "The city is still asleep, and you are already in motion. Quiet streets, rustling leaves, dawn reflections in the windows. The route passes through places where St. Petersburg is especially beautiful at this time",
    alternates: getLocaleAlternates("/run/", "en"),
};

export default function EnRun() {
    return <RunPage locale="en" />;
}
