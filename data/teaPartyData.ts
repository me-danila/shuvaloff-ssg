// Тексты страницы /tea-party/ и /en/tea-party/ — «Чаепитие у графини».
// Типовая карточка услуги — в data/ServicesData.tsx (slug "tea-party").

export const TEA_PARTY_PATH = "/tea-party/";

/** Бронирование чаепития на сайте бутик-ресторана. */
export const TEA_PARTY_BOOK_URL =
    "https://shuvaloff.academia-rest.ru/afisha/tea?utm_source=hotels";

export const TEA_PARTY_VIDEO =
    "https://academia.spb.ru/wp-content/uploads/2026/10/tea-party.webm";

import type { Locale } from "@/lib/i18n/routing";

const IMG = "/images/tea-party";

export const teaPartyImages = {
    hero: `${IMG}/hero.jpg`,
    gallery: {
        ru: [
            {
                src: `${IMG}/IMG_9654.jpg`,
                alt: "Трёхъярусная этажерка с\u00a0десертами, ягодными тарталетками и\u00a0мини-круассанами на\u00a0чайном столе в\u00a0особняке Шувалова",
            },
            {
                src: `${IMG}/IMG_9693.jpg`,
                alt: "Тарталетка с\u00a0малиной, чашка чая с\u00a0лимоном и\u00a0бокал шампанского на\u00a0сервированном столе с\u00a0кружевной скатертью",
            },
            {
                src: `${IMG}/IMG_9634.jpg`,
                alt: "Чай разливают из\u00a0фарфорового чайника с\u00a0цветочной росписью у\u00a0этажерки с\u00a0десертами",
            },
            {
                src: `${IMG}/IMG_9646.jpg`,
                alt: "Тарталетка с\u00a0малиной и\u00a0десерты с\u00a0фирменным шоколадным знаком ACADEMIA на\u00a0фарфоровой тарелке этажерки",
            },
        ],
        en: [
            {
                src: `${IMG}/IMG_9654.jpg`,
                alt: "Three-tier stand with desserts, berry tartlets and mini croissants on a tea table at the Shuvaloff Mansion",
            },
            {
                src: `${IMG}/IMG_9693.jpg`,
                alt: "Raspberry tartlet, a cup of tea with lemon and a glass of champagne on a table laid with a lace tablecloth",
            },
            {
                src: `${IMG}/IMG_9634.jpg`,
                alt: "Tea being poured from a floral porcelain teapot next to a stand of desserts",
            },
            {
                src: `${IMG}/IMG_9646.jpg`,
                alt: "Raspberry tartlet and desserts with the ACADEMIA chocolate emblem on a porcelain tier plate",
            },
        ],
    } satisfies Record<Locale, { src: string; alt: string }[]>,
};

export const teaPartySeo: Record<
    Locale,
    { title: string; description: string; name: string }
> = {
    ru: {
        title: "Чаепитие у графини в ACADEMIA Шувалова",
        description:
            "Чаепитие в историческом интерьере графского особняка приглашает погрузиться в аристократическую жизнь Петербурга XIX века и провести время за приятной беседой без спешки и суеты.",
        name: "Чаепитие у графини",
    },
    en: {
        title: "Tea with the Countess at ACADEMIA Shuvaloff",
        description:
            "Afternoon tea in the historic interiors of a count's mansion invites you to step into the aristocratic life of 19th-century Saint Petersburg and enjoy an unhurried conversation, far from the bustle.",
        name: "Tea with the Countess",
    },
};

export type TeaPartyMenu = {
    title: string;
    note: string;
    items: string[];
    price: string;
};

