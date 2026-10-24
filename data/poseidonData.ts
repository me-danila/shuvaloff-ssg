// Тексты промо-страницы /poseidon/ — розыгрыш «Графских выходных» для гостей
// ресторана «Посейдон». Значения в [квадратных скобках] — плейсхолдеры из
// макета: заменить, когда партнер пришлет условия акции.

export const POSEIDON_PATH = "/poseidon/";
export const POSEIDON_THANKYOU_PATH = "/poseidon/thankyou/";

const IMG = "/images/poseidon";

export const poseidonImages = {
    hero: `${IMG}/hero-mansion.jpg`,
    semiSuite: `${IMG}/prize-semi-suite.jpg`,
    breakfast: `${IMG}/prize-breakfast.jpg`,
    cta: `${IMG}/cta-interior.jpg`,
    footerAcademia: `${IMG}/footer-academia.jpg`,
    footerPoseidon: `${IMG}/footer-poseidon.jpg`,
    academiaLogo: `${IMG}/academia-logo.svg`,
    poseidonLogo: `${IMG}/poseidon-logo.png`,
    fleur: `${IMG}/fleur.png`,
    successBackground: `${IMG}/success-lobby.jpg`,
};

export const poseidonSeo = {
    title: "Выиграйте Графские выходные в Петербурге — ACADEMIA × Посейдон",
    description:
        "Розыгрыш для гостей ресторана «Посейдон»: проживание в полулюксе на двоих и графский завтрак в ACADEMIA Особняк Шувалова. Каждому участнику — промокод на скидку 15% на проживание.",
    name: "Графские выходные в Петербурге",
};

export const poseidonCopy = {
    hero: {
        eyebrow: "Личное приглашение\nв Петербург",
        title: ["Выиграйте", "Графские выходные", "в Петербурге"],
    },
    form: {
        title: "Ваше приглашение\nна Графские выходные",
        intro: "Закажите [акционная позиция]\nв [Название ресторана]\nи заполните форму",
        discount: "15%",
        discountNoteDesktop:
            "После вы получите промокод\nна скидку 15% на проживание в ACADEMIA",
        discountNoteMobile:
            "После регистрации отправим на почту персональный промокод на скидку 15% на проживание в ACADEMIA",
        name: "Имя",
        phone: "Телефон",
        email: "Email",
        submit: "Участвовать в розыгрыше",
        loading: "Отправка...",
        errName: "Пожалуйста, укажите имя",
        errPhone: "Укажите корректный номер телефона",
        errEmail: "Укажите корректный email",
        errConsent: "Нужно согласие на обработку персональных данных",
        errSubmit: "Что-то пошло не так. Попробуйте еще раз.",
    },
    // Страница /poseidon/thankyou/ после успешной отправки формы.
    success: {
        title: "Вы успешно зарегистрированы в\u00a0розыгрыше",
        text: "Сохраните ваш промокод на скидку 15%\nна проживание в ACADEMIA",
        textMobile:
            "Сохраните ваш промокод\nна скидку 15%\nна проживание в ACADEMIA",
        promoCode: "ACADEMIA15",
        booking: {
            label: "Забронировать отель",
            href: "/booking/?promo-code-plain=ACADEMIA15",
        },
        backgroundAlt: "Парадный вестибюль ACADEMIA Особняк Шувалова",
    },
    prize: {
        eyebrow: "Ваш приз",
        title: "Петербург, в\u00a0котором хочется остаться",
        text: ["Время для двоих.", "И город, который открывается по-новому."],
        items: [
            {
                label: "Полулюкс на двоих",
                image: poseidonImages.semiSuite,
                alt: "Спальня полулюкса ACADEMIA Особняк Шувалова",
            },
            {
                label: "Графский завтрак",
                image: poseidonImages.breakfast,
                alt: "Графский завтрак: этажерка с десертами, фарфор и лилии",
            },
        ],
    },
    steps: {
        eyebrow: "Простые условия",
        title: "Три шага к\u00a0Графским выходным",
        items: [
            {
                numeral: "I",
                title: "Начните в ресторане",
                text: "Закажите [акционная позиция] в [Название ресторана].",
            },
            {
                numeral: "II",
                title: "Оставьте заявку",
                text: "Заполните форму на этой странице. Укажите телефон и электронную почту для связи.",
            },
            {
                numeral: "III",
                title: "Ждите приглашения",
                text: "Дождитесь розыгрыша [дата] — победителю позвонят.",
            },
        ],
        ctaAlt: "Интерьер номера ACADEMIA Особняк Шувалова",
    },
    faq: {
        eyebrow: "Всё важное — заранее",
        title: "Условия участия",
        rulesLabel: "Полные правила акции",
        items: [
            {
                question: "Что входит в приз?",
                answer: "Проживание в полулюксе на двоих в ACADEMIA Особняк Шувалова и графский завтрак. [Количество ночей и срок действия сертификата].",
            },
            {
                question: "Как воспользоваться подарочным сертификатом?",
                answer: "[Порядок бронирования по сертификату].",
            },
            {
                question: "Кто оплачивает дорогу?",
                answer: "[Условия по дороге до Петербурга].",
            },
            {
                question: "Как получить промокод на проживание?",
                answer: "Заполните форму на этой странице — персональный промокод на скидку 15% на проживание в ACADEMIA придет на указанную почту.",
            },
        ],
    },
};

// Юридические ссылки футера и согласий. Правила акции — отдельный документ
// партнера, пока ведет на якорь блока условий.
export const poseidonLegal = {
    agreement: { label: "Пользовательское соглашение", href: "/legal/" },
    policy: {
        label: "Политика обработки персональных данных",
        href: "/policy/",
    },
    rules: { label: "Правила акции", href: "#conditions" },
    consent: { href: "/consent/" },
    copyright: "© 2014–2026 «ACADEMIA BOUTIQUE HOTELS» ®",
    official: "Официальный сайт ACADEMIA",
};
