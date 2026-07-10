import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import {
    BookingFormDesktop,
    BookingFormMobile,
} from "@/components/sections/BookingFormResponsive";

const ContactsSection = dynamic(
    () => import("@/components/sections/ContactsSection"),
    { ssr: true },
);

import HomeServicesSection from "@/components/sections/HomeServicesSection";
import ImpressionsGrid from "@/components/sections/ImpressionsGrid";
import RoomCategoriesSection from "@/components/sections/RoomCategoriesSection";
import SpecialOffersSection from "@/components/sections/SpecialOffersSection";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import {
    FadeIn,
    FadeUp,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { Parallax } from "@/components/ui/Parallax";
import type { Locale } from "@/lib/i18n/routing";
import { localizeHref } from "@/lib/i18n/routing";
import { buildCollectionPageSchema } from "@/lib/seo/schema";

type HomeCopy = {
    heroTitle: React.ReactNode;
    heroSubtitle: string;
    mansionTitle: string;
    countsSpbTitle: string;
    countsSpbParagraphs: [string, string];
    orderLabel: string;
    detailsLabel: string;
    mansionDescription: string;
    mansionLeftText: string;
    mansionRightText: string;
    mansionRightTextLast: string;
    centerTitle: string;
    centerTextTop: string;
    centerTextBottom: string;
    centerCaption: string;
    soulTitleBottom: string;
    soulParagraphs: [string, string];
    servicesTitle: string;
    servicesSubtitle: string;
    servicesDescription: React.ReactNode;
    impressionsTitle: string;
    impressionsTextTop: string;
    impressionsTextTop2: string;
    impressionsTextBottom: string;
    impressionsCaption: string;
    ecosystemTitle: string;
    ecosystemTextTop: string;
    ecosystemTextBottom: string;
};

const descriptionImagesByLocale = {
    ru: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/02/11.jpg",
            alt: "Люстра в отеле",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/02/12121.jpg",
            alt: "Гости в отеле",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/93776e5d6b0bebc07aa56cb4244e80cb1fa2e410.jpg",
            alt: "Ресторан в отеле",
        },
    ],
    en: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/02/11.jpg",
            alt: "Chandelier in the hotel",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/02/12121.jpg",
            alt: "Hotel guests",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/93776e5d6b0bebc07aa56cb4244e80cb1fa2e410.jpg",
            alt: "Hotel restaurant",
        },
    ],
};

