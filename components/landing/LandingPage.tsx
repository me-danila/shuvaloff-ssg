import { LANDING_HERO_ATTR } from "@/components/landing/constants";
import HeroFullscreen from "@/components/sections/HeroFullscreen";
import type { LandingDictionary } from "@/data/landing";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/site";

/**
 * Тело лендинга. Секции из ТЗ собираются здесь по порядку; каждая читает
 * свою часть словаря и пропускается, если на языке её нет.
 */
export default function LandingPage({ dict }: { dict: LandingDictionary }) {
    return (
        <>
            {/* Временный hero (HeroFullscreen) — до ТЗ на первый экран. */}
            <div {...{ [LANDING_HERO_ATTR]: "" }}>
                <HeroFullscreen
                    title={dict.hero.title}
                    description={dict.hero.subtitle}
                    image={{ src: DEFAULT_OG_IMAGE, alt: dict.hero.title }}
                    gradient
                />
            </div>
            {/* Заглушка под следующие секции — чтобы было куда скроллить. */}
            <section className="min-h-screen bg-brand-light" />
        </>
    );
}
