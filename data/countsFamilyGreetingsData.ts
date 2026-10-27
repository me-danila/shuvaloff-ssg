// Тексты страницы /services/counts-family-greetings/details/ — театрализованные поздравления
// от графской семьи для гостей особняка. Тексты — дословно из ТЗ; неразрывные
// пробелы навешивает nbsp() при объявлении. Английская версия — перевод.

import type { Locale } from "@/lib/i18n/routing";
import { nbsp } from "@/lib/typography";

/** Типовая страница услуги (из ServicesData) и вложенная в нее индивидуальная. */
export const COUNTS_FAMILY_SERVICE_PATH = "/services/counts-family-greetings/";
export const COUNTS_FAMILY_GREETINGS_PATH = `${COUNTS_FAMILY_SERVICE_PATH}details/`;

const IMG = "/images/counts-family-greetings";

export const countsFamilyImages = {
    hero: `${IMG}/hero.jpg`,
    cta: `${IMG}/cta.jpg`,
};

export const countsFamilySeo: Record<
    Locale,
    { title: string; description: string; name: string }
> = {
    ru: {
        title: "Поздравления от графской семьи — ACADEMIA Особняк Шувалова",
        description:
            "Театрализованные поздравления от графа и графини Шуваловых для гостей особняка: день рождения, свадьба или годовщина, предложение руки и сердца, Графский завтрак с экскурсией. От 5 500 ₽.",
        name: "Поздравления от графской семьи",
    },
    en: {
        title: "Greetings from the Count's Family — ACADEMIA Mansion Shuvaloff",
        description:
            "Theatrical greetings from Count and Countess Shuvalov for mansion guests: birthday, wedding or anniversary, marriage proposal, the Count's breakfast with a tour. From 5 500 ₽.",
        name: "Greetings from the Count's Family",
    },
};

