import type { Metadata } from "next";
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

export const metadata: Metadata = {
    title: "Свадебный банкет в отеле в Санкт-Петербурге",
    description:
        "Планируете свадебный банкет в особенной атмосфере? Наш отель в Санкт-Петербурге предлагает идеальную площадку для камерной, стильной и уютной свадьбы. У нас вы можете заказать свадебный банкет с рестораном, авторским меню и обслуживанием премиум-класса.",
};

const forYouItems = [
    "Вы не любите шумные вечеринки и быстро устаете от большого скопления людей",
    "Вы хотите разделить этот день только с самыми близкими людьми",
    "Вам важно, чтобы каждый гость на празднике почувствовал вашу заботу и внимание",
    "Вы хотите провести личную церемонию и отойти от классической программы",
    "Вам важно, чтобы каждая деталь праздника отражала именно вашу историю",
];

const descriptionImages = [
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
];

const weddingInSpbImages = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/wed-1.jpg",
        alt: "Свадьба в Санкт-Петербурге",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/wed2.jpg",
        alt: "Свадьба в Санкт-Петербурге",
    },
];

const EveryRoomSlide: WeddingBigSlide[] = [
    {
        title: <>Исторический люкс</>,
        description: (
            <>
                Утро невесты в&nbsp;историческом люксе графини Дашковой,
                игристое в&nbsp;бокалах и&nbsp;завтрак в&nbsp;номер. Просторный
                номер с&nbsp;винтажной мебелью, антикварными деталями
                в&nbsp;интерьере и&nbsp;мягким светом идеально подойдет для
                сборов невесты, свадебной фотосессии и, конечно, для
                романтической ночи.
            </>
        ),
        button: { label: "Выбрать номер", href: "/booking/" },
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/hist1.jpg",
            alt: "Исторические люкс",
        },
    },
    {
        title: <>КАЖДЫЙ НОМЕР КАК ДЕКОРАЦИЯ К&nbsp;РОМАНТИЧЕСКОМУ ФИЛЬМУ:</>,
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
        button: { label: "Выбрать номер", href: "/booking/" },
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/hist2.jpg",
            alt: "Каждый номер как декорация",
        },
    },
    {
        title: <>РАЗМЕЩЕНИЕ ДЛЯ МОЛОДОЖЕНОВ И&nbsp;ГОСТЕЙ</>,
        description: (
            <>
                Удобное проживание для вас и&nbsp;ваших гостей в&nbsp;особняке
                до&nbsp;и&nbsp;после торжества. Отличная возможность
                с&nbsp;комфортом подготовиться к&nbsp;церемонии и&nbsp;просто
                подняться в&nbsp;номер после банкета, чтобы отдохнуть.
            </>
        ),
        button: { label: "Выбрать номер", href: "/booking/" },
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/hist3.jpg",
            alt: "Размещение для молодоженов и гостей",
        },
    },
];

const AestethicSlide: WeddingBigSlide[] = [
    {
        title: <>ЭСТЕТИКА ОФОРМЛЕНИЯ</>,
        description: (
            <>
                Изысканная сервировка, стильные цветовые сочетания, аксессуары
                и&nbsp;гармония всех элементов для создания атмосферы уюта
                и&nbsp;элегантности.
            </>
        ),
        button: { label: "Узнать стоимость", href: "/booking/" },
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/aest1.jpg",
            alt: "Эстетика оформления",
        },
    },
    {
        title: <>ФУРШЕТНОЕ МЕНЮ ОТ БРЕНД-ШЕФА ИЛЬИ&nbsp;ХАРЧЕНКО</>,
        description: (
            <>
                Наше меню подойдет как для самых искушенных гостей, так
                и&nbsp;для тех, кто предпочитает традиционные вкусы.
            </>
        ),
        button: { label: "Узнать стоимость", href: "/booking/" },
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/aest2.jpg",
            alt: "Фуршетное меню от бренд-шефа Ильи Харченко",
        },
    },
    {
        title: <>ПОЛНОЕ СОПРОВОЖДЕНИЕ ПРАЗДНИКА</>,
        description: (
            <>
                Мы&nbsp;готовы предложить отличную команду специалистов:
                ведущего, диджея, фотографа, флористов,&nbsp;&mdash;
                и&nbsp;обеспечить координацию их&nbsp;работы во&nbsp;время
                мероприятия, чтобы вы&nbsp;могли спокойно наслаждаться отдыхом.
            </>
        ),
        button: { label: "Узнать стоимость", href: "/booking/" },
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/aest3.jpg",
            alt: "Полное сопровождение праздника",
        },
    },
];

