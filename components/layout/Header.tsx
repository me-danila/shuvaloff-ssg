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
    submenu?: { label: string; href: string; target?: "_blank" }[];
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
        label: "Графские завтраки",
        href: "https://shuvaloff.academia-rest.ru/grafskie-zavtraki?utm_source=hotels",
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
        href: "/wedding/",
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
    const isWedding =
        pathname === "/wedding/" || pathname === "/spasibo_wedding/";
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

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
            setActiveSubmenu(null);
        });
        setMenuOpen(false);
    };

    const isLight =
        !scrolled &&
        pathname !== "/wedding/" &&
        pathname !== "/spasibo_wedding/";
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const activeSubmenuIndex = navItems.findIndex(
        (item) => item.label === activeSubmenu,
    );
    const activeSubmenuItems =
        navItems.find((item) => item.label === activeSubmenu)?.submenu ?? [];

    return (
        <>
            <div
                className={`h-24 ${isHome ? "xl:h-28" : "xl:h-36"} ${isWedding ? "hidden" : ""}`}
            />

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
                    <nav className="hidden xl:flex items-center justify-between gap-8 px-8 h-13">
                        {subNavItems.map(({ label, href, target }, index) => (
                            <Link
                                key={href}
                                href={href}
                                target={target}
                                rel={
                                    target === "_blank"
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className={`relative flex flex-col items-center tracking-wide whitespace-nowrap transition-colors duration-200 ${
                                    isLight
                                        ? "text-stone-500 hover:text-brand-blue"
                                        : "text-white/70 hover:text-white/90"
                                }`}
                            >
                                {index === 1 && (
                                    <svg
                                        width="44"
                                        height="41"
                                        viewBox="0 0 44 41"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`absolute -top-2.5 -left-1 w-9 h-auto -z-1 ${isLight ? "" : "opacity-50"}`}
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16.22 14.445 22 20.22l5.779-5.775a2.904 2.904 0 0 1 1.272-3.478 5.7 5.7 0 0 1-1.732-1.189 5.7 5.7 0 0 1-1.679-4.05c0-1.466.56-2.932 1.68-4.05A5.72 5.72 0 0 1 31.372 0c1.467 0 2.934.56 4.053 1.678a5.7 5.7 0 0 1 1.19 1.73q.184-.316.454-.588a2.91 2.91 0 0 1 3.121-.648 1.389 1.389 0 0 1 2.347-.711c.27.271.407.627.407.982l-.001.001a1.39 1.39 0 0 1-1.119 1.36c.136.342.203.705.203 1.068a2.89 2.89 0 0 1-1.438 2.506 5.7 5.7 0 0 1 1.73 1.188 5.7 5.7 0 0 1 1.68 4.05 5.7 5.7 0 0 1-1.68 4.051 5.7 5.7 0 0 1-4.053 1.677 5.7 5.7 0 0 1-4.053-1.677 5.7 5.7 0 0 1-1.19-1.73q-.183.317-.453.588a2.9 2.9 0 0 1-2.948.71l-5.806 5.801L38.73 36.938a.43.43 0 0 1 0 .606l-1.212 1.211a.43.43 0 0 1-.606 0l-1.77-1.77-3.895 3.89a.43.43 0 0 1-.606 0l-1.506-1.504a.43.43 0 0 1 0-.606l3.894-3.89-.92-.919-3.893 3.89a.43.43 0 0 1-.606 0l-1.505-1.503a.43.43 0 0 1 0-.606l3.893-3.89L22 23.853l-8 7.993 3.894 3.89a.43.43 0 0 1 0 .606l-1.505 1.504a.43.43 0 0 1-.607 0l-3.894-3.89-.918.918 3.893 3.89a.43.43 0 0 1 0 .607l-1.505 1.504a.43.43 0 0 1-.606 0l-3.894-3.89-1.772 1.77a.43.43 0 0 1-.606 0l-1.211-1.21a.43.43 0 0 1 0-.607l14.913-14.902-5.805-5.8a2.91 2.91 0 0 1-2.948-.71 3 3 0 0 1-.455-.588 5.7 5.7 0 0 1-1.19 1.73 5.7 5.7 0 0 1-4.052 1.677 5.7 5.7 0 0 1-4.054-1.677A5.7 5.7 0 0 1 0 12.617c0-1.466.56-2.932 1.679-4.05A5.7 5.7 0 0 1 3.41 7.378a2.895 2.895 0 0 1-1.237-3.574 1.38 1.38 0 0 1-1.117-1.36h-.001a1.386 1.386 0 0 1 1.39-1.39 1.39 1.39 0 0 1 1.363 1.119 2.91 2.91 0 0 1 3.576 1.235A5.73 5.73 0 0 1 12.627 0c1.467 0 2.934.56 4.053 1.678a5.7 5.7 0 0 1 1.68 4.05 5.7 5.7 0 0 1-1.68 4.05 5.7 5.7 0 0 1-1.73 1.188 2.905 2.905 0 0 1 1.27 3.48m24.8-12.001c0 .134.051.267.153.371l.005.005.004.004a.534.534 0 0 0 .907-.38h-.002a.53.53 0 0 0-.533-.534.53.53 0 0 0-.533.534m-2.36 4.421q.229.053.464.053c.524 0 1.047-.2 1.447-.6a2.04 2.04 0 0 0 0-2.893c-.4-.4-.923-.599-1.447-.599s-1.048.2-1.448.6a2.04 2.04 0 0 0-.547 1.91 4.5 4.5 0 0 1 1.53 1.53m-7.008-.857a4.47 4.47 0 0 1 3.61-1.29 4 4 0 0 0-1.048-1.828 4 4 0 0 0-2.84-1.176 4 4 0 0 0-2.842 1.176 4 4 0 0 0-1.177 2.838 4 4 0 0 0 1.177 2.839 4 4 0 0 0 1.83 1.048 4.46 4.46 0 0 1 1.29-3.607m-.672 5.472a2.04 2.04 0 0 0-1.912.546 2.04 2.04 0 0 0 0 2.894c.4.4.924.6 1.449.6a2.044 2.044 0 0 0 1.994-2.51 4.5 4.5 0 0 1-1.53-1.53m3.398 2.147c.174.67.523 1.304 1.048 1.829a4 4 0 0 0 2.84 1.176 4 4 0 0 0 2.842-1.176 4 4 0 0 0 1.176-2.84 4 4 0 0 0-1.176-2.838 4 4 0 0 0-1.83-1.047q.022.221.022.442a4.46 4.46 0 0 1-1.313 3.165 4.47 4.47 0 0 1-3.609 1.29m-2.751-4.454q0 .28.048.558a4 4 0 0 0 2.54-1.165A4 4 0 0 0 35.38 6.03a3.18 3.18 0 0 0-2.818.886 3.18 3.18 0 0 0-.935 2.258m6.338-.56a4 4 0 0 0-2.539 1.165 4 4 0 0 0-1.166 2.537q.278.05.56.05c.817 0 1.635-.312 2.259-.935a3.18 3.18 0 0 0 .886-2.816M2.98 2.444h-.001a.53.53 0 0 0-.534-.532.53.53 0 0 0-.533.533H1.91a.534.534 0 0 0 .905.38l.005-.004.005-.004a.53.53 0 0 0 .154-.372m2.36 4.422a4.5 4.5 0 0 1 1.53-1.53q.055-.23.054-.463c0-.524-.2-1.047-.6-1.447s-.924-.6-1.448-.6-1.048.2-1.448.6a2.043 2.043 0 0 0 0 2.894 2.04 2.04 0 0 0 1.912.546m7.008-.857a4.46 4.46 0 0 1 1.29 3.607 4 4 0 0 0 1.83-1.048 4 4 0 0 0 1.177-2.838 4 4 0 0 0-1.177-2.839 4 4 0 0 0-2.841-1.176 4 4 0 0 0-2.84 1.174 4 4 0 0 0-1.048 1.83q.22-.022.442-.022a4.47 4.47 0 0 1 3.168 1.31m.672 5.472a4.5 4.5 0 0 1-1.532 1.53 2.04 2.04 0 0 0 .547 1.91 2.045 2.045 0 1 0 2.897-2.894 2.05 2.05 0 0 0-1.912-.546m-3.398 2.147a4.47 4.47 0 0 1-3.61-1.29 4.46 4.46 0 0 1-1.29-3.606A4 4 0 0 0 2.89 9.778a4 4 0 0 0-1.177 2.838 4 4 0 0 0 1.177 2.84 4 4 0 0 0 2.84 1.175 4 4 0 0 0 2.841-1.176 4 4 0 0 0 1.05-1.828m2.752-4.454a3.18 3.18 0 0 0-.936-2.257A3.19 3.19 0 0 0 8.62 6.03a4 4 0 0 0 1.165 2.537 4 4 0 0 0 2.539 1.165q.049-.28.049-.56m-6.339-.56q-.05.278-.05.56c0 .817.313 1.633.936 2.257a3.19 3.19 0 0 0 2.818.885 4 4 0 0 0-1.166-2.537 4 4 0 0 0-2.538-1.164"
                                            fill="#d7d4d3"
                                        />
                                    </svg>
                                )}
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
                            className="xl:hidden fixed top-1 left-1 z-[60] w-72 overflow-hidden rounded-lg border border-white/70 bg-white/95 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl"
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
                                    {navItems.map((item) => {
                                        const isSubmenuOpen =
                                            activeSubmenu === item.label;

                                        return item.submenu ? (
                                            <motion.div
                                                key={item.label}
                                                variants={menuItemVariants}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveSubmenu(
                                                            isSubmenuOpen
                                                                ? null
                                                                : item.label,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between py-3 text-left cursor-pointer"
                                                >
                                                    <span className="text-sm">
                                                        {item.label}
                                                    </span>
                                                    <span
                                                        className={`text-xl text-[#96908D] transition-transform duration-300 leading-none ${isSubmenuOpen ? "translate-x-1 rotate-90" : ""}`}
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
                                                        isSubmenuOpen
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
                                                                    target={
                                                                        sub.target
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
                                        );
                                    })}
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
                                    {navItems.map((item) => {
                                        const isSubmenuOpen =
                                            activeSubmenu === item.label;

                                        return item.submenu ? (
                                            <motion.div
                                                key={item.label}
                                                variants={menuItemVariants}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveSubmenu(
                                                            isSubmenuOpen
                                                                ? null
                                                                : item.label,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between py-3 text-left cursor-pointer text-sm transition-colors hover:text-brand-blue"
                                                >
                                                    <span>{item.label}</span>
                                                    <span
                                                        className={`text-xl text-[#96908D] leading-none transition-transform duration-300 ${isSubmenuOpen ? "translate-x-1 rotate-90" : ""}`}
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
                                        );
                                    })}
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
                                {activeSubmenuItems.length > 0 && (
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
                                        style={{
                                            marginTop:
                                                80 +
                                                Math.max(
                                                    activeSubmenuIndex,
                                                    0,
                                                ) *
                                                    48,
                                        }}
                                    >
                                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(54,77,107,0.05)_0%,rgba(255,255,255,0)_100%)]" />
                                        <motion.div
                                            variants={submenuListVariants}
                                            initial="hidden"
                                            animate="show"
                                            className="relative flex flex-col gap-1"
                                        >
                                            {activeSubmenuItems.map((sub) => (
                                                <motion.div
                                                    key={sub.href}
                                                    variants={
                                                        submenuItemVariants
                                                    }
                                                >
                                                    <Link
                                                        href={sub.href}
                                                        target={sub.target}
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
