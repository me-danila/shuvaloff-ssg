import type { Metadata } from "next";
import Image from "next/image";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import DarkHeroSection from "@/components/sections/DarkHeroSection";
import type { HeroImage } from "@/components/sections/HeroWithPictures";
import HeroWithPictures from "@/components/sections/HeroWithPictures";
import HistoricalMapSection from "@/components/sections/HistoricalMapSection";
import Divider from "@/components/ui/Divider";

export const metadata: Metadata = {
    title: "Отель-особняк ACADEMIA Особняк Шувалова — Санкт-Петербург",
    description:
        "Бутик-отель в историческом особняке XIX века в центре Санкт-Петербурга",
};

const heroImages: [HeroImage, HeroImage, HeroImage, HeroImage, HeroImage] = [
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
];

const descriptionImages = [
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
];

export default function Home() {
    return (
        <main className="flex flex-col gap-6">
            <HeroWithPictures
                title="Отель Academia Особняк&nbsp;Шувалова"
                subtitle="Изысканный отель в&nbsp;особняке XIX&nbsp;века с&nbsp;богатой&nbsp;историей в&nbsp;центре Петербурга"
                images={heroImages}
            />
            <BookingForm />
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
                <h2 className="mt-4">ОСОБНЯК С&nbsp;ИСТОРИЕЙ</h2>
                <p className="my-2 xl:max-w-4xl xl:mx-auto">
                    Отель-особняк ACADEMIA Шувалова&nbsp;— это бережно
                    отреставрированный объект культурного наследия, ранее
                    принадлежавший семье графа Шувалова. С&nbsp;уважением
                    к&nbsp;истории мы&nbsp;восстановили исторические детали,
                    чтобы вы&nbsp;могли погрузиться в&nbsp;неспешный ритм жизни
                    аристократического Петербурга.
                </p>
                <div className="flex gap-2 h-65 mt-2 xl:h-110 xl:mt-8 xl:gap-4 xl:max-w-6xl xl:mx-auto xl:w-full">
                    <div className="relative flex-1 min-w-0 overflow-hidden rounded-lg hidden xl:block xl:rounded-md">
                        <Image
                            src={descriptionImages[0].src}
                            alt={descriptionImages[0].alt}
                            fill
                            sizes="33vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                    <div className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                        <Image
                            src={descriptionImages[1].src}
                            alt={descriptionImages[1].alt}
                            fill
                            sizes="(max-width: 1200px) 100vw, 33vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                    <div className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                        <Image
                            src={descriptionImages[2].src}
                            alt={descriptionImages[2].alt}
                            fill
                            sizes="(max-width: 1200px) 100vw, 33vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>
            <section className="flex flex-col mx-6 gap-3 xl:max-w-6xl xl:mx-auto xl:flex-row xl:gap-8 xl:text-justify">
                <p className="xl:flex-1">
                    Историческая лепнина, мрамор, парадная лестница, кессонный
                    потолок в&nbsp;ресторане и&nbsp;антикварные предметы
                    в&nbsp;исторических резиденциях&nbsp;— всё для того, чтобы
                    вы&nbsp;могли почувствовать шепот истории в&nbsp;этих
                    стенах, не&nbsp;отказывая себе в&nbsp;привычном комфорте.
                </p>
                <Image
                    src="https://academia.spb.ru/wp-content/uploads/2026/02/Group-126.png"
                    alt="Герб Шувалова"
                    width={263}
                    height={234}
                    loading="lazy"
                    className="hidden xl:block xl:flex-none"
                />
                <p className="xl:flex-1">
                    В&nbsp;отеле вас ждет встреча с&nbsp;графом Шуваловым
                    и&nbsp;его семьей, как связующая нить между прошлым
                    и&nbsp;настоящим места, в котором вы&nbsp;остановитесь.
                    Вы&nbsp;сможете стать частью новой жизни старинного особняка
                    и&nbsp;вписать свою страницу в&nbsp;его историю.
                </p>
                <div className="relative mt-2 overflow-hidden rounded-lg xl:hidden">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/02/%D1%84%D0%B0%D1%81%D0%B0%D0%B4-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F2-2.png"
                        alt="Исторический фасад Shuvaloff"
                        width={340}
                        height={405}
                        loading="lazy"
                        className="w-full h-auto"
                    />
                </div>
            </section>
            <section className="flex flex-col gap-3 xl:text-center xl:mt-4">
                <h2 className="mx-6">Исторический центр</h2>
                <p className="mx-6 xl:max-w-4xl xl:mx-auto xl:mt-2">
                    Особняк ACADEMIA Шувалова находится в&nbsp;одном
                    из&nbsp;самых красивых мест исторического Петербурга&nbsp;—
                    на&nbsp;тихой Моховой улице, рядом с&nbsp;набережными Невы
                    и&nbsp;Фонтанки, Летним и&nbsp;Михайловским садами,
                    Михайловским замком и&nbsp;Марсовым полем. &nbsp;Дворец
                    бракосочетания №&nbsp;2 находится в&nbsp;пешей доступности
                    на&nbsp;улице Фурштатской.
                </p>
                <p className="mx-6 xl:max-w-4xl xl:mx-auto xl:mt-2">
                    До&nbsp;Невского проспекта вы&nbsp;дойдете за&nbsp;двадцать
                    минут неспешным шагом, и&nbsp;за&nbsp;это время
                    вы&nbsp;прогуляетесь по&nbsp;историческим мостам через
                    Фонтанку, Мойку, Лебяжью канавку и&nbsp;канал Грибоедова или
                    пройдетесь по&nbsp;набережной Невы с&nbsp;открыточными
                    видами на&nbsp;Петропавловскую крепость, Троицкий
                    и&nbsp;Дворцовый мосты и&nbsp;невероятные закаты.
                </p>
                <HistoricalMapSection />
                <p className="mx-6 text-center font-alistair text-2xl text-stone-400 xl:text-[40px] xl:max-w-3xl xl:mx-auto xl:mt-4 xl:-mb-2">
                    Идеальное расположение для тех, кто&nbsp;ценит исторический
                    Петербург.
                </p>
            </section>
            <Divider />
            <DarkHeroSection
                imageMobile={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/hands.png",
                    alt: "ACADEMIA Особняк Шувалова",
                    position: "center",
                }}
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/Rectangle-122.png",
                    alt: "ACADEMIA Особняк Шувалова",
                }}
                blocks={[
                    {
                        title: (
                            <>
                                SOLE&SOUL
                                <br />
                                СЕРВИС
                            </>
                        ),
                        paragraphs: [
                            "В особняке гостеприимство становится частью искусства, а сервис — проявлением внимательного и индивидуального подхода.",
                            "Мы создаём пространство, где каждый гость чувствует себя желанным и особенным. Где сервис становится невидимым, а забота естественной. Наша миссия — не просто соответствовать ожиданиям, а превосходить их и делать каждый визит не просто комфортным, а вдохновляющим.",
                        ],
                    },
                ]}
            />
            <section className="flex flex-col gap-3 mx-6 xl:max-w-6xl xl:mx-auto xl:text-center">
                <h2>АТМОСФЕРА ВПЕЧАТЛЕНИЙ</h2>
                <p className="xl:max-w-3xl xl:mx-auto">
                    Мы превращаем пребывание гостей в нашем особняке в необычное
                    погружение, в котором пространство, люди и детали становятся
                    частью единого художественного и исторического
                    замысла.&nbsp;Мы воссоздаем жизнь эпохи с помощью
                    театрализованных форматов, сценических зарисовок и живых
                    персонажей, которые могут встречать и сопровождать вас в
                    течение дня.
                </p>
                <video
                    src="https://academia.spb.ru/wp-content/uploads/2026/02/horiz.mov"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-90 my-2 rounded-xl object-cover xl:mt-8 xl:h-150 xl:rounded-md"
                />
                <p className="xl:max-w-3xl xl:mx-auto">
                    Граф Шувалов и его семья возвращаются в свою резиденцию с
                    пятницы по воскресенье, чтобы наполнить ее подлинной жизнью
                    и атмосферой своей эпохи. Их общение с гостями столь же
                    естественно и непредсказуемо, как и в XIX веке: мимолетная
                    встреча в холле особняка, изящный комплимент во время
                    прогулки по залам или случайная беседа у бара.
                </p>
                <p className="text-center font-alistair text-2xl text-stone-400 xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:mt-4">
                    Это не спектакль, а связь времен, которую вы сможете
                    почувствовать, становясь частью этой истории.
                </p>
            </section>
            <section className="flex flex-col gap-4 mx-6 xl:flex-row xl:max-w-6xl xl:mx-auto xl:gap-8">
                <Image
                    src="https://academia.spb.ru/wp-content/uploads/2026/02/5235.jpg"
                    alt="Экосистема вашего отдыха"
                    width={450}
                    height={350}
                    loading="lazy"
                    className="hidden aspect-4/3 object-cover xl:block xl:rounded-lg xl:object-[50%_70%]"
                />
                <div className="flex flex-col gap-4 xl:my-4">
                    <h2>ЭКОСИСТЕМА ВАШЕГО&nbsp;ОТДЫХА</h2>
                    <p className="xl:mt-2">
                        Мы&nbsp;приглашаем вас не&nbsp;просто остановиться
                        в&nbsp;особняке, а замедлиться, уделить время себе
                        и&nbsp;прочувствовать неспешную атмосферу дворянской
                        жизни позапрошлого века.
                    </p>
                    <p>
                        Отдохнуть в&nbsp;уютном номере после прогулки, оценить
                        классическую кухню и&nbsp;коктейльную карту ресторана
                        ACADEMIA BAR SHUVALOFF, расслабиться в&nbsp;руках
                        мастеров массажа и&nbsp;ухода в&nbsp;ACADEMIA SPA,
                        заказать трансфер или сюрприз для дорогого человека.
                        Наша консьерж-служба готова помочь с&nbsp;решением любых
                        вопросов.
                    </p>
                </div>
                <div className="relative mt-2 overflow-hidden rounded-lg xl:hidden">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/02/1e86635f1b9830245e5c69efe98d9745c21d4e4b.jpg"
                        alt="Экосистема вашего отдыха"
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
