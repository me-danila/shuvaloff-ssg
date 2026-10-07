"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
    LANDING_BOOKING_ANCHOR,
    LANDING_HERO_ATTR,
} from "@/components/landing/constants";
import {
    menuItemVariants,
    menuListVariants,
    OVERLAY_TRANSITION,
    overlayVariants,
    PANEL_TRANSITION,
} from "@/components/layout/menuMotion";
import BurgerButton from "@/components/ui/BurgerButton";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/OptimizedImage";
import { LANDING_LANGUAGE_NAMES, type LandingDictionary } from "@/data/landing";
import { LANDING_LOCALES, LANDING_PATHS } from "@/lib/i18n/routing";

const MOBILE_MENU_ID = "landing-mobile-menu";

/** Выпадающая панель: съезжает вниз из-под хедера. */
const dropdownVariants = {
    hidden: { y: -16, opacity: 0 },
    show: { y: 0, opacity: 1 },
    exit: { y: -12, opacity: 0 },
};

/**
 * Хедер лендинга: зафиксирован; поверх hero — прозрачный (градиент и белые
 * лого/текст, как у основного хедера на главной), после ухода hero из-под
 * хедера — непрозрачный белый.
 *
 * Десктоп (lg+): лого | навигация по секциям | языки + Book.
 * Мобила: лого | Book now (с началом скролла) + бургер; навигация и
 * языки — в выпадающем меню
 * (панель, оверлей и анимация пунктов — как у мобильного меню основного
 * хедера). Переключатель ведёт только между лендингами (EN → /en/visit/).
 */
export default function LandingHeader({ dict }: { dict: LandingDictionary }) {
    const headerRef = useRef<HTMLElement>(null);
    // SSR и первый кадр — поверх hero: лендинг всегда начинается с него.
    const [overHero, setOverHero] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    // Тот же порог, что у основного хедера (components/layout/Header).
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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

    // Открытое меню: блокируем скролл страницы, Esc закрывает.
    useEffect(() => {
        if (!menuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);
    // С открытым меню хедер всегда светлый: панель белая, градиент над ней
    // смотрелся бы обрывком.
    const isTransparent = overHero && !menuOpen;

    return (
        <>
            <header
                ref={headerRef}
                className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
                    isTransparent
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
                                isTransparent ? "brightness-0 invert" : ""
                            }`}
                        />
                    </a>
                    <nav
                        aria-label={dict.ui.navLabel}
                        className="hidden lg:block"
                    >
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
                    <div className="flex items-center justify-self-end gap-5 lg:gap-6">
                        <nav
                            aria-label={dict.ui.languageSwitcherLabel}
                            className="hidden lg:block"
                        >
                            <LanguageLinks
                                current={dict.locale}
                                className="gap-3"
                            />
                        </nav>
                        {/* Видимость — обёртками: `inline-flex` из базы
                            Button перебивает `hidden` на самой кнопке. */}
                        {/* Мобила: кнопка проявляется с началом скролла —
                            порог и анимация как у «Забронировать» в основном
                            хедере. До этого inert: не ловит клики и фокус. */}
                        <div
                            inert={!scrolled}
                            className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
                                scrolled
                                    ? "translate-y-0 opacity-100"
                                    : "pointer-events-none translate-y-1 opacity-0"
                            }`}
                        >
                            <Button
                                href={LANDING_BOOKING_ANCHOR}
                                variant="primary"
                                size="xs"
                            >
                                {dict.ui.bookNow}
                            </Button>
                        </div>
                        <div className="hidden lg:block">
                            <Button
                                href={LANDING_BOOKING_ANCHOR}
                                variant="primary"
                                size="xs"
                            >
                                {dict.ui.book}
                            </Button>
                        </div>
                        <BurgerButton
                            onClick={() => setMenuOpen((open) => !open)}
                            label={
                                menuOpen ? dict.ui.closeMenu : dict.ui.openMenu
                            }
                            expanded={menuOpen}
                            controls={MOBILE_MENU_ID}
                            className="lg:hidden"
                        />
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        <m.button
                            type="button"
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            variants={overlayVariants}
                            transition={OVERLAY_TRANSITION}
                            className="fixed inset-0 z-50 cursor-default bg-[rgba(14,18,24,0.24)] backdrop-blur-[3px] lg:hidden"
                            onClick={closeMenu}
                            aria-label={dict.ui.closeMenu}
                        />
                        <m.div
                            id={MOBILE_MENU_ID}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            variants={dropdownVariants}
                            transition={PANEL_TRANSITION}
                            className="fixed inset-x-0 top-16 z-[55] max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-b-lg border-b border-stone-100/80 bg-white/95 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:hidden"
                        >
                            <m.nav
                                aria-label={dict.ui.navLabel}
                                variants={menuListVariants}
                                initial="hidden"
                                animate="show"
                                className="flex flex-col px-6 py-3"
                            >
                                {dict.ui.nav.map((item) => (
                                    <m.div
                                        key={item.href}
                                        variants={menuItemVariants}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={closeMenu}
                                            className="block py-3 text-sm uppercase text-brand-brown transition-colors hover:text-brand-brown"
                                        >
                                            {item.label}
                                        </a>
                                    </m.div>
                                ))}
                            </m.nav>
                            <nav
                                aria-label={dict.ui.languageSwitcherLabel}
                                className="border-t border-stone-100/80 px-6 py-4 text-brand-brown"
                            >
                                <LanguageLinks
                                    current={dict.locale}
                                    className="gap-5"
                                />
                            </nav>
                        </m.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function LanguageLinks({
    current,
    className,
}: {
    current: LandingDictionary["locale"];
    className: string;
}) {
    return (
        <ul className={`flex items-center text-sm uppercase ${className}`}>
            {LANDING_LOCALES.map((l) => (
                <li key={l}>
                    <a
                        href={LANDING_PATHS[l]}
                        hrefLang={l}
                        lang={l}
                        title={LANDING_LANGUAGE_NAMES[l]}
                        aria-current={l === current ? "page" : undefined}
                        className={`font-medium ${l === current ? "" : "opacity-80 hover:opacity-100"}`}
                    >
                        {l}
                    </a>
                </li>
            ))}
        </ul>
    );
}
