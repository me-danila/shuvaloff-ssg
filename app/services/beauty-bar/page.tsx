import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";

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
                аппликатора Кузнецова.{" "}
            </>
        ),
    },
];

export default function AllServices() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:w-full xl:max-w-6xl xl:mx-auto">
                <h1 className="xl:text-center">
                    Девайсы для красоты и&nbsp;здоровья
                </h1>
                <p className="mb-2 xl:mb-8 xl:mt-2 xl:text-center xl:w-full xl:max-w-4xl xl:mx-auto">
                    Дорогие гости! Сделайте ваш отдых еще более
                    приятным&nbsp;&mdash; закажите в&nbsp;номер девайсы для
                    красоты и&nbsp;здоровья от&nbsp;бренда GESS. Это отличный
                    способ расслабиться после долгой дороги или побаловать себя
                    любимыми процедурами по&nbsp;уходу.
                </p>
            </section>

            <div className="hidden xl:grid xl:grid-cols-2 xl:gap-8 xl:max-w-6xl xl:mx-auto xl:w-full">
                {DEVICES.map((device) => (
                    <div key={device.title} className="flex flex-col gap-2">
                        {/* Фото */}
                        <div className="relative w-full h-90 overflow-hidden rounded-md">
                            <Image
                                src={device.src}
                                alt={device.title}
                                fill
                                sizes="50vw"
                                loading="lazy"
                                className="object-cover"
                            />
                        </div>

                        {/* Заголовок */}
                        <h3 className="uppercase text-xl mt-3">
                            {device.title}
                        </h3>

                        {/* Описание */}
                        <p className="text-zinc-600">{device.description}</p>
                    </div>
                ))}
            </div>
            <Divider />
            <ContactsSection />
        </main>
    );
}
