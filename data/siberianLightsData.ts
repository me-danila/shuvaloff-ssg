import { createGiveaway, giveawayImages } from "@/data/giveaway";

const order =
    "Закажите в ресторане «Сибирские огни» десерт «Графские развалины»";

export const siberianLights = createGiveaway({
    path: "/siberianlights/",
    partner: "Сибирские огни",
    logo: {
        src: "/images/siberianlights/logo.png",
        alt: "Сибирские огни",
        width: 900,
        height: 394,
    },
    interior: "/images/siberianlights/interior.jpg",
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
    promoCode: "Сибирские огни",
    utmSource: "siberianlights",
    rulesUrl: "https://static.academia.spb.ru/files/siberianlights_rules.pdf",
});
