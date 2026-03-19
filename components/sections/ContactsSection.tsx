"use client";

import { EnvelopeIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

declare global {
    interface Window {
        ymaps?: {
            ready: (fn: () => void) => void;
            Map: new (id: string, state: object) => object;
            Placemark: new (
                coords: number[],
                props: object,
                opts: object,
            ) => object;
        };
        _tlMap?: boolean;
    }
}

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

                        const map = new ymaps.Map(mapDiv as unknown as string, {
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

                        (
                            map as { geoObjects: { add: (p: object) => void } }
                        ).geoObjects.add(placemark);
                    });
                };

                // Если ymaps уже загружен — сразу инициализируем, иначе грузим скрипт
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
        <section className="flex flex-col gap-4 xl:flex-row xl:mx-auto xl:max-w-6xl xl:flex xl:gap-16 xl:items-start">
            {/* Левая колонка — контакты */}
            <div className="flex flex-col gap-2 mx-6 my-4 xl:m-8 xl:min-w-72">
                <h2>КОНТАКТЫ</h2>
                <p className="font-baskerville uppercase text-xl mt-2">
                    Отдел бронирования
                </p>
                <a
                    href="tel:+78125659650"
                    className="flex items-center gap-4 group my-1"
                >
                    <span className="border border-zinc-300 rounded-full p-3 transition-colors group-hover:border-zinc-600">
                        <PhoneIcon
                            size={14}
                            weight="fill"
                            className="text-zinc-500 transition-colors group-hover:text-zinc-900"
                        />
                    </span>
                    <p>+7 (812) 565-96-50</p>
                </a>
                <a
                    href="mailto:reservation@academia.spb.ru"
                    className="flex items-center gap-4 group my-1"
                >
                    <span className="border border-zinc-300 rounded-full p-3 transition-colors group-hover:border-zinc-600">
                        <EnvelopeIcon
                            size={14}
                            className="text-zinc-500 transition-colors group-hover:text-zinc-900"
                            fill="currentColor"
                        />
                    </span>
                    <p>reservation@academia.spb.ru</p>
                </a>
                <Button href="/booking/" variant="primary" className="xl:mt-4">
                    Забронировать
                </Button>
            </div>

            {/* Правая колонка — карта */}
            <div
                ref={mapRef}
                className="relative w-full h-64 xl:w-185 xl:h-95 xl:shrink-0"
            >
                <style>{`.ymaps-2-1-79-ground-pane { filter: grayscale(100%); }`}</style>
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
