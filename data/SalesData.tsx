import type { Locale } from "@/lib/i18n/routing";

export type SaleLink = {
    label: string;
    href: string;
};

export type Sale = {
    title: string;
    subtitle: string;
    imgUrl: string;
    imgObjectPosition?: string;
    bookingUrl: string;
    actionType?: "booking" | "details";
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
            title: "ВАШ ВЫХОДНОЙ КАК ИСКУССТВО",
            subtitle:
                "Особый формат, в котором выходной день становится церемонией",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_9164-2.jpg",
            bookingUrl: "/booking/?&be-offer=804866",
        },
        {
            title: "День рождения",
            subtitle:
                "Специальные привилегии для именинников и скидка 15% от 2 ночей",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/hbd.avif",
            bookingUrl: "/booking/?be-offer=588931&promo-code-plain=birthday",
        },
        {
            title: "Свадебное предложение",
            subtitle:
                "Свадебное предложение ACADEMIA — это гармония исторических интерьеров и безупречного сервиса",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/AP_162.jpg",
            bookingUrl: "/booking?be-offer=588988&promo-code-plain=wedding",
        },
        {
            title: "Аэрофлот Бонус",
            subtitle:
                "Отдыхайте в особняке Шувалова и копите мили «Аэрофлот Бонус»! До 1 000 миль за каждую ночь проживания",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_9448-ГОРИЗОНТАЛЬ.jpg",
            imgObjectPosition: "center top",
            bookingUrl: "/sales/aeroflot/",
            actionType: "details",
        },
        {
            title: "Промокод GENIUS",
            subtitle:
                "Получите бонус при первом бронировании на сайте. Гарантия лучшей цены",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/a05a9ff67a6d51f6afd4cb1ef1e2cbdff77fdc6f-1.avif",
            bookingUrl: "/booking/?promo-code-plain=genius",
        },
        {
            title: "Длительное проживание",
            subtitle:
                "Скидка 20% при бронировании от 5 ночей. Скидка 15% на проживание в сентябре",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_1062.avif",
            bookingUrl: "/booking?be-offer=588673",
        },
        {
            title: "Раннее бронирование",
            subtitle:
                "Планируйте поездку заранее от 3 ночей с сентября по декабрь скидка от 15%",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/stay.avif",
            bookingUrl: "/booking?be-offer=588665",
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
                "Рабочая поездка, где о вас уже позаботились. Ранний заезд, питание полупансион в ресторане отеля",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_9300-ГОРИЗОНТАЛЬ.jpg",
            imgObjectPosition: "center top",
            bookingUrl: "/booking?be-offer=588976&promo-code-plain=work",
        },
        {
            title: "Семейное путешествие",
            subtitle:
                "Семейная поездка — маленькое приключение для всех. По промокоду FAMILY мы сделаем ваше путешествие еще теплее и комфортнее",
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
            title: "YOUR WEEKEND AS ART",
            subtitle: "A special format where your weekend becomes a ceremony",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_9164-2.jpg",
            bookingUrl: "/booking/?&be-offer=804866",
        },
        {
            title: "Birthday Offer",
            subtitle:
                "Special privileges for birthday guests and 15% discount for stays of 2 nights or more",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/hbd.avif",
            bookingUrl: "/booking/?be-offer=588931&promo-code-plain=birthday",
        },
        {
            title: "Wedding Offer",
            subtitle:
                "ACADEMIA wedding offer is a harmony of historical interiors and impeccable service",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/AP_162.jpg",
            bookingUrl: "/booking?be-offer=588988&promo-code-plain=wedding",
        },
        {
            title: "Aeroflot bonus",
            subtitle:
                "Relax at the Shuvalov Mansion and earn Aeroflot Bonus miles! Up to 1,000 miles for every night's stay.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_9448-ГОРИЗОНТАЛЬ.jpg",
            imgObjectPosition: "center top",
            bookingUrl: "/sales/aeroflot/",
            actionType: "details",
        },
        {
            title: "GENIUS Promocode",
            subtitle:
                "Get a bonus on your first booking on the site. Best price guarantee",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/a05a9ff67a6d51f6afd4cb1ef1e2cbdff77fdc6f-1.avif",
            bookingUrl: "/booking/?promo-code-plain=genius",
        },
        {
            title: "Long Stay Offer",
            subtitle:
                "20% off when booking 5 nights or more. 15% off September stays",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_1062.avif",
            bookingUrl: "/booking?be-offer=588673",
        },
        {
            title: "Early Booking",
            subtitle:
                "Plan your trip in advance for a stay of 3 nights or more from September through December to receive a discount of 15% or more",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/stay.avif",
            bookingUrl: "/booking?be-offer=588665",
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
                "A business trip where you're already taken care of. Early check-in, half-board meals in the hotel restaurant",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_9300-ГОРИЗОНТАЛЬ.jpg",
            imgObjectPosition: "center top",
            bookingUrl: "/booking?be-offer=588976&promo-code-plain=work",
        },
        {
            title: "Family Journey",
            subtitle:
                "A family trip is a little adventure for everyone. Use the promo code FAMILY, and we’ll make your trip even cozier and more comfortable",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/1fb679af26b0660b3995ee5ffe668aca8196c3dd-1.avif",
            bookingUrl:
                "/booking?hotel_id=41018&be-offer=611613&promo-code-plain=family",
        },
    ],
};
