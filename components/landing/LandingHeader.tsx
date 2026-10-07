"use client";

import { useEffect, useRef, useState } from "react";
import { LANDING_HERO_ATTR } from "@/components/landing/constants";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/OptimizedImage";
import { LANDING_LANGUAGE_NAMES, type LandingDictionary } from "@/data/landing";
import { LANDING_LOCALES, LANDING_PATHS } from "@/lib/i18n/routing";

/**
 * Хедер лендинга: зафиксирован; поверх hero — прозрачный (градиент и белые
 * лого/текст, как у основного хедера на главной), после ухода hero из-под
 * хедера — непрозрачный белый. Переключатель ведёт только между лендингами
 * (EN → /en/visit/, не на полный /en/).
 */
export default function LandingHeader({ dict }: { dict: LandingDictionary }) {
    const headerRef = useRef<HTMLElement>(null);
    // SSR и первый кадр — поверх hero: лендинг всегда начинается с него.
    const [overHero, setOverHero] = useState(true);

    useEffect(() => {
        const hero = document.querySelector(`[${LANDING_HERO_ATTR}]`);
        const header = headerRef.current;
        if (!hero || !header) {
            setOverHero(false);
            return;
        }

        // Hero «под хедером», пока его низ ниже нижней кромки хедера.
        const observer = new IntersectionObserver(
            ([entry]) => setOverHero(entry.isIntersecting),
            { rootMargin: `-${header.offsetHeight}px 0px 0px 0px` },
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    return (
        <header
            ref={headerRef}
            className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
                overHero
                    ? "bg-linear-to-b from-black/80 via-black/60 to-transparent text-white"
                    : "bg-white text-brand-brown shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            }`}
        >
            {/* Три колонки: лого | навигация по центру | языки + кнопка. */}
            <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 md:px-8 lg:grid-cols-[1fr_auto_1fr]">
                <a
                    href={LANDING_PATHS[dict.locale]}
                    className="justify-self-start"
                >
                    <Image
                        src="/logo.svg"
                        alt="ACADEMIA Mansion Shuvaloff"
                        width={130}
                        height={33}
                        className={`transition-all duration-300 ${
                            overHero ? "brightness-0 invert" : ""
                        }`}
                    />
                </a>
                <nav aria-label={dict.ui.navLabel} className="hidden lg:block">
                    <ul className="flex items-center gap-10">
                        {dict.ui.nav.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="whitespace-nowrap text-sm font-semibold uppercase transition-opacity duration-200 hover:opacity-70"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center justify-self-end gap-6">
                    <nav aria-label={dict.ui.languageSwitcherLabel}>
                        <ul className="flex items-center gap-3 text-sm uppercase">
                            {LANDING_LOCALES.map((l) => (
                                <li key={l}>
                                    <a
                                        href={LANDING_PATHS[l]}
                                        hrefLang={l}
                                        lang={l}
                                        title={LANDING_LANGUAGE_NAMES[l]}
                                        aria-current={
                                            l === dict.locale
                                                ? "page"
                                                : undefined
                                        }
                                        className={`font-medium ${l === dict.locale ? "" : "opacity-80 hover:opacity-100"}`}
                                    >
                                        {l}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Button
                        href="#booking"
                        variant="primary"
                        size="xs"
                        className="hidden sm:inline-flex"
                    >
                        {dict.ui.book}
                    </Button>
                </div>
            </div>
        </header>
    );
}
