import type React from "react";
import {
    BookingFormDesktop,
    BookingFormMobile,
} from "@/components/sections/BookingFormResponsive";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { Parallax } from "@/components/ui/Parallax";

type HeroFullscreenProps = {
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Строка под описанием (например, дата события). */
    caption?: React.ReactNode;
    image: { src: string; alt: string; className?: string };
    /** Кнопки под текстом: разметку и раскладку задает страница. */
    actions?: React.ReactNode;
    /** Затемнение к низу кадра — для пестрых фото, где белый текст теряется. */
    gradient?: boolean;
    /** Широкий блок описания/подписи на десктопе — для длинного подзаголовка. */
    wideDescription?: boolean;
    /** На мобиле кадр по высоте min-h-[32rem] вместо вытянутого 8:15. */
    compactMobile?: boolean;
    /**
     * Модуль бронирования TravelLine, как на главной: на десктопе — внизу
     * кадра под текстом, на мобиле — сразу под кадром.
     */
    withBookingForm?: boolean;
    /**
     * Размер кадра вместо стандартного (мобила 8:15 / десктоп во весь экран),
     * например `aspect-8/11 xl:aspect-[unset] xl:h-[80vh]`.
     */
    frameSizeClassName?: string;
    /** Без больших десктопных отступов вокруг заголовка — подпись ближе к нему. */
    tightTitle?: boolean;
    /** data-атрибуты кадра (без мобильной формы под ним) — для внешних наблюдателей. */
    frameData?: Record<`data-${string}`, string>;
};

/**
 * Полноэкранный hero с фото на фоне и белым текстом внизу кадра
 * (/photo-shoot/, /new-year-2027/). На мобиле кадр вытянут по вертикали,
 * на десктопе — во всю высоту экрана.
 */
export default function HeroFullscreen({
    title,
    description,
    caption,
    image,
    actions,
    gradient = false,
    wideDescription = false,
    compactMobile = false,
    withBookingForm = false,
    frameData,
    frameSizeClassName,
    tightTitle = false,
}: HeroFullscreenProps) {
    const frameSize =
        frameSizeClassName ??
        `xl:aspect-[unset] xl:min-h-screen ${compactMobile ? "min-h-[32rem]" : "aspect-8/15"}`;
    return (
        <section>
            <div
                {...frameData}
                className={`relative overflow-hidden ${frameSize}`}
            >
                <FadeIn
                    duration={0.9}
                    className="absolute inset-0 h-full w-full"
                >
                    <Parallax className="h-full w-full" offset={80}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="100vw"
                            loading="eager"
                            priority
                            className={`object-cover object-center ${image.className ?? ""}`}
                        />
                    </Parallax>
                </FadeIn>

                {gradient && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 15%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.7) 100%)",
                        }}
                    />
                )}

                <StaggerContainer className="flex gap-2 h-65 xl:h-180 xl:gap-4 xl:w-full">
                    <div
                        className={`absolute bottom-10 md:bottom-20 xl:bottom-20 inset-x-0 text-center text-white z-10 flex flex-col gap-3 px-10 xl:mx-auto xl:gap-6 ${withBookingForm ? "xl:max-w-7xl xl:px-0" : "xl:max-w-5xl"}`}
                    >
                        <StaggerItem
                            className={`relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md xl:max-w-5xl xl:mx-auto ${tightTitle ? "" : "xl:mb-6"}`}
                        >
                            <h1
                                className={`text-2xl xl:text-5xl uppercase ${tightTitle ? "" : "xl:mt-10"}`}
                            >
                                {title}
                            </h1>
                        </StaggerItem>
                        {description && (
                            <StaggerItem
                                className={`relative flex-1 min-w-0 xl:mx-auto ${wideDescription ? "xl:max-w-4xl" : "xl:max-w-xl"}`}
                            >
                                <p className="text-base">{description}</p>
                            </StaggerItem>
                        )}
                        {caption && (
                            <StaggerItem
                                className={`relative flex-1 min-w-0 xl:mx-auto ${wideDescription ? "xl:max-w-2xl" : "xl:max-w-xl"}`}
                            >
                                <p className="font-alistair text-2xl xl:text-4xl">
                                    {caption}
                                </p>
                            </StaggerItem>
                        )}
                        {actions && (
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                {actions}
                            </StaggerItem>
                        )}
                        {withBookingForm && (
                            <div className="hidden xl:mt-8 xl:block">
                                <BookingFormDesktop />
                            </div>
                        )}
                    </div>
                </StaggerContainer>
            </div>
            {/* Мобила: отдельным блоком под кадром с отступом — как на главной
                (там его дает gap-6 у <main>). */}
            {withBookingForm && (
                <div className="mt-6 xl:hidden">
                    <BookingFormMobile />
                </div>
            )}
        </section>
    );
}
