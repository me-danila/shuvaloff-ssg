"use client";

import { useEffect } from "react";

import Image from "@/components/ui/OptimizedImage";
import { useSlider } from "@/hooks/useSlider";

type SliderImage = {
    src: string;
    alt: string;
};

type ImageGallerySliderProps = {
    images: SliderImage[];
    className?: string;
    slideClassName?: string;
    imageClassName?: string;
    dotsClassName?: string;
    activeDotClassName?: string;
    inactiveDotClassName?: string;
    sizes?: string;
    autoplay?: boolean;
};

export default function ImageGallerySlider({
    images,
    className,
    slideClassName,
    imageClassName,
    dotsClassName,
    activeDotClassName = "bg-white w-3",
    inactiveDotClassName = "bg-white/50 w-2",
    sizes = "100vw",
    autoplay = false,
}: ImageGallerySliderProps) {
    const { current, sliderRef, scrollTo } = useSlider();

    useEffect(() => {
        if (!autoplay || images.length <= 1) return;

        const intervalId = window.setInterval(() => {
            scrollTo((current + 1) % images.length);
        }, 5000);

        return () => window.clearInterval(intervalId);
    }, [autoplay, current, images.length, scrollTo]);

    return (
        <div className={`relative w-full ${className ?? ""}`}>
            <div
                ref={sliderRef}
                className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
                {images.map((image, index) => (
                    <div
                        key={`${image.src}-${index}`}
                        className={`relative h-full w-full shrink-0 snap-start ${slideClassName ?? ""}`}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes={sizes}
                            loading="lazy"
                            className={`object-cover ${imageClassName ?? ""}`}
                        />
                    </div>
                ))}
            </div>

            {images.length > 1 ? (
                <div
                    className={`absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2 ${dotsClassName ?? ""}`}
                >
                    {images.map((image, index) => (
                        <button
                            type="button"
                            key={`${image.src}-dot-${index}`}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === current
                                    ? activeDotClassName
                                    : inactiveDotClassName
                            }`}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
