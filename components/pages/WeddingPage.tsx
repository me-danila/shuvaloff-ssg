import Link from "next/link";
import ContactsSection from "@/components/sections/ContactsSection";
import WeddingHistoricalMapSection from "@/components/sections/WeddingHistoricalMapSection";
import Divider from "@/components/ui/Divider";
import {
    FadeIn,
    FadeUp,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/Motion";
import { SmiSobakaRuModal } from "@/components/ui/modals/SmiSobakaRuModal";
import WeddingFormModal from "@/components/ui/modals/WeddingFormModal";
import Image from "@/components/ui/OptimizedImage";
import { Parallax } from "@/components/ui/Parallax";
import InfiniteImageSlider, {
    type InfiniteSliderImage,
} from "@/components/ui/slider/InfiniteImageSlider";
import {
    type WeddingBigSlide,
    WeddingBigSlider,
} from "@/components/ui/slider/WeddingBigSlider";
import WeddingSlider from "@/components/ui/slider/WeddingSlider";
import WeddingReviewsWidget from "@/components/ui/WeddingReviewsWidget";
import type { Locale } from "@/lib/i18n/routing";

type WeddingCopy = {
    heroTitle: string;
    heroDescription: string;
    tourButton: string;
    costButton: string;
    whyTitle: string;
    whyImageAlt: string;
    whyParagraph1: string;
    whySubTitle: string;
    whyParagraph2: string;
    centerTitle: string;
    centerDescription: string;
    datesButton: string;
    bookNowButton: string;
    intimateTitle: string;
    intimateSubTitle: string;
    intimateDescription: string;
    accommodationTitle: string;
    accommodationDescription: string;
    oneVenueTitle: string;
    mansionTitle: string;
    mansionSubTitle: string;
    mansionDescription: string;
    barLabel: string;
    cabinetLabel: string;
    livingRoomLabel: string;
    cuisineTitle: string;
    chefTitle: string;
    chefDescription: string;
    chefQuote: string;
    whyChooseUsTitle: string;
    whyChooseUsItems: string[];
    celebrationTitle: string;
    ifTitle: string;
    ifItems: string[];
    reviewsTitle: string;
    mediaTitle: string;
    organizeTitle: string;
    organizeDescription: string;
    callMeButton: string;
    mansionIconAria: string;
};

const copyByLocale: Record<Locale, WeddingCopy> = {
    ru: {
        heroTitle: "Свадьба в особняке",
        heroDescription:
            "Планируете провести свадебный банкет в узком кругу самых близких людей? Наш отель-особняк в Санкт-Петербурге — это идеальная площадка для стильной, но при этом камерной и уютной свадьбы. Мы предлагаем свадебные банкеты в историческом интерьере с изысканным ресторанным сервисом, авторским меню и обслуживанием премиум-класса.",
        tourButton: "Записаться на экскурсию",
        costButton: "Узнать стоимость",
        whyTitle:
            "Почему свадьба в историческом особняке — это идеальное решение?",
        whyImageAlt: "Свадьба в историческом особняке",
        whyParagraph1:
            "Свадебное торжество в особняке ACADEMIA Особняк Шувалова подарит эмоции и впечатления, которые останутся с вами на всю жизнь. Вас ждет особая атмосфера графского особняка XIX века в историческом центре Петербурга, камерность пространства и изысканные интерьеры для фотографий.",
        whySubTitle: "ОСОБНЯК — ОДНА ИЗ РЕЗИДЕНЦИЙ ЗНАТНОГО РОДА ШУВАЛОВЫХ",
        whyParagraph2:
            "Величественные залы с мраморными колоннами, роскошные люстры из муранского стекла, декорированные лепниной высокие потолки и другие исторические детали — все это прошло через бережную реставрацию. Сегодня отель-особняк сочетает в себе роскошь, историческую атмосферу и современный сервис, что делает его идеальным местом для вашей незабываемой свадьбы.",
        centerTitle: "ИСТОРИЧЕСКИЙ ЦЕНТР",
        centerDescription:
            "Особое преимущество — это расположение особняка в самом сердце Петербурга. Летний сад, Михайловский сад, набережные Фонтанки и Невы, Михайловский замок — все любимые места свадебных фотосессий совсем рядом. Один из самых красивых ЗАГСов Санкт-Петербурга также находится в пешей доступности на улице Фурштатской.",
        datesButton: "Узнать свободные даты",
        bookNowButton: "Забронировать сейчас",
        intimateTitle: "Камерная свадьба в Санкт-Петербурге —",
        intimateSubTitle: "стильно, искренне, душевно и по‑настоящему",
        intimateDescription:
            "Формат камерной свадьбы — это про уютную атмосферу, внимание к каждой детали и возможность провести день только с самыми близкими. Мы создаем особенные, трогательные и очень личные торжества на 10-20 гостей. Все залы бара-ресторана ACADEMIA Шувалова располагают к теплой и душевной атмосфере, где каждый гость чувствует себя желанным.",
        accommodationTitle: "Проживание в историческом особняке",
        accommodationDescription:
            "В день вашей свадьбы каждая деталь имеет значение. Отель-особняк ACADEMIA Шувалова не просто предлагает размещение в номерах, а создает уникальное пространство, где исторический антураж естественно дополняется современным комфортом, создавая особую атмосферу для значимых моментов.",
        oneVenueTitle: "Одна площадка — много возможностей",
        mansionTitle: "ACADEMIA Шувалова",
        mansionSubTitle:
            "предлагает на выбор залы для свадебных банкетов, каждый из которых уникален:",
        mansionDescription:
            "Можно организовать свадебную церемонию, банкет, afterparty — всё в одном пространстве, без необходимости перемещений.",
        barLabel: "Бар",
        cabinetLabel: "Кабинет",
        livingRoomLabel: "Гостиная",
        cuisineTitle: "Кухня",
        chefTitle: "Бренд-шеф Илья Харченко",
        chefDescription:
            "Кухня Ильи Харченко строится на уважении к классике и умении прочитывать её заново, актуально и честно. Он соединяет элементы классической кулинарной школы и авторский взгляд на гастрономию, акцентируя внимание гостя на локальных ингредиентах, сезонности и культурном контексте.",
        chefQuote:
            "«Мне важно понимать историю блюда: его философию, как оно готовилось раньше, в каких вариациях, какие традиции за ним стоят. Это глубокий взгляд на процесс, а не просто набор ингредиентов.»",
        whyChooseUsTitle: "Почему выбирают нас:",
        whyChooseUsItems: [
            "Полная организация свадьбы в особняке под ключ",
            "Идеальная площадка для камерной свадьбы в Санкт‑Петербурге",
            "Просторный исторический особняк",
            "Залы с уникальным дизайном",
            "Индивидуальный подход",
        ],
        celebrationTitle: "мы поможем сделать ваше торжество еще ярче!",
        ifTitle: "КАМЕРНАЯ СВАДЬБА — ЭТО ВАШ СЦЕНАРИЙ, ЕСЛИ:",
        ifItems: [
            "Вы не любите шумные вечеринки и быстро устаете от большого скопления людей",
            "Вы хотите разделить этот день только с самыми близкими людьми",
            "Вам важно, чтобы каждый гость на празднике почувствовал вашу заботу и внимание",
            "Вы хотите провести личную церемонию и отойти от классической программы",
            "Вам важно, чтобы каждая деталь праздника отражала именно вашу историю",
        ],
        reviewsTitle: "Отзывы о нас",
        mediaTitle: "О нас в СМИ",
        organizeTitle: "ОРГАНИЗУЕМ ВАШУ СВАДЬБУ С ВНИМАНИЕМ К КАЖДОЙ ДЕТАЛИ",
        organizeDescription:
            "Оставьте заявку, и наш координатор свяжется с вами для обсуждения всех нюансов. Уточните, сколько стоит свадьба в отеле-особняке в Санкт-Петербурге именно под ваш запрос, — мы подготовим персональное предложение в течение 1 дня.",
        callMeButton: "Перезвоните мне",
        mansionIconAria: "ACADEMIA Icon",
    },
    en: {
        heroTitle: "Wedding at a Mansion",
        heroDescription:
            "Planning a wedding banquet for a small circle of your closest people? Our mansion hotel in Saint Petersburg is the perfect venue for a stylish yet intimate and cozy wedding. We offer wedding banquets in a historical interior with exquisite restaurant service, signature menu, and premium-class service.",
        tourButton: "Book a tour",
        costButton: "Inquire about cost",
        whyTitle:
            "Why is a wedding in a historical mansion the perfect choice?",
        whyImageAlt: "Wedding in a historical mansion",
        whyParagraph1:
            "A wedding celebration at the ACADEMIA Mansion Shuvaloff will give you emotions and impressions that will stay with you for a lifetime. You will find a special atmosphere of a 19th-century count's mansion in the historic center of St. Petersburg, the intimacy of the space, and exquisite interiors for photos.",
        whySubTitle:
            "THE MANSION — ONE OF THE RESIDENCES OF THE NOBLE SHUVALOV FAMILY",
        whyParagraph2:
            "Majestic halls with marble columns, luxurious Murano glass chandeliers, high ceilings decorated with stucco, and other historical details — all of this has undergone careful restoration. Today, the mansion hotel combines luxury, historical atmosphere, and modern service, making it the perfect place for your unforgettable wedding.",
        centerTitle: "HISTORIC CENTER",
        centerDescription:
            "A special advantage is the location of the mansion in the heart of St. Petersburg. The Summer Garden, Mikhailovsky Garden, the embankments of the Fontanka and Neva, Mikhailovsky Castle — all favorite places for wedding photo sessions are very close. One of the most beautiful registry offices in St. Petersburg is also within walking distance on Furshtatskaya Street.",
        datesButton: "Check available dates",
        bookNowButton: "Book now",
        intimateTitle: "Intimate wedding in Saint Petersburg —",
        intimateSubTitle: "stylish, sincere, heartfelt and real",
        intimateDescription:
            "The format of an intimate wedding is about a cozy atmosphere, attention to every detail, and the opportunity to spend the day only with those closest to you. We create special, touching, and very personal celebrations for 10-20 guests. All halls of the ACADEMIA Shuvaloff bar-restaurant provide a warm and soulful atmosphere where every guest feels welcome.",
        accommodationTitle: "Accommodation in a Historic Mansion",
        accommodationDescription:
            "On your wedding day, every detail matters. The ACADEMIA Mansion Shuvaloff Hotel doesn't just offer room accommodation; it creates a unique space where historical surroundings are naturally complemented by modern comfort, creating a special atmosphere for significant moments.",
        oneVenueTitle: "One Venue — Many Possibilities",
        mansionTitle: "ACADEMIA Shuvaloff",
        mansionSubTitle:
            "offers a choice of halls for wedding banquets, each unique:",
        mansionDescription:
            "You can organize a wedding ceremony, banquet, afterparty — all in one space, without the need for travel.",
        barLabel: "Bar",
        cabinetLabel: "Cabinet",
        livingRoomLabel: "Living Room",
        cuisineTitle: "Cuisine",
        chefTitle: "Brand Chef Ilya Kharchenko",
        chefDescription:
            "Ilya Kharchenko's cuisine is built on respect for the classics and the ability to reinterpret them in a fresh, relevant, and honest way. He combines elements of the classical culinary school and an author's view on gastronomy, emphasizing local ingredients, seasonality, and cultural context.",
        chefQuote:
            "“It's important for me to understand the history of a dish: its philosophy, how it was prepared before, in what variations, what traditions stand behind it. This is a deep look at the process, not just a set of ingredients.”",
        whyChooseUsTitle: "Why choose us:",
        whyChooseUsItems: [
            "Full turn-key wedding organization in the mansion",
            "Perfect venue for an intimate wedding in St. Petersburg",
            "Spacious historical mansion",
            "Halls with unique design",
            "Personalized approach",
        ],
        celebrationTitle: "we will help make your celebration even brighter!",
        ifTitle: "AN INTIMATE WEDDING — THIS IS YOUR SCENARIO IF:",
        ifItems: [
            "You don't like noisy parties and get tired quickly from large crowds",
            "You want to share this day only with your closest people",
            "It's important to you that every guest at the celebration feels your care and attention",
            "You want to hold a personal ceremony and move away from the classic program",
            "It's important to you that every detail of the celebration reflects exactly your story",
        ],
        reviewsTitle: "Reviews about us",
        mediaTitle: "In Media",
        organizeTitle:
            "WE ORGANIZE YOUR WEDDING WITH ATTENTION TO EVERY DETAIL",
        organizeDescription:
            "Leave a request, and our coordinator will contact you to discuss all the nuances. Find out how much a Wedding at a Mansion hotel in St. Petersburg costs specifically for your request — we will prepare a personalized proposal within 1 day.",
        callMeButton: "Call me back",
        mansionIconAria: "ACADEMIA Icon",
    },
};

const EveryRoomSlides: Record<Locale, WeddingBigSlide[]> = {
    ru: [
        {
            title: <>Исторический люкс</>,
            description: (
                <>
                    Утро невесты в историческом люксе графини Дашковой, игристое
                    в бокалах и завтрак в номер. Просторный номер с винтажной
                    мебелью, антикварными деталями в интерьере и мягким светом
                    идеально подойдет для сборов невесты, свадебной фотосессии
                    и, конечно, для романтической ночи.
                </>
            ),
            button: { label: "Выбрать номер" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/hist1.jpg",
                alt: "Исторические люкс",
            },
        },
        {
            title: <>КАЖДЫЙ НОМЕР КАК ДЕКОРАЦИЯ К РОМАНТИЧЕСКОМУ ФИЛЬМУ:</>,
            description: (
                <>
                    Высокие потолки и окна
                    <br />
                    Лепнина и изящный декор
                    <br />
                    Изысканный текстиль, винтажные детали и мебель
                    <br />
                    Атмосфера уюта, приватности и тихой роскоши.
                </>
            ),
            button: { label: "Выбрать номер" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/hist2.jpg",
                alt: "Каждый номер как декорация",
            },
        },
        {
            title: <>РАЗМЕЩЕНИЕ ДЛЯ МОЛОДОЖЕНОВ И ГОСТЕЙ</>,
            description: (
                <>
                    Удобное проживание для вас и ваших гостей в особняке до и
                    после торжества. Отличная возможность с комфортом
                    подготовиться к церемонии и просто подняться в номер после
                    банкета, чтобы отдохнуть.
                </>
            ),
            button: { label: "Выбрать номер" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/hist3.jpg",
                alt: "Размещение для молодоженов и гостей",
            },
        },
    ],
    en: [
        {
            title: <>Historical Suite</>,
            description: (
                <>
                    A bride's morning in the historical suite of Countess
                    Dashkova, sparkling wine in glasses, and breakfast in the
                    room. A spacious room with vintage furniture, antique
                    details in the interior, and soft light is ideal for bride's
                    preparations, a wedding photo session, and, of course, for a
                    romantic night.
                </>
            ),
            button: { label: "Select a room" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/hist1.jpg",
                alt: "Historical suite",
            },
        },
        {
            title: <>EVERY ROOM LIKE A SETTING FOR A ROMANTIC MOVIE:</>,
            description: (
                <>
                    High ceilings and windows
                    <br />
                    Stucco and elegant decor
                    <br />
                    Exquisite textiles, vintage details, and furniture
                    <br />
                    An atmosphere of comfort, privacy, and quiet luxury.
                </>
            ),
            button: { label: "Select a room" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/hist2.jpg",
                alt: "Every room like a setting",
            },
        },
        {
            title: <>ACCOMMODATION FOR NEWLYWEDS AND GUESTS</>,
            description: (
                <>
                    Convenient accommodation for you and your guests in the
                    mansion before and after the celebration. A great
                    opportunity to comfortably prepare for the ceremony and
                    simply go up to the room after the banquet to rest.
                </>
            ),
            button: { label: "Select a room" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/hist3.jpg",
                alt: "Accommodation for newlyweds and guests",
            },
        },
    ],
};

const AestheticSlides: Record<Locale, WeddingBigSlide[]> = {
    ru: [
        {
            title: <>ЭСТЕТИКА ОФОРМЛЕНИЯ</>,
            description: (
                <>
                    Изысканная сервировка, стильные цветовые сочетания,
                    аксессуары и гармония всех элементов для создания атмосферы
                    уюта и элегантности.
                </>
            ),
            button: { label: "Узнать стоимость" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/aest1.jpg",
                alt: "Эстетика оформления",
            },
        },
        {
            title: <>ФУРШЕТНОЕ МЕНЮ ОТ БРЕНД-ШЕФА ИЛЬИ ХАРЧЕНКО</>,
            description: (
                <>
                    Наше меню подойдет как для самых искушенных гостей, так и
                    для тех, кто предпочитает традиционные вкусы.
                </>
            ),
            button: { label: "Узнать стоимость" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/aest2.jpg",
                alt: "Фуршетное меню от бренд-шефа Ильи Харченко",
            },
        },
        {
            title: <>ПОЛНОЕ СОПРОВОЖДЕНИЕ ПРАЗДНИКА</>,
            description: (
                <>
                    Мы готовы предложить отличную команду специалистов:
                    ведущего, диджея, фотографа, флористов, — и обеспечить
                    координацию их работы во время мероприятия, чтобы вы могли
                    спокойно наслаждаться отдыхом.
                </>
            ),
            button: { label: "Узнать стоимость" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/aest3.jpg",
                alt: "Полное сопровождение праздника",
            },
        },
    ],
    en: [
        {
            title: <>DECOR AESTHETICS</>,
            description: (
                <>
                    Exquisite table setting, stylish color combinations,
                    accessories, and harmony of all elements to create an
                    atmosphere of comfort and elegance.
                </>
            ),
            button: { label: "Inquire about cost" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/aest1.jpg",
                alt: "Decor aesthetics",
            },
        },
        {
            title: <>BUFFET MENU FROM BRAND CHEF ILYA KHARCHENKO</>,
            description: (
                <>
                    Our menu is suitable for both the most sophisticated guests
                    and those who prefer traditional flavors.
                </>
            ),
            button: { label: "Inquire about cost" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/aest2.jpg",
                alt: "Buffet menu from brand chef Ilya Kharchenko",
            },
        },
        {
            title: <>FULL EVENT SUPPORT</>,
            description: (
                <>
                    We are ready to offer an excellent team of specialists: a
                    host, DJ, photographer, florists — and ensure the
                    coordination of their work during the event so that you can
                    peacefully enjoy your time.
                </>
            ),
            button: { label: "Inquire about cost" },
            image: {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/aest3.jpg",
                alt: "Full event support",
            },
        },
    ],
};

const InfiniteSliderImages: InfiniteSliderImage[] = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity1.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity2.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity3.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity4.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity5.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity6.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity7.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity8.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity9.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity10.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity11.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity12.jpg",
        alt: "ACADEMIA Mansion Shuvaloff",
    },
];

