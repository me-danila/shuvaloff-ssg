"use client";

import { AirplaneIcon, TrainIcon } from "@phosphor-icons/react";
import { useState } from "react";
import Button from "@/components/ui/Button";

const transport = [
    {
        Icon: AirplaneIcon,
        label: "Авиарейсы",
        route: "МОСКВА — САНКТ-ПЕТЕРБУРГ",
        href: "https://travel.yandex.ru/avia/search/error/?adult_seats=2&children_seats=0&fromId=c213&infant_seats=0&klass=economy&oneway=1&toId=c2",
    },
    {
        Icon: TrainIcon,
        label: "Поезд «Сапсан»",
        route: "МОСКВА — САНКТ-ПЕТЕРБУРГ",
        href: "https://travel.yandex.ru/trains/moscow--saint-petersburg/?highSpeedTrain=25",
    },
];

export default function TransportSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const index = Math.round(el.scrollLeft / el.offsetWidth);
        setActiveIndex(index);
    };

    return (
        <>
            {/* Мобайл: слайдер с точками */}
            <div className="xl:hidden flex flex-col gap-3">
                <div
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar"
                    onScroll={handleScroll}
                >
                    {transport.map(({ Icon, label, route, href }) => (
                        <div
                            key={label}
                            className="flex flex-col gap-6 bg-brand-blue-100 rounded-xl p-6 min-w-full snap-start"
                        >
                            <Icon
                                size={40}
                                color="var(--color-brand-blue)"
                                weight="fill"
                            />
                            <div>
                                <p className="text-base">
                                    {label}
                                    <br />
                                    {route}
                                </p>
                            </div>
                            <Button
                                href={href}
                                target="_blank"
                                variant="primary-outline"
                                className="mt-auto"
                            >
                                Посмотреть расписание
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-2">
                    {transport.map((_, i) => (
                        <span
                            key={transport[i].label}
                            className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? "bg-brand-blue" : "bg-stone-300"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Десктоп: 2 колонки */}
            <div className="hidden xl:grid xl:grid-cols-2 gap-4">
                {transport.map(({ Icon, label, route, href }) => (
                    <div
                        key={label}
                        className="flex flex-col gap-6 bg-brand-blue-100 rounded-sm p-8"
                    >
                        <Icon
                            size={40}
                            color="var(--color-brand-blue)"
                            weight="fill"
                        />
                        <div>
                            <p>
                                {label}
                                <br />
                                {route}
                            </p>
                        </div>
                        <Button
                            href={href}
                            target="_blank"
                            variant="primary-outline"
                            className="self-start"
                        >
                            Посмотреть расписание
                        </Button>
                    </div>
                ))}
            </div>
        </>
    );
}
