import { createGiveaway } from "@/data/giveaway";
import { HOTEL_CONTACTS } from "@/lib/seo/site";

export const poseidon = createGiveaway({
    path: "/poseidon/",
    partner: "Посейдон",
    logo: {
        src: "/images/poseidon/poseidon-logo.png",
        alt: "Посейдон — первый рыбный ресторан",
        width: 900,
        height: 386,
    },
    interior: "/images/poseidon/footer-poseidon.jpg",
    successBackground: "/images/poseidon/success-lobby.jpg",
    backgroundAlt: "Парадный вестибюль ACADEMIA Особняк Шувалова",
    order: "Совершите заказ в ресторане «Посейдон» на сумму от 3\u00a0500 рублей.",
    formIntro:
        "Совершите заказ в ресторане «Посейдон»\nна сумму от 3\u00a0500 рублей\nи заполните форму",
    mobileDiscountNote:
        "После регистрации отправим на почту персональный промокод на скидку 15% на проживание в ACADEMIA",
    period: "Акция действует по 18 ноября включительно.",
    room: "Полулюкс",
    roomDescription: "полулюксе",
    reservationEmail: HOTEL_CONTACTS.email,
    promoCode: "Посейдон",
    rulesUrl: "https://static.academia.spb.ru/files/poseidon_rules.pdf",
});
