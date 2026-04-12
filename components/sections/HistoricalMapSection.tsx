"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { useLocale } from "@/lib/i18n/useLocale";

const LANDMARKS = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/Крепость.png",
        alt: "Петропавловская крепость",
        left: "55%",
        top: "19%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/Мост.png",
        alt: "Дворцовый мост",
        left: "40%",
        top: "59%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/Спас.png",
        alt: "Спас на Крови",
        left: "56%",
        top: "64%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/Михайловский.png",
        alt: "Михайловский замок",
        left: "66%",
        top: "59%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/ЗАГС.png",
        alt: "ЗАГС",
        left: "82%",
        top: "48%",
        size: 110,
    },
];

const HOTEL_LOGO = {
    src: "https://academia.spb.ru/wp-content/uploads/2026/03/logohotel.png",
    alt: "ACADEMIA Особняк Шувалова",
    left: "65%",
    top: "30%",
    size: 190,
};

export default function HistoricalMapSection() {
    const locale = useLocale();
    const mobileAlt =
        locale === "ru"
            ? "Исторический центр Санкт-Петербурга"
            : "Historic center of Saint Petersburg";
    const desktopMapAlt =
        locale === "ru"
            ? "Карта исторического Петербурга"
            : "Map of historic Saint Petersburg";
    const hotelLogoAlt =
        locale === "ru"
            ? "ACADEMIA Особняк Шувалова"
            : "ACADEMIA Mansion Shuvaloff";
    const enAlts = {
        "Петропавловская крепость": "Peter and Paul Fortress",
        "Дворцовый мост": "Palace Bridge",
        "Спас на Крови": "Church of the Savior on Spilled Blood",
        "Михайловский замок": "Mikhailovsky Castle",
        ЗАГС: "Wedding Palace",
    } as const;

    return (
        <section className="relative h-60 mt-2 overflow-hidden rounded-lg xl:h-140 xl:mt-10">
            {/* Мобайл — оригинальная картинка без изменений */}
            <Image
                src="https://academia.spb.ru/wp-content/uploads/2026/02/Frame-141.png"
                alt={mobileAlt}
                fill
                loading="lazy"
                className="xl:hidden object-cover"
            />

            {/* Десктоп — фон карты + отдельные кружки поверх */}
            <div className="hidden xl:block absolute inset-0">
                {/* Фон — карта без кружков */}
                <Image
                    src="https://academia.spb.ru/wp-content/uploads/2026/03/map-1.png"
                    alt={desktopMapAlt}
                    fill
                    loading="lazy"
                    className="object-cover"
                />

                <StaggerContainer
                    delay={0.5}
                    staggerChildren={0.2}
                    className="absolute inset-0"
                >
                    {/* Лого отеля */}
                    <StaggerItem
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                        style={{ left: HOTEL_LOGO.left, top: HOTEL_LOGO.top }}
                    >
                        <Image
                            src={HOTEL_LOGO.src}
                            alt={hotelLogoAlt}
                            width={HOTEL_LOGO.size}
                            height={HOTEL_LOGO.size}
                            className="rounded-full object-cover select-none"
                            draggable={false}
                        />
                    </StaggerItem>

                    {/* Достопримечательности */}
                    {LANDMARKS.map(({ src, alt, left, top, size }) => (
                        <StaggerItem
                            key={alt}
                            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-300 ease-out hover:scale-110 cursor-default"
                            style={{ left, top }}
                        >
                            <Image
                                src={src}
                                alt={
                                    locale === "ru"
                                        ? alt
                                        : enAlts[alt as keyof typeof enAlts]
                                }
                                width={size}
                                height={size}
                                className="rounded-full object-cover select-none"
                                draggable={false}
                            />
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
