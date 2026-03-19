export type SaleLink = {
    label: string;
    href: string;
};

export type Sale = {
    title: string;
    subtitle: string;
    imgUrl: string;
    bookingUrl: string;
};

export const AllSales: Sale[] = [
    {
        title: "Промокод GENIUS",
        subtitle: "Получите бонус при первом бронировании на сайте",
        imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/a05a9ff67a6d51f6afd4cb1ef1e2cbdff77fdc6f-1.avif",
        bookingUrl: "/booking/?hotel_id=41018&promo-code-plain=genius",
    },
    {
        title: "Раннее бронирование",
        subtitle: "Скидка 15% при бронировании за 7 дней и более до заезда",
        imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/stay.avif",
        bookingUrl: "/booking?hotel_id=41018&be-offer=5110665",
    },
    {
        title: "Длительное проживание",
        subtitle: "Скидка 20% на проживание от 5 ночей",
        imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_1062.avif",
        bookingUrl: "/booking?hotel_id=41018&be-offer=5110673",
    },
    {
        title: "День рождения",
        subtitle:
            "Специальные привилегии для именинников и скидка 15% от 2 ночей",
        imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/hbd.avif",
        bookingUrl:
            "/booking?hotel_id=41018&be-offer=5110931&promo-code-plain=birthday",
    },
    {
        title: "ВАШ ВЫХОДНОЙ КАК ИСКУССТВО",
        subtitle:
            "Особый формат, в котором выходной день становится церемонией",
        imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_0279-2-1.avif",
        bookingUrl: "/booking/?&be-offer=804866",
    },
    {
        title: "РЖД Бонус",
        subtitle:
            "Скидка 15% на тариф Завтрак включен по программе лояльности РЖД",
        imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/IMG_2937-1.avif",
        bookingUrl:
            "/booking?hotel_id=41018&be-offer=5110963&promo-code-plain=rzd",
    },
    {
        title: "Командировка",
        subtitle:
            "Специальные привилегии для именинников и скидка 15% от 2 ночей",
        imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/23-1.avif",
        bookingUrl:
            "/booking?hotel_id=41018&be-offer=5110976&promo-code-plain=work",
    },
    {
        title: "Свадебное предложение",
        subtitle:
            "Свадебное предложение ACADEMIA — это гармония исторических интерьеров и безупречного сервиса",
        imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/de060397c259e575a407debaece3e14e28a085ef.jpg",
        bookingUrl:
            "/booking?hotel_id=41018&be-offer=51109110&promo-code-plain=wedding",
    },
    {
        title: "Семейное путешествие",
        subtitle: "Семейная поездка - маленькое приключение для всех",
        imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/1fb679af26b0660b3995ee5ffe668aca8196c3dd-1.avif",
        bookingUrl:
            "/booking?hotel_id=41018&be-offer=611613&promo-code-plain=family",
    },
];
