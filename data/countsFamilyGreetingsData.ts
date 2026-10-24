// Тексты страницы /counts-family-greetings/ — театрализованные поздравления
// от графской семьи для гостей особняка. Тексты — дословно из ТЗ; неразрывные
// пробелы навешивает nbsp() при объявлении.

import { nbsp } from "@/lib/typography";

export const COUNTS_FAMILY_GREETINGS_PATH = "/counts-family-greetings/";

const IMG = "/images/counts-family-greetings";

export const countsFamilyImages = {
    hero: `${IMG}/hero.jpg`,
    cta: `${IMG}/cta.jpg`,
};

export const countsFamilySeo = {
    title: "Поздравления от графской семьи — ACADEMIA Особняк Шувалова",
    description:
        "Театрализованные поздравления от графа и графини Шуваловых для гостей особняка: день рождения, свадьба или годовщина, предложение руки и сердца, Графский завтрак с экскурсией. От 5 500 ₽.",
    name: "Поздравления от графской семьи",
};

/** «5 500 ₽» / «от 10 000 ₽» — с неразрывными пробелами. */
export const formatRub = (price: number, fromPrice = false): string =>
    `${fromPrice ? "от " : ""}${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;

export type GreetingGroupId = "birthday" | "special";

export type GreetingService = {
    /** id карточки — цель якоря (для «Особых событий»). */
    id: string;
    group: GreetingGroupId;
    title: string;
    description: string;
    includesLabel: "Что включено" | "Что входит";
    includes: string[];
    price: number;
    /** Цена «от …». */
    fromPrice: boolean;
    image: string;
    /** object-position фото в карточке. */
    imgPosition?: string;
};

export const greetingServices: GreetingService[] = [
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

export const greetingGroups: { id: GreetingGroupId; title: string }[] = [
    { id: "birthday", title: "День рождения" },
    { id: "special", title: "Особые события" },
];

/** Кнопки-якоря: «День рождения» ведет на группу, остальные — на карточки. */
export const greetingAnchors: { label: string; targetId: string }[] = [
    { label: "День рождения", targetId: "birthday" },
    { label: "Свадьбы или годовщина", targetId: "wedding" },
    { label: "Предложение", targetId: "proposal" },
    { label: "Завтрак с экскурсией", targetId: "breakfast-tour" },
];

export const countsFamilyCopy = {
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
        title: nbsp("Хотите сделать необычный сюрприз для дорогого человека?"),
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
};
