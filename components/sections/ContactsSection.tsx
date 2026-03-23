"use client";

import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

type YMaps = {
    ready: (fn: () => void) => void;
    Map: new (
        el: HTMLElement,
        state: object,
    ) => { geoObjects: { add: (p: object) => void } };
    Placemark: new (coords: number[], props: object, opts: object) => object;
};

declare global {
    interface Window {
        ymaps?: YMaps;
        _tlMap?: boolean;
    }
}

type ContactLink = {
    href: string;
    label: string;
    Icon: Icon;
    target?: "_blank";
    rel?: string;
};

const CONTACTS: ContactLink[] = [
    {
        href: "tel:+78125659650",
        label: "+7 (812) 565-96-50",
        Icon: PhoneIcon,
    },
    {
        href: "mailto:reservation@academia.spb.ru",
        label: "reservation@academia.spb.ru",
        Icon: EnvelopeIcon,
    },
    {
        href: "https://yandex.com/maps/org/academia_mansion_shuvaloff/71619247470/",
        label: "Санкт-Петербург, ул.\u00a0Моховая, д.\u00a010",
        Icon: MapPinIcon,
        target: "_blank",
        rel: "noopener referrer",
    },
];

export default function ContactsSection() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mapRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || window._tlMap) return;
                window._tlMap = true;
                observer.disconnect();

                const initMap = () => {
                    window.ymaps?.ready(() => {
                        const staticImg = container.querySelector("img");
                        if (staticImg) staticImg.style.display = "none";

                        const mapDiv = document.createElement("div");
                        mapDiv.style.width = "100%";
                        mapDiv.style.height = "100%";
                        container.appendChild(mapDiv);

                        const ymaps = window.ymaps;
                        if (!ymaps) return;

                        const map = new ymaps.Map(mapDiv, {
                            center: [59.945058, 30.345467],
                            zoom: 14,
                        });

                        const placemark = new ymaps.Placemark(
                            [59.945058, 30.345467],
                            {
                                balloonContentHeader:
                                    "ACADEMIA Особняк Шувалова",
                                balloonContentBody:
                                    "Моховая, д. 10, Санкт-Петербург<br>Режим работы: круглосуточно 24/7<br><br>" +
                                    "<a href='tel:+78125659650'>+7 (812) 565-96-50</a><br>" +
                                    "<a href='mailto:reservation@academia.spb.ru'>reservation@academia.spb.ru</a>",
                                hintContent: "ACADEMIA Особняк Шувалова",
                            },
                            {
                                iconLayout: "default#image",
                                iconImageHref:
                                    "https://academia.spb.ru/wp-content/uploads/2026/03/Vector.svg",
                                iconImageSize: [64, 64],
                                iconImageOffset: [-32, -64],
                            },
                        );

                        map.geoObjects.add(placemark);
                    });
                };

                if (window.ymaps) {
                    initMap();
                } else {
                    const script = document.createElement("script");
                    script.src =
                        "https://api-maps.yandex.ru/2.1/?apikey=8d5dabf6-ffc8-46c7-89e6-ad8f95f78257&load=package.full&lang=ru-RU";
                    script.onload = initMap;
                    document.head.appendChild(script);
                }
            },
            { rootMargin: "300px" },
        );

        observer.observe(container);
        return () => {
            observer.disconnect();
            window._tlMap = false;
        };
    }, []);

    return (
        <section className="flex flex-col gap-4 xl:flex-row xl:mx-auto xl:max-w-6xl xl:flex xl:gap-16 xl:items-center">
            {/* Левая колонка — контакты */}
            <div className="flex flex-col gap-2 mx-6 my-4 xl:m-8 xl:min-w-84">
                <h2>КОНТАКТЫ</h2>
                <p className="font-baskerville uppercase text-xl mt-2">
                    Отдел бронирования
                </p>
                {CONTACTS.map(
                    ({ href, label, Icon: ContactIcon, target, rel }) => (
                        <a
                            key={href}
                            href={href}
                            target={target}
                            rel={rel}
                            className="flex items-center gap-4 group my-1"
                        >
                            <span className="border border-zinc-300 rounded-md p-3 transition-colors group-hover:border-zinc-600">
                                <ContactIcon
                                    size={14}
                                    className="text-zinc-500 transition-colors group-hover:text-zinc-900"
                                />
                            </span>
                            <p>{label}</p>
                        </a>
                    ),
                )}
                <Button href="/booking/" variant="primary" className="xl:mt-4">
                    Забронировать
                </Button>
            </div>

            {/* Правая колонка — карта */}
            <div
                ref={mapRef}
                className="relative w-full h-64 xl:w-185 xl:h-95 xl:shrink-0"
            >
                <style>{`.ymaps-2-1-79-ground-pane { filter: grayscale(100%) contrast(1.2) sepia(15%); }`}</style>
                <Image
                    src="https://academia.spb.ru/wp-content/uploads/2026/03/map-new.png"
                    alt="Контакты ACADEMIA Особняк Шувалова"
                    fill
                    sizes="(max-width: 1200px) 100vw, 740px"
                    loading="lazy"
                    className="object-cover"
                />
            </div>
        </section>
    );
}
