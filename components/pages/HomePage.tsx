import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import DarkHeroSection from "@/components/sections/DarkHeroSection";
import type { HeroImage } from "@/components/sections/HeroWithPictures";
import HeroWithPictures from "@/components/sections/HeroWithPictures";
import HistoricalMapSection from "@/components/sections/HistoricalMapSection";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/routing";

type HomeCopy = {
    heroTitle: string;
    heroSubtitle: string;
    mansionTitle: string;
    countsSpbTitle: string;
    countsSpbParagraphs: [string, string];
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
            "Для тех, кто хочет прожить свой лучший опыт погружения в эпоху ХІХ века.",
        ],
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
            "For those who wish to experience the ultimate immersion in the 19th century.",
        ],
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

export default function HomePage({ locale }: { locale: Locale }) {
    const copy = homeCopyByLocale[locale];
    const heroImages = heroImagesByLocale[locale];
    const descriptionImages = descriptionImagesByLocale[locale];

    return (
        <main className="flex flex-col gap-6">
            <HeroWithPictures
                title={copy.heroTitle}
                subtitle={copy.heroSubtitle}
                images={heroImages}
            />
            <BookingForm />
            {/*<DarkHeroSection*/}
            {/*    imageMobile={{*/}
            {/*        src: "https://academia.spb.ru/wp-content/uploads/2026/04/027b342e7353d8f7706f21dcaa7c118ce29b4ba3.png",*/}
            {/*        alt: "ACADEMIA Mansion Shuvaloff",*/}
            {/*        position: "center",*/}
            {/*    }}*/}
            {/*    image={{*/}
            {/*        src: "https://academia.spb.ru/wp-content/uploads/2026/04/027b342e7353d8f7706f21dcaa7c118ce29b4ba3.png",*/}
            {/*        alt: "ACADEMIA Mansion Shuvaloff",*/}
            {/*    }}*/}
            {/*    blocks={[*/}
            {/*        {*/}
            {/*            title: <>{copy.countsSpbTitle}</>,*/}
            {/*            paragraphs: copy.countsSpbParagraphs,*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*    imageGradient={false}*/}
            {/*    buttons={{*/}
            {/*        orderHref: "/booking/?&be-offer=910895/",*/}
            {/*        detailsHref: "/aristocratic-spb/",*/}
            {/*    }}*/}
            {/*/>*/}
            <section className="flex flex-col gap-2 mx-6 relative xl:text-center xl:mx-0">
                <div className="relative h-90 overflow-hidden rounded-lg xl:hidden">
                    <Image
                        src={descriptionImages[0].src}
                        alt={descriptionImages[0].alt}
                        fill
                        loading="lazy"
                        className="h-100 w-full rounded-lg object-cover"
                    />
                </div>
                <FadeUp>
                    <h2 className="mt-4">{copy.mansionTitle}</h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="my-2 xl:max-w-4xl xl:mx-auto">
                        {copy.mansionDescription}
                    </p>
                </FadeUp>
                <StaggerContainer className="flex gap-2 h-65 mt-2 xl:h-110 xl:mt-8 xl:gap-4 xl:max-w-6xl xl:mx-auto xl:w-full">
                    <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg hidden xl:block xl:rounded-md">
                        <Image
                            src={descriptionImages[0].src}
                            alt={descriptionImages[0].alt}
                            fill
                            sizes="33vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </StaggerItem>
                    <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                        <Image
                            src={descriptionImages[1].src}
                            alt={descriptionImages[1].alt}
                            fill
                            sizes="(max-width: 1200px) 100vw, 33vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </StaggerItem>
                    <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
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
            <section className="flex flex-col mx-6 gap-3 xl:max-w-6xl xl:mx-auto xl:flex-row xl:gap-8 xl:text-justify">
                <FadeUp className="xl:flex-1">
                    <p>{copy.mansionLeftText}</p>
                </FadeUp>
                <FadeUp delay={0.2} className="hidden xl:block xl:flex-none">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/02/Group-126.png"
                        alt="Shuvalov coat of arms"
                        width={263}
                        height={234}
                        loading="lazy"
                    />
                </FadeUp>
                <FadeUp delay={0.3} className="xl:flex-1">
                    <p>{copy.mansionRightText}</p>
                </FadeUp>
                <div className="relative mt-2 overflow-hidden rounded-lg xl:hidden">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/02/%D1%84%D0%B0%D1%81%D0%B0%D0%B4-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F2-2.png"
                        alt="Shuvaloff historic facade"
                        width={340}
                        height={405}
                        loading="lazy"
                        className="w-full h-auto"
                    />
                </div>
            </section>
            <section className="flex flex-col gap-3 xl:text-center xl:mt-4">
                <FadeUp>
                    <h2 className="mx-6">{copy.centerTitle}</h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="mx-6 xl:max-w-4xl xl:mx-auto xl:mt-2">
                        {copy.centerTextTop}
                    </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p className="mx-6 xl:max-w-4xl xl:mx-auto xl:mt-2">
                        {copy.centerTextBottom}
                    </p>
                </FadeUp>
                <HistoricalMapSection />
                <FadeUp delay={0.3}>
                    <p className="mx-6 text-center font-alistair text-2xl text-stone-400 xl:text-[40px] xl:max-w-3xl xl:mx-auto xl:mt-4 xl:-mb-2">
                        {copy.centerCaption}
                    </p>
                </FadeUp>
            </section>
            <Divider />
            <DarkHeroSection
                imageMobile={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/hands.png",
                    alt: "ACADEMIA Mansion Shuvaloff",
                    position: "center",
                }}
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/Rectangle-122.png",
                    alt: "ACADEMIA Mansion Shuvaloff",
                }}
                blocks={[
                    {
                        title: (
                            <>
                                SOLE&SOUL
                                <br />
                                {copy.soulTitleBottom}
                            </>
                        ),
                        paragraphs: copy.soulParagraphs,
                    },
                ]}
            />
            <section className="flex flex-col gap-3 mx-6 xl:max-w-6xl xl:mx-auto xl:text-center">
                <FadeUp>
                    <h2>{copy.impressionsTitle}</h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="xl:max-w-3xl xl:mx-auto">
                        {copy.impressionsTextTop}
                    </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <video
                        src="https://academia.spb.ru/wp-content/uploads/2026/02/horiz.mov"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-90 my-2 rounded-xl object-cover xl:mt-8 xl:h-150 xl:rounded-md"
                    />
                </FadeUp>
                <FadeUp delay={0.3}>
                    <p className="xl:max-w-3xl xl:mx-auto">
                        {copy.impressionsTextBottom}
                    </p>
                </FadeUp>
                <FadeUp delay={0.4}>
                    <p className="text-center font-alistair text-2xl text-stone-400 xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:mt-4">
                        {copy.impressionsCaption}
                    </p>
                </FadeUp>
            </section>
            <section className="flex flex-col gap-4 mx-6 xl:flex-row xl:max-w-6xl xl:mx-auto xl:gap-8">
                <FadeUp className="hidden xl:block xl:flex-1">
                    <div className="relative aspect-4/3 h-full min-h-[350px] w-full overflow-hidden rounded-lg">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/02/5235.jpg"
                            alt="Your stay ecosystem"
                            fill
                            loading="lazy"
                            sizes="(max-width: 1280px) 100vw, 50vw"
                            className="object-cover xl:object-[50%_70%]"
                        />
                    </div>
                </FadeUp>
                <div className="flex flex-col gap-4 xl:my-4 xl:flex-1">
                    <FadeUp>
                        <h2>{copy.ecosystemTitle}</h2>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <p className="xl:mt-2">{copy.ecosystemTextTop}</p>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <p>{copy.ecosystemTextBottom}</p>
                    </FadeUp>
                </div>
                <div className="relative mt-2 overflow-hidden rounded-lg xl:hidden">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/02/1e86635f1b9830245e5c69efe98d9745c21d4e4b.jpg"
                        alt="Your stay ecosystem"
                        width={340}
                        height={405}
                        loading="lazy"
                        className="w-full h-auto"
                    />
                </div>
            </section>
            <ContactsSection />
        </main>
    );
}
