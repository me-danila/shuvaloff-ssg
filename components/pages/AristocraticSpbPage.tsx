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
    day3Title1: string;
    visitTitle: string;
    visitDescription: React.ReactNode;
    historicTitle: string;
    historicDescription: string;
    specialMeetingTitle: string;
    specialMeetingDescription: string;
    spaTitle: string;
    spaDescription: string;
    breakfastTitle: string;
    breakfastQuote: string;
    breakfastDescription: string;
    cruiseTitle: string;
    cruiseDescription1: string;
    cruiseDescription2: string;
    cruiseDescription3: string;
    cultureTitle: string;
    cultureDescription: string;
    cultureConcierge: string;
    footerText: React.ReactNode;
    footerQuote: string;
    alts: {
        mainHero: string;
        city: string;
        coatOfArms: string;
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
        title: "Графский Петербург",
        additionalTitle:
            "Особый отдых в формате пышных аристократических традиций",
        bookLabel: "Забронировать",
        bullets: [
            "Атмосферный исторический особняк",
            "Гастрономические традиции",
            "Лучший опыт погружения в эпоху XIX века",
        ],
        cityTitle: "Петербург —",
        cityDescription:
            "город многогранный, поэтому узнавать его можно по-разному.",
        days: [
            {
                title: "1 день:",
                content: (
                    <>
                        <strong>Расслабление с&nbsp;дороги</strong>
                        <span className="block h-2 xl:h-4"></span>• Трансфер
                        с&nbsp;вокзала или аэропорта до&nbsp;особняка
                        <br />• Личное приветствие Графом и&nbsp;заселение
                        <br />• Велнес-ритуал на&nbsp;ваш выбор в&nbsp;Академиа
                        СПА
                    </>
                ),
            },
            {
                title: "2 день:",
                content: (
                    <>
                        <strong>Отдых по-графски</strong>
                        <span className="block h-2 xl:h-4"></span>• Графские
                        завтраки&nbsp;&mdash; лучшие в&nbsp;России
                        по&nbsp;версии
                        <br />
                        Where to eat'26
                        <br />• Ретро-кабриолет&nbsp;&mdash; эффектная поездка
                        по&nbsp;Петербургу
                        <br />• Катер с&nbsp;авторской лекцией
                        от&nbsp;искусствоведа
                    </>
                ),
            },
            {
                title: "3 день:",
                content: (
                    <>
                        <strong>Графский эпилог</strong>
                        <span className="block h-2 xl:h-4"></span>• Завтрак
                        от&nbsp;шефа
                        <br />• Памятный презент от&nbsp;графской семьи
                        <br />• Трансфер от&nbsp;особняка
                        до&nbsp;вокзала/аэропорта
                    </>
                ),
            },
        ],
        day1Title1: "1 день, вечернее время",
        day2Title1: "2 день, позднее утро",
        day2Title2: "2 день, дневное время",
        day3Title1: "3 день, дневное время",
        visitTitle: "В гости к графу",
        visitDescription: (
            <>
                &laquo;Графский Петербург&raquo;&nbsp;&mdash; это приглашение
                в&nbsp;гости к&nbsp;графу Шувалову в&nbsp;его особняк XIX века
                на&nbsp;Моховой улице, расположенный рядом с&nbsp;великолепными
                набережными Фонтанки и&nbsp;Невы, Михайловским замком, Русским
                музеем и&nbsp;Летним садом. Но, кроме прогулок по&nbsp;самым
                красивым местам исторического центра, вас ждет продуманная
                и&nbsp;насыщенная впечатлениями программа отдыха, достойная
                гостей графа Шувалова.
                <br />
                <br />
                Позвольте себе никуда не&nbsp;спешить и&nbsp;ничего
                не&nbsp;планировать, сделайте паузу и&nbsp;погрузитесь
                в&nbsp;атмосферу графского Петербурга.
            </>
        ),
        historicTitle: "ИСТОРИЧЕСКИЙ антураж",
        historicDescription:
            "Вы можете остановиться в классическом номере или выбрать один из просторных исторических люксов-резиденций графа Шувалова и графини Воронцовой-Дашковой, в которых сохранены подлинные исторические детали отделки этих залов и добавлены винтажные и антикварные предметы интерьера, помогающие погрузиться в легкую ностальгию по ушедшей прекрасной эпохе.",
        specialMeetingTitle: "Особая встреча",
        specialMeetingDescription:
            "Ваш отдых начнется со встречи в аэропорту или на вокзале и индивидуального трансфера представительского класса в Особняк Шувалова. Здесь вас встретит, расскажет об истории особняка, проводит в номер и лично угостит фирменной вишневой настойкой по семейному рецепту сам граф Шувалов с семьей.",
        spaTitle: "Отдых в АКАДЕМИА СПА",
        spaDescription:
            "Чтобы отдохнуть после дороги и знакомства с особняком, предлагаем завершить ваш первый день расслабляющим массажем в камерном пространстве Академиа СПА на четвертом этаже особняка, где все продумано в деталях: индивидуальный подход и техники массажа, подходящие именно вашему телу и лицу.",
        breakfastTitle: "ГРАФСКИЙ завтрак",
        breakfastQuote: "Это утро, которое вы запомните надолго!",
        breakfastDescription:
            "Предлагаем вам красивое начало самого насыщенного дня вашей программы. Чтобы в полной мере ощутить истинно аристократический гедонизм и настроиться на неторопливый ритм жизни петербургского высшего общества, необходим настоящий графский завтрак — без суеты спешки, но с изысканным набором блюд, поданных на подлинной винтажной посуде в историческом интерьере бара-ресторана ACADEMIA Шувалова на первом этаже особняка.",
        cruiseTitle: "ПРОГУЛКА-ФУРШЕТ на катере",
        cruiseDescription1:
            "После гастрономических впечатлений мы приглашаем вас отправиться за эстетическими — на водную прогулку по рекам и каналам Петербурга на фирменном катере.",
        cruiseDescription2:
            "Вас будет сопровождать наш лектор искусствовед со специально разработанной экскурсией. Вас ждут дворцовые тайны, невероятные интриги, секреты знатных семей, неписаные правила и традиции дворянской жизни XIX века, и, конечно, сам город во всем его имперском великолепии с лучшего ракурса и ваши фото на память.",
        cruiseDescription3:
            "В качестве приятного дополнения к пище духовной — легкий изысканный фуршет на катере в французском стиле от Брассери Академиа с традиционными закусками, сырами, десертами и вином.",
        cultureTitle: "Культурный Петербург",
        cultureDescription:
            "Третий день вашего графского путешествия предлагаем начать с изысканного завтрака в баре-ресторане в особняке по специальному сет-меню от бренд-шефа и посвятить культурной программе.",
        cultureConcierge:
            "Консьерж-сервис в Академиа как ваш личный проводник в бескрайнем мире событий и мероприятий Петербурга поможет организовать отдых любого формата: эксклюзивные экскурсии, например, на Императорский фарфоровый завод с мастер-классом, Эрмитаж или Русский музей без очереди, билеты на камерные концерты, знаковые спектакли и актуальные выставки.",
        footerText: (
            <>
                Специальное предложение &laquo;Графский Петербург&raquo;
                от&nbsp;Академиа особняк Шувалова&nbsp;&mdash;
                <br />
                это&nbsp;мостик к&nbsp;культурному и&nbsp;полноценному отдыху.
                <br />
                <br />
                Для гостей, ценящих наследие, для тех, кто хочет прожить свой
                лучший опыт погружения в&nbsp;эпоху прошлых веков.
            </>
        ),
        footerQuote:
            "Соберите особую коллекцию впечатлений вашего аристократического отдыха!",
        alts: {
            mainHero: "Графский Петербург",
            city: "Петербург",
            coatOfArms: "Герб ACADEMIA Особняк Шувалова",
            entrance: "Вход",
            lounge: "Лаундж",
            spa: "СПА",
            breakfast: "Графский завтрак",
            cruise: "Прогулка-фуршет на катере",
            culture1: "Представительский трансфер",
            culture2: "Отель-особняк в Санкт-Петербурге",
        },
    },
    en: {
        title: "Aristocratic St. Petersburg",
        additionalTitle:
            "A special getaway in the style of grand aristocratic traditions",
        bookLabel: "Book now",
        bullets: [
            "Atmospheric historic mansion",
            "Gastronomic traditions",
            "The best immersion into the 19th-century era",
        ],
        cityTitle: "Petersburg —",
        cityDescription:
            "is a multifaceted city, so it can be experienced in many different ways.",
        days: [
            {
                title: "Day 1:",
                content: (
                    <>
                        <strong>Relaxing after a long trip</strong>
                        <span className="block h-2 xl:h-4"></span>• Transfer
                        from the train station or airport to the mansion
                        <br />• Personal welcome by the Count and check-in
                        <br />• A wellness ritual of your choice at the Academia
                        SPA
                    </>
                ),
            },
            {
                title: "Day 2:",
                content: (
                    <>
                        <strong>A Count's-Style Getaway</strong>
                        <span className="block h-2 xl:h-4"></span>• Count's
                        Breakfasts—Voted the Best in Russia by Where to Eat '26
                        <br />• A Retro Convertible—A Spectacular Tour of St.
                        Petersburg
                        <br />• A Boat Tour with a Special Lecture by an Art
                        Historian
                    </>
                ),
            },
            {
                title: "Day 3:",
                content: (
                    <>
                        <strong>The Count’s Epilogue</strong>
                        <span className="block h-2 xl:h-4"></span>• Breakfast by
                        the chef
                        <br />• A commemorative gift from the count’s family
                        <br />• Transfer from the mansion to the train
                        station/airport
                    </>
                ),
            },
        ],
        day1Title1: "Day 1, evening",
        day2Title1: "Day 2, late morning",
        day2Title2: "Day 2, daytime",
        day3Title1: "Day 3, daytime",
        visitTitle: "Visit the Count",
        visitDescription: (
            <>
                &laquo;Aristocratic St. Petersburg&raquo;&nbsp;&mdash; is an
                invitation to visit Count Shuvalov in his 19th-century mansion
                on Mokhovaya Street, located near the magnificent embankments of
                the Fontanka and Neva, St. Michael's Castle, the Russian Museum,
                and the Summer Garden. But beyond walks through the most
                beautiful places of the historical center, a thoughtfully
                curated and experience-rich holiday program awaits you, worthy
                of Count Shuvalov's guests.
                <br />
                <br />
                Allow yourself not to rush anywhere and not to plan anything,
                take a pause and immerse yourself in the atmosphere of
                aristocratic Saint Petersburg.
            </>
        ),
        historicTitle: "HISTORIC Setting",
        historicDescription:
            "You can stay in a classic room or choose one of the spacious historic suites-residences of Count Shuvalov and Countess Vorontsova-Dashkova, where the original historic decorative details of these halls have been preserved and vintage and antique interior items have been added, helping to immerse you in a light nostalgia for a bygone beautiful era.",
        specialMeetingTitle: "Special Meeting",
        specialMeetingDescription:
            "Your vacation will begin with a meeting at the airport or station and an individual executive-class transfer to the Shuvalov Mansion. Here you will be met by Count Shuvalov himself with his family, who will tell you about the history of the mansion, accompany you to your room, and personally treat you to a signature cherry liqueur made according to a family recipe.",
        spaTitle: "Rest at ACADEMIA SPA",
        spaDescription:
            "To unwind after your journey and your tour of the mansion, we invite you to end your first day with a relaxing massage in the intimate setting of the Academia SPA on the fourth floor of the mansion, where every detail has been carefully considered: a personalized approach and massage techniques tailored specifically to your body and face.",
        breakfastTitle: "COUNT'S Breakfast",
        breakfastQuote: "This is a morning you will remember for a long time!",
        breakfastDescription:
            "We invite you to start the most eventful day of your itinerary on a beautiful note. To fully experience true aristocratic hedonism and attune yourself to the leisurely pace of St. Petersburg’s high society, you need a genuine count’s breakfast — free from the hustle and bustle, but featuring an exquisite selection of dishes served on authentic vintage tableware in the historic interior of the ACADEMIA Shuvalov bar-restaurant on the ground floor of the mansion.",
        cruiseTitle: "WATER CRUISE with Buffet",
        cruiseDescription1:
            "After indulging in some culinary delights, we invite you to enjoy a scenic cruise along St. Petersburg’s rivers and canals aboard our signature boat.",
        cruiseDescription2:
            "You will be accompanied by our art historian guide on a specially designed tour. Awaiting you are palace secrets, incredible intrigues, the secrets of noble families, the unwritten rules and traditions of 19th-century aristocratic life, and, of course, the city itself in all its imperial splendor, viewed from the best vantage points, along with photos to take home as a memento. ",
        cruiseDescription3:
            "As a pleasant addition to the spiritual food — a light exquisite buffet on the boat in French style from Brasserie ACADEMIA with traditional snacks, cheeses, desserts, and wine.",
        cultureTitle: "Cultural St. Petersburg",
        cultureDescription:
            "We suggest starting the third day of your noble journey with an exquisite breakfast in the bar-restaurant in the mansion according to a special set-menu from the brand chef and dedicating it to a cultural program.",
        cultureConcierge:
            "The concierge service at ACADEMIA, as your personal guide in the endless world of St. Petersburg events and activities, will help organize a holiday of any format: exclusive excursions, for example, to the Imperial Porcelain Factory with a master class, the Hermitage or the Russian Museum without a queue, tickets for chamber concerts, iconic performances, and relevant exhibitions.",
        footerText: (
            <>
                The &laquo;Aristocratic St. Petersburg&raquo; special offer from
                ACADEMIA Mansion Shuvalov&nbsp;&mdash;
                <br />
                is a bridge to cultural and complete relaxation.
                <br />
                <br />
                For guests who value heritage, for those who want to live their
                best experience of immersion in the era of past centuries.
            </>
        ),
        footerQuote:
            "Collect a special collection of impressions of your aristocratic vacation!",
        alts: {
            mainHero: "Aristocratic St. Petersburg",
            city: "Petersburg",
            coatOfArms: "ACADEMIA Mansion Shuvaloff Coat of Arms",
            entrance: "Entrance",
            lounge: "Lounge",
            spa: "SPA",
            breakfast: "Count's Breakfast",
            cruise: "Water cruise with buffet",
            culture1: "Executive transfer",
            culture2: "Mansion hotel in St. Petersburg",
        },
    },
};

