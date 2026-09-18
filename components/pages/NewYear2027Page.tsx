import type React from "react";
import HeroFullscreen from "@/components/sections/HeroFullscreen";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import ExpandableCards from "@/components/ui/ExpandableCards";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { type Locale, localizeHref } from "@/lib/i18n/routing";
import { buildEventSchema } from "@/lib/seo/schema";
import { nbsp } from "@/lib/typography";

const PATH = "/new-year-2027/";

/** Начало программы: локальное время СПб, формат как в EventsData. */
const EVENT_START = "2026-12-31T20:00";

export const NEW_YEAR_2027_HERO_IMAGE =
    "https://academia.spb.ru/wp-content/uploads/2026/09/00204123-cb56-4391-9.png";

/** Бронирование новогоднего оффера (два тарифа в модуле бронирования). */
const BOOKING_HREF = "/booking/?&be-offer=973214%2C973208";

const GALLERY_IMAGES = [
    "https://academia.spb.ru/wp-content/uploads/2026/09/4.avif",
    "https://academia.spb.ru/wp-content/uploads/2026/09/IMG_8908.avif",
    "https://academia.spb.ru/wp-content/uploads/2026/09/imgi_112_IMG_3192.avif",
    "https://academia.spb.ru/wp-content/uploads/2026/09/IMG_9688.avif",
] as const;

/**
 * Фоны карточек программы — по порядку пунктов `program`. `position` —
 * кадрирование, чтобы лица не резались краем и не уходили под текст
 * (значения как на academia.spb.ru/new-year-2027/).
 */
const PROGRAM_IMAGES: { src: string; position?: string }[] = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/09/imgi_118_image-2.webp",
    },
    { src: "https://academia.spb.ru/wp-content/uploads/2026/09/2.png" },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/09/3.webp",
        position: "object-[center_30%]",
    },
    { src: "https://academia.spb.ru/wp-content/uploads/2026/09/4.webp" },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/09/5.webp",
        position: "object-[center_40%]",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/09/6.webp",
        position: "object-[center_35%]",
    },
];

/** Видео финального экрана — как на academia.spb.ru/new-year-2027/. */
const FINAL_VIDEO =
    "https://cdnv.boomstream.com/balancer/AN2bZstG-sGZJnGbP.mp4#t=0.1";

/** Фото блока «Новогодний стол»: обложка карточки и фото к каждому меню. */
const TABLE_IMAGES = [
    {
        id: "welcome",
        cover: "https://academia.spb.ru/wp-content/uploads/2026/09/Group_117.avif",
        menus: [
            "https://academia.spb.ru/wp-content/uploads/2026/09/welcome.avif",
        ],
    },
    {
        id: "sets",
        cover: "https://academia.spb.ru/wp-content/uploads/2026/09/Group_116.avif",
        menus: [
            "https://academia.spb.ru/wp-content/uploads/2026/09/2.avif",
            "https://academia.spb.ru/wp-content/uploads/2026/09/3-1.avif",
        ],
    },
];

type PageCopy = {
    title: string;
    subtitle: React.ReactNode;
    date: React.ReactNode;
    heroAlt: string;
    bookLabel: string;
    programLabel: string;
    introTitle: React.ReactNode;
    introText: React.ReactNode;
    mansionTitle: string;
    mansionText: React.ReactNode;
    galleryAlts: [string, string, string, string];
    programTitle: string;
    program: ProgramItem[];
    finalTitle: React.ReactNode;
    tableTitle: string;
    tableText: React.ReactNode;
    /** Порядок — как в TABLE_IMAGES. */
    tableCards: {
        title: string;
        alt: string;
        menus: { title: string; imageAlt: string; items: string[] }[];
    }[];
};

type ProgramItem = {
    title: string;
    heading: string;
    text: React.ReactNode;
};

