import type { Locale } from "@/lib/i18n/routing";

export const SITE_URL = "https://academia-shuvaloff.ru";
export const SITE_NAME = "ACADEMIA Особняк Шувалова";
export const SITE_NAME_EN = "ACADEMIA Mansion Shuvaloff";
export const DEFAULT_OG_IMAGE =
    "https://academia.spb.ru/wp-content/uploads/2026/04/Frame-2.png";

export const HOTEL_ADDRESS = {
    streetAddress: "Моховая ул., д. 10, стр. 1",
    streetAddressEn: "10 Mokhovaya St, bldg. 1",
    addressLocality: "Санкт-Петербург",
    addressLocalityEn: "Saint Petersburg",
    postalCode: "191028",
    addressCountry: "RU",
};

export const HOTEL_CONTACTS = {
    telephone: "+7-812-565-96-50",
    telephoneDisplay: "+7 (812) 565-96-50",
    email: "reservation@academia.spb.ru",
    legalEmail: "legal@academia-suites.ru",
};

export const HOTEL_GEO = {
    latitude: 59.945058,
    longitude: 30.345467,
};

export const SOCIAL_LINKS = [
    "https://t.me/academia_land_hotels",
    "https://vk.com/academia.hotels",
    "https://dzen.ru/id/68d159b4a453c61d666c47fb",
];

export const HOTEL_LEGAL = {
    legalName: 'ООО "ОТЕЛЬ АКАДЕМИЯ ОСОБНЯК ШУВАЛОВА"',
    taxID: "7840109542",
    vatID: "1237800123967",
};

export const BOOKING_URL = `${SITE_URL}/booking/`;

export const getSiteName = (locale: Locale) =>
    locale === "en" ? SITE_NAME_EN : SITE_NAME;

export const getLocalizedPath = (path: string, locale: Locale) => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    if (locale === "ru") {
        return normalized;
    }

    if (normalized === "/") {
        return "/en/";
    }

    return normalized.startsWith("/en/") ? normalized : `/en${normalized}`;
};

export const getAbsoluteUrl = (path: string, locale?: Locale) => {
    const pathname = locale ? getLocalizedPath(path, locale) : path;
    return new URL(pathname, SITE_URL).toString();
};