const homeCopyByLocale: Record<Locale, HomeCopy> = {
    ru: {
        heroTitle: (
            <>
                Academia{" "}
                <span className="xl:whitespace-nowrap">Особняк Шувалова</span>
            </>
        ),
        heroSubtitle: "СПА | Отель | Ресторан в центре Петербурга",
        countsSpbTitle: "Графский Петербург",
        countsSpbParagraphs: [
            "Особый отдых в формате пышных аристократических традиций",
            "Для тех, кто хочет прожить свой лучший опыт погружения в эпоху ХІХ века",
        ],
        orderLabel: "Забронировать",
        detailsLabel: "Подробнее",
        mansionTitle: "ОСОБНЯК С ИСТОРИЕЙ",
        mansionDescription:
            "Отель ACADEMIA Шувалова — это бережно отреставрированный объект культурного наследия, ранее принадлежавший семье графа Шувалова. С уважением к истории мы восстановили исторические детали, чтобы вы могли погрузиться в неспешный ритм жизни аристократического Петербурга.",
        mansionLeftText:
            "Историческая лепнина, мрамор, парадная лестница, кессонный потолок в ресторане и антикварные предметы в исторических резиденциях — все для того, чтобы вы могли почувствовать шепот истории в этих стенах, не отказывая себе в привычном комфорте.",
        mansionRightText:
            "В отеле вас ждет встреча с графом Шуваловым и его семьей, как связующая нить между прошлым и настоящим места, в котором вы остановитесь.",
        mansionRightTextLast:
            "Вы сможете стать частью новой жизни старинного особняка и вписать свою страницу в его историю.",
        centerTitle: "Исторический центр",
        centerTextTop:
            "Особняк ACADEMIA Шувалова находится в одном из самых красивых мест исторического Петербурга — на тихой Моховой улице, рядом с набережными Невы и Фонтанки, Летним и Михайловским садами, Михайловским замком и Марсовым полем. Дворец бракосочетания № 2 находится в пешей доступности на улице Фурштатской.",
        centerTextBottom:
            "До Невского проспекта вы дойдете за двадцать минут неспешным шагом, и за это время вы прогуляетесь по историческим мостам через Фонтанку, Мойку, Лебяжью канавку и канал Грибоедова или пройдетесь по набережной Невы с открыточными видами на Петропавловскую крепость, Троицкий и Дворцовый мосты и невероятные закаты.",
        centerCaption:
            "Идеальное расположение для тех, кто ценит исторический Петербург.",
        soulTitleBottom: "СЕРВИС",
        soulParagraphs: [
            "В особняке гостеприимство становится частью искусства, а сервис — проявлением внимательного и индивидуального подхода.",
            "Мы создаем пространство, где каждый гость чувствует себя желанным и особенным. Где сервис становится невидимым, а забота естественной. Наша миссия — не просто соответствовать ожиданиям, а превосходить их и делать каждый визит не просто комфортным, а вдохновляющим.",
        ],
        servicesTitle: "Мир ACADEMIA",
        servicesSubtitle: "Дополнительные услуги",
        servicesDescription: (
            <>
                В&nbsp;особняке Шувалова мы&nbsp;превращаем классический сервис
                в индивидуальный опыт.
                <br />
                Служба заботы с&nbsp;вниманием отнесется к&nbsp;любым нюансам
                вашего комфорта: будь то&nbsp;особенный букет или кофе,
                приготовленный именно тогда, когда вы&nbsp;это нго захотите.
                Здесь ваши желания становятся неотъемлемой частью продуманного
                сценария пребывания.
            </>
        ),
        impressionsTitle: "АТМОСФЕРА ВПЕЧАТЛЕНИЙ",
        impressionsTextTop:
            "Мы превращаем пребывание гостей в нашем особняке в необычное погружение, в котором пространство, люди и детали становятся частью единого художественного и исторического замысла.",
        impressionsTextTop2:
            "Мы воссоздаем жизнь эпохи с помощью театрализованных форматов, сценических зарисовок и живых персонажей, которые могут встречать и сопровождать вас в течение дня.",
        impressionsTextBottom:
            "Граф Шувалов и его семья возвращаются в свою резиденцию с пятницы по воскресенье, чтобы наполнить ее подлинной жизнью и атмосферой своей эпохи. Их общение с гостями столь же естественно и непредсказуемо, как и в XIX веке: мимолетная встреча в холле особняка, изящный комплимент во время прогулки по залам или случайная беседа у бара.",
        impressionsCaption:
            "Это не спектакль, а связь времен, которую вы сможете почувствовать, становясь частью этой истории.",
        ecosystemTitle: "ЭКОСИСТЕМА ВАШЕГО ОТДЫХА",
        ecosystemTextTop:
            "Мы приглашаем вас не просто остановиться в особняке, а замедлиться, уделить время себе и прочувствовать неспешную атмосферу дворянской жизни позапрошлого века.",
        ecosystemTextBottom:
            "Отдохнуть в уютном номере после прогулки, оценить классическую кухню и коктейльную карту ресторана Бар-ресторан ACADEMIA Шувалова, расслабиться в руках мастеров массажа и ухода в ACADEMIA SPA, заказать трансфер или сюрприз для дорогого человека. Наша консьерж-служба готова помочь с решением любых вопросов.",
    },
    en: {
        heroTitle: (
            <>
                Academia{" "}
                <span className="xl:whitespace-nowrap">Mansion Shuvaloff</span>
            </>
        ),
        heroSubtitle:
            "SPA | Hotel | Restaurant in the center of St. Petersburg",
        countsSpbTitle: "Aristocratic Saint Petersburg",
        countsSpbParagraphs: [
            "A unique getaway steeped in opulent aristocratic traditions",
            "For those who wish to experience the ultimate immersion in the 19th century",
        ],
        orderLabel: "Order",
        detailsLabel: "Details",
        mansionTitle: "A MANSION WITH HISTORY",
        mansionDescription:
            "ACADEMIA Shuvaloff is a carefully restored cultural heritage property that once belonged to Count Shuvalov's family. With deep respect for history, we restored original details so you can immerse yourself in the unhurried rhythm of aristocratic Saint Petersburg.",
        mansionLeftText:
            "Historic stucco, marble, the grand staircase, a coffered restaurant ceiling, and antique objects in the historical residences are all here so you can feel the whisper of history without giving up modern comfort.",
        mansionRightText:
            "At the hotel, you are welcomed by Count Shuvalov and his family as a living connection between the past and the present of the place where you stay.",
        mansionRightTextLast:
            "You can become part of a new chapter in the life of this old mansion and add your own page to its story.",
        centerTitle: "Historic center",
        centerTextTop:
            "ACADEMIA Mansion Shuvaloff is located in one of the most beautiful parts of historic Saint Petersburg on quiet Mokhovaya Street, close to the embankments of the Neva and Fontanka, the Summer Garden, Mikhailovsky Garden, Mikhailovsky Castle, and Marsovo Pole. Wedding Palace No. 2 on Furshtatskaya Street is within walking distance.",
        centerTextBottom:
            "Nevsky Prospekt is a twenty-minute walk away. On the way, you can cross historic bridges over the Fontanka, Moyka, Swan Canal, and Griboyedov Canal, or stroll along the Neva embankment with postcard views of Peter and Paul Fortress, Trinity Bridge, Palace Bridge, and stunning sunsets.",
        centerCaption:
            "The perfect location for guests who value historic Saint Petersburg.",
        soulTitleBottom: "SERVICE",
        soulParagraphs: [
            "In the mansion, hospitality becomes part of the art, and service becomes an attentive, personalized approach.",
            "We create a space where every guest feels welcome and truly special. Where service is seamless and care feels natural. Our mission is not only to meet expectations, but to exceed them and make every stay not just comfortable, but inspiring.",
        ],
        servicesTitle: "THE ACADEMIA WORLD",
        servicesSubtitle: "Additional services",
        servicesDescription:
            "At Shuvaloff Mansion, we turn classic service into a personal experience. Our guest care team will attend to every nuance of your comfort, whether it is a special bouquet or coffee prepared exactly when you want it. Here, your wishes become an essential part of a carefully planned stay.",
        impressionsTitle: "AN ATMOSPHERE OF IMPRESSIONS",
        impressionsTextTop:
            "We turn our guests' stay in the mansion into an immersive journey where space, people, and details become part of one artistic and historical vision.",
        impressionsTextTop2:
            "We recreate the spirit of the era through theatrical formats, staged sketches, and vivid characters who can greet and accompany you throughout the day.",
        impressionsTextBottom:
            "Count Shuvalov and his family return to their residence from Friday to Sunday to fill it with authentic life and the atmosphere of their era. Their interactions with guests are as natural and unpredictable as in the 19th century: a brief encounter in the mansion hall, an elegant compliment while walking through the rooms, or an accidental conversation at the bar.",
        impressionsCaption:
            "This is not a performance, but a connection between eras that you can truly feel as you become part of this story.",
        ecosystemTitle: "THE ECOSYSTEM OF YOUR STAY",
        ecosystemTextTop:
            "We invite you not only to stay in the mansion, but to slow down, dedicate time to yourself, and feel the unhurried atmosphere of noble life from a bygone century.",
        ecosystemTextBottom:
            "Relax in a cozy room after a walk, enjoy classic cuisine and signature cocktails at ACADEMIA Shuvaloff Bar-Restaurant, unwind in the hands of massage and wellness experts at ACADEMIA SPA, and order a transfer or a surprise for someone special. Our concierge team is ready to help with any request.",
    },
};

