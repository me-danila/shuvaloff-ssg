import { createGiveaway, giveawayImages } from "@/data/giveaway";

const order =
    "Закажите в ресторане «Москва-Стамбул» брауни на темном пиве с мороженым из ряженки";

export const mskIst = createGiveaway({
    path: "/msk-ist/",
    partner: "Москва-Стамбул",
    logo: {
        src: "/images/msk-ist/logo.png",
        alt: "Москва-Стамбул",
        width: 900,
        height: 327,
    },
    interior: "/images/msk-ist/interior.jpg",
    successBackground: giveawayImages.hero,
    backgroundAlt: "Фасад особняка Шувалова на Моховой улице",
    order: `${order}.`,
    formIntro: `${order} и заполните форму — так вы станете участником розыгрыша.`,
    mobileDiscountNote:
        "После регистрации вы получите промокод на скидку 15% на проживание в ACADEMIA",
    period: "Акция действует с 27 ноября по 21 декабря включительно.",
    room: "Супериор",
    roomDescription: "супериоре",
    reservationEmail: "reservation@academia-suites.ru",
    promoCode: "Мск Стамбул",
    utmSource: "msk-ist",
    rulesUrl: "https://static.academia.spb.ru/files/msk-ist_rules.pdf",
});
