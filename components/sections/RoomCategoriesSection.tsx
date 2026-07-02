"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import { SquareIcon, UserIcon } from "@/components/ui/icons";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { AllRooms } from "@/data/RoomsData";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

const sectionCopy = {
    ru: {
        title: "Категории номеров",
        all: "Все категории",
        allDesktop: "Все категории номеров",
        book: "Забронировать",
        more: "Подробнее",
    },
    en: {
        title: "Room categories",
        all: "All categories",
        allDesktop: "All room categories",
        book: "Book now",
        more: "Details",
    },
} as const;

export default function RoomCategoriesSection() {
    const locale = useLocale();
    const rooms = AllRooms[locale];
    const copy = sectionCopy[locale];
    const trackRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef(0);
    const programmaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const roomHref = (slug: string, isHistorical: boolean) =>
        localizeHref(
            isHistorical ? `/rooms/historical/${slug}/` : `/rooms/${slug}/`,
            locale,
        );

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

    return (
        <section className="bg-[#ededeb] py-10 xl:py-16">
            <div className="mx-auto max-w-7xl px-6">
                <FadeUp>
                    <h2 className="text-center text-[#3d2b22]">{copy.title}</h2>
                </FadeUp>

                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar xl:mt-12"
                >
                    {rooms.map((room) => {
                        const href = roomHref(room.slug, room.isHistorical);
                        const bookingHref = localizeHref(
                            room.bookingUrl,
                            locale,
                        );
                        return (
                            <article
                                key={room.title}
                                className="flex min-w-full snap-start flex-col overflow-hidden rounded-[4px] bg-white xl:flex-row"
                            >
                                {/* Изображение */}
                                <div className="relative min-h-[220px] w-full flex-1 overflow-hidden xl:aspect-auto xl:w-1/2 xl:min-h-0 xl:flex-none">
                                    <Image
                                        src={room.image.src}
                                        alt={room.image.alt}
                                        fill
                                        sizes="(max-width: 1200px) 90vw, 640px"
                                        className="object-cover"
                                    />
                                </div>

                                {/* Контент */}
                                <div className="flex flex-col items-center px-4 pt-7 pb-8 text-center xl:flex-1 xl:items-start xl:justify-center xl:px-12 xl:py-10 xl:text-left">
                                    <div className="flex w-full flex-col items-center gap-4 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
                                        <h3 className="font-history text-xl uppercase leading-tight text-[#372a24] xl:text-3xl">
                                            {room.title}
                                        </h3>
                                        <div className="hidden shrink-0 items-center gap-3 rounded-[4px] border border-[#372a24]/15 px-3.5 py-2 text-xs text-[#372a24]/80 xl:flex">
                                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                                                <SquareIcon
                                                    size={13}
                                                    color="#372a24"
                                                />
                                                {room.area}
                                            </span>
                                            <span className="h-4 w-px bg-[#372a24]/15" />
                                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                                                <UserIcon
                                                    size={11}
                                                    color="#372a24"
                                                />
                                                {room.guests}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-4 max-w-md text-sm leading-6 text-[#372a24] xl:mt-6 xl:max-w-lg xl:text-base">
                                        {room.description}
                                    </p>

                                    {/* Характеристики (моб.: над кнопкой) */}
                                    <div className="mt-6 flex items-center gap-6 xl:hidden">
                                        <span className="flex items-center gap-2 text-xs text-[#372a24]">
                                            <SquareIcon
                                                size={16}
                                                color="#372a24"
                                            />
                                            {room.area}
                                        </span>
                                        <span className="flex items-center gap-2 text-xs text-[#372a24]">
                                            <UserIcon
                                                size={13}
                                                color="#372a24"
                                            />
                                            {room.guests}
                                        </span>
                                    </div>

                                    <div className="mt-7 flex w-full flex-col items-center gap-2 sm:flex-row xl:mt-9 xl:w-auto xl:items-center">
                                        <Button
                                            href={bookingHref}
                                            size="lg"
                                            className="w-full sm:w-auto xl:px-10 xl:py-3 xl:text-base"
                                        >
                                            {copy.book}
                                        </Button>
                                        <Button
                                            href={href}
                                            variant="primary-outline"
                                            size="lg"
                                            className="w-full sm:w-auto xl:px-10 xl:py-3 xl:text-base"
                                        >
                                            {copy.more}
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 xl:mt-10">
                    <button
                        type="button"
                        aria-label="Previous"
                        onClick={() => go(-1)}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white"
                    >
                        <ArrowLeftIcon size={20} weight="light" />
                    </button>
                    <Link
                        href={localizeHref("/rooms/", locale)}
                        className="flex h-12 items-center justify-center rounded-full bg-white px-7 text-xs uppercase tracking-widest text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white"
                    >
                        <span className="xl:hidden">{copy.all}</span>
                        <span className="hidden xl:inline">
                            {copy.allDesktop}
                        </span>
                    </Link>
                    <button
                        type="button"
                        aria-label="Next"
                        onClick={() => go(1)}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white"
                    >
                        <ArrowRightIcon size={20} weight="light" />
                    </button>
                </div>
            </div>
        </section>
    );
}
