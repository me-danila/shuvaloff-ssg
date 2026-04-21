"use client";

import Button from "@/components/ui/Button";
import { type Locale, localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

const copyByLocale = {
    ru: {
        title: "Страница не найдена",
        description: "Возможно, она была перемещена или удалена",
        cta: "Вернуться на главную",
    },
    en: {
        title: "Page not found",
        description: "It may have been moved or removed",
        cta: "Back to homepage",
    },
} as const;

export default function NotFoundPage({ locale }: { locale?: Locale }) {
    const currentLocale = useLocale();
    const effectiveLocale = locale ?? currentLocale;
    const copy = copyByLocale[effectiveLocale];

    return (
        <main className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
            <p className="text-8xl xl:text-[160px] font-baskerville text-stone-200 leading-none select-none">
                404
            </p>
            <div className="flex flex-col gap-2 -mt-4">
                <h1 className="text-2xl xl:text-3xl">{copy.title}</h1>
                <p className="text-warm-gray">{copy.description}</p>
            </div>
            <Button
                href={localizeHref("/", effectiveLocale)}
                variant="primary"
                size="xl"
            >
                {copy.cta}
            </Button>
        </main>
    );
}
