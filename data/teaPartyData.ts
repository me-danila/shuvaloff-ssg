// Тексты индивидуальной страницы «Чаепитие у графини» — вложена в услугу:
// /services/tea-party/details/. Типовая страница услуги /services/tea-party/ —
// из data/ServicesData.tsx (slug "tea-party").

export const TEA_PARTY_SERVICE_PATH = "/services/tea-party/";
export const TEA_PARTY_PATH = `${TEA_PARTY_SERVICE_PATH}details/`;

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
            "Приглашаем погрузиться в аристократическую жизнь Петербурга XIX века и провести время за приятной беседой за чайной церемонией без спешки и суеты.",
        name: "Чаепитие у графини",
    },
    en: {
        title: "Tea with the Countess at ACADEMIA Shuvaloff",
        description:
            "We invite you to step into the aristocratic life of 19th-century Saint Petersburg and enjoy a pleasant conversation over an unhurried tea ceremony, far from the bustle.",
        name: "Tea with the Countess",
    },
};

export type TeaPartyMenuItem = {
    name: string;
    /** Состав позиции — мелкой строкой под названием. */
    details?: string;
};

export type TeaPartyMenu = {
    icon: "tea" | "champagne";
    title: string;
    note: string;
    price: string;
    items: TeaPartyMenuItem[];
};

// Состав меню — как на странице чаепития сайта ресторана.
const baseMenuItems: Record<Locale, TeaPartyMenuItem[]> = {
    ru: [
        {
            name: "Этажерка с\u00a0десертами",
            details:
                "Наполеон, медовик с\u00a0йогуртовым кремом, шу с\u00a0кремом тирамису, павлова с\u00a0клубникой, тарталетки с\u00a0клубникой и\u00a0малиной, фирменные трюфели ACADEMIA, мини\u2011круассаны",
        },
        { name: "Малиновое и\u00a0вишневое варенье" },
        { name: "Сливочное соленое масло" },
        { name: "2\u00a0бутылки воды без\u00a0газа" },
        {
            name: "Чайный купаж на\u00a0выбор",
            details: "Кусьми, Русский караван, Граф Суворов, Рихтер, Кошман",
        },
        {
            name: "Дополнение к\u00a0чаю",
            details: "Лимон, тимьян, бадьян, корица",
        },
    ],
    en: [
        {
            name: "Tiered dessert stand",
            details:
                "Napoleon cake, honey cake with yoghurt cream, choux with tiramisu cream, strawberry pavlova, strawberry and raspberry tartlets, signature ACADEMIA truffles, mini croissants",
        },
        { name: "Raspberry and cherry jam" },
        { name: "Salted butter" },
        { name: "2\u00a0bottles of still water" },
        {
            name: "Tea blend of your choice",
            details: "Kusmi, Russian Caravan, Count Suvorov, Richter, Koshman",
        },
        {
            name: "Tea accompaniment",
            details: "Lemon, thyme, star anise, cinnamon",
        },
    ],
};

const champagneItem: Record<Locale, TeaPartyMenuItem> = {
    ru: {
        name: "2\u00a0бокала шампанского",
        details: "Champagne Thierry Fournier «Réserve» Extra Brut",
    },
    en: {
        name: "2\u00a0glasses of champagne",
        details: "Champagne Thierry Fournier “Réserve” Extra Brut",
    },
};

export const teaPartyCopy = {
    ru: {
        title: "Чаепитие у\u00a0графини в\u00a0ACADEMIA Шувалова",
        subtitle:
            "Приглашаем погрузиться в\u00a0аристократическую жизнь Петербурга XIX века и\u00a0провести время за\u00a0приятной беседой за\u00a0чайной церемонией без\u00a0спешки и\u00a0суеты.",
        bookLabel: "Забронировать",
        heroAlt:
            "Чаепитие у\u00a0графини в\u00a0историческом интерьере особняка Шувалова",
        serving:
            "Для\u00a0вас мы\u00a0сервируем этажерку с\u00a0десертами, мини-круассанами и\u00a0фирменными трюфелями ACADEMIA",
        description:
            "Проведите время в\u00a0атмосфере дворянского дома XIX века за\u00a0изысканным чайным столом с\u00a0красивой сервировкой, любимыми десертами и\u00a0особым чайным купажом. Отличный вариант для\u00a0камерной встречи вдвоем, небольшого праздника или истинно петербургского акцента в\u00a0вашем путешествии.",
        menus: [
            {
                icon: "tea",
                title: "Чаепитие",
                note: "Сервируется на\u00a0две персоны",
                price: "4\u00a0000\u00a0₽",
                items: baseMenuItems.ru,
            },
            {
                icon: "champagne",
                title: "Чаепитие с\u00a0шампанским",
                note: "Сервируется на\u00a0две персоны",
                price: "7\u00a0500\u00a0₽",
                items: [...baseMenuItems.ru, champagneItem.ru],
            },
        ] satisfies TeaPartyMenu[],
        scheduleLabel:
            "Чаепития мы подаем каждый день в\u00a016:00 и\u00a017:00",
        schedule:
            "По\u00a0индивидуальному запросу можем рассмотреть подачу в\u00a0другое время",
        orderLabel: "Заказать",
        bookTeaLabel: "Забронировать услугу",
        bookHotelLabel: "Забронировать отель",
        breadcrumbHome: "Главная",
        breadcrumbServices: "Услуги",
        breadcrumbDetails: "Подробнее",
    },
    en: {
        title: "Tea with the Countess at ACADEMIA Shuvaloff",
        subtitle:
            "We invite you to step into the aristocratic life of 19th-century Saint Petersburg and enjoy a pleasant conversation over an unhurried tea ceremony, far from the bustle.",
        bookLabel: "Book",
        heroAlt:
            "Tea with the Countess in the historic interiors of the Shuvaloff Mansion",
        serving:
            "We serve a tiered stand with desserts, mini croissants and signature ACADEMIA truffles just for you",
        description:
            "Spend time in the atmosphere of a 19th-century noble house at an exquisite tea table with elegant table settings, favourite desserts and a special tea blend. A perfect choice for an intimate meeting for two, a small celebration or a truly Saint Petersburg touch to your trip.",
        menus: [
            {
                icon: "tea",
                title: "Tea",
                note: "Served for two",
                price: "4\u00a0000\u00a0₽",
                items: baseMenuItems.en,
            },
            {
                icon: "champagne",
                title: "Tea with champagne",
                note: "Served for two",
                price: "7\u00a0500\u00a0₽",
                items: [...baseMenuItems.en, champagneItem.en],
            },
        ] satisfies TeaPartyMenu[],
        scheduleLabel: "We serve afternoon tea daily at 4:00 PM and 5:00 PM",
        schedule: "On request, we can consider serving it at another time",
        orderLabel: "Order",
        bookTeaLabel: "Book the service",
        bookHotelLabel: "Book a room",
        breadcrumbHome: "Home",
        breadcrumbServices: "Services",
        breadcrumbDetails: "Details",
    },
} satisfies Record<Locale, unknown>;
