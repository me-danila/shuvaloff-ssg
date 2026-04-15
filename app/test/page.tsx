import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import DarkHeroSection from "@/components/sections/DarkHeroSection";
import type { HeroImage } from "@/components/sections/HeroWithPictures";
import HeroWithPictures from "@/components/sections/HeroWithPictures";
import HistoricalMapSection from "@/components/sections/HistoricalMapSection";
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
import { getLocaleAlternates } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/routing";
import { localizeHref } from "@/lib/i18n/routing";

export const metadata: Metadata = {
    title: "Отель ACADEMIA Особняк Шувалова — Санкт-Петербург",
    description:
        "Отель в историческом особняке XIX века в центре Санкт-Петербурга",
    alternates: getLocaleAlternates("/", "ru"),
};

type HomeCopy = {
    heroTitle: string;
    heroSubtitle: string;
    mansionTitle: string;
    countsSpbTitle: string;
    countsSpbParagraphs: [string, string];
    orderLabel: string;
    detailsLabel: string;
    mansionDescription: string;
    mansionLeftText: string;
    mansionRightText: string;
    centerTitle: string;
    centerTextTop: string;
    centerTextBottom: string;
    centerCaption: string;
    soulTitleBottom: string;
    soulParagraphs: [string, string];
    impressionsTitle: string;
    impressionsTextTop: string;
    impressionsTextBottom: string;
    impressionsCaption: string;
    ecosystemTitle: string;
    ecosystemTextTop: string;
    ecosystemTextBottom: string;
};

const heroImagesByLocale: Record<
    Locale,
    [HeroImage, HeroImage, HeroImage, HeroImage, HeroImage]
