import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export const metadata: Metadata = {
    title: "Девайсы для красоты и здоровья — ACADEMIA Особняк Шувалова",
    description:
        "Сделайте ваш отдых еще более приятным — закажите в номер девайсы для красоты и здоровья от бренда GESS",
};

type Device = {
    src: string;
    title: string;
    description: ReactNode;
};

type Steps = {
    number: string;
    title: string;
    description: string;
};

const DEVICES: Device[] = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2025/10/gess.avif",
        title: "MINI REVOLVER массажный пистолет",
        description: (
            <>
                Компактный и&nbsp;мощный перкуссионный массажер Mini Revolver
                для глубокой проработки мышц и&nbsp;мышечно-фасциального
                расслабления. Быстро избавляет от&nbsp;напряжения и&nbsp;боли
                благодаря пульсирующей массажной технике.
                <br />
                10 режимов интенсивности и&nbsp;4 вида насадок для разных групп
                мышц.
            </>
        ),
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2025/10/tinto.avif",
        title: "TINTO массажер для глаз",
        description: (
            <>
                5D очки-массажер TINTO предлагают бьюти-комбо для здоровья глаз:
                прессотерапия, прогрев, вибромассаж, EMS и&nbsp;аудиотерапия.
                <br />
                Конструкция очков обеспечивает свободный обзор во&nbsp;время
                процедуры. TINTO&nbsp;&mdash; эффективное решение для
                восстановления глаз после использования гаджетов
            </>
        ),
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2025/10/shato.avif",
        title: "SHATO массажер для рук и тела",
        description: (
            <>
                Уникальный массажер предлагает разнообразные виды воздействия:
                <br />
                &bull; воздушно-компрессионный и&nbsp;акупунктурный массаж для
                кистей рук
                <br />
                &bull; роликовый массаж шиацу&nbsp;&mdash; для всего тела.
                <br />
                Вы&nbsp;сможете эффективно промассировать ладони, пальцы
                и&nbsp;тыльную сторону&nbsp;рук. Также массажер позволит сделать
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
                разработана вместе с&nbsp;ведущими дизайнерами и&nbsp;инженерами
                бренда согласно философии &laquo;здорового интерьера&raquo;.
                <br />
                Встроенный массажный механизм с&nbsp;четырьмя роликами
                обеспечивает массаж шиацу. Обратная сторона оснащена
                акупунктурными элементами в&nbsp;форме лотоса по&nbsp;методике
                аппликатора Кузнецова.
            </>
        ),
    },
];

const STEPS: Steps[] = [
    {
        number: "01",
        title: "Бесплатный тест-драйв",
        description: "Приборы доступны бесплатно на весь срок пребывания",
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
];

export default function AllServices() {
    return (
        <main className="flex flex-col gap-8 xl:gap-10">
            <section className="flex flex-col gap-4 m-6 xl:w-full xl:max-w-6xl xl:mx-auto xl:text-center">
                <FadeUp>
                    <h1>Девайсы для красоты и&nbsp;здоровья</h1>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="xl:w-full xl:max-w-4xl xl:mx-auto">
                        Дорогие гости! Сделайте ваш отдых еще более
                        приятным&nbsp;&mdash; закажите в&nbsp;номер девайсы для
                        красоты и&nbsp;здоровья от&nbsp;бренда GESS. Это
                        отличный способ расслабиться после долгой дороги или
                        побаловать себя любимыми процедурами по&nbsp;уходу.
                    </p>
                </FadeUp>
            </section>

            <section className="flex flex-col gap-2 xl:gap-3 px-6 w-full max-w-4xl xl:mx-auto xl:text-center xl:mb-4">
                <FadeUp>
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/03/GESS_na-prozrachnom-fone.png"
                        alt="Экосистема вашего отдыха"
                        width={198}
                        height={99}
                        priority
                        className="xl:mx-auto mb-4"
                    />
                </FadeUp>
                <FadeUp delay={0.1}>
                    <h2 className="xl:text-3xl">О&nbsp;бренде GESS</h2>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p>
                        GESS&nbsp;&mdash; международный бренд девайсов для
                        красоты и&nbsp;здоровья, который меняет представление
                        о&nbsp;домашнем уходе. Мы&nbsp;создаем технологичные,
                        простые в&nbsp;использовании и&nbsp;по-настоящему
                        эффективные гаджеты для лица и&nbsp;тела, чтобы
                        профессиональный результат стал доступен каждому.
                    </p>
                </FadeUp>
            </section>

            <StaggerContainer className="flex flex-col mx-6 gap-8 xl:grid xl:grid-cols-2 xl:max-w-6xl xl:mx-auto xl:w-full">
                {DEVICES.map((device) => (
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
                        Подсказка для гостей
                    </h3>
                </FadeUp>
                <StaggerContainer className="flex flex-col gap-6 xl:flex-row xl:gap-16">
                    {STEPS.map(({ number, title, description }) => (
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
                        alt="Массажер для лица GESS в подарок"
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
                    <h2 className="text-xl xl:text-3xl">
                        Получите в&nbsp;подарок массажер для лица Face Lifting
                    </h2>
                    <ul className="space-y-1 my-3">
                        {[
                            "Опубликуйте stories или пост с локации отеля ACADEMIA Особняк Шувалова и продукцией GESS из Beauty Bar",
                            "Отметьте аккаунты отеля @academia.hotels и @gessmarket.ru и поделитесь своими искренними впечатлениями",
                            "Покажите опубликованный материал менеджеру службы заботы на ресепшн и получите свой подарок",
                        ].map((item) => (
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
