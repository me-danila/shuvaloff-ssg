"use client";

import { useSearchParams } from "next/navigation";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

export default function GeniusLink() {
    const locale = useLocale();
    const params = new URLSearchParams(useSearchParams().toString());
    params.set("promo-code-plain", "genius");

    const handleClick = () => {
        window.location.href = localizeHref(
            `/booking/?${params.toString()}`,
            locale,
        );
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
