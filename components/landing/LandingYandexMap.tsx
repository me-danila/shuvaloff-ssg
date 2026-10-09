"use client";

import { useEffect, useRef } from "react";
import Image from "@/components/ui/OptimizedImage";
import { HOTEL_CONTACTS, HOTEL_GEO } from "@/lib/seo/site";

type YMaps = {
    ready: (fn: () => void) => void;
    Map: new (
        el: HTMLElement,
        state: object,
    ) => { geoObjects: { add: (p: object) => void } };
    Placemark: new (coords: number[], props: object, opts: object) => object;
};

const getYmaps = () => (window as unknown as { ymaps?: YMaps }).ymaps;

const COORDS = [HOTEL_GEO.latitude, HOTEL_GEO.longitude];

/**
 * Яндекс-карта для контактов лендинга — та же, что в ContactsSection
 * основного сайта: статичная картинка, пока блок не подошел к экрану, затем
 * ленивая загрузка API Яндекса (тот же ключ), серая подложка и метка с
 * логотипом отеля. Интерфейс карты — на английском (иностранная аудитория).
 */
export default function LandingYandexMap({
    alt,
    address,
    className,
}: {
    alt: string;
    address: string;
    className: string;
}) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mapRef.current;
        if (!container) return;
        let initialized = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || initialized) return;
                initialized = true;
                observer.disconnect();

                const initMap = () => {
                    getYmaps()?.ready(() => {
                        const ymaps = getYmaps();
                        if (!ymaps || !mapRef.current) return;

                        const staticImg = container.querySelector("img");
                        if (staticImg) staticImg.style.display = "none";

                        const mapDiv = document.createElement("div");
                        mapDiv.style.width = "100%";
                        mapDiv.style.height = "100%";
                        container.appendChild(mapDiv);

                        const map = new ymaps.Map(mapDiv, {
                            center: COORDS,
                            zoom: 14,
                        });
                        map.geoObjects.add(
                            new ymaps.Placemark(
                                COORDS,
                                {
                                    balloonContentHeader:
                                        "ACADEMIA Mansion Shuvaloff",
                                    balloonContentBody: `${address}<br>24/7<br><br>${HOTEL_CONTACTS.email}`,
                                    hintContent: "ACADEMIA Mansion Shuvaloff",
                                },
                                {
                                    iconLayout: "default#image",
                                    iconImageHref:
                                        "https://academia.spb.ru/wp-content/uploads/2026/06/map-logo.svg",
                                    iconImageSize: [64, 64],
                                    iconImageOffset: [-32, -64],
                                },
                            ),
                        );
                    });
                };

                if (getYmaps()) {
                    initMap();
                } else {
                    const script = document.createElement("script");
                    script.src =
                        "https://api-maps.yandex.ru/2.1/?apikey=8d5dabf6-ffc8-46c7-89e6-ad8f95f78257&load=package.map&lang=en-US";
                    script.onload = initMap;
                    document.head.appendChild(script);
                }
            },
            { rootMargin: "300px" },
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, [address]);

    return (
        <div
            ref={mapRef}
            className={className}
            itemProp="geo"
            itemScope
            itemType="https://schema.org/GeoCoordinates"
        >
            <meta itemProp="latitude" content={String(HOTEL_GEO.latitude)} />
            <meta itemProp="longitude" content={String(HOTEL_GEO.longitude)} />
            <style>{`.ymaps-2-1-79-ground-pane { filter: grayscale(100%) contrast(1.2) sepia(8%); }`}</style>
            <Image
                src="https://academia.spb.ru/wp-content/uploads/2026/03/map-new.png"
                alt={alt}
                fill
                sizes="(max-width: 1200px) 100vw, 740px"
                loading="lazy"
                className="object-cover"
            />
        </div>
    );
}