// Единый оптический размер иконок кнопок hero.
// Каждая иконка вписана в бокс HERO_ICON_BOX по длинной стороне (сохраняя
// aspect ratio) — широкие иконки не растягиваются шире остальных.
// Толщина обводки нормализована через vectorEffect независимо от масштаба.
const HERO_ICON_BOX = 20;

type HeroIconProps = { className?: string };

function heroIconSize(vbWidth: number, vbHeight: number) {
    const scale = HERO_ICON_BOX / Math.max(vbWidth, vbHeight);
    return {
        width: Math.round(vbWidth * scale),
        height: Math.round(vbHeight * scale),
    };
}

const strokeIconProps = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
};

function BreakfastIcon({ className }: HeroIconProps) {
    return (
        <svg
            {...heroIconSize(29, 17)}
            viewBox="0 0 29 17"
            {...strokeIconProps}
            className={className}
        >
            <path d="M14.8181 2.40909C15.3453 2.40909 15.7726 1.98173 15.7726 1.45455C15.7726 0.927365 15.3453 0.5 14.8181 0.5C14.2909 0.5 13.8635 0.927365 13.8635 1.45455C13.8635 1.98173 14.2909 2.40909 14.8181 2.40909Z" />
            <path d="M3.30005 13.9275C3.30005 7.76754 8.34005 2.72754 14.5 2.72754C20.66 2.72754 25.7 7.76754 25.7 13.9275H3.30005Z" />
            <path d="M0.5 15.7729H28.5" />
        </svg>
    );
}

