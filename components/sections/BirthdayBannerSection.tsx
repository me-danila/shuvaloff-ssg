import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";

const BOOKING_URL = "https://academia-shuvaloff.ru/booking/?date=2026-07-26";

// Десктоп — фон-баннер (1920×768). Мобилка — постер-изображение (1280×1920).
const DESKTOP_BG =
    "https://academia.spb.ru/wp-content/uploads/2026/07/400х160-др.png";
const MOBILE_IMG =
    "https://academia.spb.ru/wp-content/uploads/2026/07/ДР-2026-1-2.avif";

export default function BirthdayBannerSection() {
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
                    className="object-cover object-left"
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

            <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-8 text-left text-brand-brown xl:px-0 xl:py-20 xl:text-white">
                <FadeUp>
                    <h2 className="max-w-lg text-brand-brown xl:text-white">
                        Граф Шувалов приглашает 26 июля на день рождения
                        особняка!
                    </h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="max-w-lg">
                        В этот праздничный день дарим особенные подарки для
                        гостей: винное казино в Игорном доме графа Шувалова,
                        мастер-класс по живописи с графиней, розыгрыш приятных
                        сюрпризов, приветственную наливку по фамильному рецепту,
                        десерт и живую музыку в ресторане.
                    </p>
                </FadeUp>
                <FadeUp delay={0.15}>
                    <p className="max-w-lg">
                        Забронируйте ваш номер на 26 июля и разделите праздник с
                        нами!
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
            </div>
        </section>
    );
}
