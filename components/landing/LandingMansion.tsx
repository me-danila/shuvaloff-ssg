"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { LandingDictionary } from "@/data/landing";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSlider } from "@/hooks/useSlider";

// Стрелки и указатель между ними — как у «Категорий номеров» на главной
// (там между стрелками кнопка-пилюля «Все номера»).
const ARROW_CLASS =
    "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white";
const PILL_CLASS =
    "flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 text-xs uppercase tracking-widest text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white";

/**
 * «Исторический особняк в центре»: слайды «История» и «Локация». Раскладка
 * повторяет RoomCategoriesSection главной: серый фон, обычный h2 по центру,
 * белая карточка «фото слева на всю высоту / текст справа». Под лентой —
 * стрелки (десктоп) и указатель «История → Локация», который тоже листает.
 * Мобила — свайп, указатель остается подсказкой. Лента на useSlider.
 */
export default function LandingMansion({
    dict,
}: {
    dict: LandingDictionary["mansion"];
}) {
    const { current, sliderRef, scrollTo } = useSlider();
    const total = dict.slides.length;
    const nextIndex = (current + 1) % total;
    const go = (dir: -1 | 1) => scrollTo((current + dir + total) % total);

    // Мобила: карточки разной высоты (items-start), а лента по умолчанию
    // держит высоту самой длинной — под коротким слайдом оставалась пустота.
    // Подгоняем высоту ленты под текущую карточку. На десктопе карточки
    // одинаковой высоты (stretch), там высоту не трогаем.
    const isDesktop = useMediaQuery("(min-width: 1280px)");
    const [trackHeight, setTrackHeight] = useState<number>();

    useEffect(() => {
        const slide = sliderRef.current?.children[current] as
            | HTMLElement
            | undefined;
        if (isDesktop || !slide) {
            setTrackHeight(undefined);
            return;
        }
        const update = () => setTrackHeight(slide.offsetHeight);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(slide);
        return () => observer.disconnect();
    }, [current, isDesktop, sliderRef]);

    return (
        <section
            id="history"
            className="scroll-mt-16 bg-[#ededeb] py-10 xl:py-16"
        >
            <div className="mx-auto max-w-7xl px-6 xl:px-0">
                <FadeUp>
                    <h2 className="text-center text-[#3d2b22]">{dict.title}</h2>
                </FadeUp>

                {/* relative: useSlider скроллит к child.offsetLeft — отсчет
                    должен идти от ленты, а не от body. */}
                <div
                    ref={sliderRef}
                    style={{ height: trackHeight }}
                    className="no-scrollbar relative mt-8 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overflow-y-hidden transition-[height] duration-300 ease-out xl:mt-12 xl:items-stretch"
                >
                    {dict.slides.map((slide, index) => (
                        <article
                            key={slide.label}
                            aria-hidden={index !== current}
                            className="flex min-w-full snap-start flex-col overflow-hidden rounded-[4px] bg-white xl:flex-row"
                        >
                            <div className="relative aspect-4/3 w-full overflow-hidden xl:aspect-auto xl:min-h-[26rem] xl:w-1/2">
                                <Image
                                    src={slide.image.src}
                                    alt={slide.image.alt}
                                    fill
                                    // Слайдов два — грузим сразу, чтобы второй
                                    // не появлялся пустым при листании.
                                    loading="eager"
                                    sizes="(max-width: 1200px) 90vw, 640px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-4 px-6 pt-7 pb-8 xl:flex-1 xl:justify-center xl:gap-6 xl:px-12 xl:py-10">
                                <div className="flex flex-col gap-2 xl:gap-3">
                                    <p className="text-xs uppercase tracking-widest text-stone-500">
                                        {slide.label}
                                    </p>
                                    <h3 className="font-history text-xl uppercase leading-tight text-[#372a24] xl:text-3xl">
                                        {slide.title}
                                    </h3>
                                </div>
                                <div className="flex max-w-xl flex-col gap-3 text-sm leading-6 text-[#372a24] xl:text-base">
                                    {slide.paragraphs.map((text) => (
                                        <p key={text}>{text}</p>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 xl:mt-10">
                    <button
                        type="button"
                        aria-label={dict.prev}
                        onClick={() => go(-1)}
                        className={`hidden xl:flex ${ARROW_CLASS}`}
                    >
                        <ArrowLeftIcon size={20} weight="light" />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        className={PILL_CLASS}
                    >
                        <span>{dict.slides[current].label}</span>
                        <ArrowRightIcon size={12} aria-hidden="true" />
                        <span>{dict.slides[nextIndex].label}</span>
                    </button>
                    <button
                        type="button"
                        aria-label={dict.next}
                        onClick={() => go(1)}
                        className={`hidden xl:flex ${ARROW_CLASS}`}
                    >
                        <ArrowRightIcon size={20} weight="light" />
                    </button>
                </div>
            </div>
        </section>
    );
}