function RestaurantIcon({ className }: HeroIconProps) {
    return (
        <svg
            {...heroIconSize(14, 17)}
            viewBox="0 0 14 17"
            {...strokeIconProps}
            className={className}
        >
            <path d="M3.5 0.5L3.5 4.5" />
            <path d="M3.5 6.5L3.5 16.5" />
            <path d="M13.5 8.5C13.5 8.5 10.5 7.5 10.5 4.5C10.5 1.5 13.5 0.5 13.5 0.5L13.5 16.5" />
            <path d="M0.5 0.5V6.5H6.5V0.5" />
            <path d="M0.5 4.5H6.5" />
        </svg>
    );
}

function SpaIcon({ className }: HeroIconProps) {
    return (
        <svg
            {...heroIconSize(18, 18)}
            viewBox="0 0 18 18"
            {...strokeIconProps}
            className={className}
        >
            <path d="M17.4854 7.71387C17.2781 12.0569 14.4614 15.6948 10.6016 17.0654L10.5986 17.0664C10.083 17.2532 9.54978 17.3919 9 17.4902C8.44902 17.3879 7.91511 17.2485 7.39844 17.0654C3.5386 15.6947 0.720883 12.0569 0.513672 7.71387C2.39545 7.80802 4.14453 8.41627 5.62891 9.4043L5.62109 9.41797C5.78638 9.52626 5.85977 9.56421 5.96582 9.6377C6.99328 10.3821 7.88174 11.3138 8.58203 12.3838L9 13.0225L9.41797 12.3838C10.1199 11.3113 11.0105 10.3771 12.041 9.63184C12.0703 9.61256 12.104 9.59113 12.1465 9.56543C12.1911 9.5384 12.2461 9.50259 12.3037 9.46484C12.3177 9.45587 12.3327 9.44778 12.3467 9.43848L12.3457 9.4375C12.3481 9.43587 12.3511 9.43524 12.3535 9.43359L12.3447 9.4209C13.8344 8.42285 15.593 7.80873 17.4854 7.71387ZM9.05273 0.725586C10.5685 2.40187 11.4148 4.46428 11.6191 6.5918C10.6758 7.12193 9.79233 7.76783 9 8.52734C8.2087 7.76949 7.3277 7.1271 6.39062 6.5957C6.63078 4.48052 7.51414 2.4183 9.05273 0.725586Z" />
        </svg>
    );
}