> = {
    ru: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/02_MMI_9908_327_@maxiimov_0-без-урны-1.png",
            alt: "Фасад отеля",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/AP_27-1.png",
            alt: "Невеста у окна",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/v3-1.png",
            alt: "Номер",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/AP_163-1.png",
            alt: "Пара",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/AP_59-1.png",
            alt: "Чтение",
        },
    ],
    en: [
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/02_MMI_9908_327_@maxiimov_0-без-урны-1.png",
            alt: "Hotel facade",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/AP_27-1.png",
            alt: "Bride by the window",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/v3-1.png",
            alt: "Room interior",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/AP_163-1.png",
            alt: "Couple",
        },
        {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/AP_59-1.png",
            alt: "Reading",
        },
    ],
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
        heroTitle: "Academia Особняк Шувалова",
        heroSubtitle:
            "Изысканный отель в особняке XIX века с богатой историей в центре Петербурга",
        countsSpbTitle: "Графский Петербург",
        countsSpbParagraphs: [
            "Особый отдых в формате пышных аристократических традиций",
            "Для тех, кто хочет прожить свой лучший опыт погружения в эпоху ХІХ века",
        ],
        orderLabel: "Забронировать",
        detailsLabel: "Подробнее",
        mansionTitle: "ОСОБНЯК С ИСТОРИЕЙ",
        mansionDescription:
            "Отель ACADEMIA Шувалова — это бережно отреставрированный объект культурного наследия, ранее принадлежавший семье графа Шувалова. С уважением к истории мы восстановили исторические детали, чтобы вы могли погрузиться в неспешный ритм жизни аристократического Петербурга.",
        mansionLeftText:
            "Историческая лепнина, мрамор, парадная лестница, кессонный потолок в ресторане и антикварные предметы в исторических резиденциях — все для того, чтобы вы могли почувствовать шепот истории в этих стенах, не отказывая себе в привычном комфорте.",
        mansionRightText:
            "В отеле вас ждет встреча с графом Шуваловым и его семьей, как связующая нить между прошлым и настоящим места, в котором вы остановитесь. Вы сможете стать частью новой жизни старинного особняка и вписать свою страницу в его историю.",
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
        impressionsTitle: "АТМОСФЕРА ВПЕЧАТЛЕНИЙ",
        impressionsTextTop:
            "Мы превращаем пребывание гостей в нашем особняке в необычное погружение, в котором пространство, люди и детали становятся частью единого художественного и исторического замысла. Мы воссоздаем жизнь эпохи с помощью театрализованных форматов, сценических зарисовок и живых персонажей, которые могут встречать и сопровождать вас в течение дня.",
        impressionsTextBottom:
            "Граф Шувалов и его семья возвращаются в свою резиденцию с пятницы по воскресенье, чтобы наполнить ее подлинной жизнью и атмосферой своей эпохи. Их общение с гостями столь же естественно и непредсказуемо, как и в XIX веке: мимолетная встреча в холле особняка, изящный комплимент во время прогулки по залам или случайная беседа у бара.",
        impressionsCaption:
            "Это не спектакль, а связь времен, которую вы сможете почувствовать, становясь частью этой истории.",
        ecosystemTitle: "ЭКОСИСТЕМА ВАШЕГО ОТДЫХА",
        ecosystemTextTop:
            "Мы приглашаем вас не просто остановиться в особняке, а замедлиться, уделить время себе и прочувствовать неспешную атмосферу дворянской жизни позапрошлого века.",
        ecosystemTextBottom:
            "Отдохнуть в уютном номере после прогулки, оценить классическую кухню и коктейльную карту ресторана Бар-ресторан ACADEMIA Шувалова, расслабиться в руках мастеров массажа и ухода в ACADEMIA SPA, заказать трансфер или сюрприз для дорогого человека. Наша консьерж-служба готова помочь с решением любых вопросов.",
    },
    en: {
        heroTitle: "Academia Mansion Shuvaloff",
        heroSubtitle:
            "An elegant hotel in a 19th-century mansion with a rich history in the heart of Saint Petersburg",
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
            "At the hotel, you are welcomed by Count Shuvalov and his family as a living connection between the past and the present of the place where you stay. You can become part of a new chapter in the life of this old mansion and add your own page to its story.",
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
        impressionsTitle: "AN ATMOSPHERE OF IMPRESSIONS",
        impressionsTextTop:
            "We turn our guests' stay in the mansion into an immersive journey where space, people, and details become part of one artistic and historical vision. We recreate the spirit of the era through theatrical formats, staged sketches, and vivid characters who can greet and accompany you throughout the day.",
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

export default function TestPage({ locale }: { locale: Locale }) {
    const copy = homeCopyByLocale[locale];
    const heroImages = heroImagesByLocale[locale];
    const descriptionImages = descriptionImagesByLocale[locale];

    return (
        <main className="flex flex-col gap-6">
            <section className="xl:w-full xl:max-w-6xl xl:mx-auto">
                <div className="text-center m-4 xl:mb-8">
                    <FadeIn duration={0.7}>
                        <h1>Academia Особняк Шувалова</h1>
                    </FadeIn>
                    <FadeIn delay={0.1} duration={0.7}>
                        <p className="leading-5 mt-2 xl:w-2xl xl:mx-auto">
                            Изысканный отель в особняке XIX века с богатой
                            историей в центре Петербурга
                        </p>
                    </FadeIn>
                </div>
                <FadeUp delay={0.2}>
                    <video
                        src="https://academia.spb.ru/wp-content/uploads/2026/04/video.webm"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-80 my-2 rounded-xl object-cover xl:mt-8 xl:h-130 xl:rounded-md"
                    />
                </FadeUp>
            </section>

            <BookingForm />

            <section className="relative overflow-hidden">
                {/* MOBILE: фото снизу 55% */}
                <div className="mx-6 flex flex-col gap-4 mb-4 xl:hidden">
                    <div className="relative h-60 overflow-hidden rounded-lg mb-1">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/Frame-2.png"
                            alt="Графский Петербург"
                            fill
                            loading="lazy"
                            className="h-100 w-full rounded-lg object-cover"
                        />
                    </div>
                    <h2 className="-mb-2">Графский Петербург</h2>
                    <div className="flex flex-col gap-2">
                        <p>
                            Особый отдых в формате пышных аристократических
                            традиций
                        </p>

                        <p>
                            {" "}
                            Для тех, кто хочет прожить свой лучший опыт
                            погружения в эпоху ХІХ века
                        </p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <Button
                            href={localizeHref(
                                `/booking?&be-offer=910895`,
                                locale,
                            )}
                            variant="primary"
                        >
                            Забронировать
                        </Button>
                        <Link
                            href={localizeHref(`/aristocratic-spb/`, locale)}
                            className="relative flex items-center gap-3 uppercase tracking-widest text-sm"
                        >
                            Подробнее
                            <span className="text-2xl mb-1">&rsaquo;</span>
                        </Link>
                    </div>
                </div>

                {/*DESKTOP: фото на весь блок*/}
                <div className="hidden xl:flex relative h-150 text-white">
                    <Parallax className="w-full h-full absolute" offset={100}>
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/Frame-1.png"
                            alt="Графский Петербург"
                            fill
                            sizes="100vw"
                            loading="lazy"
                            className="object-cover object-top"
                        />
                    </Parallax>
                    <div className="p-20 flex flex-col justify-between">
                        <FadeUp duration={1.2}>
                            <h2 className="relative z-1 text-white">
                                Графский Петербург
                            </h2>
                        </FadeUp>
                        <div className="max-w-[390px] flex flex-col gap-6">
                            <p>
                                Особый отдых в формате пышных аристократических
                                традиций
                            </p>

                            <p>
                                {" "}
                                Для тех, кто хочет прожить свой лучший опыт
                                погружения в эпоху ХІХ века
                            </p>
                        </div>
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(to right, rgba(0,0,0,.6) 20%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 80%)",
                            }}
                        />
                        <div className="flex items-center gap-8 mt-2">
                            <Button
                                href={localizeHref(
                                    `/booking?&be-offer=910895`,
                                    locale,
                                )}
                                variant="primary"
                            >
                                Забронировать
                            </Button>
                            <Link
                                href={localizeHref(
                                    `/aristocratic-spb/`,
                                    locale,
                                )}
                                className="relative flex items-center gap-3 uppercase tracking-widest text-sm"
                            >
                                Подробнее
                                <span className="text-2xl mb-1">&rsaquo;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
