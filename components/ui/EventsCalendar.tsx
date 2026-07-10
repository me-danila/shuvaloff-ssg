"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useMemo, useState } from "react";
import { getEventCards } from "@/data/EventsData";
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

type Cell = { day: number; inMonth: boolean; hasEvent: boolean };

/** Строит сетку 6×7 для месяца, неделя с понедельника. */
function buildGrid(
    year: number,
    month: number,
    eventDays: Set<number>,
): Cell[] {
    // getDay(): 0=вс..6=сб → приводим к пн=0..вс=6
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const cells: Cell[] = [];
    for (let i = 0; i < 42; i++) {
        const offset = i - firstWeekday;
        if (offset < 0) {
            cells.push({
                day: daysInPrev + offset + 1,
                inMonth: false,
                hasEvent: false,
            });
        } else if (offset >= daysInMonth) {
            cells.push({
                day: offset - daysInMonth + 1,
                inMonth: false,
                hasEvent: false,
            });
        } else {
            const day = offset + 1;
            cells.push({ day, inMonth: true, hasEvent: eventDays.has(day) });
        }
    }
    return cells;
}

export default function EventsCalendar() {
    const locale = useLocale();

    // Даты мероприятий по ключу "YYYY-M" → набор чисел месяца.
    const eventsByMonth = useMemo(() => {
        const map = new Map<string, Set<number>>();
        for (const { start } of getEventCards(locale)) {
            const [y, m, d] = start.split("T")[0].split("-").map(Number);
            const key = `${y}-${m - 1}`;
            if (!map.has(key)) map.set(key, new Set());
            map.get(key)?.add(d);
        }
        return map;
    }, [locale]);

    const [view, setView] = useState(() => {
        const now = new Date();
        return { year: now.getFullYear(), month: now.getMonth() };
    });

    const eventDays =
        eventsByMonth.get(`${view.year}-${view.month}`) ?? new Set<number>();
    const cells = useMemo(
        () => buildGrid(view.year, view.month, eventDays),
        [view.year, view.month, eventDays],
    );

    const shift = (dir: -1 | 1) => {
        setView((v) => {
            const total = v.year * 12 + v.month + dir;
            return { year: Math.floor(total / 12), month: total % 12 };
        });
    };

    return (
        <div className="rounded-2xl bg-white p-6 xl:rounded-[4px] xl:p-8">
            <div className="mb-6 flex items-center justify-between">
                <button
                    type="button"
                    aria-label={NAV_ARIA[locale].prev}
                    onClick={() => shift(-1)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-brand-brown/60 transition-colors hover:bg-stone-100 hover:text-brand-brown"
                >
                    <CaretLeftIcon size={18} weight="bold" />
                </button>
                <span className="px-2 text-center font-history text-lg font-semibold uppercase tracking-wide text-brand-brown">
                    <span className="xl:hidden">{TITLE_PREFIX[locale]} </span>
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

                {cells.map((cell) => (
                    <div
                        key={`${cell.inMonth ? "in" : "out"}-${cell.day}`}
                        className="flex items-center justify-center py-1"
                    >
                        <span
                            className={[
                                "flex h-9 w-9 items-center justify-center rounded-full text-sm",
                                cell.hasEvent
                                    ? "bg-brand-red font-medium text-white"
                                    : cell.inMonth
                                      ? "text-brand-brown"
                                      : "text-brand-brown/25",
                            ].join(" ")}
                        >
                            {cell.day}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
