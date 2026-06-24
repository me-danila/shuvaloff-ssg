"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRef, useState } from "react";
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

export default function SpecialOffersSection() {
    const locale = useLocale();
    const sales = AllSales[locale];
    const copy = sectionCopy[locale];
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

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
    const atEnd = active >= sales.length - 1;

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
                                <h3 className="flex h-[6.5rem] items-start justify-center px-5 pt-6 pb-5 font-baskerville text-xl uppercase leading-tight text-[#372a24] xl:text-2xl">
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
                                    {sale.subtitle}
                                </p>
                                <div className="mt-6 px-5">
                                    <Link
                                        href={href}
                                        target={
                                            isExternal ? "_blank" : undefined
                                        }
                                        rel={
                                            isExternal
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="inline-block rounded-md bg-[#5c1f26] px-10 py-4 text-sm uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#46161c] xl:px-8 xl:py-3 xl:text-base"
                                    >
                                        {isExternal ? copy.more : copy.book}
                                    </Link>
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
                        {active + 1} / {sales.length}
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
