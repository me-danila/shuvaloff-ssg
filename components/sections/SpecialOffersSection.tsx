"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { AllSales } from "@/data/SalesData";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

const sectionCopy = {
    ru: {
        title: "Специальные предложения",
        book: "Забронировать",
        more: "Подробнее",
    },
    en: { title: "Special Offers", book: "Book now", more: "Details" },
} as const;

const renderSaleSubtitle = (subtitle: string) => {
    if (
        subtitle ===
        "Специальные привилегии для именинников и скидка 15% от 2 ночей"
    ) {
        return (
            <>
                Специальные привилегии для именинников
                <br />и скидка 15% от 2 ночей
            </>
        );
    }

    return subtitle;
};

export default function SpecialOffersSection() {
    const locale = useLocale();
    const sales = AllSales[locale];
    const copy = sectionCopy[locale];
    const trackRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef(0);
    const programmaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        <section className="-mt-6 bg-[#ededeb] py-10 xl:py-16">
            <div className="mx-auto max-w-7xl px-6">
                <FadeUp>
                    <h2 className="text-center text-[#3d2b22]">{copy.title}</h2>
                </FadeUp>

                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar xl:mt-12"
                >
                    {sales.map((sale) => {
                        const isExternal = !sale.bookingUrl.startsWith("/");
                        const href = isExternal
                            ? sale.bookingUrl
                            : localizeHref(sale.bookingUrl, locale);
                        return (
                            <article
                                key={sale.title}
                                className="flex min-w-full snap-start flex-col overflow-hidden rounded-[4px] bg-white pb-7 text-center xl:min-w-[calc((100%-3rem)/4)]"
                            >
                                <h3 className="flex h-[6.5rem] items-start justify-center px-4 py-5 font-history text-xl uppercase leading-tight text-[#372a24] xl:text-[22px]">
                                    {sale.title}
                                </h3>
                                <div className="relative aspect-[16/11] w-full overflow-hidden">
                                    <Image
                                        src={sale.imgUrl}
                                        alt={sale.title}
                                        fill
                                        sizes="(max-width: 1200px) 90vw, 25vw"
                                        className="object-cover"
                                        style={
                                            sale.imgObjectPosition
                                                ? {
                                                      objectPosition:
                                                          sale.imgObjectPosition,
                                                  }
                                                : undefined
                                        }
                                    />
                                </div>
                                <p className="mt-5 flex-1 px-5 text-sm leading-6 text-[#372a24] xl:text-base">
                                    {renderSaleSubtitle(sale.subtitle)}
                                </p>
                                <div className="mt-6 px-5">
                                    <Button
                                        href={href}
                                        target={
                                            isExternal ? "_blank" : undefined
                                        }
                                        variant={
                                            isExternal
                                                ? "primary-outline"
                                                : "primary"
                                        }
                                        size="xl"
                                        className="xl:px-8 xl:py-3 xl:text-base"
                                    >
                                        {isExternal ? copy.more : copy.book}
                                    </Button>
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
