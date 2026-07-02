"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { detectLocaleFromPath } from "@/lib/i18n/routing";

declare global {
    interface Window {
        __academiaTravelLine?: {
            refresh: (locale?: "ru" | "en") => void;
            init: (locale?: "ru" | "en") => void;
        };
    }
}

const TRAVELLINE_CONTAINER_SELECTOR = [
    "#tl-booking-form",
    "#tl-search-form",
    "#tl-reputation-widget",
    "#tl-reviews-widget",
].join(",");

export default function TravelLineManager() {
    const pathname = usePathname() || "/";

    useEffect(() => {
        const locale = detectLocaleFromPath(pathname);
        window.__academiaTravelLine?.refresh(locale);

        const observer = new MutationObserver((mutations) => {
            const hasTravelLineContainer = mutations.some((mutation) => {
                return Array.from(mutation.addedNodes).some((node) => {
                    if (!(node instanceof Element)) return false;

                    return (
                        node.matches(TRAVELLINE_CONTAINER_SELECTOR) ||
                        Boolean(
                            node.querySelector(TRAVELLINE_CONTAINER_SELECTOR),
                        )
                    );
                });
            });

            if (hasTravelLineContainer) {
                window.__academiaTravelLine?.refresh(locale);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
        };
    }, [pathname]);

    return null;
}
