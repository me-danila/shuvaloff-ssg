"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/useLocale";

const COPY = {
    ru: {
        loading: "Загружаем форму бронирования…",
        errorTitle: "Не удалось загрузить форму бронирования",
        errorBody:
            "Проверьте подключение к интернету и обновите страницу или свяжитесь с нами по телефону.",
        retry: "Обновить страницу",
    },
    en: {
        loading: "Loading the booking form…",
        errorTitle: "The booking form failed to load",
        errorBody:
            "Please check your connection and refresh the page, or contact us by phone.",
        retry: "Refresh the page",
    },
} as const;

// Запасное сообщение показываем, если виджет так и не отрисовался.
// TL-загрузчик (public/scripts/travelline.js) сам делает до 3 ретраев
// с задержкой 2500 мс (~7,5 c плюс сеть), поэтому берём с запасом.
const LOAD_TIMEOUT_MS = 15000;

type Status = "loading" | "ready" | "error";

// Тот же критерий «виджет отрисован», что и в public/scripts/travelline.js
// (isContainerFilled): у контейнера появились дети и это не текст-заглушка
// «TravelLine». Наблюдаем за контейнером, НЕ вмешиваясь в монтирование TL.
function isWidgetFilled(el: HTMLElement | null): boolean {
    if (!el) return false;
    const text = (el.textContent || "").replace(/\s+/g, "");
    return el.children.length > 0 && text !== "TravelLine";
}

export default function BookingForm() {
    const locale = useLocale();
    const t = COPY[locale] ?? COPY.ru;
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<Status>("loading");

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Виджет мог уже отрисоваться до запуска эффекта:
        // defer-скрипт travelline.js или клиентская навигация.
        if (isWidgetFilled(container)) {
            setStatus("ready");
            return;
        }

        setStatus("loading");

        let settled = false;
        let pollId = 0;
        let timeoutId = 0;

        // Снимаем скелетон, как только TL встроил виджет. Детект делаем ДВУМЯ
        // способами: MutationObserver (мгновенно) И короткий polling. Polling —
        // страховка от гонок: на мобиле главной слот бронирования пересоздаётся
        // при гидратации (desktop→mobile), а при SPA-навигации observer может
        // не поймать вставку iframe — тогда скелетон залипал поверх рабочего
        // модуля (модуль через который идут продажи). Только читаем DOM, внутрь
        // #tl-search-form не вмешиваемся.
        const markReady = () => {
            if (settled || !isWidgetFilled(container)) return;
            settled = true;
            window.clearInterval(pollId);
            window.clearTimeout(timeoutId);
            observer.disconnect();
            setStatus("ready");
        };

        const observer = new MutationObserver(markReady);
        observer.observe(container, {
            childList: true,
            subtree: true,
            characterData: true,
        });
        pollId = window.setInterval(markReady, 300);

        timeoutId = window.setTimeout(() => {
            // Виджет так и не встроился — запасное сообщение. Observer остаётся
            // активным: если TL догрузится позже, ошибка сменится на виджет.
            window.clearInterval(pollId);
            if (!settled) setStatus("error");
        }, LOAD_TIMEOUT_MS);

        return () => {
            window.clearInterval(pollId);
            window.clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, []);

    const handleRetry = () => {
        // Полная перезагрузка — самый надёжный ретрай: внешний TL-загрузчик
        // читает состояние при загрузке страницы и заново встраивает виджет.
        window.location.reload();
    };

    return (
        <section
            id="block-search"
            className="relative w-full max-w-7xl mx-auto xl:bg-brand-light rounded min-h-[200px] xl:min-h-[92px]"
            aria-busy={status === "loading"}
            suppressHydrationWarning
        >
            {/* Точка монтирования TL — всегда в DOM, всегда пустая для загрузчика */}
            <div
                ref={containerRef}
                id="tl-search-form"
                className="px-6"
                suppressHydrationWarning
            />

            {status === "loading" && (
                <div
                    className="absolute inset-0 flex items-center rounded bg-brand-light px-6"
                    aria-hidden="true"
                >
                    <div className="w-full animate-pulse motion-reduce:animate-none">
                        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-3">
                            <div className="h-14 flex-1 rounded bg-brand-brown/10 xl:h-12" />
                            <div className="h-14 flex-1 rounded bg-brand-brown/10 xl:h-12" />
                            <div className="h-14 flex-1 rounded bg-brand-brown/10 xl:h-12" />
                            <div className="h-12 rounded bg-brand-brown/20 xl:h-12 xl:w-36" />
                        </div>
                    </div>
                    {/* <output> несёт неявные role="status" + aria-live="polite" */}
                    <output className="sr-only">{t.loading}</output>
                </div>
            )}

            {status === "error" && (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded bg-brand-light px-6 py-6 text-center"
                    role="alert"
                >
                    <p className="font-semibold text-brand-brown">
                        {t.errorTitle}
                    </p>
                    <p className="max-w-md text-sm text-brand-brown/70">
                        {t.errorBody}
                    </p>
                    <button
                        type="button"
                        onClick={handleRetry}
                        className="mt-2 rounded bg-brand-red px-5 py-2 text-sm text-white transition-colors hover:bg-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                    >
                        {t.retry}
                    </button>
                </div>
            )}
        </section>
    );
}
