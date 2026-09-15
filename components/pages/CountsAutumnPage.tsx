import type React from "react";
import ContactsSection from "@/components/sections/ContactsSection";
import HeroHistoricalRooms from "@/components/sections/HeroHistoricalRooms";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import DividerHistory from "@/components/ui/divider/History";
import ImageGrid from "@/components/ui/grids/ImageGrid";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SliderMobile from "@/components/ui/slider/SliderMobile";
import type { Locale } from "@/lib/i18n/routing";
import { localizeHref } from "@/lib/i18n/routing";
import { buildWebPageSchema } from "@/lib/seo/schema";

type PageCopy = {
    title: string;
    additionalTitle: string;
    bookLabel: string;
    bullets: string[];
    cityTitle: string;
    cityDescription: string;
    days: {
        title: string;
        content: React.ReactNode;
    }[];
    day1Title1: string;
    day2Title1: string;
    day2Title2: string;
    visitTitle: string;
    visitDescription: React.ReactNode;
    historicTitle: string;
    historicDescription: string;
    specialMeetingTitle: string;
    specialMeetingDescription: string;
    spaTitle: string;
    spaDescription: string;
    breakfastTitle: string;
    breakfastDescription: string;
    cruiseTitle: string;
    cruiseDescription1: string;
    cruiseDescription2: string;
    cruiseDescription3: string;
    cultureTitle: string;
    cultureConcierge: string;
    footerText: React.ReactNode;
    alts: {
        mainHero: string;
        city: string;
        entrance: string;
        lounge: string;
        spa: string;
        breakfast: string;
        cruise: string;
        culture1: string;
        culture2: string;
    };
};

