import type { LandingLocale } from "@/lib/i18n/routing";

/**
 * Словарь лендинга. Один шаблон (components/landing) на все языки — язык
 * отличается только этим объектом. Новые секции из ТЗ добавляются сюда
 * полями; необязательное поле = секция на этом языке не выводится
 * (так EN-лендинг получает блок про визы, а остальные — нет).
 */
export type LandingDictionary = {
    locale: LandingLocale;
    /** Пока тексты не утверждены: noindex, вне sitemap/llms. */
    draft: boolean;
    meta: {
        title: string;
        description: string;
        ogImage?: string;
    };
    ui: {
        skipLink: string;
        languageSwitcherLabel: string;
        navLabel: string;
        book: string;
        /** Кнопка бронирования в мобильном хедере. */
        bookNow: string;
        menuLabel: string;
        openMenu: string;
        closeMenu: string;
        /** Навигация по секциям лендинга (якоря: #rooms, #history, …). */
        nav: { label: string; href: `#${string}` }[];
    };
    hero: {
        title: string;
        subtitle: string;
    };
};
