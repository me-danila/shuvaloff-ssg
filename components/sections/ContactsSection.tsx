"use client";

import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/OptimizedImage";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

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

const CONTACTS: Record<"ru" | "en", ContactLink[]> = {
    ru: [
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
    ],
    en: [
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
            label: "10 Mokhovaya St, Saint Petersburg",
            Icon: MapPinIcon,
            target: "_blank",
            rel: "noopener referrer",
        },
    ],
};

export default function ContactsSection() {
    const locale = useLocale();
    const contacts = CONTACTS[locale];
    const contactsTitle = locale === "ru" ? "КОНТАКТЫ" : "CONTACTS";
    const bookingDepartment =
        locale === "ru" ? "Отдел бронирования" : "Booking department";
    const bookLabel = locale === "ru" ? "Забронировать" : "Book now";
    const mapAlt =
        locale === "ru"
            ? "Контакты ACADEMIA Особняк Шувалова"
            : "ACADEMIA Mansion Shuvaloff contacts";

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
                                    locale === "ru"
                                        ? "ACADEMIA Особняк Шувалова"
                                        : "ACADEMIA Mansion Shuvaloff",
                                balloonContentBody:
                                    (locale === "ru"
                                        ? "Моховая, д. 10, Санкт-Петербург<br>Режим работы: круглосуточно 24/7<br><br>"
                                        : "10 Mokhovaya St, Saint Petersburg<br>Open 24/7<br><br>") +
                                    "+7 (812) 565-96-50<br>" +
                                    "reservation@academia.spb.ru",
                                hintContent:
                                    locale === "ru"
                                        ? "ACADEMIA Особняк Шувалова"
                                        : "ACADEMIA Mansion Shuvaloff",
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
                    script.src = `https://api-maps.yandex.ru/2.1/?apikey=8d5dabf6-ffc8-46c7-89e6-ad8f95f78257&load=package.full&lang=${locale === "ru" ? "ru-RU" : "en-US"}`;
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
    }, [locale]);

    return (
        <section className="flex flex-col gap-4 xl:flex-row xl:mx-auto xl:max-w-6xl xl:flex xl:gap-16 xl:items-center">
            {/* Левая колонка — контакты */}
            <div className="flex flex-col gap-2 mx-6 my-4 xl:mx-0 xl:my-8 xl:min-w-84">
                <h2>{contactsTitle}</h2>
                <p className="my-2 uppercase">{bookingDepartment}</p>
                {contacts.map(
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
                <Button
                    href={localizeHref("/booking/", locale)}
                    variant="primary"
                    className="xl:mt-4"
                >
                    {bookLabel}
                </Button>
            </div>

            {/* Правая колонка — карта */}
            <div
                ref={mapRef}
                className="relative w-full h-64 xl:w-185 xl:h-95 xl:shrink-0"
            >
                <style>{`.ymaps-2-1-79-ground-pane { filter: grayscale(100%) contrast(1.2) sepia(8%); }`}</style>
                <Image
                    src="https://academia.spb.ru/wp-content/uploads/2026/03/map-new.png"
                    alt={mapAlt}
                    fill
                    sizes="(max-width: 1200px) 100vw, 740px"
                    loading="lazy"
                    className="object-cover"
                />
            </div>
        </section>
    );
}
