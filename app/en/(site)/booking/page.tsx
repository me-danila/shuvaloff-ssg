import type { Metadata } from "next";
import BookingPage from "@/components/pages/BookingPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/booking/",
    title: "Room Booking — ACADEMIA Mansion Shuvaloff",
    description:
        "Best price guarantee when booking rooms at ACADEMIA Mansion Shuvaloff on the official website",
});

export default function EnBooking() {
    return <BookingPage locale="en" />;
}
