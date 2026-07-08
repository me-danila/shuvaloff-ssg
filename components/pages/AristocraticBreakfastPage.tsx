"use client";

import Button from "@/components/ui/Button";
import {
    FadeIn,
    FadeUp,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/routing";
import { localizeHref } from "@/lib/i18n/routing";

type BreakfastCopy = {
    title: React.ReactNode;
    titleAlt: string;
    subtitle: string;
    bestBreakfastLabel: string;
    bookLabel: string;
    description1: string;
    description2: React.ReactNode;
    breakfastTitle1: string;
    breakfastDescription1: React.ReactNode;
    breakfastButtonLabel1: string;
    breakfastLink1: string;
    breakfastTitle2: string;
    breakfastDescription2: React.ReactNode;
    breakfastButtonLabel2: string;
    breakfastLink2: string;
    graphTitle: string;
    graphImage: string;
    graphSections: { heading: string; items: string[] }[];
    graphButtonLabel: string;
    graphPrice: React.ReactNode;
    quoteTitle1: string;
    quoteDescription1: React.ReactNode;
    quoteTitle2: string;
    quoteDescription2: string;
    bookBreakfastLabel: string;
    bookHotelLabel: string;
};

const copyByLocale: Record<Locale, BreakfastCopy> = {
    ru: {
        title: (<>ГРАФСКИЕ ЗАВТРАКИ В&nbsp;АКАДЕМИА ОСОБНЯК ШУВАЛОВА</>),
        titleAlt: "Графские завтраки в Академиа Особняк Шувалова",
        subtitle:
            "— это гастрономия как искусство. Это традиция и история. Это утро, которое вы запомните надолго!",
        bestBreakfastLabel: "Ресторан с лучшим завтраком 2026",
        bookLabel: "Забронировать",
        description1: "Воссоздаем атмосферу эпохи XIX века",
        description2: (
            <>
                Новая глава, вдохновлённая аристократическими традициями, когда
                по&nbsp;утрам дворянские семьи собирались за&nbsp;большим
                столом, вели неспешные беседы и&nbsp;наслаждались вкусом жизни.
                <br />
                <br />
                Исключительно для гостей особняка, графские завтраки подаются ежедневно по предварительному бронированию (при наличии свободных слотов):
                <br />
                в 13:00, 13:15, 13:30,
                <br />
                14:00, 14:15, 14:30,
                <br />
                15:00, 15:15, 15:30.
            </>
        ),
        breakfastTitle1: "Завтрак Графини",
        breakfastDescription1: (
            <>
                • Яйца всмятку съ красною икорою
                <br />• Каша пшённая съ масломъ сливочнымъ
                <br />• Вареніе вишнёвое
                <br />• Блины печёныя
                <br />• Бриошь
                <br />• Масло сливочное
                <br />• Лосось слабосолёный
                <br />• Рийетъ изъ тунца
                <br />• Оливы, каперсы и томаты
                <br />• Йогуртъ греческій съ ягодами
                <br />• Кремъ шоколадный съ ягодами
                <br />• Сокъ апельсиновый
                <br />• Чай чёрный съ лимономъ и королевскимъ финикомъ
                <br />• Бокалъ Кремана
            </>
        ),
        breakfastButtonLabel1: "Открыть меню",
        breakfastLink1:
            "https://static.academia.spb.ru/files/%D0%97%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA_%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%BD%D0%B8.pdf",
        breakfastTitle2: "Завтрак Графа",
        breakfastDescription2: (
            <>
                Яйца всмятку съ чёрною икорою
                <br />
                • Паштѣтъ съ лукомъ фрі
                <br />
                • Масло солѣноє
                <br />
                • Сырники съ сметаною
                <br />
                • Огурцы свежія
                <br />
                • Лечо съ окорокомъ тамбовскимъ
                <br />
                • Похлёбка съ дичью и бѣлыми грибами
                <br />
                • Круассаны малыя, булочки солодовыя и бриошь
                <br />
                • Вареніе малиновое
                <br />
                • Пирогъ яблочный
                <br />
                • Кофій «Эспрессо» съ королевскимъ финикомъ
                <br />
                • Сокъ грейпфрутовый
                <br />
                • Настойка яблочная
            </>
        ),
        breakfastButtonLabel2: "Открыть меню",
        breakfastLink2:
            "https://static.academia.spb.ru/files/%D0%97%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA_%D0%B3%D1%80%D0%B0%D1%84%D0%B0.pdf",
        graphTitle: "Состав графского завтрака",
        graphImage:
            "https://academia.spb.ru/wp-content/uploads/2026/04/%D0%93%D1%80%D0%B0%D1%84%D1%81%D0%BA%D0%B8%D0%B9-%D0%B7%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA.avif",
        graphSections: [
            {
                heading: "ОСНОВА",
                items: [
                    "Пшенная каша со сливочным маслом",
                    "Яйца всмятку с черной икрой",
                    "Паштет из лососины",
                    "Редис и свежие огурцы",
                    "Хлебная корзина с солодовыми булочками и мини-круассанами",
                    "Сливочное соленое масло",
                    "Малиновое и вишневое варенье",
                    "Кофейный крем с ягодами",
                ],
            },
            {
                heading: "ЭТАЖЕРКА",
                items: [
                    "Ассорти десертов: наполеон и медовик",
                    "Фруктовое желе с малиной",
                    "Ананас",
                    "Блины с лососиной / Сырники со сметаной и ягодами на выбор",
                    "Пирог с уткой и сметаной",
                ],
            },
            {
                heading: "НАПИТКИ",
                items: [
                    "Ягодный морс",
                    "Вишневая наливка / Бокал шампанского на выбор",
                    "Чай / Кофе по-венски на выбор",
                ],
            },
        ],
        graphButtonLabel: "Открыть меню",
        graphPrice: (
            <>
                Стоимость:
                <br />5 500 ₽ — на одну персону
                <br />8 500 ₽ — на две персоны
            </>
        ),
        quoteTitle1: "Это не подача — это настоящий ритуал.",
        quoteDescription1: (
            <>
                Для этого мы&nbsp;по&nbsp;крупицам собирали винтажную посуду:
                что‑то было найдено прямо в&nbsp;стенах особняка во&nbsp;время
                реставрации, словно само прошлое решило вернуться; что‑то
                мы&nbsp;бережно привезли из Европы или отыскали в&nbsp;закрытых
                шоу‑румах.
                <br />
                <br />
                Таким образом каждому гостю достанется своя сервировка при
                подаче завтрака&nbsp;&mdash; потому что посуда
                не&nbsp;повторяется.
            </>
        ),
        quoteTitle2:
            "Теперь и вы можете стать частью этой традиции — позволить себе утро без спешки, где всё дышит красотой, свободой и настоящим вкусом жизни.",
        quoteDescription2:
            "Это гастрономическое путешествие сквозь время, в котором каждая деталь — от посуды до атмосферы — символ утончённости, роскоши и памяти о великом.",
        bookBreakfastLabel: "Забронировать завтрак",
        bookHotelLabel: "Забронировать отель",
    },
    en: {
        title: (<>ARISTOCRATIC BREAKFASTS AT THE ACADEMIA MANSION SHUVALOV</>),
        titleAlt: "Aristocratic breakfasts at the Academia Mansion Shuvalov",
        subtitle:
            "— it’s gastronomy as an art form. It’s tradition and history. It’s a morning you’ll remember for a long time!",
        bestBreakfastLabel: "The Best Breakfast Restaurant of 2026",
        bookLabel: "Book now",
        description1: "Recreating the atmosphere of the 19th century",
        description2: (
            <>
                A new chapter inspired by aristocratic traditions, when noble
                families would gather around a large table in the mornings to
                engage in leisurely conversation and savor the finer things in
                life.
                <br />
                <br />
                Exclusively for guests of the mansion, the Count's breakfasts are served daily by prior reservation (subject to availability):
                <br />
                at 13:00, 13:15, 13:30,
                <br />
                14:00, 14:15, 14:30,
                <br />
                15:00, 15:15, 15:30.
            </>
        ),
        breakfastTitle1: "The Countess's Breakfast",
        breakfastDescription1: (
            <>
                • Soft-boiled eggs with red caviar
                <br />• Millet porridge with butter
                <br />• Cherry compote
                <br />• Baked pancakes
                <br />• Brioche
                <br />• Butter
                <br />• Lightly salted salmon
                <br />• Tuna rillettes
                <br />• Olives, capers, and tomatoes
                <br />• Greek yogurt with berries
                <br />• Chocolate cream with berries
                <br />• Orange juice
                <br />• Black tea with lemon and royal dates
                <br />• A glass of Crémant
            </>
        ),
        breakfastButtonLabel1: "Open a menu",
        breakfastLink1:
            "https://static.academia.spb.ru/files/%D0%97%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA_%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%BD%D0%B8.pdf",
        breakfastTitle2: "The Count's Breakfast",
        breakfastDescription2: (
            <>
                Soft-boiled eggs with black caviar
                <br />• Pâté with fried onions
                <br />• Salted butter
                <br />• Cheese pancakes with sour cream
                <br />• Fresh cucumbers
                <br />• Lecho with Tambov ham
                <br />• Game and white mushroom soup
                <br />• Small croissants, malt buns, and brioche
                <br />• Raspberry jam
                <br />• Apple pie
                <br />• “Espresso” coffee with royal dates
                <br />• Grapefruit juice
                <br />• Apple liqueur
            </>
        ),
        breakfastButtonLabel2: "Open a menu",
        breakfastLink2:
            "https://static.academia.spb.ru/files/%D0%97%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA_%D0%B3%D1%80%D0%B0%D1%84%D0%B0.pdf",
        graphTitle: "The Count's Breakfast Menu",
        graphImage:
            "https://academia.spb.ru/wp-content/uploads/2026/04/%D0%93%D1%80%D0%B0%D1%84%D1%81%D0%BA%D0%B8%D0%B9-%D0%B7%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA.avif",
        graphSections: [
            {
                heading: "MAIN COURSE",
                items: [
                    "Millet porridge with butter",
                    "Soft-boiled eggs with black caviar",
                    "Salmon pâté",
                    "Radishes and fresh cucumbers",
                    "Bread basket with malt buns and mini croissants",
                    "Salted butter",
                    "Raspberry and cherry jam",
                    "Coffee cream with berries",
                ],
            },
            {
                heading: "TIERED STAND",
                items: [
                    "Assorted desserts: Napoleon and medovik",
                    "Fruit jelly with raspberries",
                    "Pineapple",
                    "Blini with salmon / Syrniki with sour cream and berries (your choice)",
                    "Duck and sour cream pie",
                ],
            },
            {
                heading: "DRINKS",
                items: [
                    "Berry mors",
                    "Cherry liqueur / A glass of champagne (your choice)",
                    "Tea / Viennese coffee (your choice)",
                ],
            },
        ],
        graphButtonLabel: "Open a menu",
        graphPrice: (
            <>
                Price:
                <br />5,500 ₽ — for one person
                <br />8,500 ₽ — for two persons
            </>
        ),
        quoteTitle1: "It’s not just a serve — it’s a real ritual.",
        quoteDescription1: (
            <>
                To achieve this, we painstakingly collected vintage tableware:
                some pieces were found right within the mansion’s walls during
                restoration, as if the past itself had decided to return; others
                we carefully brought back from Europe or found in closed
                showrooms.
                <br />
                <br />
                This way, every guest will have their own unique table setting
                when breakfast is served—because no two pieces of tableware are
                alike.
            </>
        ),
        quoteTitle2:
            "Now you, too, can become part of this tradition—treat yourself to a leisurely morning where everything exudes beauty, freedom, and the true joy of life.",
        quoteDescription2:
            "This is a culinary journey through time, in which every detail — from the tableware to the ambiance — embodies refinement, luxury, and a tribute to greatness.",
        bookBreakfastLabel: "Book a breakfast",
        bookHotelLabel: "Book hotel",
    },
};

const descriptionImages: Record<Locale, { src: string; alt: string }[]> = {
    ru: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9220.avif",
            alt: "Бутик-ресторан ACADEMIA Шувалова 1",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9221.avif",
            alt: "Бутик-ресторан ACADEMIA Шувалова 2",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9119.avif",
            alt: "Бутик-ресторан ACADEMIA Шувалова 3",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9117.avif",
            alt: "Бутик-ресторан ACADEMIA Шувалова 4",
        },
    ],
    en: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9220.avif",
            alt: "ACADEMIA Bar SHUVALOFF 1",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9221.avif",
            alt: "ACADEMIA Bar SHUVALOFF 2",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9119.avif",
            alt: "ACADEMIA Bar SHUVALOFF 3",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9117.avif",
            alt: "ACADEMIA Bar SHUVALOFF 4",
        },
    ],
};