const copyByLocale: Record<Locale, PageCopy> = {
    ru: {
        title: "Графский Новый год в особняке",
        subtitle: (
            <>
                Встречайте Новый год в&nbsp;Петербурге в&nbsp;гостях
                у&nbsp;графа Шувалова. Театрализованная программа
                с&nbsp;атмосферой светского салона XIX&nbsp;века, графская семья
                и&nbsp;праздничный ужин с&nbsp;живой музыкой.
            </>
        ),
        date: <>31&nbsp;декабря 2026&nbsp;| начало в&nbsp;20:00</>,
        heroAlt: "Графский Новый год в особняке Шувалова",
        bookLabel: "Забронировать",
        programLabel: "Посмотреть программу",
        introTitle: (
            <>
                В&nbsp;эту ночь граф ждет гостей{" "}
                <br className="max-xl:hidden" />
                на&nbsp;праздничный прием в&nbsp;особняке
            </>
        ),
        introText: (
            <>
                31&nbsp;декабря ACADEMIA Шувалова приглашает встретить Новый год
                2027 в&nbsp;Петербурге и&nbsp;провести камерный праздничный
                вечер в&nbsp;светском салоне исторического особняка: графская
                семья и&nbsp;аристократические традиции дома Шуваловых,
                праздничный стол, живая музыка и&nbsp;танцы.
            </>
        ),
        mansionTitle: "Новый год в особняке Шуваловых",
        mansionText: (
            <>
                Особняк на&nbsp;Моховой на&nbsp;одну ночь станет особенным
                местом, где можно встретить Новый год 2027 в&nbsp;Петербурге
                в&nbsp;атмосфере светского приема XIX&nbsp;века.
            </>
        ),
        galleryAlts: [
            "Граф украшает ёлку, графиня держит новогодний подарок",
            "Праздничная закуска в хрустальной вазе на сервированном столе",
            "Гости за новогодним столом у ёлки в особняке Шувалова",
            "Подарок в красной коробке с кружевной лентой",
        ],
        programTitle: "Программа новогодней ночи",
        program: [
            {
                title: "Welcome",
                heading: "Элегантный welcome-фуршет",
                text: <>Игристое и&nbsp;закуски с&nbsp;первых минут вечера</>,
            },
            {
                title: "Ужин",
                heading: "Праздничный курсовой ужин",
                text: (
                    <>
                        Гастрономическая программа с&nbsp;авторскими коктейлями
                        и&nbsp;мясным или рыбным сетом на&nbsp;выбор
                    </>
                ),
            },
            {
                title: "Музыка",
                heading: "Живой вокал и DJ-сеты",
                text: (
                    <>
                        Музыкальное сопровождение от&nbsp;светского приема
                        до&nbsp;новогодней ночи
                    </>
                ),
            },
            {
                title: "Праздничная программа",
                heading: "В лучших традициях светского бала",
                text: (
                    <>
                        Интерактивная программа с&nbsp;ведущим, подарки
                        от&nbsp;графа и&nbsp;памятные детали вечера
                    </>
                ),
            },
            {
                title: "Графская семья",
                heading: "Присутствие графа и графини",
                text: (
                    <>
                        Граф и&nbsp;его семья станут участниками праздничного
                        вечера и&nbsp;создадут атмосферу светского приема
                        в&nbsp;доме Шуваловых
                    </>
                ),
            },
            {
                title: "Новогоднее чудо",
                heading: "Дед Мороз и Снегурочка",
                text: (
                    <>
                        В&nbsp;полночь главные герои Нового года поздравят
                        гостей особняка
                    </>
                ),
            },
        ],
        finalTitle: <>Проведите свой Новый год в&nbsp;особняке Шувалова</>,
        tableTitle: "Новогодний стол",
        tableText: (
            <>
                Праздничный вечер начнется с&nbsp;welcome-фуршета
                и&nbsp;продолжится курсовым ужином с&nbsp;мясным или рыбным
                сетом на&nbsp;выбор гостя.
            </>
        ),
        tableCards: [
            {
                title: "Welcome-фуршет",
                alt: "Закуски welcome-фуршета на многоярусной подставке",
                menus: [
                    {
                        title: "Welcome-фуршет",
                        imageAlt: "Закуски welcome-фуршета",
                        items: [
                            "Игристое CIELO, Bio Bio Bubbles",
                            "Лосось слабой соли и палтус холодного копчения с каперсами",
                            "Ростбиф с зернистой горчицей и соусом Ремулад",
                            "Террин из трёх видов мяса с трюфелем и сальсой",
                            "Сельдь с яблоком, картофелем и горчичным кремом",
                            "Расстегай с красной рыбой и щучьей икрой",
                            "Пирожок с капустой и трюфелем",
                            "Шу с риетом из лосося и свекольной глазурью",
                            "Мини-оладьи со сметаной и красной икрой",
                            "Мини-оладьи со сметаной и чёрной икрой",
                            "Вода Dausuz Still",
                        ],
                    },
                ],
            },
            {
                title: "Сеты",
                alt: "Подача праздничного салата из сета",
                menus: [
                    {
                        title: "Мясной сет",
                        imageAlt: "Блюдо мясного сета",
                        items: [
                            "Страсбургский паштет",
                            "Коктейль «Ягодный шраб»",
                            "Оливье с говядиной и красной икрой",
                            "Вишневая наливка",
                            "Ростбиф с корнеплодами и соусом из белых грибов",
                            "Коктейль «Жженка»",
                            "Медовик",
                            "Сбитень",
                        ],
                    },
                    {
                        title: "Рыбный сет",
                        imageAlt: "Блюдо рыбного сета",
                        items: [
                            "Рийет из лосося с красной икрой",
                            "Коктейль «Цитрусовый шраб»",
                            "Салат «Мимоза» с угрем",
                            "Настойка «Мандариновая»",
                            "Осетрина, фаршированная муссом из белой рыбы",
                            "Коктейль «Январь»",
                            "Медовик",
                            "Сбитень",
                        ],
                    },
                ],
            },
        ],
    },
    en: {
        title: "Count's New Year at the Mansion",
        subtitle: (
            <>
                Celebrate New Year in&nbsp;Saint Petersburg as&nbsp;guests
                of&nbsp;Count Shuvalov. A&nbsp;theatrical programme with the
                atmosphere of&nbsp;a&nbsp;19th-century high-society salon, the
                Count&rsquo;s family and a&nbsp;festive dinner with live music.
            </>
        ),
        date: <>31&nbsp;December 2026&nbsp;| starts at&nbsp;8:00&nbsp;PM</>,
        heroAlt: "Count's New Year at the Shuvaloff Mansion",
        bookLabel: "Book now",
        programLabel: "See the programme",
        introTitle: (
            <>
                Tonight the Count awaits his guests{" "}
                <br className="max-xl:hidden" />
                at&nbsp;a&nbsp;festive reception in&nbsp;the mansion
            </>
        ),
        introText: (
            <>
                On&nbsp;31&nbsp;December ACADEMIA Shuvaloff invites you
                to&nbsp;welcome New Year 2027 in&nbsp;Saint Petersburg and spend
                an&nbsp;intimate festive evening in&nbsp;the high-society salon
                of&nbsp;a&nbsp;historic mansion: the Count&rsquo;s family and
                the aristocratic traditions of&nbsp;the Shuvalov house,
                a&nbsp;festive table, live music and dancing.
            </>
        ),
        mansionTitle: "New Year at the Shuvalov Mansion",
        mansionText: (
            <>
                For one night, the mansion on&nbsp;Mokhovaya Street becomes
                a&nbsp;special place to&nbsp;welcome New Year 2027 in&nbsp;Saint
                Petersburg in&nbsp;the atmosphere of&nbsp;a&nbsp;19th-century
                high-society reception.
            </>
        ),
        galleryAlts: [
            "The Count decorates the Christmas tree as the Countess holds a gift",
            "A festive starter in a crystal bowl on the laid table",
            "Guests at the New Year table by the tree in the Shuvalov mansion",
            "A gift in a red box tied with a lace ribbon",
        ],
        programTitle: "New Year's Eve programme",
        program: [
            {
                title: "Welcome",
                heading: "An elegant welcome buffet",
                text: (
                    <>
                        Sparkling wine and canap&eacute;s from the&nbsp;first
                        minutes of&nbsp;the evening
                    </>
                ),
            },
            {
                title: "Dinner",
                heading: "A festive course dinner",
                text: (
                    <>
                        A&nbsp;gastronomic programme with signature cocktails
                        and a&nbsp;choice of&nbsp;meat or&nbsp;fish set
                    </>
                ),
            },
            {
                title: "Music",
                heading: "Live vocals and DJ sets",
                text: (
                    <>
                        Music from the&nbsp;high-society reception through
                        to&nbsp;midnight
                    </>
                ),
            },
            {
                title: "Festive programme",
                heading: "In the finest traditions of a society ball",
                text: (
                    <>
                        An&nbsp;interactive programme with a&nbsp;host, gifts
                        from the&nbsp;Count and memorable touches to&nbsp;the
                        evening
                    </>
                ),
            },
            {
                title: "The Count's family",
                heading: "The Count and Countess in attendance",
                text: (
                    <>
                        The Count and his family join the&nbsp;festive evening
                        and create the&nbsp;atmosphere of&nbsp;a&nbsp;society
                        reception in&nbsp;the Shuvalov house
                    </>
                ),
            },
            {
                title: "New Year magic",
                heading: "Ded Moroz and Snegurochka",
                text: (
                    <>
                        At&nbsp;midnight the&nbsp;Russian Father Frost and
                        the&nbsp;Snow Maiden greet the&nbsp;mansion&rsquo;s
                        guests
                    </>
                ),
            },
        ],
        finalTitle: <>Spend your New Year at&nbsp;the Shuvalov Mansion</>,
        tableTitle: "The New Year table",
        tableText: (
            <>
                The festive evening opens with a&nbsp;welcome buffet and
                continues with a&nbsp;course dinner&nbsp;&mdash; a&nbsp;meat
                or&nbsp;fish set of&nbsp;the guest&rsquo;s choice.
            </>
        ),
        tableCards: [
            {
                title: "Welcome buffet",
                alt: "Welcome buffet canapés on a tiered stand",
                menus: [
                    {
                        title: "Welcome buffet",
                        imageAlt: "Welcome buffet canapés",
                        items: [
                            "CIELO Bio Bio Bubbles sparkling wine",
                            "Lightly salted salmon and cold-smoked halibut with capers",
                            "Roast beef with wholegrain mustard and rémoulade sauce",
                            "Three-meat terrine with truffle and salsa",
                            "Herring with apple, potato and mustard cream",
                            "Rasstegai pie with red fish and pike caviar",
                            "Cabbage and truffle pirozhok",
                            "Choux with salmon rillettes and beetroot glaze",
                            "Mini pancakes with sour cream and red caviar",
                            "Mini pancakes with sour cream and black caviar",
                            "Dausuz Still water",
                        ],
                    },
                ],
            },
            {
                title: "Set menus",
                alt: "Serving a festive salad from the set menu",
                menus: [
                    {
                        title: "Meat set",
                        imageAlt: "A dish from the meat set",
                        items: [
                            "Strasbourg pâté",
                            "“Berry Shrub” cocktail",
                            "Olivier salad with beef and red caviar",
                            "Cherry nalivka liqueur",
                            "Roast beef with root vegetables and porcini sauce",
                            "“Zhzhenka” cocktail",
                            "Medovik honey cake",
                            "Sbiten",
                        ],
                    },
                    {
                        title: "Fish set",
                        imageAlt: "A dish from the fish set",
                        items: [
                            "Salmon rillettes with red caviar",
                            "“Citrus Shrub” cocktail",
                            "Mimosa salad with eel",
                            "Mandarin nastoyka",
                            "Sturgeon stuffed with white fish mousse",
                            "“January” cocktail",
                            "Medovik honey cake",
                            "Sbiten",
                        ],
                    },
                ],
            },
        ],
    },
};