const descriptionImages: Record<Locale, { src: string; alt: string }[]> = {
    ru: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/bride.jpg",
            alt: "Невеста в отеле",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/bar.jpg",
            alt: "Бар",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/count.jpg",
            alt: "Граф",
        },
    ],
    en: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/bride.jpg",
            alt: "Bride in the hotel",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/bar.jpg",
            alt: "Bar",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/count.jpg",
            alt: "Count",
        },
    ],
};

const weddingInSpbImages: Record<Locale, { src: string; alt: string }[]> = {
    ru: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/wed-1.jpg",
            alt: "Свадьба в Санкт-Петербурге",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/wed2.jpg",
            alt: "Свадьба в Санкт-Петербурге",
        },
    ],
    en: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/wed-1.jpg",
            alt: "Wedding in Saint Petersburg",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/wed2.jpg",
            alt: "Wedding in Saint Petersburg",
        },
    ],
};

export default function WeddingPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const roomSlides = EveryRoomSlides[locale];
    const aestheticSlides = AestheticSlides[locale];
    const descImages = descriptionImages[locale];
    const wedInSpbImages = weddingInSpbImages[locale];

    return (
        <main className="flex flex-col gap-8">
            <section>
                <div className="relative overflow-hidden aspect-8/15 xl:aspect-[unset] xl:min-h-screen">
                    <FadeIn
                        duration={0.9}
                        className="absolute inset-0 h-full w-full"
                    >
                        <Parallax className="h-full w-full" offset={80}>
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/wed.jpg"
                                alt={copy.heroTitle}
                                fill
                                sizes="100vw"
                                loading="eager"
                                className="object-cover object-center"
                            />
                        </Parallax>
                    </FadeIn>

                    <StaggerContainer className="flex gap-2 h-65 xl:h-180 xl:gap-4 xl:w-full">
                        <div className="absolute bottom-10 md:bottom-20 xl:bottom-32 inset-x-0 text-center text-white z-10 flex flex-col gap-3 px-10 xl:max-w-2xl xl:mx-auto xl:gap-6">
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <h1 className="text-4xl xl:text-5xl">
                                    {copy.heroTitle}
                                </h1>
                            </StaggerItem>
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <p className="text-base">
                                    {copy.heroDescription}
                                </p>
                            </StaggerItem>
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <div className="flex flex-col gap-4 mt-2 md:flex-row md:justify-center">
                                    <WeddingFormModal
                                        triggerLabel={copy.tourButton}
                                        variant="light"
                                    />
                                    <WeddingFormModal
                                        triggerLabel={copy.costButton}
                                        variant="light-outline"
                                    />
                                </div>
                            </StaggerItem>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            <section className="flex flex-col gap-8 m-6 text-center xl:max-w-6xl xl:mx-auto xl:my-10">
                <FadeUp>
                    <h2 className="text-3xl xl:text-5xl">{copy.whyTitle}</h2>
                </FadeUp>
                <FadeUp
                    className="relative h-90 w-80 mx-auto xl:w-120"
                    mode="inView"
                >
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/04/his.jpg"
                        alt={copy.whyImageAlt}
                        fill
                        sizes="33vw"
                        loading="lazy"
                        className="rounded object-cover"
                    />
                </FadeUp>
                <FadeUp
                    className="relative xl:max-w-2xl xl:mx-auto"
                    mode="inView"
                >
                    <p className="text-stone-500 leading-6">
                        {copy.whyParagraph1}
                    </p>
                </FadeUp>
                <FadeUp className="relative" mode="inView">
                    <h3 className="font-baskerville text-2xl xl:text-4xl xl:max-w-3xl xl:mx-auto uppercase">
                        {copy.whySubTitle}
                    </h3>
                </FadeUp>
                <FadeUp
                    className="relative xl:max-w-2xl xl:mx-auto"
                    mode="inView"
                >
                    <p className="text-stone-500 leading-6">
                        {copy.whyParagraph2}
                    </p>
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

            <section className="flex flex-col gap-4 m-6 text-center xl:max-w-2xl xl:mx-auto xl:my-8">
                <FadeUp>
                    <h2 className="text-3xl xl:text-5xl uppercase">
                        {copy.centerTitle}
                    </h2>
                </FadeUp>
                <FadeUp className="relative" mode="inView">
                    <p className="text-stone-500">{copy.centerDescription}</p>
                </FadeUp>
            </section>

            <WeddingHistoricalMapSection />

            <section className="flex flex-col gap-4 mx-6 xl:flex-row xl:mx-auto xl:my-6">
                <WeddingFormModal
                    triggerLabel={copy.datesButton}
                    variant="dark"
                />
                <Link
                    href="/booking/"
                    className="border border-black p-4 rounded-md font-baskerville uppercase hover:bg-black hover:border-black hover:text-white duration-200"
                >
                    {copy.bookNowButton}
                </Link>
            </section>

            <section className="px-6 text-center flex flex-col gap-6 items-center my-4 xl:w-full xl:text-left xl:flex-row xl:max-w-7xl xl:mx-auto xl:gap-10 xl:items-center xl:my-12">
                <div className="flex flex-col gap-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        role="img"
                        aria-label={copy.mansionIconAria}
                        className="xl:scale-120 xl:ml-1"
                    >
                        <title>{copy.mansionIconAria}</title>
                        <rect
                            x=".5"
                            y=".5"
                            width="37"
                            height="37"
                            rx="4.5"
                            stroke="#989898"
                        />
                        <path
                            d="M19 37V1M2 36 36 1m0 35L2 1"
                            stroke="#989898"
                        />
                        <path
                            d="M18.522 13.63 19 15.144l.477-1.513c.932-2.957 3.648-5.13 6.84-5.13a7.16 7.16 0 0 1 7.184 7.207c0 2.002-.793 3.413-2.163 5.01l-12.33 12.57L6.66 20.716c-1.367-1.596-2.16-3.02-2.16-5.024 0-4.03 3.206-7.112 7.182-7.112 3.2 0 5.91 2.1 7.16 5.05Z"
                            fill="#fff"
                            stroke="#989898"
                        />
                        <circle cx="16.5" cy="21.5" r="4" stroke="#989898" />
                        <circle cx="21.5" cy="21.5" r="4" stroke="#989898" />
                    </svg>
                    <div className="flex flex-col gap-2 xl:gap-4">
                        <h2 className="xl:text-4.5xl xl:mt-6 uppercase">
                            {copy.intimateTitle}
                        </h2>
                        <p className="font-baskerville uppercase text-xl xl:text-2xl">
                            {copy.intimateSubTitle}
                        </p>
                    </div>

                    <WeddingSlider
                        images={wedInSpbImages}
                        className="xl:hidden"
                    />
                    <p className="text-stone-500 xl:max-w-md xl:leading-6">
                        {copy.intimateDescription}
                    </p>
                </div>
                <WeddingSlider
                    images={wedInSpbImages}
                    className="hidden xl:block"
                />
            </section>

            <section className="flex flex-col gap-8 items-center w-full min-h-screen relative p-6 justify-center text-center text-white xl:gap-12">
                <FadeIn
                    duration={0.9}
                    className="absolute inset-0 h-full w-full -z-1"
                >
                    <Parallax className="h-full w-full -z-1" offset={80}>
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/hotel.jpg"
                            alt={copy.accommodationTitle}
                            fill
                            sizes="100vw"
                            loading="lazy"
                            className="object-cover object-center"
                        />
                    </Parallax>
                </FadeIn>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 72 72"
                    fill="none"
                    className="max-w-[72px]"
                    role="img"
                    aria-label={copy.mansionIconAria}
                >
                    <g clipPath="url(#a)">
                        <title>{copy.mansionIconAria}</title>
                        <path
                            d="M66.38.61H5.62a5 5 0 0 0-5 5v60.78a5 5 0 0 0 5 5h60.76a5 5 0 0 0 5-5V5.61a5 5 0 0 0-5-5Z"
                            stroke="#fff"
                            strokeWidth="2"
                        />
                        <path
                            d="m.898 0-1-.026-.027 1c-1.041 38.249 29.123 70.1 67.372 71.142l4.267.116 1 .028.026-1C73.577 33.01 43.414 1.158 5.164.117z"
                            stroke="#fff"
                            strokeWidth="2"
                        />
                        <path
                            d="m71.51 0 1-.026.026 1c1.041 38.249-29.122 70.1-67.372 71.142l-4.266.116-1 .028-.027-1C-1.17 33.01 28.994 1.158 67.243.117zM36 32V1m0 71V39M1 36h32m6 0h32"
                            stroke="#fff"
                            strokeWidth="2"
                        />
                        <circle cx="36" cy="36" r="2" fill="#fff" />
                        <circle cx="61" cy="13" r="2" fill="#fff" />
                        <circle cx="10" cy="13" r="2" fill="#fff" />
                        <circle cx="61" cy="62" r="2" fill="#fff" />
                        <circle cx="10" cy="62" r="2" fill="#fff" />
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path fill="#fff" d="M0 0h72v72H0z" />
                        </clipPath>
                    </defs>
                </svg>
                <h2 className="text-3xl xl:text-5xl xl:max-w-5xl uppercase">
                    {copy.accommodationTitle}
                </h2>
                <p className="xl:max-w-lg">{copy.accommodationDescription}</p>
            </section>

            <WeddingBigSlider slides={roomSlides} />

            <section className="flex flex-col gap-8 items-center w-full min-h-screen relative p-6 justify-center text-center text-white xl:gap-12 xl:-mt-8">
                <FadeIn
                    duration={0.9}
                    className="absolute inset-0 h-full w-full -z-1"
                >
                    <Parallax className="h-full w-full -z-1" offset={80}>
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/Shuvaloff-089.jpg"
                            alt={copy.oneVenueTitle}
                            fill
                            sizes="100vw"
                            loading="lazy"
                            className="object-cover object-center"
                        />
                    </Parallax>
                </FadeIn>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    className="max-w-[72px]"
                    role="img"
                    aria-label={copy.mansionIconAria}
                >
                    <title>{copy.mansionIconAria}</title>
                    <g clipPath="url(#a)" stroke="#fff" strokeWidth="2">
                        <path d="M66.38.61H5.62a5 5 0 0 0-5 5v60.78a5 5 0 0 0 5 5h60.76a5 5 0 0 0 5-5V5.61a5 5 0 0 0-5-5ZM18.024 17.764 54.701 53.82M13.772 13.585l3.189 3.135m39.338 38.668 3.189 3.135m-6.38-39.713L16.43 54.867M57.36 14.63l-3.189 3.135M14.838 56.433l-3.189 3.135" />
                        <path d="M36 15.864c2.742 0 4.965-2.185 4.965-4.881S38.743 6.102 36 6.102s-4.965 2.185-4.965 4.88c0 2.697 2.223 4.882 4.965 4.882Z" />
                        <path d="M45.62 11.084c0 1.167-.397 2.851-1.085 4.817-.682 1.95-1.63 4.123-2.686 6.249-1.94 3.907-4.204 7.565-5.803 9.37-1.88-2.058-4.124-5.757-5.955-9.626-.984-2.078-1.838-4.184-2.445-6.078-.61-1.906-.956-3.553-.956-4.732 0-3.49 1.358-5.777 3.172-7.206 1.835-1.446 4.185-2.047 6.188-2.047 5.727 0 9.57 4.475 9.57 9.253ZM36 54.988c2.742 0 4.965 2.186 4.965 4.882S38.743 64.75 36 64.75s-4.965-2.186-4.965-4.881 2.223-4.882 4.965-4.882Z" />
                        <path d="M45.62 59.769c0-1.167-.397-2.851-1.085-4.817-.682-1.95-1.63-4.123-2.686-6.248-1.94-3.908-4.204-7.566-5.803-9.371-1.88 2.058-4.124 5.757-5.955 9.626-.984 2.078-1.838 4.184-2.445 6.078-.61 1.906-.956 3.553-.956 4.732 0 3.49 1.358 5.777 3.172 7.206 1.835 1.446 4.185 2.047 6.188 2.047 5.727 0 9.57-4.475 9.57-9.253Zm10.436-24.495c0 2.696 2.223 4.882 4.966 4.882 2.742 0 4.965-2.186 4.965-4.882s-2.223-4.88-4.965-4.88-4.966 2.185-4.966 4.88Z" />
                        <path d="M60.919 44.732c-1.188 0-2.9-.391-4.9-1.067-1.984-.671-4.194-1.603-6.356-2.64-3.975-1.909-7.697-4.134-9.532-5.706 2.093-1.849 5.856-4.054 9.792-5.854 2.114-.967 4.255-1.806 6.182-2.403 1.939-.6 3.615-.94 4.814-.94 3.55 0 5.877 1.335 7.33 3.118 1.47 1.805 2.083 4.115 2.083 6.083 0 5.63-4.553 9.409-9.413 9.409Zm-44.665-9.459c0 2.696-2.223 4.882-4.965 4.882s-4.966-2.186-4.966-4.882 2.223-4.88 4.966-4.88c2.742 0 4.965 2.185 4.965 4.88Z" />
                        <path d="M11.392 44.731c1.187 0 2.9-.39 4.9-1.067 1.983-.67 4.194-1.602 6.356-2.64 3.975-1.908 7.696-4.133 9.532-5.705-2.094-1.849-5.857-4.055-9.792-5.855-2.114-.966-4.256-1.806-6.183-2.403-1.939-.6-3.614-.94-4.813-.94-3.55 0-5.877 1.336-7.33 3.119-1.471 1.804-2.084 4.114-2.084 6.083 0 5.63 4.553 9.408 9.414 9.408Z" />
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path fill="#fff" d="M0 0h72v72H0z" />
                        </clipPath>
                    </defs>
                </svg>
                <h2 className="text-3xl xl:text-5xl xl:max-w-2xl uppercase">
                    {copy.oneVenueTitle}
                </h2>
            </section>

            <section className="flex flex-col gap-4 p-6 text-center xl:text-left xl:max-w-7xl xl:w-full xl:mx-auto">
                <div className="xl:flex xl:items-center xl:my-4">
                    <div className="xl:grow">
                        <h2 className="uppercase">{copy.mansionTitle}</h2>
                        <p className="text-stone-500 xl:max-w-xs">
                            {copy.mansionSubTitle}
                        </p>
                    </div>
                    <p className="hidden text-stone-500 xl:block xl:grow xl:max-w-sm xl:text-right xl:leading-6">
                        {copy.mansionDescription}
                    </p>
                </div>

                <div className="flex flex-col gap-6 xl:flex-row xl:w-full">
                    {[
                        {
                            src: "https://academia.spb.ru/wp-content/uploads/2026/04/bar-1.jpg",
                            label: copy.barLabel,
                        },
                        {
                            src: "https://academia.spb.ru/wp-content/uploads/2026/04/cabinet-scaled.jpg",
                            label: copy.cabinetLabel,
                        },
                        {
                            src: "https://academia.spb.ru/wp-content/uploads/2026/04/gost.jpg",
                            label: copy.livingRoomLabel,
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex flex-col gap-3 items-center w-full"
                        >
                            <div className="relative w-full h-100 xl:h-130">
                                <Image
                                    src={item.src}
                                    alt={item.label}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <h3 className="uppercase text-2xl text-stone-500">
                                {item.label}
                            </h3>
                        </div>
                    ))}
                </div>
                <p className="text-stone-500 xl:hidden">
                    {copy.mansionDescription}
                </p>
                <div className="flex flex-col gap-4 mt-4 xl:flex-row xl:mx-auto xl:my-10">
                    <WeddingFormModal
                        triggerLabel={copy.costButton}
                        variant="dark"
                    />
                    <WeddingFormModal
                        triggerLabel={copy.tourButton}
                        variant="dark-outline"
                    />
                </div>
            </section>

            <section className="flex flex-col gap-8 items-center w-full min-h-screen relative p-6 justify-center text-center text-white xl:gap-12">
                <FadeIn
                    duration={0.9}
                    className="absolute inset-0 h-full w-full -z-1"
                >
                    <Parallax className="h-full w-full -z-1" offset={80}>
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle_265_1.png"
                            alt={copy.cuisineTitle}
                            fill
                            sizes="100vw"
                            loading="lazy"
                            className="object-cover object-center"
                        />
                    </Parallax>
                </FadeIn>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    className="max-w-[72px]"
                    role="img"
                    aria-label={copy.mansionIconAria}
                >
                    <title>{copy.mansionIconAria}</title>
                    <rect
                        x=".763"
                        y=".763"
                        width="70.474"
                        height="70.474"
                        rx="6.868"
                        stroke="#fff"
                        strokeWidth="1.526"
                    />
                    <path d="M36 71V1" stroke="#fff" strokeWidth="1.526" />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="m3.242 67.68 1.095 1.063 18.569-19.115-.94-1.223zm49.95-51.42 1.56.585L68.758 2.427l-1.095-1.064zm15.566 51.42-1.095 1.063-18.067-18.599 1.029-1.131zM19.063 16.521 4.337 1.364 3.242 2.427l14.249 14.667z"
                        fill="#fff"
                    />
                    <path
                        d="m35.27 25.77.73 2.31.727-2.309c1.789-5.674 7.002-9.85 13.134-9.85 7.618 0 13.798 6.091 13.798 13.84 0 3.857-1.534 6.573-4.146 9.616l-23.5 23.955-23.528-23.955c-2.609-3.041-4.142-5.781-4.142-9.642 0-7.74 6.161-13.66 13.793-13.66 6.145 0 11.35 4.036 13.136 9.697Z"
                        stroke="#fff"
                        strokeWidth="1.526"
                    />
                    <circle
                        cx="31.263"
                        cy="40.737"
                        r="7.763"
                        stroke="#fff"
                        strokeWidth="1.526"
                    />
                    <circle
                        cx="40.737"
                        cy="40.737"
                        r="7.763"
                        stroke="#fff"
                        strokeWidth="1.526"
                    />
                </svg>
                <h2 className="text-3xl xl:text-5xl xl:max-w-5xl uppercase">
                    {copy.cuisineTitle}
                </h2>
            </section>

            <section className="flex flex-col gap-6 xl:flex-row xl:items-center xl:min-h-screen xl:-my-8">
                <div className="flex flex-col gap-4 items-center text-center p-6 xl:max-w-lg xl:mx-auto xl:w-full">
                    <h3 className="font-baskerville text-3xl uppercase xl:text-5xl">
                        {copy.chefTitle}
                    </h3>
                    <p className="text-stone-500">{copy.chefDescription}</p>
                    <p className="font-alistair text-3xl/7">{copy.chefQuote}</p>
                </div>
                <div className="relative w-full h-110 xl:min-h-screen xl:w-[50%]">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/04/chef.jpg"
                        alt={copy.chefTitle}
                        fill
                        className="object-cover"
                    />
                </div>
            </section>

            <section className="bg-neutral-100 px-6 py-10 xl:py-16">
                <div className="flex flex-col gap-6 xl:max-w-7xl xl:mx-auto xl:gap-8">
                    <h2 className="text-3xl xl:text-4xl uppercase">
                        {copy.whyChooseUsTitle}
                    </h2>
                    <div className="flex gap-4 overflow-y-scroll rounded-md pb-4 no-scrollbar overflow-y-visible">
                        {[
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/04/why1.jpg",
                                text: copy.whyChooseUsItems[0],
                            },
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/04/why2.jpg",
                                text: copy.whyChooseUsItems[1],
                            },
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/04/AP_82.jpg",
                                text: copy.whyChooseUsItems[2],
                            },
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/04/AP_134.jpg",
                                text: copy.whyChooseUsItems[3],
                            },
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/04/AP_139.jpg",
                                text: copy.whyChooseUsItems[4],
                            },
                        ].map((item) => (
                            <div
                                key={item.text}
                                className="flex flex-col gap-2 shrink-0 w-3xs"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.text}
                                    width={256}
                                    height={375}
                                    className="object-cover rounded-md"
                                />
                                <p className="text-stone-500 text-lg/6">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-8 items-center w-full min-h-screen relative p-6 justify-center text-center text-white xl:gap-12 xl:-mt-8">
                <FadeIn
                    duration={0.9}
                    className="absolute inset-0 h-full w-full -z-1"
                >
                    <Parallax className="h-full w-full -z-1" offset={80}>
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/AndreyRahvalskiy_-22.jpg"
                            alt={copy.celebrationTitle}
                            fill
                            sizes="100vw"
                            loading="lazy"
                            className="object-cover object-center"
                        />
                    </Parallax>
                </FadeIn>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    className="max-w-[72px]"
                    role="img"
                    aria-label={copy.mansionIconAria}
                >
                    <title>{copy.mansionIconAria}</title>
                    <g clipPath="url(#a)" stroke="#fff" strokeWidth="1.171">
                        <path d="M34.467 60.347c13.403 0 24.268-10.866 24.268-24.269S47.87 11.81 34.467 11.81 10.198 22.675 10.198 36.078s10.866 24.268 24.269 24.268Z" />
                        <path d="M55.333 26.333c-4.012 4.011-8.611 6.679-12.363 8.18-1.877.75-3.527 1.203-4.772 1.389-.624.093-1.128.116-1.498.085a2 2 0 0 1-.418-.076.6.6 0 0 1-.13-.063q0 .003-.02-.028a.6.6 0 0 1-.043-.102 2 2 0 0 1-.076-.418c-.031-.37-.008-.874.085-1.498.187-1.245.639-2.895 1.39-4.772 1.5-3.752 4.168-8.351 8.18-12.363 4.01-4.011 8.61-6.679 12.362-8.18 1.878-.75 3.527-1.202 4.772-1.389.624-.093 1.127-.116 1.498-.085q.275.026.418.076a.6.6 0 0 1 .102.044q.03.018.029.019h-.001q0-.002.02.028a1 1 0 0 1 .042.102q.051.143.077.418c.031.37.008.874-.086 1.498-.186 1.245-.638 2.894-1.389 4.772-1.5 3.752-4.168 8.351-8.18 12.363Z" />
                        <path d="M16.667 26.333c4.011 4.011 8.611 6.679 12.363 8.18 1.877.75 3.527 1.203 4.772 1.389.624.093 1.128.116 1.498.085q.275-.026.418-.076a.6.6 0 0 0 .13-.063q0 .003.02-.028a.6.6 0 0 0 .043-.102c.032-.096.06-.234.076-.418.031-.37.008-.874-.086-1.498-.186-1.245-.638-2.895-1.389-4.772-1.5-3.752-4.168-8.351-8.18-12.363-4.01-4.011-8.61-6.679-12.362-8.18-1.877-.75-3.527-1.202-4.772-1.389-.624-.093-1.128-.116-1.498-.085a2 2 0 0 0-.418.076.6.6 0 0 0-.102.044q-.03.018-.028.019-.001-.002-.02.028a.6.6 0 0 0-.043.102q-.05.143-.076.418c-.031.37-.008.874.085 1.498.187 1.245.639 2.894 1.39 4.772 1.5 3.752 4.168 8.351 8.18 12.363Zm38.666 19.334c-4.012-4.011-8.611-6.679-12.363-8.18-1.877-.75-3.527-1.203-4.772-1.389-.624-.093-1.128-.116-1.498-.085a2 2 0 0 0-.418.076.6.6 0 0 0-.102.044q-.029.017-.028.018s-.007.007-.02.029a.6.6 0 0 0-.043.102c-.032.096-.06.234-.076.418-.031.37-.008.874.085 1.498.187 1.245.639 2.895 1.39 4.772 1.5 3.752 4.168 8.351 8.18 12.363 4.01 4.01 8.61 6.679 12.362 8.18 1.878.75 3.527 1.203 4.772 1.389.624.093 1.127.116 1.498.085q.275-.026.418-.076a.6.6 0 0 0 .13-.063l.02-.027a1 1 0 0 0 .042-.103q.051-.143.077-.419c.031-.37.008-.873-.086-1.497-.186-1.245-.638-2.895-1.389-4.771-1.5-3.753-4.168-8.352-8.18-12.364Z" />
                        <path d="M16.667 45.667c4.011-4.011 8.611-6.679 12.363-8.18 1.877-.75 3.527-1.203 4.772-1.389.624-.093 1.128-.116 1.498-.085q.275.026.418.076.07.024.102.044.029.017.028.018s.007.007.02.029a.6.6 0 0 1 .043.102c.032.096.06.234.076.418.031.37.008.874-.086 1.498-.186 1.245-.638 2.895-1.389 4.772-1.5 3.752-4.168 8.351-8.18 12.363-4.01 4.01-8.61 6.679-12.362 8.18-1.877.75-3.527 1.203-4.772 1.389-.624.093-1.128.116-1.498.085a2 2 0 0 1-.418-.076.6.6 0 0 1-.102-.044q-.03-.018-.028-.019-.001.001-.02-.027a.6.6 0 0 1-.043-.103 2 2 0 0 1-.076-.419c-.031-.37-.008-.873.085-1.497.187-1.245.639-2.895 1.39-4.771 1.5-3.753 4.168-8.352 8.18-12.364Z" />
                        <path d="M66.604 61.604V10.428a5 5 0 0 0-5-5H10.426a5 5 0 0 0-5 5v51.176a5 5 0 0 0 5 5h51.176a5 5 0 0 0 5-5Z" />
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path fill="#fff" d="M0 0h72v72H0z" />
                        </clipPath>
                    </defs>
                </svg>
                <h2 className="text-3xl xl:text-5xl xl:max-w-5xl uppercase">
                    {copy.celebrationTitle}
                </h2>
            </section>

            <WeddingBigSlider slides={aestheticSlides} />

            <section className="flex flex-col gap-2 items-center w-full min-h-screen relative p-6 justify-center text-white xl:gap-4 xl:-my-8">
                <FadeIn
                    duration={0.9}
                    className="absolute inset-0 h-full w-full -z-1"
                >
                    <Parallax className="h-full w-full -z-1" offset={80}>
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/Shuvaloff-114_1.jpg"
                            alt={copy.ifTitle}
                            fill
                            sizes="100vw"
                            loading="lazy"
                            className="object-cover object-center"
                        />
                    </Parallax>
                </FadeIn>
                <h2 className="text-center text-3xl mb-4 xl:max-w-2xl xl:text-5xl xl:mb-4 uppercase">
                    {copy.ifTitle}
                </h2>
                <div className="flex flex-col gap-2 xl:max-w-md">
                    {copy.ifItems.map((item) => (
                        <StaggerItem
                            key={item}
                            className="flex items-start gap-2 break-inside-avoid"
                        >
                            <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-current" />
                            <span>{item}</span>
                        </StaggerItem>
                    ))}
                </div>
            </section>

            <section className="bg-neutral-100 px-6 py-10 xl:py-16">
                <div className="flex flex-col gap-4 xl:max-w-6xl xl:mx-auto">
                    <h2 className="text-3xl xl:text-4xl uppercase">
                        {copy.reviewsTitle}
                    </h2>
                    <WeddingReviewsWidget />
                </div>
            </section>

            <section className="flex flex-col gap-6 xl:max-w-6xl xl:w-full xl:mx-auto px-6 py-10 xl:gap-8">
                <h2 className="text-3xl xl:text-4xl uppercase">
                    {copy.mediaTitle}
                </h2>
                <div className="grid xl:grid-cols-3 gap-4">
                    <SmiSobakaRuModal />
                </div>
            </section>

            <section className="flex flex-col gap-4 m-6 xl:max-w-3xl xl:mx-auto items-center text-center xl:mb-8">
                <FadeUp>
                    <h2 className="text-3xl xl:text-5xl uppercase">
                        {copy.organizeTitle}
                    </h2>
                </FadeUp>
                <FadeUp
                    className="relative flex flex-col gap-2 text-stone-500"
                    mode="inView"
                >
                    <p>{copy.organizeDescription}</p>
                </FadeUp>
                <FadeUp
                    className="relative flex flex-col gap-2 text-stone-500"
                    mode="inView"
                >
                    <WeddingFormModal
                        triggerLabel={copy.callMeButton}
                        variant="dark"
                    />
                </FadeUp>
            </section>

            <InfiniteImageSlider images={InfiniteSliderImages} />
            <Divider />
            <ContactsSection />
        </main>
    );
}
