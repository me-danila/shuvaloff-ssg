"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import Button from "@/components/ui/Button";
import { GENTLE_EASE } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SocialLinks from "@/components/ui/SocialLinks";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type NavItem = {
    label: string;
    href: string;
    target?: "_blank";
    lineBelow?: boolean;
    submenu?: { label: string; href: string }[];
};

type SubNavItem = {
    label: string;
    href: string;
    target?: "_blank";
};

const navItems: NavItem[] = [
    {
        label: "Отель",
        href: "/",
        submenu: [
            { label: "Категории номеров", href: "/rooms/" },
            { label: "Исторические люксы", href: "/rooms/historical/" },
            { label: "Специальные предложения", href: "/sales/" },
            { label: "Программа привилегий", href: "/rewards/" },
            { label: "Консьерж-сервис", href: "/services/concierge/" },
            { label: "Дополнительные услуги", href: "/services/" },
        ],
    },
    {
        label: "Бутик-ресторан",
        href: "https://shuvaloff.academia-rest.ru/?utm_source=hotels",
        target: "_blank",
    },
    {
        label: "СПА",
        href: "https://academia-spa.ru/?utm_source=hotels",
        target: "_blank",
    },
    {
        label: "История особняка",
        href: "/history/",
    },
    {
        label: "Свадьба в особняке",
        href: "https://shuvaloff.academia-rest.ru/wedding?utm_source=hotels",
        target: "_blank",
        lineBelow: true,
    },
    // { label: "Бутик-магазин", href: "/shop" },
    {
        label: "Подарочные сертификаты",
        href: "/?cert-open=42761",
        target: "_blank",
    },
];

const subNavItems: SubNavItem[] = [
    { label: "Категории номеров", href: "/rooms/" },
    { label: "Исторические люксы", href: "/rooms/historical/" },
    { label: "Специальные предложения", href: "/sales/" },
    { label: "Программа привилегий", href: "/rewards/" },
    {
        label: "Ресторан",
        href: "https://shuvaloff.academia-rest.ru/?utm_source=hotels",
        target: "_blank" as const,
    },
];

const OVERLAY_TRANSITION = {
    duration: 0.32,
    ease: GENTLE_EASE,
} as const;

const PANEL_TRANSITION = {
    duration: 0.58,
    ease: GENTLE_EASE,
} as const;

const overlayVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
};

const mobilePanelVariants = {
    hidden: { x: "-100%", opacity: 0.92, scale: 0.985 },
    show: { x: 0, opacity: 1, scale: 1 },
    exit: { x: "-100%", opacity: 0.96, scale: 0.99 },
};

const desktopPanelVariants = {
    hidden: { x: -56, opacity: 0, scale: 0.97 },
    show: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -40, opacity: 0, scale: 0.985 },
};

const submenuPanelVariants = {
    hidden: { x: -18, opacity: 0, scale: 0.98 },
    show: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -12, opacity: 0, scale: 0.985 },
};

const menuListVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.055,
            delayChildren: 0.08,
        },
    },
};

const menuItemVariants = {
    hidden: { opacity: 0, x: -18 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.42,
            ease: GENTLE_EASE,
        },
    },
};

const submenuListVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.07,
        },
    },
};

const submenuItemVariants = {
    hidden: { opacity: 0, x: -10, y: 10 },
    show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.42,
            ease: GENTLE_EASE,
        },
    },
};

