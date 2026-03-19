"use client";

import { useEffect } from "react";

export default function BookingForm() {
    useEffect(() => {
        document
            .querySelector('script[src="/scripts/travelline.js"][data-tl]')
            ?.remove();

        // if (window.travelline?.integration) {
        //     window.travelline.integration.__loader = false;
        // }

        const script = document.createElement("script");
        script.src = "/scripts/travelline.js";
        script.async = true;
        script.dataset.tl = "reload";
        document.head.appendChild(script);
    }, []);

    return (
        <section
            id="block-search"
            className="w-full max-w-6xl mx-auto xl:bg-brand-blue-100 rounded"
            suppressHydrationWarning
        >
            <div
                id="tl-search-form"
                className="px-6"
                suppressHydrationWarning
            />
        </section>
    );
}
