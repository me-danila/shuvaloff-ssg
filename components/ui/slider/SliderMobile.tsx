"use client";

import Image from "next/image";
import { useSlider } from "@/hooks/useSlider";

type SliderImage = {
    src: string;
    alt: string;
};

type SliderProps = {
    images: SliderImage[];
};

export default function SliderMobile({ images }: SliderProps) {
    const { current, sliderRef, scrollTo } = useSlider();

    return (
        <div className="xl:hidden relative">
            <div
                ref={sliderRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
                {images.map((img) => (
                    <div
                        key={img.src}
                        className="relative snap-start shrink-0 w-full h-90 overflow-hidden"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 1200px) 100vw, 575px"
                            loading="lazy"
                            className="object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center relative gap-2 -mt-6">
                {images.map((img, i) => (
                    <button
                        type="button"
                        key={img.src}
                        onClick={() => scrollTo(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            i === current
                                ? "bg-slate-100 w-3"
                                : "bg-slate-300 w-2"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
