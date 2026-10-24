// Тексты страницы /counts-family-greetings/ — театрализованные поздравления
// от графской семьи для гостей особняка. Тексты — дословно из ТЗ; неразрывные
// пробелы навешивает nbsp() при объявлении. Английская версия — перевод.

import type { Locale } from "@/lib/i18n/routing";
import { nbsp } from "@/lib/typography";

export const COUNTS_FAMILY_GREETINGS_PATH = "/counts-family-greetings/";

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
    includesLabel: string;
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
        title: "Поздравление с днем рождения для мужчины",
        description: nbsp(
            "Поздравьте дорогого вам человека в необычном формате. Граф или графиня лично поздравит именинника, вручит открытку с персональными пожеланиями и подарит игристое.",
        ),
        includesLabel: "Что включено",
        includes: ["личное поздравление", "открытка", "игристое"],
        price: 5500,
        fromPrice: false,
        image: `${IMG}/birthday-man.jpg`,
        imgPosition: "center 30%",
    },
    {
        id: "birthday-woman",
        group: "birthday",
        title: "Поздравление с днем рождения для женщины",
        description: nbsp(
            "Добавьте неожиданных эмоций в день рождения с личным поздравлением от графа Шувалова, персональной открыткой с пожеланиями и букетом цветов.",
        ),
        includesLabel: "Что включено",
        includes: ["личное поздравление", "открытка", "букет цветов"],
        price: 9500,
        fromPrice: false,
        image: `${IMG}/birthday-woman.jpg`,
        imgPosition: "center 30%",
    },
    {
        id: "birthday-child",
        group: "birthday",
        title: "Поздравление с днем рождения для ребенка",
        description: nbsp(
            "Яркие впечатления для вашего ребенка в день рождения с личным поздравлением от графа или графини, памятной открыткой и трогательным игрушечным медвежонком в подарок.",
        ),
        includesLabel: "Что включено",
        includes: ["личное поздравление", "открытка", "медвежонок"],
        price: 7500,
        fromPrice: false,
        image: `${IMG}/birthday-child.jpg`,
        imgPosition: "45% center",
    },
    {
        id: "wedding",
        group: "special",
        title: "Поздравление с днем свадьбы или годовщиной",
        description: nbsp(
            "Поздравление от графской семьи с самыми теплыми пожеланиями, памятной открыткой с теплыми словами и антипасти с игристым для продолжения вечера.",
        ),
        includesLabel: "Что включено",
        includes: ["поздравление", "открытка", "антипасти и игристое"],
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
        includesLabel: "Что входит",
        includes: ["ресторан", "сценарий на выбор", "участие графской семьи"],
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
        includesLabel: "Что входит",
        includes: ["Графский завтрак", "экскурсия", "подарок-сюрприз"],
        price: 13000,
        fromPrice: true,
        image: `${IMG}/breakfast-tour.jpg`,
        imgPosition: "center bottom",
    },
];

/** Английские тексты карточек; цены, фото и якоря — из русской версии. */
const greetingServicesEnText: Record<
    string,
    Pick<
        GreetingService,
        "title" | "description" | "includesLabel" | "includes"
    >
> = {
    "birthday-man": {
        title: "Birthday greeting for him",
        description:
            "Congratulate someone dear to you in an unusual way. The Count or Countess will personally congratulate the birthday man, present a card with personal wishes and a bottle of sparkling wine.",
        includesLabel: "What's included",
        includes: ["personal greeting", "card", "sparkling wine"],
    },
    "birthday-woman": {
        title: "Birthday greeting for her",
        description:
            "Add unexpected emotions to her birthday with a personal greeting from Count Shuvalov, a personalised card with wishes and a bouquet of flowers.",
        includesLabel: "What's included",
        includes: ["personal greeting", "card", "bouquet of flowers"],
    },
    "birthday-child": {
        title: "Birthday greeting for a child",
        description:
            "Vivid impressions for your child on their birthday: a personal greeting from the Count or Countess, a keepsake card and a cuddly teddy bear as a gift.",
        includesLabel: "What's included",
        includes: ["personal greeting", "card", "teddy bear"],
    },
    wedding: {
        title: "Wedding or anniversary greeting",
        description:
            "Greetings from the Count's family with the warmest wishes, a keepsake card with heartfelt words, and antipasti with sparkling wine to carry on the evening.",
        includesLabel: "What's included",
        includes: ["greeting", "card", "antipasti and sparkling wine"],
    },
    proposal: {
        title: "Proposal at the mansion",
        description:
            "Exquisite marriage proposal scenarios in the atmosphere of the Count's mansion, with the Count's family taking part.",
        includesLabel: "What's included",
        includes: [
            "restaurant",
            "scenario of your choice",
            "the Count's family",
        ],
    },
    "breakfast-tour": {
        title: "The Count's breakfast with a tour",
        description:
            "A lavish Count's breakfast in an aristocratic setting, complemented by a private tour of the mansion with Count Shuvalov and a keepsake surprise.",
        includesLabel: "What's included",
        includes: ["the Count's breakfast", "tour", "surprise gift"],
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
        { id: "birthday", title: "День рождения" },
        { id: "special", title: "Особые события" },
    ],
    en: [
        { id: "birthday", title: "Birthday" },
        { id: "special", title: "Special occasions" },
    ],
};

/** Кнопки-якоря: «День рождения» ведет на группу, остальные — на карточки. */
export const greetingAnchors: Record<
    Locale,
    { label: string; targetId: string }[]
> = {
    ru: [
        { label: "День рождения", targetId: "birthday" },
        { label: "Свадьбы или годовщина", targetId: "wedding" },
        { label: "Предложение", targetId: "proposal" },
        { label: "Завтрак с экскурсией", targetId: "breakfast-tour" },
    ],
    en: [
        { label: "Birthday", targetId: "birthday" },
        { label: "Wedding or anniversary", targetId: "wedding" },
        { label: "Proposal", targetId: "proposal" },
        { label: "Breakfast with a tour", targetId: "breakfast-tour" },
    ],
};

export const countsFamilyCopy = {
    ru: {
        hero: {
            title: nbsp("Поздравления от графской семьи"),
            subtitle: nbsp("Яркое и необычное дополнение к вашему событию"),
            button: "Выбрать формат",
            imageAlt: "Граф и графиня Шуваловы в интерьере особняка",
        },
        intro: nbsp(
            "Мы подготовили особые театрализованные форматы с участием графской семьи, чтобы сделать ваш праздник в нашем особняке еще более ярким и запоминающимся.",
        ),
        anchorsLabel: "Форматы поздравлений",
        breadcrumbHome: "Главная",
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
                "Графиня в кружевном платье аплодирует гостям в зале особняка Шувалова",
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
            subtitle: "A bright and unusual addition to your celebration",
            button: "Choose a format",
            imageAlt: "Count and Countess Shuvalov in the mansion interiors",
        },
        intro: "We have prepared special theatrical formats with the Count's family to make your celebration at our mansion even brighter and more memorable.",
        anchorsLabel: "Greeting formats",
        breadcrumbHome: "Home",
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
                "The Countess in a lace dress applauding guests in the hall of the Shuvaloff Mansion",
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
