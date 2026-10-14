"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import Image from "@/components/ui/OptimizedImage";
import { type Locale, localizeHref } from "@/lib/i18n/routing";
import { nbsp } from "@/lib/typography";

const STORAGE_KEY = "wau-promo-shown";
const OPEN_DELAY = 1000;
const AUTOPLAY_DELAY = 4500;
const SLIDE_DURATION = 600;
const TITLE_ID = "wau-promo-title";

type Slide = {
    src: string;
    alt: Record<Locale, string>;
    /** Кадрирование вертикального фото, когда центр обрезает главное. */
    className?: string;
};

const slides: Slide[] = [
    {
        src: "/images/wau/wau-boxes-v.avif",
        alt: {
            ru: "Девайсы WAU в номере особняка Шувалова",
            en: "WAU devices in a room at the SHUVALOFF Mansion",
        },
        className: "object-bottom",
    },
    {
        src: "/images/wau/wau-bathroom-v.avif",
        alt: {
            ru: "Девайсы WAU в ванной комнате номера",
            en: "WAU devices in the room's bathroom",
        },
    },
    {
        src: "/images/wau/wau-led-mask.avif",
        alt: {
            ru: "LED-маска WAU для фототерапии лица",
            en: "WAU LED mask for facial light therapy",
        },
    },
    {
        src: "/images/wau/wau-atama.avif",
        alt: {
            ru: "Массажер WAU для роста волос и кожи головы",
            en: "WAU scalp and hair growth massager",
        },
    },
    {
        src: "/images/wau/wau-kio.avif",
        alt: {
            ru: "Мультистайлер WAU с насадками для волос",
            en: "WAU multi-styler with hair attachments",
        },
    },
];

type Copy = {
    /** Абзац — массив строк: перенос между ними есть только на десктопе. */
    paragraphs: string[][];
    list: string[];
    button: string;
    prev: string;
    next: string;
};

const copyByLocale: Record<Locale, Copy> = {
    ru: {
        paragraphs: [
            ["Погрузитесь в мир современного ухода в особняке Шувалова."],
            [
                "С 15 октября по 15 ноября для повышенных категорий номеров",
                "мы подготовили эксклюзивную программу красоты.",
            ],
            [
                "В вашем распоряжении — инновационное меню девайсов",
                "от международного beauty & wellness-бренда WAU.",
                "Позвольте себе профессиональный уход, не выходя из номера:",
            ],
        ],
        list: [
            "Массажер для роста волос и кожи головы",
            "Мультистайлер с насадками для волос с эффектом Коанда",
            "LED-маска для фототерапии лица",
            "Антицеллюлитный массажер для коррекции фигуры.",
        ],
        button: "Выбрать номер",
        prev: "Предыдущий слайд",
        next: "Следующий слайд",
    },
    en: {
        paragraphs: [
            [
                "Immerse yourself in the world of modern care at the SHUVALOFF Mansion.",
            ],
            [
                "From October 15 to November 15, we have prepared an exclusive beauty program for guests of our higher room categories.",
            ],
            [
                "An innovative menu of devices from the international beauty & wellness brand WAU is at your disposal. Treat yourself to professional care without leaving your room:",
            ],
        ],
        list: [
            "Scalp and hair growth massager",
            "Multi-styler with hair attachments and the Coanda effect",
            "LED mask for facial light therapy",
            "Anti-cellulite massager for body contouring.",
        ],
        button: "Book online",
        prev: "Previous slide",
        next: "Next slide",
    },
};

const arrowClass =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white";

