"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "@/components/ui/OptimizedImage";

export type NewYearProgramSlide = {
    number: string;
    label: string;
    title: string;
    subtitle: string;
    image: string;
};

const DURATION_MS = 700;

// Стрелка из оригинального Splide-слайдера academia.spb.ru (смотрит влево)
const ARROW_PATH =
    "M0.646446 4.35355C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM16 4V4.5H0V4V3.5H16V4Z";

const arrowClass =
    "absolute top-1/2 z-10 flex size-[50px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-brand-light text-brand-red";

function Arrow({ flip }: { flip?: boolean }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 16 8"
            width="20"
            height="10"
            fill="currentColor"
            className={flip ? "-scale-x-100" : undefined}
        >
            <path d={ARROW_PATH} />
        </svg>
    );
}

// Loop-слайдер: по краям трека клоны последнего и первого слайда; после
// анимации на клон трек без перехода перескакивает на настоящий слайд.
export default function NewYearProgramSlider({
    slides,
    labels,
    className = "",
}: {
    slides: NewYearProgramSlide[];
    labels: { region: string; prev: string; next: string; of: string };
    className?: string;
}) {
    const count = slides.length;
    const [position, setPosition] = useState(1);
    const [animate, setAnimate] = useState(true);
    // Позиция дублируется в ref: go() читает актуальное значение даже
    // между таймаутом перескока с клона и следующим рендером
    const positionRef = useRef(1);
    const busyRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        },
        [],
    );

    const active = (((position - 1) % count) + count) % count;
    const track = [slides[count - 1], ...slides, slides[0]];

    const moveTo = (next: number) => {
        positionRef.current = next;
        setPosition(next);
    };

    const go = (dir: -1 | 1) => {
        if (busyRef.current) return;
        const current = positionRef.current;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setAnimate(false);
            moveTo(((((current - 1 + dir) % count) + count) % count) + 1);
            return;
        }

        const next = current + dir;
        busyRef.current = true;
        setAnimate(true);
        moveTo(next);
        timeoutRef.current = setTimeout(() => {
            busyRef.current = false;
            if (next < 1 || next > count) {
                setAnimate(false);
                moveTo(next < 1 ? count : 1);
            }
        }, DURATION_MS);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
        }
    };

    return (
        <section
            aria-roledescription="carousel"
            aria-label={labels.region}
            onKeyDown={handleKeyDown}
            className={`relative overflow-hidden rounded-lg text-center text-white ${className}`}
        >
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {`${slides[active].number} ${labels.of} ${String(count).padStart(2, "0")}: ${slides[active].title}`}
            </div>
            <div
                className="flex h-full"
                style={{
                    transform: `translateX(-${position * 100}%)`,
                    transition: animate
                        ? `transform ${DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                        : "none",
                }}
            >
                {track.map((slide, i) => {
                    const isClone = i === 0 || i === count + 1;
                    // Для скринридеров активен настоящий слайд, клоны скрыты всегда
                    const isHidden = isClone || i !== active + 1;
                    return (
                        // biome-ignore lint/a11y/useSemanticElements: слайд карусели по WAI-ARIA APG — group + roledescription, fieldset тут не по смыслу
                        <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: клоны повторяют слайды, индекс в треке уникален
                            key={i}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${slide.number} ${labels.of} ${String(count).padStart(2, "0")}`}
                            aria-hidden={isHidden || undefined}
                            inert={isHidden}
                            className="relative isolate flex h-full w-full shrink-0 flex-col justify-between gap-2 p-6 xl:gap-3 xl:p-8"
                        >
                            <Image
                                src={slide.image}
                                alt=""
                                fill
                                // Соседние слайды грузим сразу, иначе в
                                // overflow-hidden треке картинка появляется
                                // посреди анимации
                                loading={
                                    Math.abs(i - position) <= 1
                                        ? "eager"
                                        : "lazy"
                                }
                                sizes="(min-width: 1280px) 60vw, (min-width: 640px) 50vw, 100vw"
                                className="-z-20 object-cover"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-black/40"
                            />
                            <div className="flex flex-col items-center">
                                <span className="font-alistair text-[1.875rem] leading-none xl:text-2xl">
                                    {slide.number}
                                </span>
                                <span className="font-history text-xl leading-[1.2] font-normal xl:text-2xl">
                                    {slide.label}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-history text-xl leading-[1.2] font-bold! xl:text-2xl">
                                    {slide.title}
                                </h3>
                                <p className="text-base font-normal">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                aria-label={labels.prev}
                onClick={() => go(-1)}
                className={`${arrowClass} left-3`}
            >
                <Arrow />
            </button>
            <button
                type="button"
                aria-label={labels.next}
                onClick={() => go(1)}
                className={`${arrowClass} right-3`}
            >
                <Arrow flip />
            </button>
        </section>
    );
}