/** «5 500 ₽» / «от 10 000 ₽» — с неразрывными пробелами. */
export const formatRub = (
    price: number,
    fromPrice = false,
    locale: Locale = "ru",
): string =>
    `${fromPrice ? (locale === "en" ? "from " : "от ") : ""}${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;

export type GreetingGroupId = "birthday" | "special";

export type GreetingService = {
    /** id карточки — цель якоря (для «Особых событий»). */
    id: string;
    group: GreetingGroupId;
    title: string;
    description: string;
    /** Полное название для Schema.org, когда в карточке короткое («Для мужчины»). */
    offerName?: string;
    /** Состав — списком под ценой. */
    includes: string[];
    price: number;
    /** Цена «от …». */
    fromPrice: boolean;
    image: string;
    /** object-position фото в карточке. */
    imgPosition?: string;
};

const greetingServicesRu: GreetingService[] = [
    {
        id: "birthday-man",
        group: "birthday",
        title: "Для господина",
        offerName: "Поздравление с днем рождения для мужчины",
        description: nbsp(
            "Поздравьте дорогого вам человека в необычном формате. Граф или графиня лично поздравит именинника, вручит открытку с персональными пожеланиями и подарит игристое.",
        ),
        includes: ["поздравление", "открытка", "игристое"],
        price: 5500,
        fromPrice: false,
        image: `${IMG}/birthday-man.jpg`,
        imgPosition: "center 30%",
    },
    {
        id: "birthday-woman",
        group: "birthday",
        title: "Для дамы",
        offerName: "Поздравление с днем рождения для женщины",
        description: nbsp(
            "Добавьте неожиданных эмоций в день рождения с личным поздравлением от графа Шувалова, персональной открыткой с пожеланиями и букетом цветов.",
        ),
        includes: ["поздравление", "открытка", "букет цветов"],
        price: 9500,
        fromPrice: false,
        image: `${IMG}/birthday-woman.jpg`,
        imgPosition: "center top",
    },
    {
        id: "birthday-child",
        group: "birthday",
        title: "Для ребенка",
        offerName: "Поздравление с днем рождения для ребенка",
        description: nbsp(
            "Яркие впечатления для вашего ребенка в день рождения с личным поздравлением от графа или графини, памятной открыткой и трогательным игрушечным медвежонком в подарок.",
        ),
        includes: ["поздравление", "открытка", "медвежонок"],
        price: 7500,
        fromPrice: false,
        image: `${IMG}/birthday-child.jpg`,
        imgPosition: "center 40%",
    },
    {
        id: "wedding",
        group: "special",
        title: "Поздравление с днем свадьбы или годовщиной",
        description: nbsp(
            "Поздравление от графской семьи с самыми теплыми пожеланиями, памятной открыткой с теплыми словами и антипасти с игристым для продолжения вечера.",
        ),
        includes: ["поздравление", "открытка", "игристое и антипасти"],
        price: 10000,
        fromPrice: false,
        image: `${IMG}/wedding.jpg`,
        imgPosition: "center 40%",
    },
    {
        id: "proposal",
        group: "special",
        title: "Предложение в особняке",
        description: nbsp(
            "Изысканные сценарии предложения руки и сердца в атмосфере графского особняка с участием графской семьи.",
        ),
        includes: [
            "бронирование столика в ресторане",
            "готовый сценарий на выбор",
            "участие графской семьи",
        ],
        price: 10000,
        fromPrice: true,
        image: `${IMG}/proposal.jpg`,
        imgPosition: "center 35%",
    },
    {
        id: "breakfast-tour",
        group: "special",
        title: "Графский завтрак с экскурсией",
        description: nbsp(
            "Роскошный Графский завтрак в аристократической обстановке, дополненный личной экскурсией по особняку от графа Шувалова и сюрпризом на память.",
        ),
        includes: [
            "Графский завтрак",
            "экскурсия по особняку",
            "памятный подарок",
        ],
        price: 13000,
        fromPrice: true,
        image: `${IMG}/breakfast-tour.jpg`,
        imgPosition: "center bottom",
    },
];

/** Английские тексты карточек; цены, фото и якоря — из русской версии. */
const greetingServicesEnText: Record<
    string,
    Pick<GreetingService, "title" | "description" | "offerName" | "includes">
> = {
    "birthday-man": {
        title: "For him",
        offerName: "Birthday greeting for him",
        description:
            "Congratulate someone dear to you in an unusual way. The Count or Countess will personally congratulate the birthday man, present a card with personal wishes and a bottle of sparkling wine.",
        includes: ["greeting", "card", "sparkling wine"],
    },
    "birthday-woman": {
        title: "For her",
        offerName: "Birthday greeting for her",
        description:
            "Add unexpected emotions to her birthday with a personal greeting from Count Shuvalov, a personalised card with wishes and a bouquet of flowers.",
        includes: ["greeting", "card", "bouquet of flowers"],
    },
    "birthday-child": {
        title: "For a child",
        offerName: "Birthday greeting for a child",
        description:
            "Vivid impressions for your child on their birthday: a personal greeting from the Count or Countess, a keepsake card and a cuddly teddy bear as a gift.",
        includes: ["greeting", "card", "teddy bear"],
    },
    wedding: {
        title: "Wedding or anniversary greeting",
        description:
            "Greetings from the Count's family with the warmest wishes, a keepsake card with heartfelt words, and antipasti with sparkling wine to carry on the evening.",
        includes: ["greeting", "card", "sparkling wine and antipasti"],
    },
    proposal: {
        title: "Proposal at the mansion",
        description:
            "Exquisite marriage proposal scenarios in the atmosphere of the Count's mansion, with the Count's family taking part.",
        includes: [
            "table reservation at the restaurant",
            "ready-made scenario of your choice",
            "the Count's family taking part",
        ],
    },
    "breakfast-tour": {
        title: "The Count's breakfast with a tour",
        description:
            "A lavish Count's breakfast in an aristocratic setting, complemented by a private tour of the mansion with Count Shuvalov and a keepsake surprise.",
        includes: [
            "the Count's breakfast",
            "tour of the mansion",
            "keepsake gift",
        ],
    },
};

export const greetingServices: Record<Locale, GreetingService[]> = {
    ru: greetingServicesRu,
    en: greetingServicesRu.map((s) => ({
        ...s,
        ...greetingServicesEnText[s.id],
    })),
};

export const greetingGroups: Record<
    Locale,
    { id: GreetingGroupId; title: string }[]
> = {
    ru: [
        { id: "birthday", title: "Поздравление с днем рождения" },
        { id: "special", title: "Особые события" },
    ],
    en: [
        { id: "birthday", title: "Birthday greetings" },
        { id: "special", title: "Special occasions" },
    ],
};

export const countsFamilyCopy = {
    ru: {
        hero: {
            title: nbsp("Поздравления от графской семьи"),
            imageAlt:
                "Граф и графиня Шуваловы за столом с десертами в особняке",
        },
        intro: nbsp(
            "Мы подготовили особые форматы поздравления с участием графской семьи, чтобы сделать ваш праздник в особняке Шувалова еще более ярким и запоминающимся.",
        ),
        tagline: nbsp("Яркое и необычное дополнение к вашему событию"),
        priceLabel: "Стоимость",
        breadcrumbHome: "Главная",
        breadcrumbServices: "Услуги",
        breadcrumbDetails: "Подробнее",
        steps: {
            title: "Как это работает?",
            items: [
                {
                    id: "book",
                    title: "Забронируйте номер",
                    text: nbsp(
                        "в особняке Шувалова на нужные даты, включая пятницу, субботу или воскресенье",
                    ),
                },
                {
                    id: "choose",
                    title: nbsp("Выберите формат и дату"),
                    text: nbsp("и оставьте заявку на этой странице"),
                },
                {
                    id: "agree",
                    title: nbsp("Мы согласуем детали"),
                    text: nbsp("и подготовим ваш сюрприз"),
                },
            ],
        },
        terms: {
            title: "Условия",
            items: [
                nbsp(
                    "Услуги предоставляются гостям ACADEMIA Особняк Шувалова по предварительному заказу.",
                ),
                nbsp("Графская семья принимает с пятницы по воскресенье"),
                `Стоимость ${formatRub(5500, true)}${nbsp(", итоговая сумма зависит от выбранного сценария.")}`,
            ],
        },
        form: {
            id: "request",
            title: nbsp(
                "Хотите сделать необычный сюрприз для дорогого человека?",
            ),
            subtitle: nbsp(
                "Оставьте заявку, и мы подберем формат и сценарий для вашего праздника",
            ),
            photoAlt: nbsp(
                "Граф читает поздравление графине за чайным столом в особняке Шувалова",
            ),
            name: "Имя*",
            phone: "Телефон*",
            contact: "Предпочитаемый способ связи",
            contactOptions: ["Telegram", "MAX", "WhatsApp", "Звонок"],
            dates: "Даты проживания",
            datesHint: nbsp(
                "Выберите даты, в которые есть пятница, суббота или воскресенье",
            ),
            occasion: "Повод",
            consentText: nbsp(
                "Выражаю согласие на обработку персональных данных в соответствии с",
            ),
            consentLink: nbsp("Политикой по обработке персональных данных"),
            requiredNote: "*поле обязательное для заполнения",
            submit: "Оставить заявку",
            loading: "Отправка…",
            errName: nbsp("Пожалуйста, укажите имя"),
            errPhone: "Укажите корректный номер телефона",
            errDates: nbsp("Выберите дату выезда"),
            errConsent: nbsp(
                "Подтвердите согласие на обработку персональных данных",
            ),
            errSubmit: nbsp("Что-то пошло не так. Попробуйте еще раз."),
            successTitle: "Спасибо!",
            successText: nbsp(
                "Заявка отправлена. Мы свяжемся с вами, чтобы подобрать формат и согласовать детали.",
            ),
            mailSubject: "Новая заявка — Поздравления от графской семьи",
            mailFrom: "Сайт ACADEMIA — Поздравления от графской семьи",
        },
    },
    en: {
        hero: {
            title: "Greetings from the Count's Family",
            imageAlt:
                "Count and Countess Shuvalov at a table with desserts in the mansion",
        },
        intro: "We have prepared special greeting formats with the Count's family to make your celebration at the Shuvaloff Mansion even brighter and more memorable.",
        tagline: "A bright and unusual addition to your celebration",
        priceLabel: "Price",
        breadcrumbHome: "Home",
        breadcrumbServices: "Services",
        breadcrumbDetails: "Details",
        steps: {
            title: "How it works",
            items: [
                {
                    id: "book",
                    title: "Book a room",
                    text: "at the Shuvaloff Mansion for the dates you need, including a Friday, Saturday or Sunday",
                },
                {
                    id: "choose",
                    title: "Choose a format and date",
                    text: "and leave a request on this page",
                },
                {
                    id: "agree",
                    title: "We arrange the details",
                    text: "and prepare your surprise",
                },
            ],
        },
        terms: {
            title: "Terms",
            items: [
                "Services are available to guests of ACADEMIA Mansion Shuvaloff by prior arrangement.",
                "The Count's family receives guests from Friday to Sunday",
                `Prices ${formatRub(5500, true, "en")}, the final cost depends on the chosen scenario.`,
            ],
        },
        form: {
            id: "request",
            title: "Want to arrange an unusual surprise for someone dear?",
            subtitle:
                "Leave a request and we will choose the format and scenario for your celebration",
            photoAlt:
                "The Count reading a greeting to the Countess at a tea table in the Shuvaloff Mansion",
            name: "Name*",
            phone: "Phone*",
            contact: "Preferred contact method",
            contactOptions: ["Telegram", "MAX", "WhatsApp", "Phone call"],
            dates: "Dates of stay",
            datesHint: "Choose dates that include a Friday, Saturday or Sunday",
            occasion: "Occasion",
            consentText:
                "I consent to the processing of my personal data in accordance with the",
            consentLink: "Personal Data Processing Policy",
            requiredNote: "*required field",
            submit: "Send request",
            loading: "Sending…",
            errName: "Please enter your name",
            errPhone: "Please enter a valid phone number",
            errDates: "Please choose a check-out date",
            errConsent:
                "Please confirm your consent to personal data processing",
            errSubmit: "Something went wrong. Please try again.",
            successTitle: "Thank you!",
            successText:
                "Your request has been sent. We will contact you to choose a format and arrange the details.",
            mailSubject: "Новая заявка (EN) — Поздравления от графской семьи",
            mailFrom: "Сайт ACADEMIA — Поздравления от графской семьи (EN)",
        },
    },
} satisfies Record<Locale, unknown>;
