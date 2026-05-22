"use client";

import { useEffect } from "react";

export default function TravelLineBookingForm() {
    useEffect(() => {
        document
            .querySelector(
                'script[src="/scripts/travelline.js"][data-tl-booking]',
            )
            ?.remove();

        const script = document.createElement("script");
        script.src = "/scripts/travelline.js";
        script.async = true;
        script.dataset.tlBooking = "reload";
        document.head.appendChild(script);
    }, []);

    return (
        <section
            id="tl-booking-form"
            className="max-w-xl:px-4 xl:w-full xl:mx-auto xl:max-w-6xl"
            suppressHydrationWarning
        />
    );
}
