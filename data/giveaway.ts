const IMG = "/images/poseidon";

export const giveawayImages = {
    hero: `${IMG}/hero-mansion.jpg`,
    // Превью ссылок: фото hero 1200×630 с белым логотипом отеля внизу.
    og: `${IMG}/og-image.jpg`,
    semiSuite: `${IMG}/prize-semi-suite.jpg`,
    breakfast: `${IMG}/prize-breakfast.jpg`,
    cta: `${IMG}/cta-interior.jpg`,
    footerAcademia: `${IMG}/footer-academia.jpg`,
    academiaLogo: `${IMG}/academia-logo.svg`,
    fleur: `${IMG}/fleur.png`,
};

type GiveawayOptions = {
    path: string;
    partner: string;
    logo: { src: string; alt: string; width: number; height: number };
    interior: string;
    successBackground: string;
    backgroundAlt: string;
    order: string;
    formIntro: string;
    mobileDiscountNote: string;
    period: string;
    room: string;
    roomDescription: string;
    reservationEmail: string;
    promoCode: string;
    utmSource?: string;
    rulesUrl: string;
};

export function createGiveaway(options: GiveawayOptions) {
    const { partner, promoCode, utmSource } = options;
    const tracking = utmSource
        ? `utm_source=${encodeURIComponent(utmSource)}`
        : "";
    const seo = {
        title: `Выиграйте Графские выходные в Петербурге — ACADEMIA × ${partner}`,
        description: `Розыгрыш для гостей ресторана «${partner}»: проживание в ${options.roomDescription} на двоих и графский завтрак в ACADEMIA Особняк Шувалова. Каждому участнику — промокод на скидку 15% на проживание.`,
        name: "Графские выходные в Петербурге",
    };

    const copy = {
        hero: {
            eyebrow: "Личное приглашение\nв Петербург",
            title: ["Выиграйте", "Графские выходные", "в Петербурге"],
        },
        form: {
            title: "Ваше приглашение\nна Графские выходные",
            intro: options.formIntro,
            discount: "15%",
            discountNoteDesktop:
                "После вы получите промокод\nна скидку 15% на проживание в ACADEMIA",
            discountNoteMobile: options.mobileDiscountNote,
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
        success: {
            title: "Вы успешно зарегистрированы в\u00a0розыгрыше",
            text: "Сохраните ваш промокод на скидку 15%\nна проживание в ACADEMIA",
            textMobile:
                "Сохраните ваш промокод\nна скидку 15%\nна проживание в ACADEMIA",
            promoCode,
            booking: {
                label: "Забронировать отель",
                href: `/booking/?promo-code-plain=${encodeURIComponent(promoCode)}${tracking ? `&${tracking}` : ""}`,
            },
            backgroundAlt: options.backgroundAlt,
        },
        prize: {
            eyebrow: "Ваш приз",
            title: "Петербург, в\u00a0котором хочется остаться",
            text: [
                "Время для двоих.",
                "И город, который открывается по-новому.",
            ],
            items: [
                {
                    label: `${options.room} на двоих`,
                    image: giveawayImages.semiSuite,
                    alt: "Номер ACADEMIA Особняк Шувалова: кровать с синим изголовьем, хрустальная люстра и столик с розами у окна",
                },
                {
                    label: "Графский завтрак",
                    image: giveawayImages.breakfast,
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
                    text: options.order,
                },
                {
                    numeral: "II",
                    title: "Оставьте заявку",
                    text: "Заполните форму на этой странице. Укажите телефон и электронную почту для связи.",
                },
                {
                    numeral: "III",
                    title: "Ждите приглашения",
                    text: `${options.period} Дождитесь розыгрыша — победителю позвонят.`,
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
                    answer: `Проживание на 2 ночи в категории ${options.room} на двоих в ACADEMIA Особняк Шувалова и Графский завтрак. Срок действия сертификата 1 год.`,
                },
                {
                    question: "Как воспользоваться подарочным сертификатом?",
                    answer: `После объявления результатов отдел бронирования свяжется с победителем и направит подарочный сертификат в электронном виде. Для активации сертификата необходимо отправить запрос на почту ${options.reservationEmail}.`,
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

    return {
        path: options.path,
        thankYouPath: `${options.path}thankyou/`,
        homeHref: tracking ? `/?${tracking}` : "/",
        partner,
        logo: options.logo,
        interior: options.interior,
        successBackground: options.successBackground,
        rulesUrl: options.rulesUrl,
        slug: options.path.slice(1, -1),
        seo,
        copy,
    };
}
export type Giveaway = ReturnType<typeof createGiveaway>;