const baseMenuItems: Record<Locale, string[]> = {
    ru: [
        "Этажерка с\u00a0десертами\u00a0— Наполеон, медовик с\u00a0йогуртовым кремом, шу с\u00a0кремом тирамису, павлова с\u00a0клубникой, тарталетки с\u00a0клубникой и\u00a0малиной, фирменные трюфели ACADEMIA, мини-круассаны",
        "Малиновое и\u00a0вишневое варенье",
        "Сливочное соленое масло",
        "2\u00a0бутылки воды без\u00a0газа",
        "Чайный купаж на\u00a0выбор",
        "Дополнение к\u00a0чаю",
    ],
    en: [
        "Tiered dessert stand\u00a0— Napoleon cake, honey cake with yoghurt cream, choux with tiramisu cream, strawberry pavlova, strawberry and raspberry tartlets, signature ACADEMIA truffles, mini croissants",
        "Raspberry and cherry jam",
        "Salted butter",
        "2\u00a0bottles of still water",
        "Tea blend of your choice",
        "Tea accompaniment",
    ],
};

export const teaPartyCopy = {
    ru: {
        title: "Чаепитие у\u00a0графини в\u00a0ACADEMIA Шувалова",
        subtitle:
            "Чаепитие в\u00a0историческом интерьере графского особняка приглашает погрузиться в\u00a0аристократическую жизнь Петербурга XIX века и\u00a0провести время за\u00a0приятной беседой без\u00a0спешки и\u00a0суеты.",
        bookLabel: "Забронировать",
        heroAlt:
            "Чаепитие у\u00a0графини в\u00a0историческом интерьере особняка Шувалова",
        description:
            "Проведите время в\u00a0атмосфере дворянского дома XIX века за\u00a0изысканным чайным столом с\u00a0красивой сервировкой, любимыми десертами и\u00a0особым чайным купажом. Отличный вариант для\u00a0камерной встречи вдвоем, небольшого праздника или истинно петербургского акцента в\u00a0вашем путешествии.",
        menus: [
            {
                title: "Чаепитие",
                note: "Сервируется на\u00a0две персоны",
                items: baseMenuItems.ru,
                price: "Стоимость: 4\u00a0000\u00a0₽",
            },
            {
                title: "Чаепитие с\u00a0шампанским",
                note: "Сервируется на\u00a0две персоны",
                items: [...baseMenuItems.ru, "2\u00a0бокала шампанского"],
                price: "Стоимость: 7\u00a0500\u00a0₽",
            },
        ] satisfies TeaPartyMenu[],
        scheduleLabel: "Время чаепития:",
        schedule:
            "ежедневно в\u00a016:00 и\u00a017:00 по\u00a0предварительному бронированию.",
        bookTeaLabel: "Забронировать чаепитие",
        bookHotelLabel: "Забронировать отель",
        breadcrumbHome: "Главная",
    },
    en: {
        title: "Tea with the Countess at ACADEMIA Shuvaloff",
        subtitle:
            "Afternoon tea in the historic interiors of a count's mansion invites you to step into the aristocratic life of 19th-century Saint Petersburg and enjoy an unhurried conversation, far from the bustle.",
        bookLabel: "Book",
        heroAlt:
            "Tea with the Countess in the historic interiors of the Shuvaloff Mansion",
        description:
            "Spend time in the atmosphere of a 19th-century noble house at an exquisite tea table with elegant table settings, favourite desserts and a special tea blend. A perfect choice for an intimate meeting for two, a small celebration or a truly Saint Petersburg touch to your trip.",
        menus: [
            {
                title: "Tea",
                note: "Served for two",
                items: baseMenuItems.en,
                price: "Price: 4\u00a0000\u00a0₽",
            },
            {
                title: "Tea with champagne",
                note: "Served for two",
                items: [...baseMenuItems.en, "2\u00a0glasses of champagne"],
                price: "Price: 7\u00a0500\u00a0₽",
            },
        ] satisfies TeaPartyMenu[],
        scheduleLabel: "Tea time:",
        schedule: "daily at 4:00 PM and 5:00 PM, by advance reservation.",
        bookTeaLabel: "Book tea",
        bookHotelLabel: "Book a room",
        breadcrumbHome: "Home",
    },
} satisfies Record<Locale, unknown>;
