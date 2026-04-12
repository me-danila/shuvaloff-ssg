import type { Metadata } from "next";
import BookingPage from "@/components/pages/BookingPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Room Booking — ACADEMIA Mansion Shuvaloff",
    description:
        "Best price guarantee when booking rooms at ACADEMIA Mansion Shuvaloff on the official website",
    alternates: getLocaleAlternates("/booking/", "en"),
};

export default function EnBooking() {
    return <BookingPage locale="en" />;
}
