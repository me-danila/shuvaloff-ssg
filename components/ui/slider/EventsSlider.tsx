"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useMemo, useRef, useState } from "react";
import CardEvent from "@/components/ui/CardEvent";
import type { EventCard } from "@/data/EventsData";

type EventsSliderProps = {
    /** Карточки-даты (одна на дату); прошедшие отфильтруются внутри. */
    cards: EventCard[];
};

export default function EventsSlider({ cards }: EventsSliderProps) {
    // Прошедшие даты скрываем — как в гриде на /events/.
    const events = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return cards.filter((c) => new Date(c.start) >= today);
    }, [cards]);

    const trackRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef(0);
    const programmaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Стрелки только когда контент шире вьюпорта трека (есть куда листать).
    const [canScroll, setCanScroll] = useState(false);
    // biome-ignore lint/correctness/useExhaustiveDependencies: пересчёт нужен при смене набора карточек — ширина контента меняется без ресайза трека
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const update = () =>
            setCanScroll(track.scrollWidth - track.clientWidth > 1);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(track);
        return () => ro.disconnect();
    }, [events]);

    const step = () => {
        const track = trackRef.current;
        if (!track) return 0;
        const first = track.children[0] as HTMLElement | undefined;
        if (!first) return 0;
        return first.offsetWidth + 16; // gap-4
    };

    const maxIndex = () => {
        const track = trackRef.current;
        const s = step();
        if (!track || !s) return 0;

        return Math.max(
            0,
            Math.round((track.scrollWidth - track.clientWidth) / s),
        );
    };

    const scrollLeftForIndex = (index: number) => {
        const track = trackRef.current;
        const s = step();
        if (!track || !s) return 0;

        return Math.min(index * s, track.scrollWidth - track.clientWidth);
    };

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track || programmaticScrollRef.current) return;
        const s = step();
        if (!s) return;

        activeIndexRef.current = Math.min(
            maxIndex(),
            Math.max(0, Math.round(track.scrollLeft / s)),
        );
    };

    const go = (dir: -1 | 1) => {
        const track = trackRef.current;
        if (!track) return;

        const lastIndex = maxIndex();
        const current = Math.min(
            lastIndex,
            Math.max(0, activeIndexRef.current),
        );
        const next =
            dir === 1
                ? current >= lastIndex
                    ? 0
                    : current + 1
                : current <= 0
                  ? lastIndex
                  : current - 1;

        activeIndexRef.current = next;
        programmaticScrollRef.current = true;
        track.scrollTo({
            left: scrollLeftForIndex(next),
            behavior: "smooth",
        });

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            programmaticScrollRef.current = false;
        }, 450);
    };

    if (events.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            <div
                ref={trackRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar"
            >
                {events.map((event) => (
                    <div
                        key={`${event.slug}-${event.start}`}
                        className="flex min-w-full max-w-full snap-start xl:min-w-[calc(33.333%-0.667rem)] xl:max-w-[calc(33.333%-0.667rem)]"
                    >
                        <CardEvent event={event} />
                    </div>
                ))}
            </div>

            {canScroll && (
                <div className="mt-4 flex items-center justify-center gap-6 xl:mt-6">
                    <button
                        type="button"
                        aria-label="Previous"
                        onClick={() => go(-1)}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white"
                    >
                        <ArrowLeftIcon size={20} weight="light" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next"
                        onClick={() => go(1)}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white"
                    >
                        <ArrowRightIcon size={20} weight="light" />
                    </button>
                </div>
            )}
        </div>
    );
}