function EventsIcon({ className }: HeroIconProps) {
    // Fill-иконка (кольцо-контур + язычок билета). Тонкое кольцо визуально
    // читается как контур и совпадает по весу с остальными stroke-иконками.
    return (
        <svg
            {...heroIconSize(14, 14)}
            viewBox="0 0 14 14"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={className}
        >
            <path d="M8.59375 13.4375H4.84375C1.45 13.4375 0 11.9875 0 8.59375V4.84375C0 1.45 1.45 0 4.84375 0H8.59375C11.9875 0 13.4375 1.45 13.4375 4.84375V8.59375C13.4375 11.9875 11.9875 13.4375 8.59375 13.4375ZM4.84375 0.9375C1.9625 0.9375 0.9375 1.9625 0.9375 4.84375V8.59375C0.9375 11.475 1.9625 12.5 4.84375 12.5H8.59375C11.475 12.5 12.5 11.475 12.5 8.59375V4.84375C12.5 1.9625 11.475 0.9375 8.59375 0.9375H4.84375Z" />
            <path d="M4.64375 8.7999C4.38125 8.7999 4.1375 8.7374 3.925 8.61865C3.40625 8.3249 3.125 7.74365 3.125 6.98115V0.743652C3.125 0.487402 3.3375 0.274902 3.59375 0.274902C3.85 0.274902 4.0625 0.487402 4.0625 0.743652V6.98115C4.0625 7.3874 4.18125 7.6874 4.3875 7.7999C4.60625 7.9249 4.94375 7.8624 5.3125 7.64365L6.1375 7.1499C6.475 6.9499 6.95625 6.9499 7.29375 7.1499L8.11875 7.64365C8.49375 7.86865 8.83125 7.9249 9.04375 7.7999C9.25 7.68115 9.36875 7.38115 9.36875 6.98115V0.743652C9.36875 0.487402 9.58125 0.274902 9.8375 0.274902C10.0938 0.274902 10.3062 0.487402 10.3062 0.743652V6.98115C10.3062 7.74365 10.025 8.3249 9.50625 8.61865C8.9875 8.9124 8.30625 8.8499 7.6375 8.4499L6.8125 7.95615C6.775 7.93115 6.65625 7.93115 6.61875 7.95615L5.79375 8.4499C5.40625 8.68115 5.00625 8.7999 4.64375 8.7999Z" />
        </svg>
    );
}

const heroButtons = [
    {
        label: {
            ru: "Графские завтраки",
            en: "Aristocratic breakfasts",
        },
        href: "/services/aristocratic-breakfast/",
        external: false,
        Icon: BreakfastIcon,
    },
    {
        label: {
            ru: "Ресторан",
            en: "Restaurant",
        },
        href: "https://shuvaloff.academia-rest.ru/?utm_source=hotels",
        external: true,
        Icon: RestaurantIcon,
    },
    {
        label: {
            ru: "Спа",
            en: "Spa",
        },
        href: "https://academia-spa.ru/?utm_source=hotels",
        external: true,
        Icon: SpaIcon,
    },
    {
        label: {
            ru: "Афиша",
            en: "Events",
        },
        href: "/events/",
        external: false,
        Icon: EventsIcon,
    },
];

