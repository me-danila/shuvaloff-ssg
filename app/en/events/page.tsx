import type { Metadata } from "next";
import EventsPage from "@/components/pages/EventsPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Events — ACADEMIA Mansion Shuvaloff",
    description:
        "We invite you to events at the Shuvaloff Mansion in central Saint Petersburg.",
    alternates: getLocaleAlternates("/events/", "en"),
};

export default function Events() {
    return <EventsPage locale="en" />;
}
