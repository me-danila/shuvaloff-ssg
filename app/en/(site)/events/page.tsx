import type { Metadata } from "next";
import EventsPage, { EVENTS_HERO_IMAGE } from "@/components/pages/EventsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/events/",
    title: "Events — ACADEMIA Mansion Shuvaloff",
    description:
        "We invite you to events at the Shuvaloff Mansion in central Saint Petersburg.",
    ogImage: EVENTS_HERO_IMAGE,
});

export default function Events() {
    return <EventsPage locale="en" />;
}