const copyByLocale: Record<Locale, PageCopy> = {
    ru: {
        title: "Графская осень",
        additionalTitle:
            "Атмосферный сценарий отдыха с аристократическими традициями",
        bookLabel: "Забронировать",
        bullets: [
            "Атмосферный исторический особняк",
            "Гастрономические традиции",
            "Лучший опыт погружения в эпоху XIX века",
        ],
        cityTitle: "Графская осень —",
        cityDescription: "готовая программа отдыха в осеннем Петербурге.",
        days: [
            {
                title: "1 день:",
                content: (
                    <>
                        <strong>Отдых по-графски</strong>
                        <span className="block h-1 xl:h-2"></span>• Трансфер
                        с&nbsp;вокзала&nbsp;/ из&nbsp;аэропорта в&nbsp;особняк
                        <br />• Личное приветствие графской семьей
                        и&nbsp;заселение
                        <br />• Трансфер в&nbsp;&laquo;Мастерскую пара&raquo;
                        <br />• Ритуал парения &laquo;Графские традиции&raquo;
                        <br />• Трансфер в&nbsp;особняк
                        <br />• Сет &laquo;Буржуа&raquo; в&nbsp;ресторане
                    </>
                ),
            },
            {
                title: "2 день:",
                content: (
                    <>
                        <strong>Графский эпилог</strong>
                        <span className="block h-1 xl:h-2"></span>• Легендарный
                        &laquo;Графский завтрак&raquo;&nbsp;&mdash; лучший
                        завтрак России по&nbsp;версии Where to&nbsp;eat'26
                        <br />• Трансфер в&nbsp;аэропорт&nbsp;/ на&nbsp;вокзал
                    </>
                ),
            },
        ],
        day1Title1: "1 день. Дневное время",
        day2Title1: "1 день. Вечернее время",
        day2Title2: "2 день. Утреннее время",
        visitTitle: "В гости к графу",
        visitDescription: (
            <>
                Особый сценарий осеннего отдыха, в&nbsp;котором продуманы все
                детали&nbsp;&mdash; от&nbsp;гастрономического путешествия сквозь
                время с&nbsp;&laquo;Графским завтраком&raquo; и&nbsp;сетом
                &laquo;Буржуа&raquo; с&nbsp;тремя видами икры в&nbsp;ресторане
                ACADEMIA Шувалова до&nbsp;согревающего ритуала парения
                &laquo;Графские традиции&raquo;.
            </>
        ),
        historicTitle: "ИСТОРИЧЕСКИЙ антураж",
        historicDescription:
            "Вы можете выбрать классический номер или остановиться в одном из исторических люксов-резиденций графа Шувалова и графини Воронцовой-Дашковой, в которых сохранены подлинные исторические детали и добавлены винтажные и антикварные предметы интерьера, чтобы вы могли погрузиться в атмосферу ушедшей эпохи.",
        specialMeetingTitle: "Особая встреча",
        specialMeetingDescription:
            "Мы встретим вас в аэропорту или на вокзале и доставим в особняк на индивидуальном трансфере представительского класса. Здесь вас поприветствует, расскажет об истории особняка, проводит в номер и лично угостит фирменной вишневой настойкой по семейному рецепту сам граф Шувалов с семьей.",
        spaTitle: "СОГРЕВАЮЩИЙ РИТУАЛ ПАРЕНИЯ «ГРАФСКИЕ ТРАДИЦИИ»",
        spaDescription:
            "Индивидуальный трансфер доставит вас в премиальный банный комплекс «Мастерская пара» на Петроградской стороне. Вас ждет двухчасовая программа парения «Графские традиции» из трех этапов: мягкого прогрева веерами с ароматами свежей мяты, глубокого парения дубовыми вениками, расслабления в теплой цитрусовой купели и пеленания на душистом луговом сене.",
        breakfastTitle: "УЖИН В РЕСТОРАНЕ ACADEMIA ШУВАЛОВА",
        breakfastDescription:
            "Аристократическое завершение дня — специальный сет «Буржуа», в котором в духе XIX века соединяются русская культура застолья и французские гастрономические традиции. Румяные блины из печи с тремя видами икры — черной, красной и щучьей, сметанным кремом, тертым яйцом à la «Мимоза», свежими и солеными огурцами, изумрудными яблоками, картофельными чипсами и печеным картофелем. В дополнение к сету: запеченный камамбер, свежая бриошь и солодовые булочки с соленым маслом.",
        cruiseTitle: "ГРАФСКИЙ ЗАВТРАК",
        cruiseDescription1: "Изысканная трапеза в графском особняке.",
        cruiseDescription2:
            "Чтобы в полной мере почувствовать себя дорогим гостем графского особняка и настроиться на неторопливый ритм жизни петербургского высшего общества, вы побываете на настоящем графском завтраке с изысканным набором блюд и подачей на винтажной посуде в историческом интерьере ресторана ACADEMIA Шувалова.",
        cruiseDescription3:
            "После «Графского завтрака» индивидуальный трансфер с комфортом доставит вас в аэропорт или на вокзал.",
        cultureTitle: "Культурный Петербург",
        cultureConcierge:
            "Служба консьержей ACADEMIA поможет организовать дополнительную культурную программу: эксклюзивные экскурсии, например, на Императорский фарфоровый завод с мастер-классом, Эрмитаж или Русский музей без очереди, билеты на камерные концерты, знаковые спектакли и актуальные выставки.",
        footerText: (
            <>
                Соберите особую коллекцию впечатлений вашего аристократического
                отдыха!
            </>
        ),
        alts: {
            mainHero: "Графская осень",
            city: "Графская осень в особняке Шувалова",
            entrance: "Вход",
            lounge: "Лаундж",
            spa: "Ритуал парения «Графские традиции»",
            breakfast: "Ужин в ресторане ACADEMIA Шувалова",
            cruise: "Графский завтрак",
            culture1: "Культурная программа в Петербурге",
            culture2: "Отель-особняк в Санкт-Петербурге",
        },
    },
    en: {
        title: "Count's Autumn",
        additionalTitle:
            "An atmospheric getaway scripted around aristocratic traditions",
        bookLabel: "Book now",
        bullets: [
            "Atmospheric historic mansion",
            "Gastronomic traditions",
            "The best immersion into the 19th-century era",
        ],
        cityTitle: "Count's Autumn —",
        cityDescription: "a ready-made autumn getaway in St. Petersburg.",
        days: [
            {
                title: "Day 1:",
                content: (
                    <>
                        <strong>A Count's-Style Getaway</strong>
                        <span className="block h-1 xl:h-2"></span>• Transfer
                        from the train station / airport to the mansion
                        <br />• Personal welcome by the count's family and
                        check-in
                        <br />• Transfer to the &laquo;Steam Workshop&raquo;
                        <br />• The &laquo;Count's Traditions&raquo; steam
                        ritual
                        <br />• Transfer back to the mansion
                        <br />• The &laquo;Bourgeois&raquo; set menu at the
                        restaurant
                    </>
                ),
            },
            {
                title: "Day 2:",
                content: (
                    <>
                        <strong>The Count's Epilogue</strong>
                        <span className="block h-1 xl:h-2"></span>• The
                        legendary &laquo;Count's Breakfast&raquo;&nbsp;&mdash;
                        the best breakfast in Russia according to Where
                        to&nbsp;eat'26
                        <br />• Transfer to the airport / train station
                    </>
                ),
            },
        ],
        day1Title1: "Day 1. Daytime",
        day2Title1: "Day 1. Evening",
        day2Title2: "Day 2. Morning",
        visitTitle: "Visit the Count",
        visitDescription: (
            <>
                A special autumn getaway where every detail is thought
                through&nbsp;&mdash; from a gastronomic journey through time
                with the &laquo;Count's Breakfast&raquo; and the
                &laquo;Bourgeois&raquo; set with three kinds of caviar at the
                ACADEMIA Shuvalov restaurant, to the warming &laquo;Count's
                Traditions&raquo; steam ritual.
            </>
        ),
        historicTitle: "HISTORIC Setting",
        historicDescription:
            "You can choose a classic room or stay in one of the historic suites-residences of Count Shuvalov and Countess Vorontsova-Dashkova, where the original historic details have been preserved and vintage and antique interior pieces added, so that you can immerse yourself in the atmosphere of a bygone era.",
        specialMeetingTitle: "Special Meeting",
        specialMeetingDescription:
            "We will meet you at the airport or the train station and take you to the mansion in an individual executive-class transfer. Here Count Shuvalov himself and his family will greet you, tell you about the history of the mansion, walk you to your room, and personally treat you to the signature cherry liqueur made to a family recipe.",
        spaTitle: "THE WARMING «COUNT'S TRADITIONS» STEAM RITUAL",
        spaDescription:
            "An individual transfer will take you to the premium bathhouse «Masterskaya Para» on the Petrogradskaya side. A two-hour «Count's Traditions» steam programme awaits you, in three stages: a gentle warm-up with fans scented with fresh mint, deep steaming with oak besoms, relaxation in a warm citrus tub and a wrap in fragrant meadow hay.",
        breakfastTitle: "DINNER AT THE ACADEMIA SHUVALOV RESTAURANT",
        breakfastDescription:
            "An aristocratic end to the day — the special «Bourgeois» set, where the Russian culture of the table meets French gastronomic traditions in the spirit of the 19th century. Golden oven-baked blini with three kinds of caviar — black, red and pike — sour-cream mousse, grated egg à la «Mimosa», fresh and pickled cucumbers, emerald apples, potato crisps and baked potato. Served alongside the set: baked camembert, fresh brioche and malt buns with salted butter.",
        cruiseTitle: "THE COUNT'S BREAKFAST",
        cruiseDescription1: "An exquisite meal at the count's mansion.",
        cruiseDescription2:
            "To feel like a treasured guest of the count's mansion and tune in to the unhurried rhythm of St. Petersburg high society, you will sit down to a genuine count's breakfast: an exquisite selection of dishes served on vintage tableware in the historic interior of the ACADEMIA Shuvalov restaurant.",
        cruiseDescription3:
            "After the «Count's Breakfast», an individual transfer will take you in comfort to the airport or the train station.",
        cultureTitle: "Cultural St. Petersburg",
        cultureConcierge:
            "The ACADEMIA concierge service will help arrange an additional cultural programme: exclusive tours — for example, to the Imperial Porcelain Factory with a master class — skip-the-line access to the Hermitage or the Russian Museum, and tickets to chamber concerts, landmark performances and current exhibitions.",
        footerText: (
            <>
                Collect a special collection of impressions from your
                aristocratic getaway!
            </>
        ),
        alts: {
            mainHero: "Count's Autumn",
            city: "Count's Autumn at the Shuvalov Mansion",
            entrance: "Entrance",
            lounge: "Lounge",
            spa: "The «Count's Traditions» steam ritual",
            breakfast: "Dinner at the ACADEMIA Shuvalov restaurant",
            cruise: "The Count's Breakfast",
            culture1: "Cultural programme in St. Petersburg",
            culture2: "Mansion hotel in St. Petersburg",
        },
    },
};

