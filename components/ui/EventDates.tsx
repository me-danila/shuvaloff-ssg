"use client";

import { useMemo } from "react";
import { getEventOccurrences } from "@/data/EventsData";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
    dates: string[];
    locale: Locale;
    title: string;
};

/**
 * Блок ближайших дат мероприятия. Прошедшие даты скрываем (сравнение с началом
 * сегодня — как в гриде на /events/). Если предстоящих дат нет — блок не рендерим.
 */
export default function EventDates({ dates, locale, title }: Props) {
    const upcoming = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return getEventOccurrences(dates, locale).filter(
            (o) => new Date(o.start) >= today,
        );
    }, [dates, locale]);

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
