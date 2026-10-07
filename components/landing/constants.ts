/** Метка hero-блока лендинга: пока он под хедером, хедер прозрачный. */
export const LANDING_HERO_ATTR = "data-landing-hero" as const;

/**
 * Круглые стрелки листалок на белом фоне — как в «Мире ACADEMIA» на главной
 * (номера и слайдер «История / Локация»).
 */
export const LANDING_ARROW_CLASS =
    "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors duration-300 hover:bg-stone-200 active:bg-[#5c1f26] active:text-white";

/**
 * WhatsApp отеля для блока «Контакты».
 * TODO: временно основной номер — заменить на номер WhatsApp от отеля.
 */
export const LANDING_WHATSAPP = {
    href: "https://wa.me/78125659650",
};

/**
 * Карта Google. Отеля в Google Maps нет; по названию находится ACADEMIA BAR
 * SHUVALOFF в том же здании — оставляем его как ориентир. Когда отель
 * заведут (Google Business Profile), искать по названию отеля.
 */
export const LANDING_MAP_QUERY =
    "ACADEMIA BAR SHUVALOFF, Mokhovaya St 10, Saint Petersburg";
