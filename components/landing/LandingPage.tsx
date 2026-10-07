import type { LandingDictionary } from "@/data/landing";

/**
 * Тело лендинга. Секции из ТЗ собираются здесь по порядку; каждая читает
 * свою часть словаря и пропускается, если на языке её нет.
 */
export default function LandingPage({ dict }: { dict: LandingDictionary }) {
    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-brand-light px-4 text-center">
            <h1 className="font-history text-4xl text-brand-brown md:text-6xl">
                {dict.hero.title}
            </h1>
            <p className="max-w-xl text-lg text-brand-brown/80">
                {dict.hero.subtitle}
            </p>
        </section>
    );
}
