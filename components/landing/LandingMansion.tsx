"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { LANDING_ARROW_CLASS } from "@/components/landing/constants";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { LandingDictionary } from "@/data/landing";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSlider } from "@/hooks/useSlider";

// Указатель между стрелками — как пилюля «Все номера» у «Категорий номеров».
const PILL_CLASS =
    "flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-stone-100 px-7 text-xs uppercase tracking-widest text-stone-600 transition-colors duration-300 hover:bg-stone-200 active:bg-[#5c1f26] active:text-white";

/**
 * «Исторический особняк в центре»: серая секция — заголовок и 4 плитки
 * (завтраки, ресторан, спа, исторические резиденции — ведут на детальные
 * страницы); следом белая секция со слайдами «История» и «Локация»: серая
 * карточка «фото слева на всю высоту / текст справа». Под лентой —
 * стрелки и указатель «История → Локация», который тоже листает; на мобиле
 * плюс свайп. Лента на useSlider.
 */
export default function LandingMansion({
    dict,
}: {
    dict: LandingDictionary["mansion"];
}) {
    const { current, sliderRef, scrollTo } = useSlider();
    const total = dict.slides.length;
    const nextIndex = (current + 1) % total;
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

    const go = (dir: -1 | 1) => {
        scrollTo((current + dir + total) % total);
        // Мобила: лента меняет высоту под новый слайд, и после перелистывания
        // пользователь оказывался на другом экране. Если начало ленты ушло
        // под хедер — возвращаем к нему (scroll-mt-20 учитывает хедер). Не к
        // началу секции: над лентой заголовок и плитки.
        const track = sliderRef.current;
        if (isDesktop || !track) return;
        const offset = Number.parseFloat(
            getComputedStyle(track).scrollMarginTop,
        );
        const top = track.getBoundingClientRect().top;
        if (top < offset) {
            // window.scrollTo, а не track.scrollIntoView: у ленты свой
            // snap-скролл, и плавный scrollIntoView на ней Chrome игнорирует.
            window.scrollTo({
                top: top + window.scrollY - offset,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <section className="bg-[#ededeb] py-10 xl:py-16">
                <div className="mx-auto max-w-7xl px-6 xl:px-0">
                    <FadeUp>
                        <h2 className="text-center text-[#3d2b22]">
                            {dict.title}
                        </h2>
                    </FadeUp>

                    {/* Плитки: 4 в ряд на десктопе, 2×2 на мобиле. Белые карточки
                    на сером фоне; вся плитка — ссылка. */}
                    <StaggerContainer className="mt-8 grid grid-cols-2 gap-3 xl:mt-12 xl:grid-cols-4 xl:gap-4">
                        {dict.tiles.map((tile) => (
                            <StaggerItem key={tile.title}>
                                <a
                                    href={tile.href}
                                    target={
                                        tile.external ? "_blank" : undefined
                                    }
                                    rel={
                                        tile.external
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="group flex h-full flex-col overflow-hidden rounded-[4px] bg-white"
                                >
                                    <div className="relative aspect-4/3 overflow-hidden">
                                        <Image
                                            src={tile.image}
                                            alt=""
                                            fill
                                            sizes="(max-width: 1280px) 50vw, 300px"
                                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5 px-3 pt-3 pb-4 xl:gap-2 xl:px-6 xl:pt-5 xl:pb-6">
                                        <h3 className="text-balance font-history text-sm uppercase leading-tight text-[#372a24] transition-colors group-hover:text-brand-red xl:text-xl">
                                            {tile.title}
                                        </h3>
                                        <p className="text-pretty text-xs leading-5 text-[#372a24]/80 xl:text-sm/6">
                                            {tile.text}
                                        </p>
                                    </div>
                                </a>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Слайдер «История / Локация» — отдельной секцией на белом фоне;
            карточки, стрелки и указатель — серые, как у номеров. Якорь меню
            History ведет сюда. Без нижнего отступа: следом белая секция
            номеров со своим верхним. */}
            <section
                id="history"
                className="scroll-mt-16 bg-white pt-10 xl:pt-16"
            >
                <h2 className="sr-only">
                    {dict.slides.map((slide) => slide.label).join(" / ")}
                </h2>
                <div className="mx-auto max-w-7xl px-6 xl:px-0">
                    {/* relative: useSlider скроллит к child.offsetLeft — отсчет
                    должен идти от ленты, а не от body. */}
                    <div
                        ref={sliderRef}
                        data-lenis-prevent-horizontal
                        style={{ height: trackHeight }}
                        className="no-scrollbar relative flex scroll-mt-20 snap-x snap-mandatory items-start gap-4 overflow-x-auto overflow-y-hidden transition-[height] duration-300 ease-out xl:items-stretch"
                    >
                        {dict.slides.map((slide, index) => (
                            <article
                                key={slide.label}
                                aria-hidden={index !== current}
                                className="flex min-w-full snap-start flex-col overflow-hidden rounded-[4px] bg-stone-100 xl:flex-row"
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
                            className={LANDING_ARROW_CLASS}
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
                            className={LANDING_ARROW_CLASS}
                        >
                            <ArrowRightIcon size={20} weight="light" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
