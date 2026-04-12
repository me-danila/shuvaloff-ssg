"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { useLocale } from "@/lib/i18n/useLocale";

const LANDMARKS = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/687bdb8a-2635-4ce9-a.png",
        alt: "Дворцовая Набережная",
        left: "24%",
        top: "10%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/sad.png",
        alt: "Летний сад",
        left: "20%",
        top: "32%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/stig.png",
        alt: "Академия Штиглица",
        left: "31%",
        top: "33%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/mih.png",
        alt: "Михайловский замок",
        left: "24%",
        top: "64%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/spas.png",
        alt: "Спас на Крови",
        left: "10%",
        top: "68%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/zags.png",
        alt: "Дворец бракосочетания №2",
        left: "77%",
        top: "58%",
        size: 110,
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/fff6844c-461b-4cd5-a.png",
        alt: "ACADEMIA Особняк Шувалова",
        left: "41%",
        top: "27%",
        size: 130,
    },
];

export default function WeddingHistoricalMapSection() {
    const locale = useLocale();
    const mobileAlt =
        locale === "ru"
            ? "Исторический центр Санкт-Петербурга"
            : "Historic center of Saint Petersburg";
    const mapAlt =
        locale === "ru" ? "Карта Петербурга" : "Saint Petersburg map";
    const enAlts = {
        "Дворцовая Набережная": "Palace Embankment",
        "Летний сад": "Summer Garden",
        "Академия Штиглица": "Stieglitz Academy",
        "Михайловский замок": "Mikhailovsky Castle",
        "Спас на Крови": "Church of the Savior on Spilled Blood",
        "Дворец бракосочетания №2": "Wedding Palace No. 2",
        "ACADEMIA Особняк Шувалова": "ACADEMIA Mansion Shuvaloff",
    } as const;

    return (
        <section className="relative h-60 -mt-6 overflow-hidden rounded-lg xl:h-180">
            {/* Мобайл — оригинальная картинка без изменений */}
            <Image
                src="https://academia.spb.ru/wp-content/uploads/2026/04/map-mob.png"
                alt={mobileAlt}
                fill
                loading="lazy"
                className="xl:hidden object-cover"
            />

            {/* Десктоп — фон карты + отдельные кружки поверх */}
            <div className="hidden xl:block absolute inset-0">
                {/* Фон — карта без кружков */}
                <Image
                    src="https://academia.spb.ru/wp-content/uploads/2026/04/map.png"
                    alt={mapAlt}
                    fill
                    loading="lazy"
                    className="object-cover"
                />

                <StaggerContainer
                    delay={0.5}
                    staggerChildren={0.2}
                    className="absolute inset-0"
                >
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
                            <p className="text-xs/4 max-w-[100px] text-center mx-auto -mt-1">
                                {locale === "ru"
                                    ? alt
                                    : enAlts[alt as keyof typeof enAlts]}
                            </p>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
