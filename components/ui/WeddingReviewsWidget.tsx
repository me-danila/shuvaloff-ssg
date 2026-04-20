"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n/useLocale";

declare global {
    interface Window {
        myReviews: {
            BlockWidget: new (config: {
                uuid: string;
                name: string;
                additionalFrame: string;
                lang: string;
                widgetId: string;
            }) => { init: () => void };
        };
    }
}

export default function WeddingReviewsWidget() {
    const locale = useLocale();
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const tryInit = () => {
            const iframeReady = !!document.getElementById(
                "myReviews__block-widget",
            );
            const widgetReady = !!window.myReviews?.BlockWidget;

            if (!iframeReady || !widgetReady) {
                timerId.current = setTimeout(tryInit, 50);
                return;
            }

            new window.myReviews.BlockWidget({
                uuid: "80d132eb-c2a0-45cf-936e-cb27fd9a1c30",
                name: "g17255827",
                additionalFrame: "none",
                lang: locale,
                widgetId: "1",
            }).init();
        };

        const existingScript = document.getElementById("myreviews-script");

        if (existingScript) {
            tryInit();
        } else {
            const script = document.createElement("script");
            script.id = "myreviews-script";
            script.src = "https://myreviews.dev/widget/dist/index.js";
            script.defer = true;
            script.onload = tryInit;
            document.body.appendChild(script);
        }

        return () => {
            if (timerId.current) clearTimeout(timerId.current);
        };
    }, [locale]);

    return (
        <div className="flex justify-center mt-5">
            <iframe
                title={
                    locale === "ru"
                        ? "Виджет с отзывами «Карусель» от MyReviews"
                        : "MyReviews carousel widget"
                }
                id="myReviews__block-widget"
                style={{ width: "100%", maxWidth: 1170, border: "none" }}
            />
        </div>
    );
}
