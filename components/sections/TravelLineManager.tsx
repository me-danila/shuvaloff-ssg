"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { detectHtmlLang, type HtmlLang } from "@/lib/i18n/routing";

declare global {
    interface Window {
        __academiaTravelLine?: {
            refresh: (locale?: HtmlLang) => void;
            init: (locale?: HtmlLang) => void;
        };
    }
}

const TRAVELLINE_CONTAINER_SELECTOR = [
    "#tl-booking-form",
    "#tl-search-form",
    "#tl-reputation-widget",
    "#tl-reputation-widget-mobile",
    "#tl-reviews-widget",
].join(",");

export default function TravelLineManager() {
    const pathname = usePathname() || "/";

    useEffect(() => {
        // Язык виджетов = язык страницы: на лендингах /it/, /de/, … TravelLine
        // открывается на языке лендинга, а не на английском.
        const locale = detectHtmlLang(pathname);
        const onReady = () => {
            window.__academiaTravelLine?.refresh(locale);
        };

        if (window.__academiaTravelLine) {
            onReady();
        } else {
            // travelline.js (defer) может выполниться позже гидрации
            window.addEventListener("academia:tl-ready", onReady, {
                once: true,
            });
        }

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
            window.removeEventListener("academia:tl-ready", onReady);
            observer.disconnect();
        };
    }, [pathname]);

    return null;
}