const InfiniteSliderImages: InfiniteSliderImage[] = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity1.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity2.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity3.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity4.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity5.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity6.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity7.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity8.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity9.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity10.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity11.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/infinity12.jpg",
        alt: "ACADEMIA Особняк Шувалова",
    },
];

export default function Wedding() {
    return (
        <main className="flex flex-col gap-8">
            <section>
                {/* Фото с подписью */}
                <div className="relative overflow-hidden aspect-8/15 xl:aspect-[unset] xl:min-h-screen">
                    <FadeIn
                        duration={0.9}
                        className="absolute inset-0 h-full w-full"
                    >
                        <Parallax className="h-full w-full" offset={80}>
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/wed.jpg"
                                alt="Свадьба в особняке"
                                fill
                                sizes="100vw"
                                loading="eager"
                                className="object-cover object-center"
                            />
                        </Parallax>
                    </FadeIn>

                    {/* Text */}

                    <StaggerContainer className="flex gap-2 h-65 xl:h-180 xl:gap-4 xl:w-full">
                        <div className="absolute bottom-10 md:bottom-20 xl:bottom-32 inset-x-0 text-center text-white z-10 flex flex-col gap-3 px-10 xl:max-w-2xl xl:mx-auto xl:gap-6">
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <h1 className="text-4xl xl:text-5xl">
                                    Свадьба в&nbsp;особняке
                                </h1>
                            </StaggerItem>
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <p className="text-base">
                                    Планируете провести свадебный банкет
                                    в&nbsp;узком кругу самых близких людей? Наш
                                    отель-особняк
                                    в&nbsp;Санкт-Петербурге&nbsp;&mdash; это
                                    идеальная площадка для стильной, но&nbsp;при
                                    этом камерной и&nbsp;уютной свадьбы.
                                    Мы&nbsp;предлагаем свадебные банкеты
                                    в&nbsp;историческом интерьере
                                    с&nbsp;изысканным ресторанным сервисом,
                                    авторским меню и&nbsp;обслуживанием
                                    премиум-класса.
                                </p>
                            </StaggerItem>
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <div className="flex flex-col gap-4 mt-2 md:flex-row md:justify-center">
                                    <WeddingFormModal
                                        triggerLabel="Записаться на экскурсию"
                                        variant="light"
                                    />
                                    <WeddingFormModal
                                        triggerLabel="Узнать стоимость"
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
                    <h2 className="text-3xl xl:text-5xl">
                        Почему свадьба в&nbsp;историческом особняке&nbsp;&mdash;
                        это идеальное решение?
                    </h2>
                </FadeUp>
                <FadeUp
                    className="relative h-90 w-80 mx-auto xl:w-120"
                    mode="inView"
                >
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/04/his.jpg"
                        alt="Свадьба в историческом особняке"
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
                        Свадебное торжество в&nbsp;особняке ACADEMIA Особняк
                        Шувалова подарит эмоции и&nbsp;впечатления, которые
                        останутся с&nbsp;вами на&nbsp;всю жизнь. Вас ждет особая
                        атмосфера графского особняка XIX века
                        в&nbsp;историческом центре Петербурга, камерность
                        пространства и&nbsp;изысканные интерьеры для фотографий.
                    </p>
                </FadeUp>
                <FadeUp className="relative" mode="inView">
                    <h3 className="font-baskerville text-2xl xl:text-4xl xl:max-w-3xl xl:mx-auto">
                        ОСОБНЯК — ОДНА ИЗ РЕЗИДЕНЦИЙ ЗНАТНОГО РОДА ШУВАЛОВЫХ
                    </h3>
                </FadeUp>
                <FadeUp
                    className="relative xl:max-w-2xl xl:mx-auto"
                    mode="inView"
                >
                    <p className="text-stone-500 leading-6">
                        Величественные залы с&nbsp;мраморными колоннами,
                        роскошные люстры из&nbsp;муранского стекла,
                        декорированные лепниной высокие потолки и&nbsp;другие
                        исторические детали&nbsp;&mdash; все это прошло через
                        бережную реставрацию. Сегодня отель-особняк сочетает
                        в&nbsp;себе роскошь, историческую атмосферу
                        и&nbsp;современный сервис, что делает его идеальным
                        местом для вашей незабываемой свадьбы.
                    </p>
                </FadeUp>
            </section>

            <StaggerContainer className="flex gap-2 h-65 xl:h-180 xl:gap-4 xl:w-full">
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
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
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg hidden xl:block xl:rounded-md">
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

            <section className="flex flex-col gap-4 m-6 text-center xl:max-w-2xl xl:mx-auto xl:my-8">
                <FadeUp>
                    <h2 className="text-3xl xl:text-5xl">ИСТОРИЧЕСКИЙ ЦЕНТР</h2>
                </FadeUp>
                <FadeUp className="relative" mode="inView">
                    <p className="text-stone-500">
                        Особое преимущество&nbsp;&mdash; это расположение
                        особняка в&nbsp;самом сердце Петербурга. Летний сад,
                        Михайловский сад, набережные Фонтанки и&nbsp;Невы,
                        Михайловский замок&nbsp;&mdash; все любимые места
                        свадебных фотосессий совсем рядом. Один из&nbsp;самых
                        красивых ЗАГСов Санкт-Петербурга также находится
                        в&nbsp;пешей доступности на&nbsp;улице Фурштатской.
                    </p>
                </FadeUp>
            </section>

            <WeddingHistoricalMapSection />

            <section className="flex flex-col gap-4 mx-6 xl:flex-row xl:mx-auto xl:my-6">
                <WeddingFormModal
                    triggerLabel="Узнать свободные даты"
                    variant="dark"
                />
                <Link
                    href="/booking/"
                    className="border border-black p-4 rounded-md font-baskerville uppercase hover:bg-black hover:border-black hover:text-white duration-200"
                >
                    Забронировать сейчас
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
                        aria-label="ACADEMIA Icon"
                        className="xl:scale-120 xl:ml-1"
                    >
                        <title>ACADEMIA Icon</title>
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
                        <h2 className="xl:text-4.5xl xl:mt-6">
                            Камерная свадьба в&nbsp;Санкт-Петербурге &mdash;
                        </h2>
                        <p className="font-baskerville uppercase text-xl xl:text-2xl">
                            стильно, искренне, душевно
                            <br />
                            и&nbsp;по‑настоящему
                        </p>
                    </div>

                    <WeddingSlider
                        images={weddingInSpbImages}
                        className="xl:hidden"
                    />
                    <p className="text-stone-500 xl:max-w-md xl:leading-6">
                        Формат камерной свадьбы&nbsp;&mdash; это про уютную
                        атмосферу, внимание к&nbsp;каждой детали
                        и&nbsp;возможность провести день только с&nbsp;самыми
                        близкими. Мы&nbsp;создаем особенные, трогательные
                        и&nbsp;очень личные торжества на&nbsp;10&minus;20
                        гостей. Все залы бара-ресторана ACADEMIA Шувалова
                        располагают к&nbsp;теплой и&nbsp;душевной атмосфере, где
                        каждый гость чувствует себя желанным.
                    </p>
                </div>
                <WeddingSlider
                    images={weddingInSpbImages}
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
                            alt="Свадьба в особняке"
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
                    role="img"
                    aria-label="ACADEMIA Icon"
                    className="w-[72px]"
                >
                    <title>ACADEMIA Icon</title>
                    <g clipPath="url(#a)">
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
                <h2 className="text-3xl xl:text-5xl xl:max-w-5xl">
                    Проживание в&nbsp;историческом особняке
                </h2>
                <p className="xl:max-w-lg">
                    В&nbsp;день вашей свадьбы каждая деталь имеет значение.
                    Отель-особняк ACADEMIA Шувалова не&nbsp;просто предлагает
                    размещение в&nbsp;номерах, а&nbsp;создает уникальное
                    пространство, где исторический антураж естественно
                    дополняется современным комфортом, создавая особую атмосферу
                    для значимых моментов.
                </p>
            </section>

            <WeddingBigSlider slides={EveryRoomSlide} />

            <section className="flex flex-col gap-8 items-center w-full min-h-screen relative p-6 justify-center text-center text-white xl:gap-12 xl:-mt-8">
                <FadeIn
                    duration={0.9}
                    className="absolute inset-0 h-full w-full -z-1"
                >
                    <Parallax className="h-full w-full -z-1" offset={80}>
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/Shuvaloff-089.jpg"
                            alt="Одна площадка – много возможностей"
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
                    role="img"
                    aria-label="ACADEMIA Icon"
                >
                    <title>ACADEMIA Icon</title>
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
                <h2 className="text-3xl xl:text-5xl xl:max-w-2xl">
                    Одна площадка&nbsp;&mdash; много возможностей
                </h2>
            </section>

            <section className="flex flex-col gap-4 p-6 text-center xl:text-left xl:max-w-7xl xl:w-full xl:mx-auto">
                <div className="xl:flex xl:items-center xl:my-4">
                    <div className="xl:grow">
                        <h2>ACADEMIA Шувалова</h2>
                        <p className="text-stone-500 xl:max-w-xs">
                            предлагает на&nbsp;выбор залы для свадебных
                            банкетов, каждый из&nbsp;которых уникален:
                        </p>
                    </div>

                    <p className="hidden text-stone-500 xl:block xl:grow xl:max-w-sm xl:text-right xl:leading-6">
                        Можно организовать свадебную церемонию, банкет,
                        afterparty&nbsp;&mdash; всё в&nbsp;одном пространстве,
                        без необходимости перемещений.
                    </p>
                </div>

                <div className="flex flex-col gap-6 xl:flex-row xl:w-full">
                    <div className="flex flex-col gap-3 items-center w-full">
                        <div className="relative w-full h-100 xl:h-130">
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/bar-1.jpg"
                                alt="Бар"
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <h3 className="uppercase text-2xl text-stone-500">
                            Бар
                        </h3>
                    </div>
                    <div className="flex flex-col gap-3 items-center w-full">
                        <div className="relative w-full h-100 xl:h-130">
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/cabinet-scaled.jpg"
                                alt="Кабинет"
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <h3 className="uppercase text-2xl text-stone-500">
                            Кабинет
                        </h3>
                    </div>
                    <div className="flex flex-col gap-3 items-center w-full">
                        <div className="relative w-full h-100 xl:h-130">
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/gost.jpg"
                                alt="Гостиная"
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <h3 className="uppercase text-2xl text-stone-500">
                            Гостиная
                        </h3>
                    </div>
                </div>
                <p className="text-stone-500 xl:hidden">
                    Можно организовать свадебную церемонию, банкет,
                    afterparty&nbsp;&mdash; всё в&nbsp;одном пространстве, без
                    необходимости перемещений.
                </p>
                <div className="flex flex-col gap-4 mt-4 xl:flex-row xl:mx-auto xl:my-10">
                    <WeddingFormModal
                        triggerLabel="Получить предложение"
                        variant="dark"
                    />
                    <WeddingFormModal
                        triggerLabel="Записаться на экскурсию"
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
                            alt="Кухня"
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
                    role="img"
                    aria-label="ACADEMIA Icon"
                >
                    <title>ACADEMIA Icon</title>
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
                <h2 className="text-3xl xl:text-5xl xl:max-w-5xl">Кухня</h2>
            </section>

            <section className="flex flex-col gap-6 xl:flex-row xl:items-center xl:min-h-screen xl:-my-8">
                <div className="flex flex-col gap-4 items-center text-center p-6 xl:max-w-lg xl:mx-auto xl:w-full">
                    <h3 className="font-baskerville text-3xl uppercase xl:text-5xl">
                        Бренд-шеф Илья&nbsp;Харченко
                    </h3>

                    <p className="text-stone-500">
                        Кухня Ильи Харченко строится на&nbsp;уважении
                        к&nbsp;классике и&nbsp;умении прочитывать
                        её&nbsp;заново, актуально и&nbsp;честно.
                        Он&nbsp;соединяет элементы классической кулинарной школы
                        и&nbsp;авторский взгляд на&nbsp;гастрономию, акцентируя
                        внимание гостя на&nbsp;локальных ингредиентах,
                        сезонности и&nbsp;культурном контексте.
                    </p>
                    <p className="font-alistair text-3xl/7">
                        &laquo;Мне важно понимать историю блюда: его философию,
                        как оно готовилось раньше, в&nbsp;каких вариациях, какие
                        традиции за&nbsp;ним стоят. Это глубокий взгляд
                        на&nbsp;процесс, а&nbsp;не&nbsp;просто набор
                        ингредиентов.&raquo;
                    </p>
                </div>
                <div className="relative w-full h-110 xl:min-h-screen xl:w-[50%]">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/04/chef.jpg"
                        alt="Шеф-повар"
                        fill
                        className="object-cover"
                    />
                </div>
            </section>

            <section className="bg-neutral-100 px-6 py-10 xl:py-16">
                <div className="flex flex-col gap-6 xl:max-w-7xl xl:mx-auto xl:gap-8">
                    <h2 className="text-3xl xl:text-4xl">
                        Почему выбирают&nbsp;нас:
                    </h2>
                    <div className="flex gap-4 overflow-y-scroll rounded-md pb-4 no-scrollbar overflow-y-visible">
                        <div className="flex flex-col gap-2 shrink-0 w-3xs">
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/why1.jpg"
                                alt="Организация свадьбы в особняке под ключ"
                                width={256}
                                height={375}
                                className="object-cover rounded-md"
                            />
                            <p className="text-stone-500 text-lg/6">
                                Полная организация свадьбы в&nbsp;особняке под
                                ключ
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 w-3xs">
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/why2.jpg"
                                alt="Идеальная площадка для камерной свадьбы в Санкт-Петербурге"
                                width={256}
                                height={375}
                                className="object-cover rounded-md"
                            />
                            <p className="text-stone-500 text-lg/6">
                                Идеальная площадка для камерной свадьбы
                                в&nbsp;Санкт‑Петербурге
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 w-3xs">
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/AP_82.jpg"
                                alt="Просторный исторический особняк"
                                width={256}
                                height={375}
                                className="object-cover rounded-md"
                            />
                            <p className="text-stone-500 text-lg/6">
                                Просторный исторический особняк
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 w-3xs">
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/AP_134.jpg"
                                alt="Залы с уникальным дизайном"
                                width={256}
                                height={375}
                                className="object-cover rounded-md"
                            />
                            <p className="text-stone-500 text-lg/6">
                                Залы с уникальным
                                <br />
                                дизайном
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 w-3xs">
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/04/AP_139.jpg"
                                alt="Индивидуальный подход"
                                width={256}
                                height={375}
                                className="object-cover rounded-md"
                            />
                            <p className="text-stone-500 text-lg/6">
                                Индивидуальный
                                <br />
                                подход
                            </p>
                        </div>
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
                            alt="Ваше торжество"
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
                    role="img"
                    aria-label="ACADEMIA Icon"
                >
                    <title>ACADEMIA Icon</title>
                    <g clipPath="url(#a)" stroke="#fff" strokeWidth="1.171">
                        <path d="M34.467 60.347c13.403 0 24.268-10.866 24.268-24.269S47.87 11.81 34.467 11.81 10.198 22.675 10.198 36.078s10.866 24.268 24.269 24.268Z" />
                        <path d="M55.333 26.333c-4.012 4.011-8.611 6.679-12.363 8.18-1.877.75-3.527 1.203-4.772 1.389-.624.093-1.128.116-1.498.085a2 2 0 0 1-.418-.076.6.6 0 0 1-.13-.063q0 .003-.02-.028a.6.6 0 0 1-.043-.102 2 2 0 0 1-.076-.418c-.031-.37-.008-.874.085-1.498.187-1.245.639-2.895 1.39-4.772 1.5-3.752 4.168-8.351 8.18-12.363 4.01-4.011 8.61-6.679 12.362-8.18 1.878-.75 3.527-1.202 4.772-1.389.624-.093 1.127-.116 1.498-.085q.275.026.418.076a.6.6 0 0 1 .102.044q.03.018.029.019h-.001q0-.002.02.028a1 1 0 0 1 .042.102q.051.143.077.418c.031.37.008.874-.086 1.498-.186 1.245-.638 2.894-1.389 4.772-1.5-3.752-4.168-8.351-8.18-12.363Z" />
                        <path d="M16.667 26.333c4.011 4.011 8.611 6.679 12.363 8.18 1.877.75 3.527 1.203 4.772 1.389.624.093 1.128.116 1.498.085q.275-.026.418-.076a.6.6 0 0 0 .13-.063q0 .003.02-.028a.6.6 0 0 0 .043-.102c.032-.096.06-.234.076-.418.031-.37.008-.874-.086-1.498-.186-1.245-.638-2.895-1.389-4.772-1.5-3.752-4.168-8.351-8.18-12.363-4.01-4.011-8.61-6.679-12.362-8.18-1.877-.75-3.527-1.202-4.772-1.389-.624-.093-1.128-.116-1.498-.085a2 2 0 0 0-.418.076.6.6 0 0 0-.102.044q-.03.018-.028.019-.001-.002-.02.028a.6.6 0 0 0-.043.102q-.05.143-.076.418c-.031.37-.008.874.085 1.498.187 1.245.639 2.894 1.39 4.772 1.5 3.752 4.168 8.351 8.18 12.363Zm38.666 19.334c-4.012-4.011-8.611-6.679-12.363-8.18-1.877-.75-3.527-1.203-4.772-1.389-.624-.093-1.128-.116-1.498-.085a2 2 0 0 0-.418.076.6.6 0 0 0-.102.044q-.029.017-.028.018s-.007.007-.02.029a.6.6 0 0 0-.043.102c-.032.096-.06.234-.076.418-.031.37-.008.874.085 1.498.187 1.245.639 2.895 1.39 4.772 1.5 3.752 4.168 8.351 8.18 12.363 4.01 4.01 8.61 6.679 12.362 8.18 1.878.75 3.527 1.203 4.772 1.389.624.093 1.127.116 1.498.085q.275-.026.418-.076a.6.6 0 0 0 .13-.063l.02-.027a1 1 0 0 0 .042-.103q.051-.143.077-.419c.031-.37.008-.873-.086-1.497-.186-1.245-.638-2.895-1.389-4.771-1.5-3.753-4.168-8.352-8.18-12.364Z" />
                        <path d="M16.667 45.667c4.011-4.011 8.611-6.679 12.363-8.18 1.877-.75 3.527-1.203 4.772-1.389.624-.093 1.128-.116 1.498-.085q.275.026.418.076.07.024.102.044.029.017.028.018s.007.007.02.029a.6.6 0 0 1 .043.102c.032.096.06.234.076.418.031.37.008.874-.086 1.498-.186 1.245-.638 2.895-1.389 4.772-1.5-3.752-4.168 8.351-8.18-12.363-4.01 4.01-8.61 6.679-12.362 8.18-1.877.75-3.527 1.203-4.772 1.389-.624.093-1.128.116-1.498.085a2 2 0 0 1-.418-.076.6.6 0 0 1-.102-.044q-.03-.018-.028-.019-.001.001-.02-.027a.6.6 0 0 1-.043-.103 2 2 0 0 1-.076-.419c-.031-.37-.008-.873.085-1.497.187-1.245.639-2.895 1.39-4.771 1.5-3.753 4.168-8.352 8.18-12.364Z" />
                        <path d="M66.604 61.604V10.428a5 5 0 0 0-5-5H10.426a5 5 0 0 0-5 5v51.176a5 5 0 0 0 5 5h51.176a5 5 0 0 0 5-5Z" />
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path fill="#fff" d="M0 0h72v72H0z" />
                        </clipPath>
                    </defs>
                </svg>
                <h2 className="text-3xl xl:text-5xl xl:max-w-5xl">
                    мы&nbsp;поможем сделать ваше торжество еще ярче!
                </h2>
            </section>

            <WeddingBigSlider slides={AestethicSlide} />

            <section className="flex flex-col gap-2 items-center w-full min-h-screen relative p-6 justify-center text-white xl:gap-4 xl:-my-8">
                <FadeIn
                    duration={0.9}
                    className="absolute inset-0 h-full w-full -z-1"
                >
                    <Parallax className="h-full w-full -z-1" offset={80}>
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/Shuvaloff-114_1.jpg"
                            alt="Камерная свадьба это ваш сценарий"
                            fill
                            sizes="100vw"
                            loading="lazy"
                            className="object-cover object-center"
                        />
                    </Parallax>
                </FadeIn>

                <h2 className="text-center text-3xl mb-4 xl:max-w-2xl xl:text-5xl xl:mb-4">
                    КАМЕРНАЯ СВАДЬБА&nbsp;&mdash; ЭТО ВАШ СЦЕНАРИЙ, ЕСЛИ:
                </h2>
                <div className="flex flex-col gap-2 xl:max-w-md">
                    {forYouItems.map((item) => (
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
                    <h2 className="text-3xl xl:text-4xl">Отзывы о&nbsp;нас</h2>
                    <WeddingReviewsWidget />
                </div>
            </section>

            <section className="flex flex-col gap-6 xl:max-w-6xl xl:w-full xl:mx-auto px-6 py-10 xl:gap-8">
                <h2 className="text-3xl xl:text-4xl">О&nbsp;нас в&nbsp;СМИ</h2>
                <div className="grid xl:grid-cols-3 gap-4">
                    <SmiSobakaRuModal />
                </div>
            </section>

            <section className="flex flex-col gap-4 m-6 xl:max-w-3xl xl:mx-auto items-center text-center xl:mb-8">
                <FadeUp>
                    <h2 className="text-3xl xl:text-5xl">
                        ОРГАНИЗУЕМ ВАШУ СВАДЬБУ С&nbsp;ВНИМАНИЕМ К&nbsp;КАЖДОЙ
                        ДЕТАЛИ
                    </h2>
                </FadeUp>
                <FadeUp
                    className="relative flex flex-col gap-2 text-stone-500"
                    mode="inView"
                >
                    <p>
                        Оставьте заявку, и&nbsp;наш координатор свяжется
                        с&nbsp;вами для обсуждения всех нюансов.
                        <br />
                        Уточните, сколько стоит свадьба в&nbsp;отеле-особняке
                        в&nbsp;Санкт-Петербурге именно под ваш
                        запрос,&nbsp;&mdash; мы&nbsp;подготовим персональное
                        предложение в&nbsp;течение 1&nbsp;дня.
                    </p>
                </FadeUp>
                <FadeUp
                    className="relative flex flex-col gap-2 text-stone-500"
                    mode="inView"
                >
                    <WeddingFormModal
                        triggerLabel="Перезвоните мне"
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
