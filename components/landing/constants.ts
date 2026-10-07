/** Метка hero-блока лендинга: пока он под хедером, хедер прозрачный. */
export const LANDING_HERO_ATTR = "data-landing-hero" as const;

/**
 * Якорь кнопок Book: секция модуля бронирования (components/sections/
 * BookingForm). В DOM всегда одна — десктопная в hero или мобильная под ним.
 */
export const LANDING_BOOKING_ANCHOR = "#block-search";

/** Круглые стрелки листалок — как у «Категорий номеров» на главной. */
export const LANDING_ARROW_CLASS =
    "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white disabled:pointer-events-none disabled:opacity-40";
