import { createGiveaway, giveawayImages } from "@/data/giveaway";

const order = "Закажите в ресторане «Pinci» десерт «Шелк»";

export const pinci = createGiveaway({
    path: "/pinci/",
    partner: "Pinci",
    logo: {
        src: "/images/pinci/logo.png",
        alt: "Pinci",
        width: 900,
        height: 306,
    },
    interior: "/images/pinci/interior.jpg",
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
    promoCode: "Pinci",
    utmSource: "pinci",
    rulesUrl: "https://static.academia.spb.ru/files/pinci_rules.pdf",
});