export default function AristocraticBreakfastPage({
    locale,
}: {
    locale: Locale;
}) {
    const copy = copyByLocale[locale];
    const descImages = descriptionImages[locale];

    return (
        <main className="flex flex-col gap-4 xl:gap-16">
            <section>
                <div className="relative overflow-hidden min-h-[40rem] xl:min-h-screen">
                    <FadeIn
                        duration={0.9}
                        className="absolute inset-0 h-full w-full"
                    >
                        <video
                            src="https://static.academia.spb.ru/video/count-breakfast-v2.webm"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                        />
                    </FadeIn>

                    <StaggerContainer className="flex gap-2 h-65 xl:h-180 xl:gap-4 xl:w-full">
                        <div className="absolute bottom-10 md:bottom-20 inset-x-0 text-center text-white z-10 flex flex-col gap-3 px-10 xl:max-w-6xl xl:mx-auto xl:gap-6">
                            <StaggerItem className="flex flex-col gap-0 mb-8 xl:mb-20">
                                <div className="relative w-full h-[50px]">
                                    <Image
                                        src="https://static.tildacdn.com/tild6134-6132-4566-b630-356264393238/svgexport-1_5.svg"
                                        alt={copy.breakfastTitle1}
                                        fill
                                        loading="lazy"
                                        sizes="(max-width: 1280px) 100vw, 50vw"
                                    />
                                </div>
                                <p>{copy.bestBreakfastLabel}</p>
                            </StaggerItem>
                            <StaggerItem>
                                <h1 className="text-3xl xl:text-5xl xl:max-w-2xl xl:mx-auto">
                                    {copy.title}
                                </h1>
                            </StaggerItem>
                            <StaggerItem>
                                <p className="leading-5 mb-4 xl:max-w-md xl:mx-auto">
                                    {copy.subtitle}
                                </p>
                            </StaggerItem>
                            <StaggerItem>
                                <Button
                                    href="https://shuvaloff.academia-rest.ru/grafskie-zavtraki?utm_source=hotels"
                                    target="_blank"
                                    variant="primary"
                                >
                                    {copy.bookLabel}
                                </Button>
                            </StaggerItem>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            <section className="flex flex-col gap-4 my-6 px-6 xl:text-center w-full xl:max-w-7xl xl:mx-auto xl:px-0">
                <FadeUp>
                    <h2>{copy.description1}</h2>
                </FadeUp>
                <FadeUp delay={0.1} className="xl:max-w-3xl xl:mx-auto">
                    <p>{copy.description2}</p>
                </FadeUp>
            </section>

            <section className="hidden flex-col gap-2 xl:flex-row xl:w-full xl:max-w-7xl xl:mx-auto xl:gap-10">
                <FadeUp className="flex-1">
                    <div className="relative aspect-4/3 h-full min-h-[350px] w-full overflow-hidden rounded">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9173.avif"
                            alt={copy.breakfastTitle1}
                            fill
                            loading="lazy"
                            sizes="(max-width: 1280px) 100vw, 50vw"
                            className="object-cover xl:object-[50%_70%]"
                        />
                    </div>
                </FadeUp>
                <div className="px-6 py-4 flex flex-col gap-4 xl:my-4 xl:flex-1 xl:gap-8">
                    <FadeUp>
                        <h3 className="font-alistair text-blue-800 text-4xl xl:text-5xl">
                            {copy.breakfastTitle1}
                        </h3>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <p className="xl:mt-2">{copy.breakfastDescription1}</p>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <Button
                            href={copy.breakfastLink1}
                            target="_blank"
                            variant="primary"
                            className="max-xl:w-full"
                        >
                            {copy.breakfastButtonLabel1}
                        </Button>
                    </FadeUp>
                </div>
            </section>

            <section className="hidden flex-col gap-2 xl:flex-row-reverse xl:w-full xl:max-w-7xl xl:mx-auto xl:gap-10">
                <FadeUp className="flex-1">
                    <div className="relative aspect-4/3 h-full min-h-[350px] w-full overflow-hidden rounded">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/IMG_9082.avif"
                            alt={copy.breakfastTitle2}
                            fill
                            loading="lazy"
                            sizes="(max-width: 1280px) 100vw, 50vw"
                            className="object-cover xl:object-[50%_70%]"
                        />
                    </div>
                </FadeUp>
                <div className="px-6 py-4 flex flex-col gap-4 xl:my-4 xl:flex-1 xl:gap-8">
                    <FadeUp>
                        <h3 className="font-alistair text-blue-800 text-4xl xl:text-5xl">
                            {copy.breakfastTitle2}
                        </h3>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <p className="xl:mt-2">{copy.breakfastDescription2}</p>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <Button
                            href={copy.breakfastLink2}
                            target="_blank"
                            variant="primary"
                            className="max-xl:w-full"
                        >
                            {copy.breakfastButtonLabel2}
                        </Button>
                    </FadeUp>
                </div>
            </section>

            <section className="flex flex-col gap-2 xl:flex-row-reverse xl:w-full xl:max-w-7xl xl:mx-auto xl:gap-10">
                <FadeUp className="flex-1">
                    <div className="relative aspect-4/3 h-full min-h-[350px] w-full overflow-hidden rounded">
                        <Image
                            src={copy.graphImage}
                            alt={copy.graphTitle}
                            fill
                            loading="lazy"
                            sizes="(max-width: 1280px) 100vw, 50vw"
                            className="object-cover xl:object-[50%_70%]"
                        />
                    </div>
                </FadeUp>
                <div className="px-6 py-2 flex flex-col gap-4 xl:my-2 xl:flex-1 xl:gap-4">
                    <FadeUp>
                        <h3 className="font-alistair text-blue-800 text-4xl xl:text-5xl">
                            {copy.graphTitle}:
                        </h3>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <div className="flex flex-col gap-3">
                            {copy.graphSections.map((group) => (
                                <div
                                    key={group.heading}
                                    className="flex flex-col gap-[0.1875rem]"
                                >
                                    <p className="font-semibold text-blue-800">
                                        {group.heading}:
                                    </p>
                                    {group.items.map((item) => (
                                        <p key={item}>• {item}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </FadeUp>
                    <FadeUp delay={0.2} className="flex flex-col items-start gap-2">
                        <Button
                            href={copy.breakfastLink2}
                            target="_blank"
                            variant="primary"
                        >
                            {copy.graphButtonLabel}
                        </Button>
                        <p className="italic">{copy.graphPrice}</p>
                    </FadeUp>
                </div>
            </section>

            <section className="flex flex-col gap-4 my-6 px-6 xl:text-center w-full xl:max-w-7xl xl:mx-auto xl:px-0 xl:gap-6">
                <FadeUp>
                    <h3 className="font-alistair text-blue-800 text-4xl xl:text-5xl">
                        {copy.quoteTitle1}
                    </h3>
                </FadeUp>
                <FadeUp delay={0.1} className="xl:max-w-2xl xl:mx-auto">
                    <p>{copy.quoteDescription1}</p>
                </FadeUp>
            </section>

            <section className="relative aspect-4/3 min-h-[350px] w-full overflow-hidden rounded xl:aspect-5/2 xl:w-[98%] xl:mx-auto xl:rounded-xl">
                <Image
                    src="https://academia.spb.ru/wp-content/uploads/2026/07/%D0%B3%D1%80%D0%B0%D1%84%D1%81%D0%BA%D0%B8%D0%B9-%D0%B7%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA-%D1%84%D0%BE%D0%BD.avif"
                    alt={copy.titleAlt}
                    fill
                    loading="lazy"
                    className="object-cover"
                />
            </section>

            <section className="flex flex-col gap-4 my-6 px-6 xl:text-center w-full xl:max-w-4xl xl:mx-auto xl:px-0 xl:gap-6">
                <FadeUp>
                    <h3 className="font-history uppercase text-lg/6 xl:text-2xl">
                        {copy.quoteTitle2}
                    </h3>
                </FadeUp>
                <FadeUp delay={0.1} className="xl:max-w-2xl xl:mx-auto">
                    <p>{copy.quoteDescription2}</p>
                </FadeUp>
                <FadeUp className="flex flex-col gap-4 justify-center xl:flex-row">
                    <Button
                        href="https://shuvaloff.academia-rest.ru/grafskie-zavtraki?utm_source=hotels#price"
                        target="_blank"
                        variant="primary"
                        size="sm"
                    >
                        {copy.bookBreakfastLabel}
                    </Button>
                    <Button
                        href={localizeHref("/booking/", locale)}
                        variant="primary-outline"
                        size="sm"
                    >
                        {copy.bookHotelLabel}
                    </Button>
                </FadeUp>
            </section>

            <StaggerContainer className="flex gap-2 h-65 xl:h-180 xl:gap-4 xl:w-full">
                {descImages.map((img, idx) => (
                    <StaggerItem
                        key={img.src}
                        className={`relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md ${idx === 2 ? "hidden xl:block" : ""}`}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes={
                                idx === 1
                                    ? "(max-width: 1200px) 100vw, 33vw"
                                    : "33vw"
                            }
                            loading="lazy"
                            className="object-cover"
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </main>
    );
}