const descriptionImages: { src: string; objectPosition?: string }[] = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/09/hf_20260911_224620_c93a3b53-1a5c-4e93-a222-e5be086dbe67-1.png",
        // По центру кадр режет лицо — смещаем кадр влево.
        objectPosition: "32% center",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/09/IMG_1185-scaled.jpg",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-235.png",
    },
];

const cultureImages = [
    "https://academia.spb.ru/wp-content/uploads/2026/09/hf_20260911_224907_a19fc67f-f276-4a82-a6dc-c97a0f211056.png",
    "https://academia.spb.ru/wp-content/uploads/2026/09/hf_20260911_232838_d56a18c4-cc92-41ee-960c-61eef0b56781.png",
];

const seo = {
    ru: {
        name: "Графская осень",
        description:
            "Атмосферный сценарий отдыха с аристократическими традициями",
        crumbs: ["Главная"],
    },
    en: {
        name: "Count's Autumn",
        description:
            "An atmospheric getaway scripted around aristocratic traditions",
        crumbs: ["Home"],
    },
} as const;

const PARENT_PATHS = ["/"] as const;

/** Блок трёх буллетов под hero: выключен, разметка оставлена на будущее. */
const SHOW_BULLETS = false;

export default function CountsAutumnPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const bookingHref = "/booking/?&be-offer=972472";

    return (
        <main className="flex flex-col gap-4 xl:-mt-4">
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: "/counts-autumn/",
                    name: seo[locale].name,
                    description: seo[locale].description,
                    breadcrumbs: [
                        ...seo[locale].crumbs.map((name, i) => ({
                            name,
                            path: PARENT_PATHS[i],
                        })),
                        { name: seo[locale].name, path: "/counts-autumn/" },
                    ],
                })}
            />

            <HeroHistoricalRooms
                title={copy.title}
                additionalTitle={copy.additionalTitle}
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/09/горизонталь-1.png",
                    alt: copy.alts.mainHero,
                    // На мобиле кадр по центру срезает людей.
                    className: "max-xl:object-[17%_center]",
                }}
                button={{
                    label: copy.bookLabel,
                    href: localizeHref(bookingHref, locale),
                }}
            />

            {/* Блок трёх буллетов временно скрыт по просьбе заказчика —
                разметка и копирайт сохранены, чтобы вернуть его одним флагом. */}
            {SHOW_BULLETS && (
                <StaggerContainer
                    staggerChildren={0.05}
                    className="grid mx-6 gap-4 xl:grid-cols-3 xl:w-full xl:max-w-7xl xl:mx-auto"
                >
                    {copy.bullets.map((item) => (
                        <StaggerItem
                            key={item}
                            className="text-center text-lg font-history uppercase bg-gray-100 p-6 rounded"
                        >
                            <DividerHistory style={3} />
                            {item}
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            )}

            <section className="mx-6 flex flex-col gap-4 xl:w-full xl:max-w-7xl xl:mx-auto xl:flex-row xl:gap-8 mt-6 mb-4 xl:mt-10 xl:mb-6">
                <div className="flex flex-col gap-4 xl:w-full">
                    <p className="font-history font-semibold uppercase text-3xl/2 xl:text-4xl/4">
                        {copy.cityTitle}
                    </p>
                    <p>{copy.cityDescription}</p>
                    <div className="relative h-56 overflow-hidden rounded xl:h-full">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/09/hf_20260911_213818_4369aade-1332-4494-8682-4d37758e336e-2.png"
                            alt={copy.alts.city}
                            fill
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                </div>

                <StaggerContainer
                    staggerChildren={0.1}
                    className="p-4 xl:p-6 bg-gray-100 flex flex-col gap-6 xl:gap-9 xl:w-full"
                >
                    {copy.days.map((day) => (
                        <StaggerItem
                            key={day.title}
                            className="flex flex-col gap-2 flex-row xl:gap-4"
                        >
                            <p className="font-alistair text-2xl -mt-2 xl:text-3xl w-full max-w-[85px]">
                                {day.title}
                            </p>
                            <p>{day.content}</p>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>

            <section className="mx-6 mt-6 xl:w-full xl:max-w-7xl xl:mx-auto">
                <FadeUp className="flex flex-col gap-2">
                    <h2>{copy.visitTitle}</h2>
                    <p>{copy.visitDescription}</p>
                </FadeUp>
            </section>

            <SliderMobile
                images={descriptionImages.map((image) => ({
                    ...image,
                    alt: copy.alts.mainHero,
                }))}
            />
            <StaggerContainer
                mode="inView"
                className="hidden xl:flex xl:h-110 xl:mt-4 xl:gap-4 xl:max-w-7xl xl:mx-auto xl:w-full"
            >
                {descriptionImages.map((image, i) => (
                    <StaggerItem
                        key={image.src}
                        className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md"
                    >
                        <Image
                            src={image.src}
                            alt={copy.alts.mainHero}
                            fill
                            sizes={
                                i === 0
                                    ? "33vw"
                                    : "(max-width: 1200px) 100vw, 33vw"
                            }
                            loading="lazy"
                            className="object-cover"
                            style={
                                image.objectPosition
                                    ? { objectPosition: image.objectPosition }
                                    : undefined
                            }
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <div className="flex flex-col gap-4 bg-gray-100 px-6 py-8 xl:-mt-20 xl:pt-24 xl:pb-4">
                <FadeUp
                    duration={1.2}
                    className="flex flex-col gap-4 xl:text-center xl:max-w-7xl xl:mx-auto"
                >
                    <h2 className="uppercase">{copy.historicTitle}</h2>
                    <p className="xl:max-w-5xl xl:mx-auto">
                        {copy.historicDescription}
                    </p>
                </FadeUp>
                <DividerHistory style={2} />
            </div>

            <FadeUp className="mx-6 my-2 xl:text-center flex flex-col gap-2 xl:w-full xl:max-w-7xl xl:mx-auto">
                <h2>{copy.specialMeetingTitle}</h2>
                <p className="xl:max-w-4xl xl:mx-auto">
                    {copy.specialMeetingDescription}
                </p>
                <ImageGrid
                    singleOnMobile
                    images={[
                        {
                            src: "https://academia.spb.ru/wp-content/uploads/2026/09/hf_20260911_225619_e33d1118-cf9d-4251-8d06-e1e37aff8962-1.png",
                            alt: copy.alts.entrance,
                        },
                        {
                            src: "https://academia.spb.ru/wp-content/uploads/2026/05/2.png",
                            alt: copy.alts.lounge,
                        },
                    ]}
                />
                <DividerHistory style={3} />
            </FadeUp>

            <FadeUp duration={1.2} className="bg-gray-100">
                <div className="mx-6 my-8 xl:text-center flex flex-col gap-4 xl:w-full xl:max-w-7xl xl:mx-auto xl:my-10">
                    <p className="font-alistair text-center text-2xl text-gray-700 border rounded-2xl border-gray-300 max-w-fit px-4 mx-auto">
                        {copy.day1Title1}
                    </p>
                    <h2>{copy.spaTitle}</h2>
                    <p className="xl:max-w-4xl xl:mx-auto">
                        {copy.spaDescription}
                    </p>
                    <ImageGrid
                        singleOnMobile
                        images={[
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/09/hf_20260912_003336_9c331aba-3cdf-4240-bfba-593db4ad381b-1.png",
                                alt: copy.alts.spa,
                            },
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/09/ChatGPT-Image-15-сент.-2026-г.-15_51_54.jpg",
                                alt: copy.alts.spa,
                            },
                        ]}
                    />
                    <DividerHistory style={2} />
                </div>
            </FadeUp>

            <FadeUp
                duration={1.2}
                className="mx-6 my-8 flex flex-col gap-6 xl:w-full xl:max-w-7xl xl:mx-auto xl:flex-row xl:gap-10 xl:my-10"
            >
                <div className="relative w-full">
                    <div className="relative overflow-hidden aspect-21/15 rounded xl:mt-12 xl:-translate-x-6">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/09/hf_20260912_001642_11aae5bb-899b-49e2-bea8-07cbeb34264e-1.png"
                            alt={copy.alts.breakfast}
                            fill
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <p className="font-alistair text-center text-2xl text-gray-700 border rounded-2xl border-gray-300 max-w-fit px-4 mx-auto">
                        {copy.day2Title1}
                    </p>
                    <h2 className="text-center">{copy.breakfastTitle}</h2>
                    <DividerHistory style={3} />
                    <p>{copy.breakfastDescription}</p>
                </div>
            </FadeUp>

            <section className="bg-gray-100">
                <StaggerContainer
                    mode="inView"
                    className="m-6 xl:text-center flex flex-col gap-2 xl:w-full xl:max-w-7xl xl:mx-auto"
                >
                    <p className="font-alistair text-center text-2xl text-gray-700 border rounded-2xl border-gray-300 max-w-fit px-4 mx-auto mb-2">
                        {copy.day2Title2}
                    </p>
                    <StaggerItem>
                        <h2>{copy.cruiseTitle}</h2>
                    </StaggerItem>

                    <StaggerItem className="flex flex-col gap-3 xl:max-w-4xl xl:mx-auto">
                        <p>{copy.cruiseDescription1}</p>
                        <p>{copy.cruiseDescription2}</p>
                    </StaggerItem>
                    <StaggerItem>
                        <ImageGrid
                            singleOnMobile
                            images={[
                                {
                                    src: "https://academia.spb.ru/wp-content/uploads/2026/09/hf_20260911_232627_6aaffcd6-6661-45bd-b7c9-d21a1cce0050-scaled.png",
                                    alt: copy.alts.cruise,
                                },
                                {
                                    src: "https://academia.spb.ru/wp-content/uploads/2026/09/IMG_1185-1.jpg",
                                    alt: copy.alts.cruise,
                                },
                            ]}
                        />
                    </StaggerItem>
                    <StaggerItem className="xl:max-w-2xl xl:mx-auto">
                        {copy.cruiseDescription3}
                    </StaggerItem>

                    <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                        <DividerHistory style={3} />
                    </StaggerItem>
                </StaggerContainer>
            </section>

            <section className="p-6 xl:py-8">
                <div className="flex flex-col gap-2 xl:w-full xl:max-w-7xl xl:mx-auto">
                    <div className="flex flex-col gap-2 xl:max-w-4xl xl:mx-auto xl:text-center">
                        <h2>{copy.cultureTitle}</h2>
                    </div>
                    <DividerHistory style={3} />

                    {/* Mobile */}
                    <div className="xl:hidden space-y-4">
                        <p>{copy.cultureConcierge}</p>

                        {/* Только первое фото: пара квадратов на мобиле мельчит. */}
                        <div className="relative aspect-[16/9] overflow-hidden rounded">
                            <Image
                                src={cultureImages[0]}
                                alt={copy.alts.culture1}
                                fill
                                className="object-cover object-right"
                                sizes="100vw"
                            />
                        </div>
                    </div>

                    {/* Desktop */}
                    <div className="hidden xl:flex">
                        {/* Левое фото */}
                        <div className="relative shrink-0 w-[48%] overflow-hidden rounded h-90">
                            <Image
                                src={cultureImages[0]}
                                alt={copy.alts.culture1}
                                fill
                                className="object-cover object-right"
                                sizes="48%"
                            />
                        </div>

                        {/* Правая колонка: текст + фото */}
                        <div className="flex-1 flex flex-col -ml-8">
                            <p className="mb-8 pl-24">
                                {copy.cultureConcierge}
                            </p>

                            {/* Правое фото */}
                            <div className="relative w-full h-90 overflow-hidden rounded">
                                <Image
                                    src={cultureImages[1]}
                                    alt={copy.alts.culture2}
                                    fill
                                    className="object-cover"
                                    sizes="55%"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StaggerContainer
                mode="inView"
                className="xl:text-center m-6 flex flex-col gap-4"
            >
                <StaggerItem>
                    <p className="font-alistair text-2xl/7 xl:text-4xl/10 xl:max-w-5xl xl:mx-auto">
                        {copy.footerText}
                    </p>
                </StaggerItem>
                <StaggerItem className="flex flex-col gap-3 my-4 xl:flex-row xl:justify-center">
                    <Button
                        href={localizeHref(bookingHref, locale)}
                        variant="primary"
                    >
                        {copy.bookLabel}
                    </Button>
                </StaggerItem>
            </StaggerContainer>

            <Divider dark />
            <ContactsSection />
        </main>
    );
}
