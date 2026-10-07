"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";
import CardServiceBig from "@/components/ui/CardServiceBig";
import { SquareIcon } from "@/components/ui/icons";
import { FadeUp } from "@/components/ui/Motion";

export type LandingRoomCard = {
    title: string;
    text: string;
    image: { src: string; alt: string };
    area: string;
    href: string;
};

// Стрелки — как у «Мира ACADEMIA» на главной (HomeServicesSection).
const ARROW_CLASS =
    "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors duration-300 hover:bg-stone-200 active:bg-[#5c1f26] active:text-white";

/**
 * Лента категорий номеров по образцу «Мира ACADEMIA» на главной: карточки
 * CardServiceBig (название, фото, площадь, описание, «Забронировать»),
 * десктоп — 4 в ряд и листание стрелками по кругу, мобила — одна карточка
 * на экран, свайп со snap.
 */
export default function LandingRoomsCarousel({
    title,
    cards,
    labels,
}: {
    title: string;
    cards: LandingRoomCard[];
    labels: { book: string; prev: string; next: string };
}) {
    const trackRef = useRef<HTMLDivElement>(null);

    // Шаг на одну карточку; на краях — переход на другой конец ленты,
    // как у HomeServicesSection.
    const go = (dir: -1 | 1) => {
        const track = trackRef.current;
        const card = track?.firstElementChild as HTMLElement | null;
        if (!track || !card) return;
        const step = card.offsetWidth + 16; // gap-4
        const max = track.scrollWidth - track.clientWidth;
        const atStart = track.scrollLeft <= 1;
        const atEnd = track.scrollLeft >= max - 1;
        const left =
            dir === 1
                ? atEnd
                    ? 0
                    : track.scrollLeft + step
                : atStart
                  ? max
                  : track.scrollLeft - step;
        track.scrollTo({ left, behavior: "smooth" });
    };

    return (
        <section id="rooms" className="scroll-mt-16 py-10 xl:py-16">
            <div className="mx-6 flex flex-col gap-8 xl:mx-auto xl:w-full xl:max-w-7xl xl:gap-12">
                <FadeUp>
                    <h2 className="text-center text-[#3d2b22]">{title}</h2>
                </FadeUp>

                <div className="flex flex-col gap-4 xl:gap-6">
                    <div
                        ref={trackRef}
                        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
                    >
                        {cards.map((card) => (
                            <div
                                key={card.title}
                                className="flex min-w-full snap-start xl:min-w-[calc((100%-3rem)/4)]"
                            >
                                <CardServiceBig
                                    title={card.title}
                                    imgUrl={card.image.src}
                                    subtitle={card.text}
                                    href={card.href}
                                    ctaLabel={labels.book}
                                    backgroundClassName="bg-stone-100"
                                    meta={
                                        <span className="flex items-center gap-2">
                                            <SquareIcon
                                                size={13}
                                                color="#372a24"
                                            />
                                            {card.area}
                                        </span>
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 hidden items-center justify-center gap-6 xl:mt-6 xl:flex">
                        <button
                            type="button"
                            aria-label={labels.prev}
                            onClick={() => go(-1)}
                            className={ARROW_CLASS}
                        >
                            <ArrowLeftIcon size={20} weight="light" />
                        </button>
                        <button
                            type="button"
                            aria-label={labels.next}
                            onClick={() => go(1)}
                            className={ARROW_CLASS}
                        >
                            <ArrowRightIcon size={20} weight="light" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
