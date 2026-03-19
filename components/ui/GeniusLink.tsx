"use client";

import { useSearchParams } from "next/navigation";

export default function GeniusLink() {
    const params = new URLSearchParams(useSearchParams().toString());
    params.set("promo-code-plain", "genius");

    const handleClick = () => {
        window.location.href = `/booking?${params.toString()}`;
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="font-semibold underline cursor-pointer"
        >
            GENIUS
        </button>
    );
}