const mobileSubmenuVariants = {
    closed: {
        height: 0,
        opacity: 0,
        y: -6,
        transition: {
            duration: 0.26,
            ease: GENTLE_EASE,
        },
    },
    open: {
        height: "auto",
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.34,
            ease: GENTLE_EASE,
        },
    },
};

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [menuOpen]);

    const closeMenu = () => {
        flushSync(() => {
            setSubmenuOpen(false);
        });
        setMenuOpen(false);
    };

    const isLight = !scrolled;
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    return (
        <>
            <div className={`h-24 ${isHome ? "xl:h-28" : "xl:h-36"}`} />

            <motion.header
                initial={isDesktop ? { y: -20, opacity: 0 } : false}
                animate={isDesktop ? { y: 0, opacity: 1 } : false}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 xl:pb-4 ${
                    isLight
                        ? "bg-white"
                        : "bg-linear-to-b from-black/80 via-black/60 to-transparent"
                }`}
            >
                <div className="flex items-center h-14 px-5 xl:px-8 relative xl:h-20">
                    <div className="flex items-center gap-12">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            className={`hidden xl:flex flex-col gap-1.5 cursor-pointer transition-colors duration-300 ${
                                isLight ? "text-stone-700" : "text-white"
                            }`}
                            aria-label="Открыть меню"
                        >
                            <span className="block w-5 h-px bg-current" />
                            <span className="block w-5 h-px bg-current" />
                        </button>
                        <div
                            className={`flex items-center gap-2 text-xs tracking-wider transition-colors duration-300 ${
                                isLight ? "text-[#96908D]" : "text-white/70"
                            }`}
                        >
                            <span
                                className={`font-medium ${isLight ? "text-brand-blue" : "text-white"}`}
                            >
                                RU
                            </span>
                            <span>ENG</span>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="absolute left-1/2 -translate-x-1/2"
                    >
                        <Image
                            src="/logo.svg"
                            alt="ACADEMIA Особняк Шувалова"
                            width={150}
                            height={38}
                            priority
                            className={`transition-all duration-300 ${
                                isLight ? "" : "brightness-0 invert"
                            }`}
                        />
                    </Link>

                    <div className="flex items-center gap-12 ml-auto">
                        <div className="hidden xl:block">
                            <Button
                                href="/booking/"
                                variant="primary"
                                size="xs"
                            >
                                Забронировать
                            </Button>
                        </div>
                        <a
                            href="https://guest.travelline.ru/guest-account/41018/profile/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hidden xl:flex items-center gap-1.5 text-sm transition-colors duration-300 ${
                                isLight ? "text-stone-700" : "text-white"
                            }`}
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                            </svg>
                            Войти
                        </a>
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            className={`xl:hidden flex flex-col gap-1.5 cursor-pointer transition-colors duration-300 ${
                                isLight ? "text-stone-700" : "text-white"
                            }`}
                            aria-label="Открыть меню"
                        >
                            <span className="block w-5 h-px bg-current" />
                            <span className="block w-5 h-px bg-current" />
                        </button>
                    </div>
                </div>
                <div>
                    {/* Мобайл: текст над линией */}
                    <p
                        className={`xl:hidden text-center font-alistair text-xl pb-2 transition-colors duration-300 ${
                            isLight ? "text-[#96908D]" : "text-white/70"
                        }`}
                    >
                        Отдых с графским размахом!
                    </p>

                    {/* Общая линия */}
                    <div
                        className={`relative mx-5 xl:mx-8 border-b transition-colors duration-300 ${
                            isLight ? "border-stone-200" : "border-white/20"
                        }`}
                    >
                        {/* Десктоп: текст на линии */}
                        <p
                            className={`hidden ${isHome ? "xl:block" : "hidden"} absolute left-1/2 -translate-x-1/2 -translate-y-1/3 font-alistair text-3xl whitespace-nowrap transition-colors duration-300 ${
                                isLight ? "text-[#96908D]" : "text-white/70"
                            }`}
                        >
                            Отдых с графским размахом!
                        </p>
                    </div>
                </div>

                {/* Десктоп: дополнительное меню — только не на главной */}
                {!isHome && (
                    <nav className="hidden xl:flex items-center justify-between gap-8 px-8 h-10">
                        {subNavItems.map(({ label, href, target }) => (
                            <Link
                                key={href}
                                href={href}
                                target={target}
                                rel={
                                    target === "_blank"
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className={`tracking-wide whitespace-nowrap transition-colors duration-200 ${
                                    isLight
                                        ? "text-stone-500 hover:text-brand-blue"
                                        : "text-white/70 hover:text-white/90"
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                )}
            </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.button
                            type="button"
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            variants={overlayVariants}
                            transition={OVERLAY_TRANSITION}
                            className="fixed inset-0 z-50 cursor-default bg-[rgba(14,18,24,0.24)] backdrop-blur-[3px]"
                            onClick={closeMenu}
                            aria-label="Закрыть меню"
                        />

                        <motion.div
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            variants={mobilePanelVariants}
                            transition={PANEL_TRANSITION}
                            className="xl:hidden fixed top-0 left-0 z-[60] h-full w-72 overflow-hidden rounded-lg border border-white/70 bg-white/95 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(54,77,107,0.08)_0%,rgba(255,255,255,0)_22%,rgba(150,144,141,0.06)_100%)]" />
                            <div className="relative flex h-full flex-col">
                                <div className="flex h-14 items-center justify-between border-b border-stone-100/80 px-6 shrink-0">
                                    <span className="text-xs uppercase tracking-[0.28em] text-[#96908D]">
                                        Меню
                                    </span>
                                    <button
                                        type="button"
                                        onClick={closeMenu}
                                        className="text-2xl leading-none cursor-pointer text-stone-400 transition-colors duration-200 hover:text-stone-700"
                                        aria-label="Закрыть меню"
                                    >
                                        &times;
                                    </button>
                                </div>
                                <motion.nav
                                    variants={menuListVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="flex flex-1 flex-col overflow-y-auto px-6 py-5"
                                >
                                    {navItems.map((item) =>
                                        item.submenu ? (
                                            <motion.div
                                                key={item.label}
                                                variants={menuItemVariants}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSubmenuOpen(
                                                            (v) => !v,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between py-3 text-left cursor-pointer"
                                                >
                                                    <span className="text-sm">
                                                        {item.label}
                                                    </span>
                                                    <span
                                                        className={`text-xl text-[#96908D] transition-transform duration-300 leading-none ${submenuOpen ? "translate-x-1 rotate-90" : ""}`}
                                                    >
                                                        &rsaquo;
                                                    </span>
                                                </button>
                                                <motion.div
                                                    variants={
                                                        mobileSubmenuVariants
                                                    }
                                                    initial={false}
                                                    animate={
                                                        submenuOpen
                                                            ? "open"
                                                            : "closed"
                                                    }
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mb-2 ml-2 flex flex-col border-l border-stone-200/80 pl-4">
                                                        {item.submenu.map(
                                                            (sub) => (
                                                                <Link
                                                                    key={
                                                                        sub.href
                                                                    }
                                                                    href={
                                                                        sub.href
                                                                    }
                                                                    onClick={
                                                                        closeMenu
                                                                    }
                                                                    className="py-2 text-sm text-[#96908D] transition-colors hover:text-brand-blue"
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                            ),
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key={item.href}
                                                variants={menuItemVariants}
                                            >
                                                <Link
                                                    href={item.href}
                                                    target={item.target}
                                                    onClick={closeMenu}
                                                    className="block py-3 text-sm transition-colors hover:text-brand-blue"
                                                >
                                                    {item.label}
                                                </Link>
                                                {item.lineBelow && (
                                                    <div className="my-1 border-b border-stone-200" />
                                                )}
                                            </motion.div>
                                        ),
                                    )}
                                </motion.nav>
                                <motion.div
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{
                                        duration: 0.42,
                                        delay: 0.08,
                                        ease: GENTLE_EASE,
                                    }}
                                    className="flex shrink-0 flex-col gap-3 border-t border-stone-100/80 px-6 py-5"
                                >
                                    <a
                                        href="https://guest.travelline.ru/guest-account/41018/profile/login"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 text-sm text-stone-600"
                                    >
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            aria-hidden="true"
                                            focusable="false"
                                        >
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                        </svg>
                                        Войти
                                    </a>
                                    <Button
                                        href="/booking/"
                                        variant="primary"
                                        size="xs"
                                    >
                                        Забронировать
                                    </Button>
                                    <a
                                        href="tel:+78125659650"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 text-sm text-stone-600"
                                    >
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                            focusable="false"
                                        >
                                            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                                        </svg>
                                        +7 (812) 565-96-50
                                    </a>
                                    <SocialLinks className="justify-center" />
                                </motion.div>
                            </div>
                        </motion.div>

                        <div className="pointer-events-none fixed inset-y-0 left-0 z-[60] hidden xl:flex items-start gap-2 p-2">
                            <motion.div
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                variants={desktopPanelVariants}
                                transition={PANEL_TRANSITION}
                                className="pointer-events-auto relative mt-1 flex min-h-[34.5rem] w-64 flex-col overflow-hidden rounded-lg border border-white/70 bg-white/95 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                            >
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(54,77,107,0.08)_0%,rgba(255,255,255,0)_24%,rgba(150,144,141,0.06)_100%)]" />
                                <div className="relative flex h-16 items-center justify-between px-6 shrink-0">
                                    <span className="text-xs uppercase tracking-[0.28em] text-[#96908D]">
                                        Меню
                                    </span>
                                    <button
                                        type="button"
                                        onClick={closeMenu}
                                        className="text-2xl leading-none cursor-pointer text-stone-400 transition-colors duration-200 hover:text-stone-700"
                                        aria-label="Закрыть меню"
                                    >
                                        &times;
                                    </button>
                                </div>

                                <motion.nav
                                    variants={menuListVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="relative flex flex-col px-6 pb-6"
                                >
                                    {navItems.map((item) =>
                                        item.submenu ? (
                                            <motion.div
                                                key={item.label}
                                                variants={menuItemVariants}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSubmenuOpen(
                                                            (v) => !v,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between py-3 text-left cursor-pointer text-sm transition-colors hover:text-brand-blue"
                                                >
                                                    <span>{item.label}</span>
                                                    <span
                                                        className={`text-xl text-[#96908D] leading-none transition-transform duration-300 ${submenuOpen ? "translate-x-1 rotate-90" : ""}`}
                                                    >
                                                        &rsaquo;
                                                    </span>
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key={item.href}
                                                variants={menuItemVariants}
                                            >
                                                <Link
                                                    href={item.href}
                                                    target={item.target}
                                                    onClick={closeMenu}
                                                    className="block py-3 text-sm transition-colors hover:text-brand-blue"
                                                >
                                                    {item.label}
                                                </Link>
                                                {item.lineBelow && (
                                                    <div className="border-b border-stone-200" />
                                                )}
                                            </motion.div>
                                        ),
                                    )}
                                </motion.nav>

                                <motion.div
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{
                                        duration: 0.42,
                                        delay: 0.12,
                                        ease: GENTLE_EASE,
                                    }}
                                    className="relative mt-auto flex flex-col gap-3 px-6 pb-6"
                                >
                                    <a
                                        href="https://guest.travelline.ru/guest-account/41018/profile/login"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 text-sm text-stone-600"
                                    >
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            aria-hidden="true"
                                            focusable="false"
                                        >
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                        </svg>
                                        Войти
                                    </a>
                                    <Button href="/booking/" variant="primary">
                                        Забронировать
                                    </Button>
                                    <a
                                        href="tel:+78125659650"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 text-sm text-stone-600"
                                    >
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                            focusable="false"
                                        >
                                            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                                        </svg>
                                        +7 (812) 565-96-50
                                    </a>
                                    <SocialLinks className="justify-center" />
                                </motion.div>
                            </motion.div>

                            <AnimatePresence>
                                {submenuOpen && (
                                    <motion.div
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        variants={submenuPanelVariants}
                                        transition={{
                                            duration: 0.16,
                                            ease: GENTLE_EASE,
                                            delay: 0,
                                        }}
                                        className="pointer-events-auto relative mt-20 w-60 self-start overflow-hidden rounded-lg border border-white/70 bg-white/94 px-6 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl"
                                    >
                                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(54,77,107,0.05)_0%,rgba(255,255,255,0)_100%)]" />
                                        <motion.div
                                            variants={submenuListVariants}
                                            initial="hidden"
                                            animate="show"
                                            className="relative flex flex-col gap-1"
                                        >
                                            {navItems[0].submenu?.map((sub) => (
                                                <motion.div
                                                    key={sub.href}
                                                    variants={
                                                        submenuItemVariants
                                                    }
                                                >
                                                    <Link
                                                        href={sub.href}
                                                        onClick={closeMenu}
                                                        className="block py-2 text-sm transition-colors hover:text-brand-blue"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
