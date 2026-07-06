"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/routing";
import { localizeHref } from "@/lib/i18n/routing";

type SpecialOfferBaseItem = {
    title: string;
    subtitle: string;
    mediaObjectPosition?: string;
    /**
     * Deprecated alias kept for existing image cards.
     * Use mediaObjectPosition for both image and video backgrounds.
     */
    imgObjectPosition?: string;
    modal: {
        content: React.ReactNode;
        buttonText: string;
        buttonHref: string;
        price?: string;
    };
};

export type SpecialOfferItem = SpecialOfferBaseItem &
    (
        | {
              imgUrl: string;
              videoUrl?: never;
          }
        | {
              videoUrl: string;
              imgUrl?: never;
          }
    );

type Props = {
    offers: SpecialOfferItem[];
    locale: Locale;
    title: string;
    description?: string;
    showSubtitles?: boolean;
};

const sectionCopy = {
    ru: { more: "Подробнее", order: "Заказать" },
    en: { more: "Details", order: "Order" },
} as const;

function SpecialOfferMedia({ offer }: { offer: SpecialOfferItem }) {
    const objectPosition =
        offer.mediaObjectPosition ?? offer.imgObjectPosition ?? undefined;
    const style = objectPosition ? { objectPosition } : undefined;

    if ("videoUrl" in offer && offer.videoUrl) {
        return (
            <video
                src={offer.videoUrl}
                className="absolute inset-0 h-full w-full object-cover"
                style={style}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                tabIndex={-1}
                aria-hidden="true"
            />
        );
    }

    const imageUrl = "imgUrl" in offer ? offer.imgUrl : undefined;

    if (!imageUrl) {
        return null;
    }

    return (
        <Image
            src={imageUrl}
            alt={offer.title}
            fill
            sizes="(max-width: 1200px) 90vw, 25vw"
            className="object-cover"
            style={style}
        />
    );
}

export default function SpecialOffersSection({
    offers,
    locale,
    title,
    description,
    showSubtitles = true,
}: Props) {
    const copy = sectionCopy[locale];
    const [selectedOffer, setSelectedOffer] = useState<SpecialOfferItem | null>(
        null,
    );

    const trackRef = useRef<HTMLDivElement>(null);
    const [showControls, setShowControls] = useState(false);
    const activeIndexRef = useRef(0);
    const programmaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const update = () =>
            setShowControls(track.scrollWidth - track.clientWidth > 1);

        update();
        const observer = new ResizeObserver(update);
        observer.observe(track);
        return () => observer.disconnect();
    }, []);

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
        <section className="mt-4 bg-[#ededeb] py-10 xl:mt-8 xl:py-16">
            <div className="mx-auto max-w-7xl px-6 xl:px-0">
                <FadeUp>
                    <h2 className="text-center text-[#3d2b22]">{title}</h2>
                </FadeUp>

                {description && (
                    <FadeUp delay={0.2}>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-[#372a24]">
                            {description}
                        </p>
                    </FadeUp>
                )}

                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar xl:mt-12"
                >
                    {offers.map((offer) => (
                        <article
                            key={offer.title}
                            className="flex min-w-full snap-start flex-col overflow-hidden rounded-[4px] bg-white pb-7 text-center xl:min-w-[calc((100%-2rem)/3)]"
                        >
                            <h3 className="flex h-[6.5rem] items-start justify-center px-4 py-5 font-history text-xl uppercase leading-tight text-[#372a24] xl:text-[22px]">
                                {offer.title}
                            </h3>
                            <div className="relative aspect-[16/11] w-full overflow-hidden">
                                <SpecialOfferMedia offer={offer} />
                            </div>
                            {showSubtitles && (
                                <p className="mt-5 flex-1 px-5 text-sm leading-6 text-[#372a24] xl:text-base">
                                    {offer.subtitle}
                                </p>
                            )}

                            <div className="mt-6 flex min-h-[3.25rem] flex-wrap items-center justify-center gap-2 px-5">
                                <Button
                                    href={localizeHref(
                                        offer.modal.buttonHref,
                                        locale,
                                    )}
                                    target="_blank"
                                    variant="primary"
                                    size="sm"
                                    className="shrink-0 xl:px-6"
                                >
                                    {copy.order}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setSelectedOffer(offer)}
                                    variant="primary-outline"
                                    size="sm"
                                    className="shrink-0 xl:px-6"
                                >
                                    {copy.more}
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>

                {showControls && (
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
                )}
            </div>

            <Modal
                open={Boolean(selectedOffer)}
                onClose={() => setSelectedOffer(null)}
                maxWidth="max-w-lg"
            >
                {selectedOffer && (
                    <div className="flex flex-col gap-6 m-6 xl:m-8">
                        <h2 className="font-history text-xl xl:text-2xl uppercase">
                            {selectedOffer.title}:
                        </h2>
                        <div className="space-y-2">
                            {selectedOffer.modal.content}
                        </div>
                        <div className="flex items-center gap-4 mt-2 xl:mt-4">
                            <Button
                                href={localizeHref(
                                    selectedOffer.modal.buttonHref,
                                    locale,
                                )}
                                target="_blank"
                            >
                                {selectedOffer.modal.buttonText}
                            </Button>
                            {selectedOffer.modal.price && (
                                <span className="text-sm text-gray-600">
                                    {selectedOffer.modal.price}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}
