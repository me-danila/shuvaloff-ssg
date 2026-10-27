// Тексты промо-страницы /poseidon/ — розыгрыш «Графских выходных» для гостей
// ресторана «Посейдон».

export const POSEIDON_PATH = "/poseidon/";
export const POSEIDON_THANKYOU_PATH = "/poseidon/thankyou/";

const IMG = "/images/poseidon";

export const poseidonImages = {
    hero: `${IMG}/hero-mansion.jpg`,
    // Превью ссылок: фото hero 1200×630 с белым логотипом отеля внизу.
    og: `${IMG}/og-image.jpg`,
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
        intro: "Совершите заказ в ресторане «Посейдон»\nна сумму от 3\u00a0500 рублей\nи заполните форму",
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
        errConsent:
            "Нужно подтвердить ознакомление с правилами акции и согласие на обработку персональных данных",
        errSubmit: "Что-то пошло не так. Попробуйте еще раз.",
    },
    // Страница /poseidon/thankyou/ после успешной отправки формы.
    success: {
        title: "Вы успешно зарегистрированы в\u00a0розыгрыше",
        text: "Сохраните ваш промокод на скидку 15%\nна проживание в ACADEMIA",
        textMobile:
            "Сохраните ваш промокод\nна скидку 15%\nна проживание в ACADEMIA",
        promoCode: "Посейдон",
        booking: {
            label: "Забронировать отель",
            href: `/booking/?promo-code-plain=${encodeURIComponent("Посейдон")}`,
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
                alt: "Полулюкс ACADEMIA Особняк Шувалова: кровать с синим изголовьем, хрустальная люстра и столик с розами у окна",
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
                text: "Совершите заказ в ресторане «Посейдон» на сумму от 3\u00a0500 рублей.",
            },
            {
                numeral: "II",
                title: "Оставьте заявку",
                text: "Заполните форму на этой странице. Укажите телефон и электронную почту для связи.",
            },
            {
                numeral: "III",
                title: "Ждите приглашения",
                text: "Акция действует по 18 ноября включительно. Дождитесь розыгрыша — победителю позвонят.",
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
                answer: "Проживание на 2 ночи в категории Полулюкс на двоих в ACADEMIA Особняк Шувалова и Графский завтрак. Срок действия сертификата 1 год.",
            },
            {
                question: "Как воспользоваться подарочным сертификатом?",
                answer: "После объявления результатов отдел бронирования свяжется с победителем и направит подарочный сертификат в электронном виде. Для активации сертификата необходимо отправить запрос на почту reservation@academia.spb.ru.",
            },
            {
                question: "Кто оплачивает дорогу?",
                answer: "Победитель самостоятельно оплачивает дорогу в две стороны.",
            },
            {
                question: "Как получить промокод на проживание?",
                answer: "Заполните форму участника на этой странице.",
            },
        ],
    },
};

// Юридические ссылки согласий и блока условий.
export const poseidonLegal = {
    policy: {
        label: "Политика обработки персональных данных",
        href: "/policy/",
    },
    rules: {
        label: "Правила акции",
        href: "https://static.academia.spb.ru/files/poseidon_rules.pdf",
    },
    consent: { href: "/consent/" },
};

/** Документы открываются в новой вкладке; якорь на блок условий — в этой. */
export const poseidonDocLinkProps = (href: string) =>
    href.startsWith("#")
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" };
