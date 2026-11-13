"use client";

import { useEffect, useState } from "react";
import { getEventOccurrences } from "@/data/EventsData";
import { getCurrentMonthEventDates } from "@/lib/eventDates";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
    dates: string[];
    locale: Locale;
    title: string;
};

/**
 * Блок ближайших дат мероприятия в текущем месяце по времени Санкт-Петербурга.
 * Прошедшие дни скрываем; сегодняшнее мероприятие оставляем до конца дня.
 * Дату определяем в браузере, чтобы статическая сборка не замораживала список.
 * Если предстоящих дат в этом месяце нет — блок не рендерим.
 */
export default function EventDates({ dates, locale, title }: Props) {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        const refresh = () => setNow(new Date());
        refresh();
        const interval = window.setInterval(refresh, 60_000);
        return () => window.clearInterval(interval);
    }, []);

    const upcoming = now
        ? getEventOccurrences(getCurrentMonthEventDates(dates, now), locale)
        : [];

    if (upcoming.length === 0) return null;

    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-history text-xl uppercase leading-tight text-[#372a24] xl:text-2xl">
                {title}
            </h2>
            <ul className="flex flex-col gap-1">
                {upcoming.map((o) => (
                    <li key={o.start} className="text-[#372a24]">
                        <time dateTime={o.start}>
                            {o.dateLabel}, {o.timeLabel}
                        </time>
                    </li>
                ))}
            </ul>
        </div>
    );
}
