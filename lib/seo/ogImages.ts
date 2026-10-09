/**
 * og:image, отличные от картинки на самой странице. Нужны там, где основная
 * картинка не подходит для превью ссылок: AVIF (Telegram, VK, Facebook и
 * WhatsApp его не показывают) или файл тяжелее ~5 МБ. Ключ — путь без
 * локали, поэтому RU и EN получают одну и ту же картинку.
 */
export const OG_IMAGE_OVERRIDES: Record<string, string> = {
    "/rooms/historical/dashkova/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/16__MMI0825_018_maxiimov-2.jpg",
    "/rooms/historical/shuvalov/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/sh1-2-2.jpg",
    "/rooms/standard/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/s1-2-2.jpg",
    "/rooms/suite/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/1-2-3-2.jpg",
    "/rooms/junior-suite/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/1-1-2-2.jpg",
    "/services/pillows/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/713adf1b0e6e935c524fc580d30892f328630057-3-2.jpg",
    "/services/early-checkin/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/f985ce27a1e8c0fc23d3f9ecceb8a43016565c4a-2-2.jpg",
    "/services/wine-set/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_5216-1-2-2-2.jpg",
    "/services/late-checkout/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/01d9eae6eceabd4c20d6304e8502e38b55cda58e-2-2.jpg",
    "/services/breakfast/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/20c4e203934b0b058e0e7ddd774d2fb2a841fdc3-3-2.jpg",
    "/services/welcome-set/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_5118-1-2-2-2-2-2.jpg",
    "/rooms/superior/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/639123775864187363-a67875c7-669c-4414-b429-95e63a2f9994.jpg",
    "/rooms/superior-mansarda/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/MMI2373_maxiimov-scaled.jpg",
    "/rooms/junior-suite-mansarda/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/MMI2375_maxiimov.jpg",
    "/services/aristocratic-breakfast-in-room/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_8457-1.jpg",
    "/services/birthday/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/bar4-1-1.jpg",
    "/services/cake/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/bar4-1-1.jpg",
    "/services/history-trip/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/exc-shuvaloff.jpg",
    "/services/kids/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/1fb679af26b0660b3995ee5ffe668aca8196c3dd-1.jpg",
    "/services/kids-breakfast/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/ChatGPT-Image-6-%D0%B0%D0%B2%D0%B3.-2026-%D0%B3.-10_56_42.jpg",
    "/services/luggage/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_2163.jpg",
    "/services/romantic/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_0162-2-1.jpg",
    "/events/count-dinner-benois/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/%D0%93%D1%80%D0%B0%D1%84%D1%81%D0%BA%D0%B8%D0%B9-%D1%83%D0%B6%D0%B8%D0%BD_1-1-scaled-1.jpg",
    "/blog/autumn-spb/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/fasad.jpg",
    "/blog/boat-tours/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_7080.jpg",
    "/blog/corporate-events/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/bar-shuvaloff-4.jpg",
    "/blog/gift/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/639123775868786994-4fd7b27c-22f1-4996-a91c-4e3c2d116ba7.jpg",
    "/blog/with-childs/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/1fb679af26b0660b3995ee5ffe668aca8196c3dd-1-2.jpg",
    "/blog/with-pets/":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_6497-1-scaled.jpg",
};

/**
 * Лёгкие JPG-версии картинок, которые страницы передают в ogImage. Ключ —
 * исходный URL в раскодированном виде, так что новые страницы с той же
 * картинкой (например, следующий месяц события) получают замену сами.
 */
const OG_IMAGE_REPLACEMENTS: Record<string, string> = {
    "https://academia.spb.ru/wp-content/uploads/2026/03/37c26c1c38aff8084c3dfe563c38d9371018eebe.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/37c26c1c38aff8084c3dfe563c38d9371018eebe.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_2064-1.jpg":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_2064-1-2.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_5179-1-2.jpg":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_5179-1-2-2-scaled.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/IMG_9662-1.jpg":
        "https://academia.spb.ru/wp-content/uploads/2026/10/IMG_9662-1-2.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/Доходный-дом.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/%D0%94%D0%BE%D1%85%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BC.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/Масонский-Петербург.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/%D0%9C%D0%B0%D1%81%D0%BE%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/Одна-ночь-в-Петербурге-1899.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/%D0%9E%D0%B4%D0%BD%D0%B0-%D0%BD%D0%BE%D1%87%D1%8C-%D0%B2-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D0%B5-1899.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/Роспись-Афиша.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/%D0%A0%D0%BE%D1%81%D0%BF%D0%B8%D1%81%D1%8C-%D0%90%D1%84%D0%B8%D1%88%D0%B0.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/без-улыбок-с-шуваловым-копия-1.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/%D0%B1%D0%B5%D0%B7-%D1%83%D0%BB%D1%8B%D0%B1%D0%BE%D0%BA-%D1%81-%D1%88%D1%83%D0%B2%D0%B0%D0%BB%D0%BE%D0%B2%D1%8B%D0%BC-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-1.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/09/ChatGPT-Image-23-сент.-2026-г.-18_03_20.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/ChatGPT-Image-23-%D1%81%D0%B5%D0%BD%D1%82.-2026-%D0%B3.-18_03_20.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/09/meet-3.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/meet-3.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/09/горизонталь-1.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/%D0%B3%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%BD%D1%82%D0%B0%D0%BB%D1%8C-1.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/09/ужин-темнее.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/%D1%83%D0%B6%D0%B8%D0%BD-%D1%82%D0%B5%D0%BC%D0%BD%D0%B5%D0%B5.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/10/Вечерняя_лекция_в_старинном_салоне_2.png":
        "https://academia.spb.ru/wp-content/uploads/2026/10/%D0%92%D0%B5%D1%87%D0%B5%D1%80%D0%BD%D1%8F%D1%8F_%D0%BB%D0%B5%D0%BA%D1%86%D0%B8%D1%8F_%D0%B2_%D1%81%D1%82%D0%B0%D1%80%D0%B8%D0%BD%D0%BD%D0%BE%D0%BC_%D1%81%D0%B0%D0%BB%D0%BE%D0%BD%D0%B5_2.jpg",
};

const safeDecode = (url: string): string => {
    try {
        return decodeURI(url);
    } catch {
        return url;
    }
};

export const resolveOgImage = (
    path: string,
    pageImage?: string,
): string | undefined =>
    OG_IMAGE_OVERRIDES[path] ??
    (pageImage
        ? (OG_IMAGE_REPLACEMENTS[safeDecode(pageImage)] ?? pageImage)
        : undefined);
