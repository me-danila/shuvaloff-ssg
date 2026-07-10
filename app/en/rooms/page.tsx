import type { Metadata } from "next";
import RoomsPage from "@/components/pages/RoomsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/rooms/",
    title: "Room Categories — ACADEMIA Mansion Shuvaloff",
    description:
        "Rooms and suites at ACADEMIA Mansion Shuvaloff in Saint Petersburg",
});

export default function RoomsEn() {
    return <RoomsPage locale="en" />;
}