export default function HomePage({ locale }: { locale: Locale }) {
    const copy = homeCopyByLocale[locale];
    const descriptionImages = descriptionImagesByLocale[locale];

    return (
        <main
            className="flex flex-col gap-6"
            itemScope
            itemType="https://schema.org/WebPage"
        >
            <StructuredData
                data={buildCollectionPageSchema({
                    locale,
                    path: "/",
                    name:
                        locale === "ru"
                            ? "Отель ACADEMIA Особняк Шувалова"
                            : "ACADEMIA Mansion Shuvaloff Hotel",
                    description:
                        locale === "ru"
                            ? "Бутик-отель в бережно отреставрированном особняке XIX века в центре Санкт-Петербурга."
                            : "Boutique hotel in a restored 19th-century mansion in central Saint Petersburg.",
                    breadcrumbs: [
                        {
                            name: locale === "ru" ? "Главная" : "Home",
                            path: "/",
                        },
                    ],
                    items: [
                        {
                            name:
                                locale === "ru"
                                    ? "Категории номеров"
                                    : "Room categories",
                            path: "/rooms/",
                        },
                        {
                            name:
                                locale === "ru"
                                    ? "Дополнительные услуги"
                                    : "Additional services",
                            path: "/services/",
                        },
                        {
                            name:
                                locale === "ru" ? "Забронировать" : "Book now",
                            path: "/booking/",
                        },
                    ],
                })}
            />
            <section>
                <div className="relative overflow-hidden aspect-8/11 xl:aspect-[unset] xl:min-h-screen">
                    <FadeIn
                        duration={0.9}
                        className="absolute inset-0 h-full w-full"
                    >
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/06/ChatGPT-Image-28-%D0%BC%D0%B0%D1%8F-2026-%D0%B3.-15_43_59-1-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg"
                            alt="ACADEMIA Особняк Шувалова"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover bg-gray-100"
                        />
                    </FadeIn>

                    <StaggerContainer className="absolute inset-x-0 top-20 z-10 flex flex-col items-start gap-3 px-8 xl:px-0 xl:top-40 xl:max-w-7xl xl:mx-auto">
                        {heroButtons.map((b) => (
                            <StaggerItem key={b.href}>
                                <Link
                                    href={
                                        b.external
                                            ? b.href
                                            : localizeHref(b.href, locale)
                                    }
                                    target={b.external ? "_blank" : undefined}
                                    rel={
                                        b.external
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="flex w-fit items-center gap-3 rounded-lg bg-black/40 px-5 py-3 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/60 xl:px-6 xl:py-4"
                                >
                                    <b.Icon className="shrink-0" />
                                    <span className="text-sm font-semibold">
                                        {b.label[locale]}
                                    </span>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <div className="absolute bottom-10 md:bottom-20 xl:bottom-32 inset-x-0 text-center text-white z-10 flex flex-col gap-3 px-8 xl:px-0 xl:max-w-7xl xl:mx-auto xl:gap-6">
                        <FadeIn duration={1}>
                            <h1 className="font-alistair text-4xl normal-case leading-tight xl:text-5xl xl:mb-4 font-normal">
                                Отдых
                                <br className="xl:hidden" /> с графским размахом
                            </h1>
                        </FadeIn>
                        <Suspense
                            fallback={
                                <div className="h-20 animate-pulse bg-white/10 rounded-lg" />
                            }
                        >
                            <BookingFormDesktop />
                        </Suspense>
                    </div>
                </div>
            </section>

            <Suspense fallback={null}>
                <BookingFormMobile />
            </Suspense>

            <SpecialOffersSection />

            <section className="relative overflow-hidden hidden">
                {/* MOBILE: фото снизу 55% */}
                <div className="mx-6 flex flex-col gap-4 mb-4 xl:hidden">
                    <div className="relative h-60 overflow-hidden rounded-lg mb-1">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/Frame-2.png"
                            alt={copy.countsSpbTitle}
                            fill
                            loading="lazy"
                            className="h-100 w-full rounded-lg object-cover"
                        />
                    </div>
                    <h2 className="-mb-2">{copy.countsSpbTitle}</h2>
                    <div className="flex flex-col gap-2">
                        {copy.countsSpbParagraphs.map((text, i) => (
                            <FadeUp key={text} delay={i * 0.1 + (i + 1) * 0.1}>
                                <p>{text}</p>
                            </FadeUp>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Button
                            href={localizeHref(
                                `/booking?&be-offer=910895`,
                                locale,
                            )}
                            variant="primary"
                            size="sm"
                            className="shrink-0 xl:px-6"
                        >
                            {copy.orderLabel}
                        </Button>
                        <Button
                            href={localizeHref(`/aristocratic-spb/`, locale)}
                            variant="primary-outline"
                            size="sm"
                            className="shrink-0 xl:px-6"
                        >
                            {copy.detailsLabel}
                        </Button>
                    </div>
                </div>

                {/*DESKTOP: фото на весь блок*/}
                <div className="hidden xl:flex relative h-150 text-white">
                    <Parallax className="w-full h-full absolute" offset={100}>
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/Frame-1.png"
                            alt={copy.countsSpbTitle}
                            fill
                            sizes="100vw"
                            loading="lazy"
                            className="object-cover object-top"
                        />
                    </Parallax>
                    <div className="p-20 flex flex-col justify-between">
                        <FadeUp duration={1}>
                            <h2 className="relative z-1 text-white">
                                {copy.countsSpbTitle}
                            </h2>
                        </FadeUp>
                        <div className="max-w-[390px] flex flex-col gap-6">
                            {copy.countsSpbParagraphs.map((text, i) => (
                                <FadeUp
                                    key={text}
                                    delay={i * 0.1 + (i + 1) * 0.1}
                                    className="relative z-1"
                                >
                                    <p>{text}</p>
                                </FadeUp>
                            ))}
                        </div>
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(to right, rgba(0,0,0,.6) 20%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 80%)",
                            }}
                        />
                        <FadeUp
                            duration={1.2}
                            className="flex items-center gap-2 mt-2"
                        >
                            <Button
                                href={localizeHref(
                                    `/booking?&be-offer=910895`,
                                    locale,
                                )}
                                variant="primary"
                                size="sm"
                                className="shrink-0 xl:px-6"
                            >
                                {copy.orderLabel}
                            </Button>
                            <Button
                                href={localizeHref(
                                    `/aristocratic-spb/`,
                                    locale,
                                )}
                                variant="primary-outline"
                                size="sm"
                                className="shrink-0 xl:px-6"
                            >
                                {copy.detailsLabel}
                            </Button>
                        </FadeUp>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-2 mx-6 relative xl:text-center xl:mx-0">
                <FadeUp>
                    <h2 className="mt-4">{copy.mansionTitle}</h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="my-2 xl:max-w-4xl xl:mx-auto">
                        {copy.mansionDescription}
                    </p>
                </FadeUp>
                <div className="flex gap-2 h-65 mt-2 xl:hidden">
                    <div className="relative flex-1 min-w-0 overflow-hidden rounded-lg">
                        <Image
                            src={descriptionImages[1].src}
                            alt={descriptionImages[1].alt}
                            fill
                            sizes="50vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                    <div className="relative flex-1 min-w-0 overflow-hidden rounded-lg">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/06/1f6c276d95bae86165d082af9bb508ae687c7068.jpg"
                            alt={copy.mansionTitle}
                            fill
                            sizes="50vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                </div>
                <StaggerContainer className="hidden xl:flex xl:h-110 xl:mt-8 xl:gap-4 xl:max-w-7xl xl:mx-auto xl:w-full">
                    <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg hidden xl:block xl:rounded-sm">
                        <Image
                            src={descriptionImages[0].src}
                            alt={descriptionImages[0].alt}
                            fill
                            sizes="33vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </StaggerItem>
                    <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-sm">
                        <Image
                            src={descriptionImages[1].src}
                            alt={descriptionImages[1].alt}
                            fill
                            sizes="(max-width: 1200px) 100vw, 33vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </StaggerItem>
                    <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-sm">
                        <Image
                            src={descriptionImages[2].src}
                            alt={descriptionImages[2].alt}
                            fill
                            sizes="(max-width: 1200px) 100vw, 33vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </StaggerItem>
                </StaggerContainer>
            </section>
            <section className="flex flex-col mx-6 gap-3 xl:max-w-5xl xl:mx-auto xl:flex-row xl:items-center xl:gap-16">
                <FadeUp className="relative hidden xl:block xl:h-[286px] xl:w-[260px] xl:flex-none">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/06/%D0%90%D0%9A%D0%90%D0%94%D0%95%D0%9C%D0%98%D0%90-%D1%82%D1%91%D0%BC%D0%BD%D1%8B%D0%B9_%D0%B3%D0%B5%D1%80%D0%B1-%D0%9E%D1%81%D0%BE%D0%B1%D0%BD%D1%8F%D0%BA-%D0%A8%D1%83%D0%B2%D0%B0%D0%BB%D0%BE%D0%B2%D0%B0-1.png"
                        alt="Герб Академиа Особняк Шувалова"
                        fill
                        sizes="(max-width: 1200px) 0px, 260px"
                        loading="lazy"
                        className="object-contain"
                    />
                </FadeUp>
                <div className="flex flex-col gap-3 xl:flex-1 xl:gap-5">
                    <FadeUp>
                        <p>{copy.mansionLeftText}</p>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <p>{copy.mansionRightText}</p>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <p>{copy.mansionRightTextLast}</p>
                    </FadeUp>
                </div>
            </section>

            <RoomCategoriesSection />

            <section className="flex flex-col gap-4 m-6 xl:my-4 xl:max-w-4xl xl:mx-auto">
                <FadeUp className="xl:text-center">
                    <h2>{copy.servicesTitle}</h2>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center xl:-mt-4"
                >
                    {copy.servicesSubtitle}
                </FadeUp>
                <FadeUp delay={0.2} className="xl:text-center">
                    <p>{copy.servicesDescription}</p>
                </FadeUp>
            </section>

            <HomeServicesSection locale={locale} />

            <section className="flex flex-col gap-3 w-full px-6 xl:max-w-7xl xl:mx-auto xl:px-0 xl:py-12 xl:text-center">
                <FadeUp>
                    <h2>{copy.impressionsTitle}</h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="xl:max-w-4xl xl:mx-auto">
                        {copy.impressionsTextTop}
                    </p>
                </FadeUp>
                <FadeUp delay={0.15}>
                    <p className="xl:max-w-4xl xl:mx-auto">
                        {copy.impressionsTextTop2}
                    </p>
                </FadeUp>
                <FadeUp delay={0.2} className="my-2 xl:my-4">
                    <ImpressionsGrid />
                </FadeUp>
                <FadeUp delay={0.3}>
                    <p className="xl:max-w-4xl xl:mx-auto">
                        {copy.impressionsTextBottom}
                    </p>
                </FadeUp>
            </section>
            <section className="bg-[#ededeb] py-8 xl:py-16">
                <FadeUp>
                    {/* Десктоп: единой строкой alistair */}
                    <p className="hidden xl:block mx-auto max-w-4xl px-6 text-center font-alistair text-2xl xl:text-[40px]">
                        {copy.impressionsCaption}
                    </p>
                    {/* Мобайл: первая фраза alistair, дальше обычным шрифтом */}
                    <div className="flex flex-col gap-3 px-6 text-center xl:hidden">
                        <p className="font-alistair text-4xl">
                            Это не спектакль.
                        </p>
                        <p>
                            Это связь времен, которую вы сможете почувствовать,
                            становясь частью этой истории.
                        </p>
                    </div>
                </FadeUp>
            </section>
            <div className="hidden xl:block">
                <Divider />
            </div>
            <ContactsSection />
        </main>
    );
}