const descriptionImages = [
    "https://academia.spb.ru/wp-content/uploads/2026/05/IMG_7225.avif",
    "https://academia.spb.ru/wp-content/uploads/2026/05/IMG_9173.avif",
    "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-235.png",
];

const cultureImages = [
    "https://academia.spb.ru/wp-content/uploads/2026/04/culture1.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/04/culture2.jpg",
];

const seo = {
    ru: {
        name: "Графский Петербург",
        description: "Особый отдых в формате пышных аристократических традиций",
        crumbs: ["Главная"],
    },
    en: {
        name: "Aristocratic St. Petersburg",
        description:
            "A special getaway in the style of grand aristocratic traditions",
        crumbs: ["Home"],
    },
} as const;

const PARENT_PATHS = ["/"] as const;

export default function AristocraticSpbPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const bookingHref = "/booking/?&be-offer=910895";

    return (
        <main className="flex flex-col gap-4 xl:-mt-4">
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: "/aristocratic-spb/",
                    name: seo[locale].name,
                    description: seo[locale].description,
                    breadcrumbs: [
                        ...seo[locale].crumbs.map((name, i) => ({
                            name,
                            path: PARENT_PATHS[i],
                        })),
                        { name: seo[locale].name, path: "/aristocratic-spb/" },
                    ],
                })}
            />

            <HeroHistoricalRooms
                title={copy.title}
                additionalTitle={copy.additionalTitle}
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/from-rest.jpg",
                    alt: copy.alts.mainHero,
                }}
                button={{
                    label: copy.bookLabel,
                    href: localizeHref(bookingHref, locale),
                }}
            />

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

            <section className="mx-6 flex flex-col gap-4 xl:w-full xl:max-w-7xl xl:mx-auto xl:flex-row xl:gap-8 my-4 xl:my-6">
                <div className="flex flex-col gap-4 xl:w-full">
                    <p className="font-history uppercase text-3xl/2 xl:text-4xl/4">
                        {copy.cityTitle}
                    </p>
                    <p>{copy.cityDescription}</p>
                    <div className="relative h-80 overflow-hidden rounded xl:h-full">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/spb.png"
                            alt={copy.alts.city}
                            fill
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                </div>

                <StaggerContainer
                    staggerChildren={0.1}
                    className="p-4 xl:p-6 bg-gray-100 flex flex-col gap-2 xl:w-full"
                >
                    {copy.days.map((day) => (
                        <StaggerItem
                            key={day.title}
                            className="flex flex-col gap-2 flex-row xl:gap-4"
                        >
                            <p className="font-alistair text-2xl -mt-2 xl:text-3xl w-full max-w-[75px]">
                                {day.title}
                            </p>
                            <p>{day.content}</p>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>

            <section className="mx-6 mt-6 flex flex-col gap-8 xl:flex-row-reverse xl:w-full xl:max-w-7xl xl:mx-auto">
                <FadeUp className="relative overflow-hidden rounded max-xl:h-60 w-full">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/04/герб-кириллица-наполовину-копия-1.png"
                        alt={copy.alts.coatOfArms}
                        fill
                        loading="lazy"
                        className="object-contain"
                    />
                </FadeUp>
                <FadeUp className="flex flex-col gap-2">
                    <h2>{copy.visitTitle}</h2>
                    <p>{copy.visitDescription}</p>
                </FadeUp>
            </section>

            <SliderMobile
                images={descriptionImages.map((src) => ({
                    src,
                    alt: copy.alts.mainHero,
                }))}
            />
            <StaggerContainer
                mode="inView"
                className="hidden xl:flex xl:h-110 xl:mt-4 xl:gap-4 xl:max-w-7xl xl:mx-auto xl:w-full"
            >
                {descriptionImages.map((src, i) => (
                    <StaggerItem
                        key={src}
                        className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md"
                    >
                        <Image
                            src={src}
                            alt={copy.alts.mainHero}
                            fill
                            sizes={
                                i === 0
                                    ? "33vw"
                                    : "(max-width: 1200px) 100vw, 33vw"
                            }
                            loading="lazy"
                            className="object-cover"
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
                    <p>{copy.historicDescription}</p>
                </FadeUp>
                <DividerHistory style={2} />
            </div>

            <FadeUp className="mx-6 my-2 xl:text-center flex flex-col gap-2 xl:w-full xl:max-w-7xl xl:mx-auto">
                <h2>{copy.specialMeetingTitle}</h2>
                <p className="xl:max-w-4xl xl:mx-auto">
                    {copy.specialMeetingDescription}
                </p>
                <ImageGrid
                    images={[
                        {
                            src: "https://academia.spb.ru/wp-content/uploads/2026/05/hf_20260304_162946_4a58574c-6740-46bb-8658-bb6013a9b548.jpeg",
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
                        images={[
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-207.png",
                                alt: copy.alts.spa,
                            },
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-220.png",
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
                    <div className="relative overflow-hidden aspect-21/15 rounded xl:mt-12">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/breakfast.jpg"
                            alt={copy.alts.breakfast}
                            fill
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-209.png"
                        alt={copy.alts.breakfast}
                        width={210}
                        height={200}
                        loading="lazy"
                        className="object-cover hidden xl:block xl:absolute xl:top-1 xl:-right-14 rounded"
                    />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <p className="font-alistair text-center text-2xl text-gray-700 border rounded-2xl border-gray-300 max-w-fit px-4 mx-auto">
                        {copy.day2Title1}
                    </p>
                    <h2 className="text-center">{copy.breakfastTitle}</h2>
                    <p className="font-alistair text-center text-2xl/7 xl:text-4xl/10">
                        {copy.breakfastQuote}
                    </p>
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
                            images={[
                                {
                                    src: "https://academia.spb.ru/wp-content/uploads/2026/05/e3cc398748884f36bc6b2f3a8ce9240a_img.avif",
                                    alt: copy.alts.cruise,
                                },
                                {
                                    src: "https://academia.spb.ru/wp-content/uploads/2026/05/IMG_6906-1.avif",
                                    alt: copy.alts.cruise,
                                },
                            ]}
                        />
                    </StaggerItem>
                    <StaggerItem className="xl:max-w-4xl xl:mx-auto">
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
                        <p className="font-alistair text-center text-2xl text-gray-700 border rounded-2xl border-gray-300 max-w-fit px-4 mx-auto mb-2">
                            {copy.day3Title1}
                        </p>
                        <h2>{copy.cultureTitle}</h2>
                        <p>{copy.cultureDescription}</p>
                    </div>
                    <DividerHistory style={3} />

                    {/* Mobile */}
                    <div className="xl:hidden space-y-4">
                        <p>{copy.cultureConcierge}</p>

                        <div className="grid grid-cols-2 gap-2">
                            {cultureImages.map((src, i) => (
                                <div
                                    className="relative aspect-square overflow-hidden rounded"
                                    key={src}
                                >
                                    <Image
                                        src={src}
                                        alt={
                                            i === 0
                                                ? copy.alts.culture1
                                                : copy.alts.culture2
                                        }
                                        fill
                                        className="object-cover"
                                        sizes="50vw"
                                    />
                                </div>
                            ))}
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
                                className="object-cover"
                                sizes="48%"
                            />
                        </div>

                        {/* Правая колонка: текст + фото */}
                        <div className="flex-1 flex flex-col -ml-16">
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
                    <p>{copy.footerText}</p>
                </StaggerItem>
                <StaggerItem className="flex flex-col gap-3 my-4 xl:flex-row xl:justify-center">
                    <Button
                        href={localizeHref(bookingHref, locale)}
                        variant="primary"
                    >
                        {copy.bookLabel}
                    </Button>
                </StaggerItem>
                <StaggerItem>
                    <p className="font-alistair text-2xl/7 xl:text-4xl/10">
                        {copy.footerQuote}
                    </p>
                </StaggerItem>
            </StaggerContainer>

            <Divider dark />
            <ContactsSection />
        </main>
    );
}
