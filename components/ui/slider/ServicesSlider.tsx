"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Service } from "@/data/ServicesData";

type ServicesSliderProps = {
    services: Service[];
};

function getClosestIndex(el: HTMLDivElement): number {
    const { scrollLeft } = el;
    let closest = 0;
    let minDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < el.children.length; i++) {
        const dist = Math.abs(
            (el.children[i] as HTMLElement).offsetLeft - scrollLeft,
        );
        if (dist < minDist) {
            minDist = dist;
            closest = i;
        }
    }
    return closest;
}

export default function ServicesSlider({ services }: ServicesSliderProps) {
    const [index, setIndex] = useState(0);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const goTo = (i: number) => {
        if (!ref.current) return;
        const card = ref.current.children[i] as HTMLElement;
        ref.current.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
        setIndex(i);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        setIndex(getClosestIndex(el));
        setIsAtEnd(el.scrollLeft + el.offsetWidth >= el.scrollWidth - 4);
    };

    return (
        <div className="flex flex-col gap-4">
            <StaggerContainer
                ref={ref}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-md"
                onScroll={handleScroll}
            >
                {services.map((service) => (
                    <StaggerItem
                        key={service.title}
                        className="relative aspect-square rounded-md overflow-hidden shrink-0 w-full md:w-[calc(50%-8px)] xl:w-[calc(33.333%-11px)] snap-start flex"
                    >
                        <Image
                            src={service.imgUrl}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/50" />
                        <div className="absolute inset-0 flex flex-col justify-between text-white p-6 xl:p-8">
                            <p className="font-baskerville uppercase leading-tight text-xl xl:text-2xl">
                                {service.title}
                            </p>
                            <div className="flex items-center justify-between gap-4">
                                <Button
                                    href="https://t.me/+79668342743"
                                    target="_blank"
                                    variant="primary"
                                    size="sm"
                                >
                                    Заказать
                                </Button>
                                <a
                                    href={`/services/${service.slug}/`}
                                    className="flex items-center gap-3 uppercase tracking-widest text-sm"
                                >
                                    Подробнее
                                    <span className="text-xl">&rsaquo;</span>
                                </a>
                            </div>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <div className="flex justify-center gap-8">
                <button
                    type="button"
                    onClick={() => goTo(Math.max(0, index - 1))}
                    disabled={index === 0}
                    className="text-2xl xl:text-3xl text-brand-blue disabled:text-stone-300 transition-colors cursor-pointer disabled:cursor-default"
                >
                    &#8249;
                </button>
                <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    disabled={isAtEnd}
                    className="text-2xl xl:text-3xl text-brand-blue disabled:text-stone-300 transition-colors cursor-pointer disabled:cursor-default"
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
}
