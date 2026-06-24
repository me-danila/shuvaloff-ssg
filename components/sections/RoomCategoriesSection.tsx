"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRef, useState } from "react";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { SquareIcon, UserIcon } from "@/components/ui/icons";
import { AllRooms } from "@/data/RoomsData";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

const sectionCopy = {
    ru: { title: "Категории номеров", more: "Подробнее" },
    en: { title: "Room categories", more: "Details" },
} as const;

export default function RoomCategoriesSection() {
    const locale = useLocale();
    const rooms = AllRooms[locale];
    const copy = sectionCopy[locale];
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

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

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track) return;
        const s = step();
        if (s) setActive(Math.round(track.scrollLeft / s));
    };

    const go = (dir: -1 | 1) => {
        trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
    };

    const atStart = active <= 0;
    const atEnd = active >= rooms.length - 1;

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
                                    <h3 className="font-baskerville text-xl uppercase leading-tight text-[#372a24] xl:text-3xl">
                                        {room.title}
                                    </h3>
                                    <p className="mt-4 max-w-md text-sm leading-6 text-[#372a24] xl:mt-6 xl:max-w-lg xl:text-base">
                                        {room.description}
                                    </p>

                                    {/* Характеристики (моб.: над кнопкой) */}
                                    <div className="mt-6 flex items-center gap-6 xl:hidden">
                                        <span className="flex items-center gap-2 text-sm text-[#372a24]">
                                            <SquareIcon
                                                size={16}
                                                color="#372a24"
                                            />
                                            {room.area}
                                        </span>
                                        <span className="flex items-center gap-2 text-sm text-[#372a24]">
                                            <UserIcon size={13} color="#372a24" />
                                            {room.guests}
                                        </span>
                                    </div>

                                    {/* Кнопка + характеристики (десктоп) */}
                                    <div className="mt-7 flex w-full flex-col items-center gap-6 xl:mt-9 xl:w-auto xl:flex-row xl:items-center xl:gap-10">
                                        <Link
                                            href={href}
                                            className="inline-block w-full rounded-md bg-[#5c1f26] px-10 py-4 text-center text-sm uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#46161c] xl:w-auto xl:px-12 xl:text-base"
                                        >
                                            {copy.more}
                                        </Link>
                                        <div className="hidden items-center gap-8 xl:flex">
                                            <span className="flex items-center gap-2 text-base text-[#372a24]">
                                                <SquareIcon
                                                    size={18}
                                                    color="#372a24"
                                                />
                                                {room.area}
                                            </span>
                                            <span className="flex items-center gap-2 text-base text-[#372a24]">
                                                <UserIcon
                                                    size={15}
                                                    color="#372a24"
                                                />
                                                {room.guests}
                                            </span>
                                        </div>
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
                        disabled={atStart}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-stone-600 transition-colors hover:bg-stone-100 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-white"
                    >
                        <ArrowLeftIcon size={20} weight="light" />
                    </button>
                    <span className="text-sm tracking-widest text-stone-500 tabular-nums">
                        {active + 1} / {rooms.length}
                    </span>
                    <button
                        type="button"
                        aria-label="Next"
                        onClick={() => go(1)}
                        disabled={atEnd}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-stone-600 transition-colors hover:bg-stone-100 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-white"
                    >
                        <ArrowRightIcon size={20} weight="light" />
                    </button>
                </div>
            </div>
        </section>
    );
}
