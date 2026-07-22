import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";

const BOOKING_URL = "/booking/?date=2026-07-26";

// Десктоп — фон-баннер (1920×768). Мобилка — постер-изображение (1280×1920).
const DESKTOP_BG =
    "https://academia.spb.ru/wp-content/uploads/2026/07/400х160-др.png";
const MOBILE_IMG =
    "https://academia.spb.ru/wp-content/uploads/2026/07/ДР-2026-1-2.avif";

// Круглый стикер «SOLD OUT» — текст по контуру в брендовом бордовом круге.
function SoldOutSticker() {
    return (
        <svg
            viewBox="0 0 100 100"
            className="h-10 w-10 shrink-0 -rotate-12"
            role="img"
            aria-label="Sold out"
        >
            <circle cx="50" cy="50" r="48" fill="#5c1f26" />
            <text
                x="50"
                y="45"
                textAnchor="middle"
                fill="#fff"
                fontSize="17"
                fontWeight="700"
                letterSpacing="1"
            >
                SOLD
            </text>
            <text
                x="50"
                y="66"
                textAnchor="middle"
                fill="#fff"
                fontSize="17"
                fontWeight="700"
                letterSpacing="1"
            >
                OUT
            </text>
        </svg>
    );
}

// Общий текстовый блок (заголовок + абзацы + кнопка). headingClass задаёт цвет
// заголовка: белый поверх фото на десктопе, тёмный — на сером фоне.
function BannerText({
    headingClass,
    bodyClass = "max-w-lg",
}: {
    headingClass: string;
    bodyClass?: string;
}) {
    return (
        <>
            <FadeUp>
                <h2 className={`max-w-2xl text-3xl ${headingClass}`}>
                    ГРАФ ШУВАЛОВ ПРИГЛАШАЕТ
                    <br />
                    НА ДЕНЬ РОЖДЕНИЯ ОСОБНЯКА!
                </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
                <p className={bodyClass}>
                    В этот праздничный день дарим особенные подарки для гостей
                    особняка: винное казино в Игорном доме графа Шувалова,
                    мастер-класс по живописи с графиней, приветственную наливку,
                    розыгрыш приятных сюрпризов, десерт в подарок в ресторане и
                    встречу с графской семьей.
                </p>
            </FadeUp>
            <FadeUp delay={0.12}>
                <span className="inline-flex items-center gap-3">
                    <span className="font-bold">
                        Регистрация на мероприятия завершена, свободных мест
                        нет.
                    </span>
                    <SoldOutSticker />
                </span>
            </FadeUp>
            <FadeUp delay={0.15}>
                <p className={bodyClass}>
                    Забронируйте номер на 26 июля и разделите праздник с нами!
                </p>
            </FadeUp>
            <FadeUp delay={0.2}>
                <Button
                    href={BOOKING_URL}
                    target="_blank"
                    variant="primary"
                    size="xl"
                >
                    Забронировать
                </Button>
            </FadeUp>
        </>
    );
}

// Вариант 1 — текст поверх фон-баннера (десктоп) / поверх постера (мобилка).
function BannerOverImage() {
    return (
        <section className="relative overflow-hidden">
            {/* ДЕСКТОП: фон-баннер, сдвинут вправо + едва заметный скрим слева */}
            <div className="absolute inset-y-0 left-0 hidden w-[118%] xl:block">
                <Image
                    src={DESKTOP_BG}
                    alt=""
                    fill
                    sizes="110vw"
                    loading="lazy"
                    className="object-cover object-[0%_35%]"
                />
            </div>
            {/* Едва заметный короткий скрим слева под текстом (десктоп) */}
            <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.16),transparent_32%)] xl:block" />

            {/* МОБИЛКА: постер-изображение */}
            <div className="relative aspect-[2/3] w-full xl:hidden">
                <Image
                    src={MOBILE_IMG}
                    alt="День рождения особняка Шувалова 26 июля"
                    fill
                    sizes="100vw"
                    loading="lazy"
                    className="object-cover"
                />
            </div>

            <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-8 text-left text-brand-brown xl:px-0 xl:py-12 xl:text-white">
                <BannerText headingClass="text-brand-brown xl:text-white" />
            </div>
        </section>
    );
}

// Вариант 2 — текст на сером фоне + картинка рядом (люди).
export function BirthdayBannerSplit() {
    return (
        <section className="bg-[#ededeb]">
            <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[1fr_1.15fr] xl:gap-6">
                <div className="flex flex-col items-start gap-4 px-6 py-10 text-left text-brand-brown xl:py-12 xl:pr-4 xl:pl-[max(1.5rem,calc((100vw-84rem)/2))]">
                    <BannerText
                        headingClass="text-brand-brown"
                        bodyClass="max-w-2xl"
                    />
                </div>
                <div className="relative order-first min-h-[300px] w-full self-stretch overflow-hidden xl:order-last xl:min-h-[520px]">
                    <Image
                        src={DESKTOP_BG}
                        alt="Граф Шувалов с семьёй"
                        fill
                        sizes="(max-width: 1200px) 100vw, 55vw"
                        loading="lazy"
                        className="object-cover object-[78%_50%]"
                    />
                </div>
            </div>
        </section>
    );
}

export default function BirthdayBannerSection() {
    return (
        <>
            <BannerOverImage />
            <BirthdayBannerSplit />
        </>
    );
}
