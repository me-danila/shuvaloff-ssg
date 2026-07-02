"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

type Tier = {
    label: string;
    discount: string;
    badgeBg: string;
    nights: string;
    perks: string[];
    note?: string;
};

const tiersByLocale: Record<Locale, Tier[]> = {
    ru: [
        {
            label: "BASE",
            discount: "10%",
            badgeBg: "#B3B3B3",
            nights: "от 3 ночей",
            perks: [
                "Поздний выезд*",
                "Скидка при бронировании нескольких номеров",
            ],
            note: "Станьте участником программы лояльности уже после первого визита!",
        },
        {
            label: "SILVER",
            discount: "15%",
            badgeBg: "#909090",
            nights: "от 8 ночей",
            perks: [
                "Поздний выезд*",
                "Скидка 15% на все виды услуг в ACADEMIA SPA",
                "Скидка при бронировании нескольких номеров",
            ],
        },
        {
            label: "GOLD",
            discount: "20%",
            badgeBg: "#94754E",
            nights: "от 14 ночей",
            perks: [
                "Поздний выезд*",
                "Фирменный трансфер в одну сторону*",
                "Скидка 15% на все виды услуг в ACADEMIA SPA",
                "Скидка при бронировании нескольких номеров",
            ],
        },
        {
            label: "DIAMOND",
            discount: "25%",
            badgeBg: "#597A87",
            nights: "от 28 ночей",
            perks: [
                "Ранний заезд и поздний выезд*",
                "Фирменный трансфер в одну сторону*",
                "Скидка 20% на все виды услуг в ACADEMIA SPA",
                "Скидка при бронировании нескольких номеров",
            ],
        },
    ],
    en: [
        {
            label: "BASE",
            discount: "10%",
            badgeBg: "#B3B3B3",
            nights: "from 3 nights",
            perks: ["Late check-out*", "Discount for booking multiple rooms"],
            note: "Join the loyalty program right after your first stay!",
        },
        {
            label: "SILVER",
            discount: "15%",
            badgeBg: "#909090",
            nights: "from 8 nights",
            perks: [
                "Late check-out*",
                "15% off all ACADEMIA SPA services",
                "Discount for booking multiple rooms",
            ],
        },
        {
            label: "GOLD",
            discount: "20%",
            badgeBg: "#94754E",
            nights: "from 14 nights",
            perks: [
                "Late check-out*",
                "One-way signature transfer*",
                "15% off all ACADEMIA SPA services",
                "Discount for booking multiple rooms",
            ],
        },
        {
            label: "DIAMOND",
            discount: "25%",
            badgeBg: "#597A87",
            nights: "from 28 nights",
            perks: [
                "Early check-in and late check-out*",
                "One-way signature transfer*",
                "20% off all ACADEMIA SPA services",
                "Discount for booking multiple rooms",
            ],
        },
    ],
} as const;

export default function AcademiaRewards() {
    const locale = useLocale();
    const tiers = tiersByLocale[locale];
    const discountLabel = locale === "ru" ? "Скидка" : "Discount";
    const note =
        locale === "ru"
            ? "* данные привилегии предоставляются при наличии возможности"
            : "* these privileges are subject to availability";

    return (
        <section className="bg-brand-light px-6 py-8 xl:py-12">
            <div className="xl:w-full xl:max-w-7xl xl:mx-auto flex flex-col gap-6 xl:gap-8">
                <StaggerContainer className="grid grid-cols-1 xl:grid-cols-4 gap-4 xl:gap-6 items-stretch">
                    {tiers.map((tier) => (
                        <StaggerItem
                            key={tier.label}
                            className="bg-white rounded-xl overflow-hidden flex flex-col"
                        >
                            {/* Шапка */}
                            <div className="p-5 flex flex-col gap-3">
                                <p className="uppercase font-history text-xl">
                                    {discountLabel} {tier.discount}
                                </p>
                                <span className="font-alistair self-start text-3xl bg-brand-light rounded px-3 py-1">
                                    {tier.nights}
                                </span>
                            </div>

                            {/* Панель с бейджем */}
                            <div className="relative bg-[#DDDDDD] px-5 py-6 flex flex-col justify-end min-h-44">
                                <div
                                    className="absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center text-xl font-history"
                                    style={{
                                        background: tier.badgeBg,
                                        color: "#FFF",
                                    }}
                                >
                                    {tier.discount}
                                </div>
                                <p className="font-history text-xl xl:text-2xl">
                                    {tier.label}
                                </p>
                                <p className="text-xs text-warm-gray">
                                    ACADEMIA REWARDS
                                </p>
                            </div>

                            {/* Привилегии */}
                            <div className="p-5 flex flex-col gap-3 flex-1">
                                <ul className="flex flex-col gap-3">
                                    {tier.perks.map((perk) => (
                                        <li
                                            key={perk}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="mt-2 w-1 h-1 rounded-full bg-current shrink-0" />
                                            <span>{perk}</span>
                                        </li>
                                    ))}
                                </ul>
                                {tier.note && (
                                    <p className="text-warm-gray">
                                        {tier.note}
                                    </p>
                                )}
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <p className="text-warm-gray">{note}</p>
            </div>
        </section>
    );
}
