import { createGiveaway, giveawayImages } from "@/data/giveaway";

const order = "Закажите в ресторане «Si, mamma» сет «Si, Mamma»";

export const simamma = createGiveaway({
    path: "/simamma/",
    partner: "Si, mamma",
    logo: {
        src: "/images/simamma/logo.png",
        alt: "Si, mamma",
        width: 900,
        height: 432,
    },
    interior: "/images/simamma/interior.jpg",
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
    promoCode: "Si, Mamma",
    utmSource: "simamma",
    rulesUrl: "https://static.academia.spb.ru/files/simamma_rules.pdf",
});
