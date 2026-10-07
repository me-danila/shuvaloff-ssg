"use client";

import { useSearchParams } from "next/navigation";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

/**
 * `bookingPath` — страница бронирования, на которую вести (по умолчанию
 * /booking/ текущей локали полного сайта; лендинги передают свою).
 */
export default function GeniusLink({
    bookingPath,
}: {
    bookingPath?: string;
} = {}) {
    const locale = useLocale();
    const params = new URLSearchParams(useSearchParams().toString());
    params.set("promo-code-plain", "genius");

    const handleClick = () => {
        window.location.href = `${
            bookingPath ?? localizeHref("/booking/", locale)
        }?${params.toString()}`;
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