/** Тексты для structured data: без разметки, как в мета-тегах страницы. */
export const newYear2027Seo = {
    ru: {
        name: "Графский Новый год в особняке",
        description:
            "Встречайте Новый год в Петербурге в гостях у графа Шувалова. Театрализованная программа с атмосферой светского салона XIX века, графская семья и праздничный ужин с живой музыкой.",
        crumbs: ["Главная"],
    },
    en: {
        name: "Count's New Year at the Mansion",
        description:
            "Celebrate New Year in Saint Petersburg as guests of Count Shuvalov. A theatrical programme with the atmosphere of a 19th-century high-society salon, the Count's family and a festive dinner with live music.",
        crumbs: ["Home"],
    },
} as const;

const PARENT_PATHS = ["/"] as const;

export default function NewYear2027Page({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const seo = newYear2027Seo[locale];
    const bookingHref = localizeHref(BOOKING_HREF, locale);

    return (
        <main className="flex flex-col">
            <StructuredData
                data={buildEventSchema({
                    locale,
                    path: PATH,
                    event: {
                        title: seo.name,
                        subtitle: seo.description,
                        imgUrl: NEW_YEAR_2027_HERO_IMAGE,
                        bookingUrl: BOOKING_HREF,
                        dates: [EVENT_START],
                    },
                    breadcrumbs: [
                        ...seo.crumbs.map((name, i) => ({
                            name,
                            path: PARENT_PATHS[i],
                        })),
                        { name: seo.name, path: PATH },
                    ],
                })}
            />

            <HeroFullscreen
                title={copy.title}
                description={copy.subtitle}
                caption={<time dateTime={EVENT_START}>{copy.date}</time>}
                image={{ src: NEW_YEAR_2027_HERO_IMAGE, alt: copy.heroAlt }}
                gradient
                actions={
                    <div className="flex flex-col gap-4 mt-2 md:flex-row md:justify-center">
                        <Button
                            variant="primary"
                            size="lg"
                            href={bookingHref}
                            className="w-full md:w-auto"
                        >
                            {copy.bookLabel}
                        </Button>
                        <Button
                            variant="light-glass"
                            size="lg"
                            href="#programm"
                            className="w-full md:w-auto"
                        >
                            {copy.programLabel}
                        </Button>
                    </div>
                }
            />

            {/* Общий фон контента под hero. На десктопе первая карточка
                заезжает на hero, на мобиле — просто текст в рамке. */}
            <div className="bg-[#efe8e0] pt-8 pb-12 xl:pt-0 xl:pb-20">
                <FadeUp className="relative z-10 mx-6 bg-[#f7f2ea] xl:mx-auto xl:-mt-14 xl:w-full xl:max-w-6xl xl:p-5 xl:shadow-[0_12px_40px_rgba(55,42,36,0.08)]">
                    <section className="border border-[#ccad6b] px-5 py-8 text-center text-brand-brown xl:px-12 xl:py-10">
                        <h2 className="font-normal text-xl xl:text-[32px]">
                            {copy.introTitle}
                        </h2>
                        <p className="mt-4 xl:mt-6 xl:mx-auto xl:max-w-2xl">
                            {copy.introText}
                        </p>
                    </section>
                </FadeUp>

                <section className="mt-12 xl:mt-20">
                    <FadeUp className="mx-6 text-center text-brand-brown">
                        <h2>{copy.mansionTitle}</h2>
                        <p className="mt-3 xl:mt-4 xl:mx-auto xl:max-w-4xl">
                            {copy.mansionText}
                        </p>
                    </FadeUp>
                    {/* Мобила — два первых фото в ряд, десктоп — все четыре. */}
                    <StaggerContainer
                        staggerChildren={0.05}
                        className="mx-6 mt-6 grid grid-cols-2 gap-2 xl:mx-4 xl:mt-10 xl:grid-cols-4 xl:gap-4"
                    >
                        {GALLERY_IMAGES.map((src, i) => (
                            <StaggerItem
                                key={src}
                                className={`relative aspect-square overflow-hidden ${
                                    i >= 2 ? "max-xl:hidden" : ""
                                }`}
                            >
                                <Image
                                    src={src}
                                    alt={copy.galleryAlts[i]}
                                    fill
                                    sizes="(max-width: 1280px) 50vw, 25vw"
                                    className="object-cover"
                                />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* Якорь кнопки «Посмотреть программу» в hero. */}
                <section
                    id="programm"
                    className="mt-12 scroll-mt-28 xl:mt-20 xl:scroll-mt-36"
                >
                    <FadeUp className="mx-6 text-center text-brand-brown">
                        <h2>{copy.programTitle}</h2>
                    </FadeUp>
                    <StaggerContainer staggerChildren={0.05}>
                        <ol className="mx-6 mt-6 grid gap-2 xl:mx-auto xl:mt-10 xl:max-w-7xl xl:grid-cols-3 xl:gap-px">
                            {copy.program.map((item, i) => (
                                <li key={PROGRAM_IMAGES[i].src}>
                                    <StaggerItem className="relative isolate flex aspect-6/7 flex-col justify-between overflow-hidden p-6 text-[#F5F1ED] xl:aspect-[unset] xl:h-75 xl:p-7">
                                        <Image
                                            src={PROGRAM_IMAGES[i].src}
                                            alt=""
                                            fill
                                            sizes="(max-width: 1280px) 100vw, 33vw"
                                            className={`-z-10 object-cover ${PROGRAM_IMAGES[i].position ?? ""}`}
                                        />
                                        <div
                                            aria-hidden
                                            className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-black/50"
                                        />
                                        <div>
                                            <p className="font-alistair text-xl/none xl:text-2xl/none">
                                                {String(i + 1).padStart(2, "0")}
                                            </p>
                                            <h3 className="mt-2 font-alistair text-2xl/tight font-normal xl:text-3xl/tight">
                                                {item.title}
                                            </h3>
                                        </div>
                                        {/* На десктопе блок стоит на одной
                                            высоте во всех карточках, а не
                                            прижат к низу: иначе разная длина
                                            текста разводит строки. */}
                                        <div className="xl:absolute xl:inset-x-7 xl:top-[58%]">
                                            <p className="font-semibold uppercase leading-snug">
                                                {item.heading}
                                            </p>
                                            <p className="mt-0.5 leading-snug">
                                                {item.text}
                                            </p>
                                        </div>
                                    </StaggerItem>
                                </li>
                            ))}
                        </ol>
                    </StaggerContainer>
                </section>

                <section className="mt-12 xl:mt-20">
                    <FadeUp className="mx-6 text-center text-brand-brown">
                        <h2>{copy.tableTitle}</h2>
                        <p className="mt-3 xl:mt-4 xl:mx-auto xl:max-w-3xl">
                            {copy.tableText}
                        </p>
                    </FadeUp>
                    <ExpandableCards
                        defaultOpenId="welcome"
                        className="mx-6 mt-6 xl:mx-auto xl:mt-10 xl:max-w-6xl"
                        items={copy.tableCards.map((card, i) => ({
                            id: TABLE_IMAGES[i].id,
                            title: card.title,
                            image: {
                                src: TABLE_IMAGES[i].cover,
                                alt: card.alt,
                            },
                            content: (
                                <div className="flex flex-col gap-6 border border-[#ccad6b] p-4 text-brand-brown sm:p-6 xl:gap-10 xl:p-10">
                                    {card.menus.map((menu, j) => (
                                        <MenuBlock
                                            key={menu.title}
                                            title={menu.title}
                                            image={{
                                                src: TABLE_IMAGES[i].menus[j],
                                                alt: menu.imageAlt,
                                            }}
                                            items={menu.items}
                                            withDivider={j > 0}
                                        />
                                    ))}
                                </div>
                            ),
                        }))}
                    />
                </section>
            </div>

            {/* Финальный экран с видео. Отрицательный нижний отступ гасит mt
                футера, чтобы видео стыковалось с ним без полосы. */}
            <section className="relative isolate -mb-12 flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center text-white xl:-mb-20 xl:min-h-[85vh]">
                <video
                    src={FINAL_VIDEO}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-black/40"
                />
                <FadeUp className="flex flex-col items-center gap-4 xl:gap-6">
                    <p className="font-alistair text-2xl xl:text-4xl">
                        <time dateTime={EVENT_START}>{copy.date}</time>
                    </p>
                    <h2 className="xl:max-w-5xl xl:text-5xl">
                        {copy.finalTitle}
                    </h2>
                    <Button
                        variant="primary"
                        size="lg"
                        href={bookingHref}
                        className="mt-2"
                    >
                        {copy.bookLabel}
                    </Button>
                </FadeUp>
            </section>
        </main>
    );
}

/**
 * Одно меню в раскрытой карточке: слева название и фото (фото только
 * на десктопе), справа нумерованный список блюд с пунктирными разделителями.
 */
function MenuBlock({
    title,
    image,
    items,
    withDivider,
}: {
    title: string;
    image: { src: string; alt: string };
    items: string[];
    withDivider: boolean;
}) {
    return (
        <>
            {withDivider && (
                <hr className="border-t border-dashed border-black/20" />
            )}
            <div className="flex flex-col gap-4 xl:flex-row xl:gap-24">
                <div className="flex flex-col gap-12 xl:w-80 xl:shrink-0">
                    <h3 className="font-history text-lg font-normal uppercase xl:text-3xl">
                        {title}
                    </h3>
                    <div className="relative hidden flex-1 xl:block">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="320px"
                            className="object-cover"
                        />
                    </div>
                </div>
                <ol className="flex flex-1 flex-col">
                    {items.map((dish, i) => (
                        <li
                            key={dish}
                            className="flex gap-2 border-t border-dashed border-black/20 py-3 first:border-t-0 first:pt-0 last:pb-0"
                        >
                            <span className="w-10 shrink-0 text-brand-red">
                                {String(i + 1).padStart(2, "0")}/
                            </span>
                            <span>{nbsp(dish)}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}
