"use client";

import type { ReactNode } from "react";
import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/routing";

type Device = {
    src: string;
    title: string;
    description: ReactNode;
};

type Step = {
    number: string;
    title: string;
    description: string;
};

type BeautyBarCopy = {
    title: string;
    intro: string;
    brandTitle: string;
    brandDescription: string;
    hintTitle: string;
    giftTitle: string;
    devices: Device[];
    steps: Step[];
    giftItems: string[];
};

const copyByLocale: Record<Locale, BeautyBarCopy> = {
    ru: {
        title: "Девайсы для красоты и здоровья",
        intro: "Дорогие гости! Сделайте ваш отдых еще более приятным — закажите в номер девайсы для красоты и здоровья от бренда GESS. Это отличный способ расслабиться после долгой дороги или побаловать себя любимыми процедурами по уходу.",
        brandTitle: "О бренде GESS",
        brandDescription:
            "GESS — международный бренд девайсов для красоты и здоровья, который меняет представление о домашнем уходе. Мы создаем технологичные, простые в использовании и по-настоящему эффективные гаджеты для лица и тела, чтобы профессиональный результат стал доступен каждому.",
        hintTitle: "Подсказка для гостей",
        giftTitle: "Получите в подарок массажер для лица Face Lifting",
        devices: [
            {
                src: "https://academia.spb.ru/wp-content/uploads/2025/10/gess.avif",
                title: "MINI REVOLVER массажный пистолет",
                description: (
                    <>
                        Компактный и мощный перкуссионный массажер Mini Revolver
                        для глубокой проработки мышц и мышечно-фасциального
                        расслабления. Быстро избавляет от напряжения и боли
                        благодаря пульсирующей массажной технике.
                        <br />
                        10 режимов интенсивности и 4 вида насадок для разных
                        групп мышц.
                    </>
                ),
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2025/10/tinto.avif",
                title: "TINTO массажер для глаз",
                description: (
                    <>
                        5D очки-массажер TINTO предлагают бьюти-комбо для
                        здоровья глаз: прессотерапия, прогрев, вибромассаж, EMS
                        и аудиотерапия.
                        <br />
                        Конструкция очков обеспечивает свободный обзор во время
                        процедуры. TINTO — эффективное решение для
                        восстановления глаз после использования гаджетов
                    </>
                ),
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2025/10/shato.avif",
                title: "SHATO массажер для рук и тела",
                description: (
                    <>
                        Уникальный массажер предлагает разнообразные виды
                        воздействия:
                        <br />• воздушно-компрессионный и акупунктурный массаж
                        для кистей рук
                        <br />• роликовый массаж шиацу — для всего тела.
                        <br />
                        Вы сможете эффективно промассировать ладони, пальцы и
                        тыльную сторону рук. Также массажер позволит сделать
                        расслабляющий массаж всего тела.
                    </>
                ),
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2025/10/decora.avif",
                title: "DECORA интерьерная массажная подушка",
                description: (
                    <>
                        Интерьерная подушка-массажер премиум класса Decora была
                        разработана вместе с ведущими дизайнерами и инженерами
                        бренда согласно философии «здорового интерьера».
                        <br />
                        Встроенный массажный механизм с четырьмя роликами
                        обеспечивает массаж шиацу. Обратная сторона оснащена
                        акупунктурными элементами в форме лотоса по методике
                        аппликатора Кузнецова.
                    </>
                ),
            },
        ],
        steps: [
            {
                number: "01",
                title: "Бесплатный тест-драйв",
                description:
                    "Приборы доступны бесплатно на весь срок пребывания",
            },
            {
                number: "02",
                title: "Выберите прибор для теста",
                description:
                    "Ознакомьтесь с устройствами выше и выберите то, что вам подходит",
            },
            {
                number: "03",
                title: "Обратитесь к менеджеру",
                description:
                    "Для аренды или покупки прибора обратитесь к менеджеру службы заботы на ресепшн",
            },
        ],
        giftItems: [
            "Опубликуйте stories или пост с локации отеля ACADEMIA Особняк Шувалова и продукцией GESS из Beauty Bar",
            "Отметьте аккаунты отеля @academia.hotels и @gessmarket.ru и поделитесь своими искренними впечатлениями",
            "Покажите опубликованный материал менеджеру службы заботы на ресепшн и получите свой подарок",
        ],
    },
    en: {
        title: "Beauty & Health Devices",
        intro: "Dear guests! Make your stay even more pleasant — order beauty and health devices from the GESS brand to your room. This is a great way to relax after a long journey or pamper yourself with your favorite care treatments.",
        brandTitle: "About the GESS brand",
        brandDescription:
            "GESS is an international brand of beauty and health devices that is changing the idea of home care. We create technological, easy-to-use and truly effective gadgets for the face and body, so that professional results are available to everyone.",
        hintTitle: "Guest Tip",
        giftTitle: "Get a Face Lifting facial massager as a gift",
        devices: [
            {
                src: "https://academia.spb.ru/wp-content/uploads/2025/10/gess.avif",
                title: "MINI REVOLVER massage gun",
                description: (
                    <>
                        The compact and powerful Mini Revolver percussion
                        massager for deep muscle work and myofascial relaxation.
                        Quickly relieves tension and pain thanks to the
                        pulsating massage technique.
                        <br />
                        10 intensity modes and 4 types of attachments for
                        different muscle groups.
                    </>
                ),
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2025/10/tinto.avif",
                title: "TINTO eye massager",
                description: (
                    <>
                        TINTO 5D eye massager goggles offer a beauty combo for
                        eye health: pressure therapy, heating, vibration
                        massage, EMS and audio therapy.
                        <br />
                        The goggles design provides a clear view during the
                        procedure. TINTO is an effective solution for eye
                        recovery after using gadgets.
                    </>
                ),
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2025/10/shato.avif",
                title: "SHATO hand and body massager",
                description: (
                    <>
                        The unique massager offers various types of impact:
                        <br />• air-compression and acupressure massage for the
                        hands
                        <br />• shiatsu roller massage — for the whole body.
                        <br />
                        You will be able to effectively massage your palms,
                        fingers and the back of your hands. Also, the massager
                        will allow you to do a relaxing full body massage.
                    </>
                ),
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2025/10/decora.avif",
                title: "DECORA interior massage pillow",
                description: (
                    <>
                        The Decora premium class interior pillow-massager was
                        developed together with the leading designers and
                        engineers of the brand according to the "healthy
                        interior" philosophy.
                        <br />
                        The built-in massage mechanism with four rollers
                        provides shiatsu massage. The reverse side is equipped
                        with lotus-shaped acupressure elements according to the
                        Kuznetsov applicator technique.
                    </>
                ),
            },
        ],
        steps: [
            {
                number: "01",
                title: "Free test drive",
                description:
                    "Devices are available for free for the entire duration of your stay",
            },
            {
                number: "02",
                title: "Choose a device for testing",
                description:
                    "Check the devices above and choose what suits you best",
            },
            {
                number: "03",
                title: "Contact the manager",
                description:
                    "To rent or purchase a device, contact the guest relations manager at the reception",
            },
        ],
        giftItems: [
            "Post a story or a post from the ACADEMIA Shuvaloff Mansion hotel location with GESS products from the Beauty Bar",
            "Tag the hotel accounts @academia.hotels and @gessmarket.ru and share your sincere impressions",
            "Show the published material to the guest relations manager at the reception and receive your gift",
        ],
    },
};

