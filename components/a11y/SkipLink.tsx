"use client";

import type { Locale } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

const SKIP_LINK_LABEL: Record<Locale, string> = {
    ru: "Перейти к основному содержанию",
    en: "Skip to main content",
};

/**
 * Скип-линк для доступности: первый фокусируемый элемент страницы.
 * Визуально скрыт (сдвинут за верхнюю кромку вьюпорта) и появляется только
 * при получении фокуса с клавиатуры — для пользователя мыши ничего не меняется.
 */
export default function SkipLink() {
    const locale = useLocale();

    return (
        <a
            href="#main-content"
            className="fixed left-4 top-4 z-[100] -translate-y-[200%] rounded-md bg-white px-4 py-2.5 text-sm font-medium text-brand-brown shadow-lg transition-transform duration-200 focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2"
        >
            {SKIP_LINK_LABEL[locale]}
        </a>
    );
}
