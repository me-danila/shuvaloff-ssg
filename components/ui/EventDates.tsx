"use client";

import { useLayoutEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import ServiceOrderButton from "@/components/ui/modals/ServiceOrderButton";
import type { EventOccurrence } from "@/data/EventsData";
import { updateEventDateDisplay } from "@/lib/eventDateDisplay";
import { type Locale, localizeHref } from "@/lib/i18n/routing";
import { russianDisplayText } from "@/lib/typography";

const labels = {
    ru: {
        title: "Дата и время",
        other: "Другие даты",
        book: "Забронировать",
        dialog: "Забронировать мероприятие",
        empty: "Новых дат пока нет",
        events: "Посмотреть афишу",
    },
    en: {
        title: "Date and time",
        other: "Other dates",
        book: "Book now",
        dialog: "Book an event",
        empty: "No upcoming dates yet",
        events: "View events",
    },
};

type Props = {
    occurrences: EventOccurrence[];
    locale: Locale;
    eventTitle: string;
    bookingUrl?: string;
};

export default function EventDates({
    occurrences,
    locale,
    eventTitle,
    bookingUrl,
}: Props) {
    const copy = labels[locale];
    const root = useRef<HTMLDivElement>(null);
    const details = useRef<HTMLDetailsElement>(null);
    const selectedDates = useRef<HTMLUListElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: обновляем видимость после замены расписания при клиентской навигации.
    useLayoutEffect(() => {
        const refresh = () => {
            if (root.current) updateEventDateDisplay(root.current);
        };
        refresh();
        root.current?.setAttribute("data-hydrated", "");
        root.current?.dispatchEvent(new Event("schedule-ready"));
        window.addEventListener("popstate", refresh);
        window.addEventListener("pageshow", refresh);
        const interval = window.setInterval(refresh, 60_000);
        return () => {
            window.removeEventListener("popstate", refresh);
            window.removeEventListener("pageshow", refresh);
            window.clearInterval(interval);
        };
    }, [occurrences]);

    function select(dateParam: string) {
        const url = new URL(window.location.href);
        url.searchParams.set("date", dateParam);
        window.history.pushState(null, "", url);
        if (root.current) updateEventDateDisplay(root.current);
        if (details.current) {
            details.current.open = false;
            details.current
                .querySelector("summary")
                ?.focus({ preventScroll: true });
        }
    }

    return (
        <div id="event-schedule" ref={root}>
            <div data-schedule-available hidden suppressHydrationWarning>
                <div className="flex flex-col gap-2">
                    <h2 className="font-history text-xl uppercase leading-tight text-[#372a24] xl:text-2xl">
                        {copy.title}
                    </h2>
                    <ul
                        ref={selectedDates}
                        aria-live="polite"
                        className="flex flex-col gap-1"
                    >
                        {occurrences.map((o) => (
                            <li
                                key={o.start}
                                className="text-[#372a24]"
                                hidden
                                suppressHydrationWarning
                            >
                                <time dateTime={o.start}>
                                    {o.dateLabel}, {o.timeLabel}
                                </time>
                            </li>
                        ))}
                    </ul>
                    <details ref={details} hidden suppressHydrationWarning>
                        <summary className="w-fit cursor-pointer text-sm text-brand-brown underline decoration-brand-brown/40 underline-offset-4 hover:text-brand-red">
                            {copy.other}
                        </summary>
                        <ul className="mt-2 text-sm/5.5">
                            {occurrences.map((o) => (
                                <li
                                    key={o.start}
                                    className="inline"
                                    suppressHydrationWarning
                                >
                                    <a
                                        href={`?date=${encodeURIComponent(o.dateParam)}`}
                                        className="whitespace-nowrap hover:underline focus-visible:outline-brand-red"
                                        onClick={(e) => {
                                            if (
                                                e.metaKey ||
                                                e.ctrlKey ||
                                                e.shiftKey ||
                                                e.altKey
                                            )
                                                return;
                                            e.preventDefault();
                                            select(o.dateParam);
                                        }}
                                    >
                                        <time dateTime={o.start}>
                                            {o.dateLabel} {o.timeLabel}
                                        </time>
                                    </a>
                                    <span
                                        aria-hidden="true"
                                        suppressHydrationWarning
                                    >
                                        ,{" "}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </details>
                </div>
                <div className="mt-4 xl:mt-3">
                    {bookingUrl ? (
                        <Button
                            href={bookingUrl}
                            target={
                                bookingUrl.startsWith("http")
                                    ? "_blank"
                                    : undefined
                            }
                            size="xl"
                            className="self-start mt-3"
                        >
                            {copy.book}
                        </Button>
                    ) : (
                        <ServiceOrderButton
                            dialogTitle={copy.dialog}
                            dialogSummary={() => {
                                const title =
                                    locale === "ru"
                                        ? russianDisplayText(eventTitle)
                                        : eventTitle;
                                const date =
                                    selectedDates.current?.querySelector(
                                        "li:not([hidden]) time",
                                    )?.textContent;
                                return date
                                    ? `${title} ·\u00a0${date.replaceAll(" ", "\u00a0")}`
                                    : title;
                            }}
                            size="xl"
                            className="self-start mt-3"
                        >
                            {copy.book}
                        </ServiceOrderButton>
                    )}
                </div>
            </div>
            <div data-schedule-archive hidden suppressHydrationWarning>
                <p>{copy.empty}</p>
                <Button
                    href={localizeHref("/events/", locale)}
                    variant="primary-outline"
                    className="mt-4"
                >
                    {copy.events}
                </Button>
            </div>
        </div>
    );
}
