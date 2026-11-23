"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { getEventCards, getUpcomingEventCards } from "@/data/EventsData";
import { getEventToday } from "@/lib/eventDates";
import type { Locale } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

const MONTHS_NOMINATIVE: Record<Locale, string[]> = {
    ru: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ],
    en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
};

// Префикс заголовка — показывается только на мобилке.
const TITLE_PREFIX: Record<Locale, string> = {
    ru: "Календарь мероприятий",
    en: "Events calendar",
};

const NEW_YEAR_EVENT_SLUG = "new-year-2027";

// aria-label для кнопок переключения месяца.
const NAV_ARIA: Record<Locale, { prev: string; next: string }> = {
    ru: { prev: "Предыдущий месяц", next: "Следующий месяц" },
    en: { prev: "Previous month", next: "Next month" },
};

// Неделя начинается с понедельника.
const WEEKDAYS: Record<Locale, string[]> = {
    ru: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
    en: ["mo", "tu", "we", "th", "fr", "sa", "su"],
};

/** Строит сетку 6×7 для месяца, неделя с понедельника. */
function buildGrid(year: number, month: number) {
    // getDay(): 0=вс..6=сб → приводим к пн=0..вс=6
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    return Array.from(
        { length: 42 },
        (_, index) => new Date(year, month, index - firstWeekday + 1),
    );
}

function scrollToEvent(selector: string) {
    document.querySelector(selector)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        block: "start",
        inline: "start",
    });
}

function canGoBack(year: number, month: number) {
    return (
        `${year}-${String(month + 1).padStart(2, "0")}` >
        getEventToday().slice(0, 7)
    );
}

export default function EventsCalendar() {
    const locale = useLocale();

    const { eventDates, firstUpcoming, today, hasNewYearEvent } =
        useMemo(() => {
            const cards = getEventCards(locale);
            const upcoming = getUpcomingEventCards(cards);
            const today = getEventToday();
            return {
                today,
                hasNewYearEvent: upcoming.some(
                    ({ slug }) => slug === NEW_YEAR_EVENT_SLUG,
                ),
                eventDates: new Set(
                    cards.map(({ start }) => start.slice(0, 10)),
                ),
                firstUpcoming: upcoming[0]?.start,
            };
        }, [locale]);

    // Стартовый месяц — месяц ближайшего предстоящего мероприятия (как в
    // EventsGrid: старт не раньше начала сегодня). Если в текущем месяце
    // актуальных нет, календарь сразу открывается на следующем с событиями.
    const [view, setView] = useState(() => {
        const base = new Date(firstUpcoming ?? `${today}T12:00`);
        return { year: base.getFullYear(), month: base.getMonth() };
    });

    const cells = buildGrid(view.year, view.month);
    const monthKey = `${view.year}-${String(view.month + 1).padStart(2, "0")}`;

    const shift = (dir: -1 | 1) => {
        if (dir === -1 && !canGoBack(view.year, view.month)) return;
        const next = new Date(view.year, view.month + dir, 1);
        const year = next.getFullYear();
        const month = next.getMonth();
        setView({ year, month });

        if (!window.matchMedia("(min-width: 80rem)").matches) return;
        const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
        scrollToEvent(`[data-event-date^="${monthKey}-"]`);
    };

    return (
        <>
            <div className="rounded-2xl bg-white p-6 xl:rounded-[4px] xl:p-8">
                <div className="mb-6 flex items-center justify-between">
                    <button
                        type="button"
                        aria-label={NAV_ARIA[locale].prev}
                        disabled={!canGoBack(view.year, view.month)}
                        onClick={() => shift(-1)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-brand-brown/60 transition-colors enabled:hover:bg-stone-100 enabled:hover:text-brand-brown disabled:cursor-default disabled:opacity-30"
                    >
                        <CaretLeftIcon size={18} weight="bold" />
                    </button>
                    <span className="px-2 text-center font-history text-lg font-semibold uppercase tracking-wide text-brand-brown">
                        <span className="xl:hidden">
                            {TITLE_PREFIX[locale]}{" "}
                        </span>
                        {MONTHS_NOMINATIVE[locale][view.month]}
                    </span>
                    <button
                        type="button"
                        aria-label={NAV_ARIA[locale].next}
                        onClick={() => shift(1)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-brand-brown/60 transition-colors hover:bg-stone-100 hover:text-brand-brown"
                    >
                        <CaretRightIcon size={18} weight="bold" />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-y-2 text-center">
                    {WEEKDAYS[locale].map((wd) => (
                        <div
                            key={wd}
                            className="pb-2 text-xs uppercase text-brand-brown/30"
                        >
                            {wd}
                        </div>
                    ))}

                    {cells.map((date) => {
                        const day = date.getDate();
                        const inMonth = date.getMonth() === view.month;
                        const dateKey = `${monthKey}-${String(day).padStart(2, "0")}`;
                        const hasEvent = inMonth && eventDates.has(dateKey);
                        const isPast = dateKey < today;
                        const dayClass =
                            "flex h-9 w-9 items-center justify-center rounded-full text-sm";
                        return (
                            <div
                                key={date.getTime()}
                                className="flex items-center justify-center py-1"
                            >
                                {hasEvent ? (
                                    <button
                                        type="button"
                                        disabled={isPast}
                                        aria-label={date.toLocaleDateString(
                                            locale,
                                            { dateStyle: "long" },
                                        )}
                                        onClick={() =>
                                            scrollToEvent(
                                                `[data-event-date="${dateKey}"]`,
                                            )
                                        }
                                        className={`${dayClass} cursor-pointer bg-brand-red font-medium text-white transition-colors enabled:hover:bg-brand-red-dark disabled:cursor-default disabled:bg-brand-red/15 disabled:text-brand-red/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red`}
                                    >
                                        {day}
                                    </button>
                                ) : (
                                    <span
                                        className={`${dayClass} ${!inMonth ? "text-brand-brown/25" : isPast ? "text-brand-brown/50" : "text-brand-brown"}`}
                                    >
                                        {day}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {hasNewYearEvent && (
                <Button
                    variant="primary-outline"
                    className="mt-4 w-full"
                    onClick={() =>
                        scrollToEvent(
                            `[data-event-slug="${NEW_YEAR_EVENT_SLUG}"]`,
                        )
                    }
                >
                    {locale === "ru"
                        ? "Новогодние праздники"
                        : "New Year Holidays"}
                </Button>
            )}
        </>
    );
}