export default function BeautyBarPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    return (
        <main className="flex flex-col gap-8 xl:gap-10">
            <section className="flex flex-col gap-4 m-6 xl:w-full xl:max-w-6xl xl:mx-auto xl:text-center">
                <FadeUp>
                    <h1>{copy.title}</h1>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="xl:w-full xl:max-w-4xl xl:mx-auto">
                        {copy.intro}
                    </p>
                </FadeUp>
            </section>

            <section className="flex flex-col gap-2 xl:gap-3 px-6 w-full max-w-4xl xl:mx-auto xl:text-center xl:mb-4">
                <FadeUp>
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/03/GESS_na-prozrachnom-fone.png"
                        alt="GESS Brand"
                        width={198}
                        height={99}
                        priority
                        className="xl:mx-auto mb-4"
                    />
                </FadeUp>
                <FadeUp delay={0.1}>
                    <h2 className="xl:text-3xl">{copy.brandTitle}</h2>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p>{copy.brandDescription}</p>
                </FadeUp>
            </section>

            <StaggerContainer className="flex flex-col mx-6 gap-8 xl:grid xl:grid-cols-2 xl:max-w-6xl xl:mx-auto xl:w-full">
                {copy.devices.map((device) => (
                    <StaggerItem
                        key={device.title}
                        className="flex flex-col gap-2"
                    >
                        <div className="relative w-full h-90 overflow-hidden rounded-md">
                            <Image
                                src={device.src}
                                alt={device.title}
                                fill
                                sizes="50vw"
                                loading="lazy"
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                        <h3 className="uppercase text-xl mt-3">
                            {device.title}
                        </h3>
                        <p className="text-zinc-600">{device.description}</p>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <section className="flex flex-col gap-6 xl:gap-10 mx-6 py-4 xl:py-10 border-t border-brand-blue-100 xl:max-w-6xl xl:mx-auto xl:w-full">
                <FadeUp>
                    <h3 className="font-baskerville text-xl xl:text-3xl uppercase">
                        {copy.hintTitle}
                    </h3>
                </FadeUp>
                <StaggerContainer className="flex flex-col gap-6 xl:flex-row xl:gap-16">
                    {copy.steps.map(({ number, title, description }) => (
                        <StaggerItem
                            key={number}
                            className="flex gap-5 xl:flex-1"
                        >
                            <span className="text-4xl text-brand-blue-100 shrink-0 font-baskerville">
                                {number}
                            </span>
                            <div className="flex flex-col gap-1 -mt-1">
                                <p className="uppercase">{title}</p>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>

            <section className="mx-6 flex flex-col xl:max-w-6xl xl:mx-auto xl:w-full xl:grid xl:grid-cols-[1.1fr_1fr] gap-8 xl:items-start">
                <FadeUp className="relative w-full h-60 md:h-80 xl:h-full overflow-hidden rounded-md">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2025/10/item.avif"
                        alt={copy.giftTitle}
                        fill
                        sizes="(max-width: 1200px) 100vw, 55vw"
                        className="object-cover object-top"
                        priority
                    />
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="flex flex-col xl:gap-4 xl:min-h-100 xl:justify-center"
                >
                    <h2 className="text-xl xl:text-3xl">{copy.giftTitle}</h2>
                    <ul className="space-y-1 my-3">
                        {copy.giftItems.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="mt-2 w-1 h-1 rounded-full bg-brand-blue" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </FadeUp>
            </section>

            <Divider />
            <ContactsSection />
        </main>
    );
}