function WauGallery({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const prefersReducedMotion = useReducedMotion();
    const total = slides.length;
    // Лента: [клон последнего, ...слайды, клон первого] — index 1..total
    // настоящие, 0 и total + 1 — клоны для бесшовного зацикливания.
    const [index, setIndex] = useState(1);
    const [animated, setAnimated] = useState(true);
    const [paused, setPaused] = useState(false);

    const go = (dir: 1 | -1) => {
        setIndex((i) => (i < 1 || i > total ? i : i + dir));
    };

    // С клона мгновенно, без анимации, перескакиваем на настоящий слайд.
    // Таймер, а не transitionend: событие не приходит, если переход не
    // отрисован (фоновая вкладка), и лента застряла бы на клоне.
    useEffect(() => {
        if (index >= 1 && index <= total) return;
        const id = window.setTimeout(() => {
            setAnimated(false);
            setIndex(index === 0 ? total : 1);
        }, SLIDE_DURATION);
        return () => window.clearTimeout(id);
    }, [index, total]);

    useEffect(() => {
        if (animated) return;
        const id = window.setTimeout(() => setAnimated(true), 50);
        return () => window.clearTimeout(id);
    }, [animated]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: index перезапускает таймер после ручного листания
    useEffect(() => {
        if (paused || prefersReducedMotion) return;
        const id = window.setInterval(
            () => setIndex((i) => (i < 1 || i > total ? i : i + 1)),
            AUTOPLAY_DELAY,
        );
        return () => window.clearInterval(id);
    }, [paused, prefersReducedMotion, total, index]);

    const track = [slides[total - 1], ...slides, slides[0]];

    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: наведение только ставит автопрокрутку на паузу
        <div
            className="relative aspect-4/5 w-full shrink-0 overflow-hidden rounded-md md:aspect-auto md:w-[44%]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                className="flex h-full"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: animated
                        ? `transform ${SLIDE_DURATION}ms ease`
                        : "none",
                }}
            >
                {track.map((slide, i) => {
                    const isClone = i === 0 || i === total + 1;
                    return (
                        <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: лента статична, клоны повторяют src
                            key={i}
                            aria-hidden={isClone || undefined}
                            className="relative h-full w-full shrink-0"
                        >
                            <Image
                                src={slide.src}
                                alt={isClone ? "" : slide.alt[locale]}
                                fill
                                sizes="(max-width: 768px) 100vw, 450px"
                                loading="eager"
                                className={`object-cover ${slide.className ?? ""}`}
                            />
                        </div>
                    );
                })}
            </div>
            <button
                type="button"
                aria-label={copy.prev}
                onClick={() => go(-1)}
                className={`${arrowClass} left-3`}
            >
                <ArrowLeftIcon size={20} weight="light" />
            </button>
            <button
                type="button"
                aria-label={copy.next}
                onClick={() => go(1)}
                className={`${arrowClass} right-3`}
            >
                <ArrowRightIcon size={20} weight="light" />
            </button>
        </div>
    );
}

/**
 * Рекламный попап «ACADEMIA × WAU». Открывается сам через секунду после
 * загрузки страницы и не чаще одного раза за сессию (sessionStorage).
 */
export default function WauPromoModal({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const id = window.setTimeout(() => {
            try {
                if (sessionStorage.getItem(STORAGE_KEY)) return;
                sessionStorage.setItem(STORAGE_KEY, "1");
            } catch {
                // sessionStorage недоступен (приватный режим) — просто показываем.
            }
            setOpen(true);
        }, OPEN_DELAY);
        return () => window.clearTimeout(id);
    }, []);

    const typo = (text: string) => (locale === "ru" ? nbsp(text) : text);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="max-w-5xl"
            bgColor="bg-stone-100"
            panelClassName="min-h-0! max-h-[calc(100dvh-5rem)]"
            ariaLabelledby={TITLE_ID}
        >
            <div className="flex flex-col gap-5 p-3 text-brand-brown md:flex-row md:items-stretch md:gap-6 md:p-4">
                <WauGallery locale={locale} />
                <div className="flex flex-col items-start gap-4 px-2 pb-3 md:flex-1 md:justify-center md:px-0 md:py-4 md:pr-4">
                    <h2 id={TITLE_ID} className="xl:text-3xl">
                        ACADEMIA{" "}
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 10 10"
                            className="mx-[0.1em] inline-block h-[0.55em] w-[0.55em] align-[0.1em]"
                        >
                            <path
                                d="M1 1l8 8M9 1l-8 8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="butt"
                            />
                        </svg>
                        <span className="sr-only">×</span> WAU
                    </h2>
                    <div className="flex flex-col gap-3">
                        {copy.paragraphs.map((lines) => (
                            <p key={lines[0]}>
                                {lines.map((line, i) => (
                                    <Fragment key={line}>
                                        {i > 0 && (
                                            <>
                                                {" "}
                                                <br className="hidden lg:inline" />
                                            </>
                                        )}
                                        {typo(line)}
                                    </Fragment>
                                ))}
                            </p>
                        ))}
                        <ul className="list-disc pl-5">
                            {copy.list.map((item) => (
                                <li key={item}>{typo(item)}</li>
                            ))}
                        </ul>
                    </div>
                    <Button
                        href={localizeHref("/booking/", locale)}
                        variant="primary"
                        className="mt-1"
                    >
                        {copy.button}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
