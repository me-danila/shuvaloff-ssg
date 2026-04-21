import type { Locale } from "@/lib/i18n/routing";

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

export const AllSales: Record<Locale, Sale[]> = {
    ru: [
        {
            title: "Графский Петербург",
            subtitle:
                "Особый отдых в формате пышных аристократических традиций",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/04/Frame-3.png",
            bookingUrl: "/booking?&be-offer=910895",
        },
        {
            title: "Промокод GENIUS",
            subtitle: "Получите бонус при первом бронировании на сайте",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/a05a9ff67a6d51f6afd4cb1ef1e2cbdff77fdc6f-1.avif",
            bookingUrl: "/booking/?promo-code-plain=genius",
        },
        {
            title: "Длительное проживание",
            subtitle: "Скидка 20% на проживание от 5 ночей",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_1062.avif",
            bookingUrl: "/booking?be-offer=588673",
        },
        {
            title: "День рождения",
            subtitle:
                "Специальные привилегии для именинников и скидка 15% от 2 ночей",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/hbd.avif",
            bookingUrl: "/booking/?be-offer=588931&promo-code-plain=birthday",
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
            bookingUrl: "/booking?promo-code-plain=rzd",
        },
        {
            title: "Командировка",
            subtitle:
                "Специальные привилегии для бизнес-путешественников и скидка 15% от 2 ночей",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/23-1.avif",
            bookingUrl: "/booking?be-offer=588976&promo-code-plain=work",
        },
        {
            title: "Свадебное предложение",
            subtitle:
                "Свадебное предложение ACADEMIA — это гармония исторических интерьеров и безупречного сервиса",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/de060397c259e575a407debaece3e14e28a085ef.jpg",
            bookingUrl: "/booking?be-offer=588988&promo-code-plain=wedding",
        },
        {
            title: "Семейное путешествие",
            subtitle: "Семейная поездка - маленькое приключение для всех",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/1fb679af26b0660b3995ee5ffe668aca8196c3dd-1.avif",
            bookingUrl:
                "/booking?hotel_id=41018&be-offer=611613&promo-code-plain=family",
        },
    ],
    en: [
        {
            title: "Aristocratic St. Petersburg",
            subtitle:
                "A unique getaway steeped in opulent aristocratic traditions",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/04/Frame-3.png",
            bookingUrl: "/booking?&be-offer=910895",
        },
        {
            title: "GENIUS Promocode",
            subtitle: "Get a bonus on your first booking on our website",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/a05a9ff67a6d51f6afd4cb1ef1e2cbdff77fdc6f-1.avif",
            bookingUrl: "/booking/?promo-code-plain=genius",
        },
        {
            title: "Long Stay Offer",
            subtitle: "20% discount for stays of 5 nights or more",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_1062.avif",
            bookingUrl: "/booking?be-offer=588673",
        },
        {
            title: "Birthday Offer",
            subtitle:
                "Special privileges for birthday guests and 15% discount for stays of 2 nights or more",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/hbd.avif",
            bookingUrl: "/booking/?be-offer=588931&promo-code-plain=birthday",
        },
        {
            title: "YOUR WEEKEND AS ART",
            subtitle: "A special format where your weekend becomes a ceremony",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_0279-2-1.avif",
            bookingUrl: "/booking/?&be-offer=804866",
        },
        {
            title: "RZD Bonus",
            subtitle:
                "15% discount on Breakfast Included rate via RZD loyalty program",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/IMG_2937-1.avif",
            bookingUrl: "/booking?promo-code-plain=rzd",
        },
        {
            title: "Business Trip",
            subtitle:
                "Special privileges for business travelers and 15% discount for stays of 2 nights or more",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/23-1.avif",
            bookingUrl: "/booking?be-offer=588976&promo-code-plain=work",
        },
        {
            title: "Wedding Offer",
            subtitle:
                "ACADEMIA wedding offer is a harmony of historical interiors and impeccable service",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/de060397c259e575a407debaece3e14e28a085ef.jpg",
            bookingUrl: "/booking?be-offer=588988&promo-code-plain=wedding",
        },
        {
            title: "Family Journey",
            subtitle: "A family trip is a little adventure for everyone",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/1fb679af26b0660b3995ee5ffe668aca8196c3dd-1.avif",
            bookingUrl:
                "/booking?hotel_id=41018&be-offer=611613&promo-code-plain=family",
        },
    ],
};
