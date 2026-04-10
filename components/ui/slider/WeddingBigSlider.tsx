"use client";

import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import type { ReactNode } from "react";
import { useState } from "react";

export interface WeddingBigSlide {
    title: ReactNode;
    description: ReactNode;
    button: {
        label: string;
        href: string;
    };
    image: {
        src: string;
        alt: string;
    };
}

interface Props {
    slides: WeddingBigSlide[];
}

export function WeddingBigSlider({ slides }: Props) {
    const [current, setCurrent] = useState(0);
    const slide = slides[current];

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] overflow-hidden gap-2 xl:min-h-screen xl:-mt-8">
            {/* Content wrapper */}
            <div className="flex flex-col justify-center gap-6 p-6 text-center items-center xl:max-w-2xl xl:mx-auto xl:gap-10">
                {/* Content */}
                <h3 className="text-2xl font-baskerville uppercase xl:text-4xl -mb-2">
                    {slide.title}
                </h3>
                <p className="max-w-md">{slide.description}</p>

                {/* Button */}
                <Link
                    href={slide.button.href}
                    className="border border-black bg-black px-8 py-4 rounded-md text-white font-baskerville uppercase hover:bg-white hover:text-black duration-200 max-w-xl:w-full"
                >
                    {slide.button.label}
                </Link>

                {/* Arrows */}
                <div className="flex items-center gap-4 mt-2 xl:mt-8 xl:gap-6">
                    <button
                        type="button"
                        onClick={() => setCurrent((c) => c - 1)}
                        disabled={current === 0}
                        aria-label="Предыдущий слайд"
                        className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
                    >
                        ←
                    </button>
                    <span className="font-baskerville text-xl xl:text-2xl">
                        {current + 1}/{slides.length}
                    </span>
                    <button
                        type="button"
                        onClick={() => setCurrent((c) => c + 1)}
                        disabled={current === slides.length - 1}
                        aria-label="Следующий слайд"
                        className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Image */}
            <div className="relative min-h-[400px] lg:min-h-0">
                <ExportedImage
                    key={slide.image.src}
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                />
            </div>
        </section>
    );
}
