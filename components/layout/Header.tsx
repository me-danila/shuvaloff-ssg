"use client";

import {
    CaretDownIcon,
    MapPinIcon,
    PhoneIcon,
    UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import Button from "@/components/ui/Button";
import { GENTLE_EASE } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SocialLinks from "@/components/ui/SocialLinks";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
    hasEnglishVersion,
    type Locale,
    localizeHref,
    normalizePath,
    stripLocalePrefix,
} from "@/lib/i18n/routing";
import { HOTEL_CONTACTS } from "@/lib/seo/site";

type NavItem = {
    label: string;
    href: string;
    target?: "_blank";
    forceReload?: boolean;
    lineBelow?: boolean;
    submenu?: {
        label: string;
        href: string;
        target?: "_blank";
        forceReload?: boolean;
    }[];
};

type HeaderCopy = {
    openMenuAria: string;
    closeMenuAria: string;
    menuLabel: string;
    bookButton: string;
    loginButton: string;
    logoAlt: string;
};

type HeaderLinkItem = {
    label: string;
    href: string;
    target?: "_blank";
    forceReload?: boolean;
    lineBelow?: boolean;
};

const copyByLocale: Record<Locale, HeaderCopy> = {
    ru: {
        openMenuAria: "Открыть меню",
        closeMenuAria: "Закрыть меню",
        menuLabel: "Меню",
        bookButton: "Забронировать",
        loginButton: "Войти",
        logoAlt: "ACADEMIA Особняк Шувалова",
    },
    en: {
        openMenuAria: "Open menu",
        closeMenuAria: "Close menu",
        menuLabel: "Menu",
        bookButton: "Book now",
        loginButton: "Sign in",
        logoAlt: "ACADEMIA Mansion Shuvaloff",
    },
};

const navItemsByLocale: Record<Locale, NavItem[]> = {
    ru: [
        {
            label: "Отель",
            href: "/",
            submenu: [
                { label: "Категории номеров", href: "/rooms/" },
                { label: "Исторические люксы", href: "/rooms/historical/" },
                { label: "Специальные предложения", href: "/sales/" },
                { label: "Программа привилегий", href: "/rewards/" },
                { label: "Реферальная программа", href: "/rewards/referral/" },
                { label: "Консьерж-сервис", href: "/services/concierge/" },
                { label: "Дополнительные услуги", href: "/services/" },
                { label: "Рады вашему питомцу", href: "/services/pets/" },
            ],
        },
        {
            label: "Графский Петербург",
            href: "/aristocratic-spb/",
        },
        {
            label: "Водные прогулки",
            href: "/services/boat-tours/",
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
        {
            label: "Подарочные сертификаты",
            href: "?cert-open=42761",
            forceReload: true,
        },
        {
            label: "Абонемент на проживание",
            href: "/subscriptions/",
        },
    ],
    en: [
        {
            label: "Hotel",
            href: "/",
            submenu: [
                { label: "Room categories", href: "/rooms/" },
                { label: "Historical suites", href: "/rooms/historical/" },
                { label: "Special offers", href: "/sales/" },
                { label: "Rewards program", href: "/rewards/" },
                { label: "Referral programm", href: "/rewards/referral/" },
                { label: "Concierge service", href: "/services/concierge/" },
                { label: "Additional services", href: "/services/" },
                { label: "Accomodation with pets", href: "/services/pets/" },
            ],
        },
        {
            label: "Aristocratic St. Petersburg",
            href: "/aristocratic-spb/",
        },
        {
            label: "Boat tours",
            href: "/services/boat-tours/",
        },
        {
            label: "Boutique restaurant",
            href: "https://shuvaloff.academia-rest.ru/?utm_source=hotels",
            target: "_blank",
        },
        {
            label: "Count's breakfasts",
            href: "https://shuvaloff.academia-rest.ru/grafskie-zavtraki?utm_source=hotels",
            target: "_blank",
        },
        {
            label: "SPA",
            href: "https://academia-spa.ru/?utm_source=hotels",
            target: "_blank",
        },
        {
            label: "Mansion history",
            href: "/history/",
        },
        {
            label: "Wedding at the mansion",
            href: "/wedding/",
            lineBelow: true,
        },
        {
            label: "Gift certificates",
            href: "?cert-open=42761",
            forceReload: true,
        },
        {
            label: "Accommodation subscription",
            href: "/subscriptions/",
        },
    ],
};

const homeNavItemsByLocale: Record<Locale, NavItem[]> = {
    ru: [
        {
            label: "Категории номеров",
            href: "/rooms/",
            submenu: [
                { label: "Стандарт", href: "/rooms/standard/" },
                { label: "Супериор", href: "/rooms/superior/" },
                {
                    label: "Супериор мансарда",
                    href: "/rooms/superior-mansarda/",
                },
                { label: "Полулюкс", href: "/rooms/junior-suite/" },
                {
                    label: "Полулюкс мансарда",
                    href: "/rooms/junior-suite-mansarda/",
                },
                { label: "Двухкомнатный люкс", href: "/rooms/suite/" },
                { label: "Исторические люксы", href: "/rooms/historical/" },
            ],
        },
        {
            label: "Специальные предложения",
            href: "/sales/",
            submenu: [
                { label: "Акции", href: "/sales/" },
                { label: "Мероприятия", href: "/events/" },
                { label: "Реферальная программа", href: "/rewards/referral/" },
                {
                    label: "Подарочные сертификаты",
                    href: "?cert-open=42761",
                    forceReload: true,
                },
                { label: "Абонементы на проживание", href: "/subscriptions/" },
                { label: "Свадьба в особняке", href: "/wedding/" },
                { label: "Водные прогулки", href: "/services/boat-tours/" },
                { label: "Рады вашему питомцу", href: "/services/pets/" },
            ],
        },
        { label: "Программа привилегий", href: "/rewards/" },
        { label: "Услуги", href: "/services/all/" },
        {
            label: "О нас",
            href: "/history/",
            submenu: [
                { label: "Отзывы", href: "/reviews/" },
                {
                    label: "СМИ",
                    href: "/smi/",
                },
                {
                    label: "Блог",
                    href: "/blog/",
                },
                { label: "История особняка", href: "/history/" },
            ],
        },
    ],
    en: [
        {
            label: "Room categories",
            href: "/rooms/",
            submenu: [
                { label: "Standard", href: "/rooms/standard/" },
                { label: "Superior", href: "/rooms/superior/" },
                {
                    label: "Superior mansarda",
                    href: "/rooms/superior-mansarda/",
                },
                { label: "Junior Suite", href: "/rooms/junior-suite/" },
                {
                    label: "Junior Suite mansarda",
                    href: "/rooms/junior-suite-mansarda/",
                },
                { label: "Suite", href: "/rooms/suite/" },
                { label: "Historical suites", href: "/rooms/historical/" },
            ],
        },
        {
            label: "Special offers",
            href: "/sales/",
            submenu: [
                { label: "Offers", href: "/sales/" },
                { label: "Events", href: "/events/" },
                { label: "Referral program", href: "/rewards/referral/" },
                {
                    label: "Gift certificates",
                    href: "?cert-open=42761",
                    forceReload: true,
                },
                {
                    label: "Accommodation subscriptions",
                    href: "/subscriptions/",
                },
                { label: "Wedding at the mansion", href: "/wedding/" },
                { label: "Boat tours", href: "/services/boat-tours/" },
                { label: "Accomodation with pets", href: "/services/pets/" },
            ],
        },
        { label: "Rewards program", href: "/rewards/" },
        { label: "Services", href: "/services/all/" },
        {
            label: "About us",
            href: "/history/",
            submenu: [
                { label: "Reviews", href: "/reviews/" },
                {
                    label: "Media",
                    href: "/smi/",
                },
                {
                    label: "Blog",
                    href: "https://academia-shuvaloff.ru/blog/",
                },
                { label: "Mansion history", href: "/history/" },
            ],
        },
    ],
};

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

export default function Header({ locale }: { locale: Locale }) {
    const pathname = usePathname() || "/";
    const copy = copyByLocale[locale];
    const navItems = navItemsByLocale[locale];
    const homeNavItems = homeNavItemsByLocale[locale];
    const normalizedPath = normalizePath(stripLocalePrefix(pathname));

    const scrollToContacts = () => {
        const el = document.getElementById("contacts");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            window.location.href = `${localizeHref("/", locale)}#contacts`;
        }
    };
    const isHeaderFixed =
        normalizedPath === "/" ||
        //        normalizedPath === "/wedding" ||
        normalizedPath === "/spasibo_wedding" ||
        normalizedPath === "/events" ||
        normalizedPath === "/photo-shoot" ||
        normalizedPath === "/services/aristocratic-breakfast";
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    // Keyboard-only: tracks which desktop dropdown currently holds keyboard
    // focus, purely to drive aria-expanded. The visual open/close is handled by
    // CSS (:hover for mouse, :focus-visible for keyboard) and is unaffected.
    const [focusedDropdown, setFocusedDropdown] = useState<string | null>(null);

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
        normalizedPath !== "/" &&
        //        normalizedPath !== "/wedding" &&
        normalizedPath !== "/spasibo_wedding" &&
        normalizedPath !== "/events" &&
        normalizedPath !== "/photo-shoot" &&
        normalizedPath !== "/services/aristocratic-breakfast";
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const activeSubmenuIndex = navItems.findIndex(
        (item) => item.label === activeSubmenu,
    );
    const activeSubmenuItems =
        navItems.find((item) => item.label === activeSubmenu)?.submenu ?? [];
    const visibleSubNavItems = homeNavItems;
    const visibleMobileNavItems = homeNavItems;
    const ruHref = localizeHref(pathname, "ru");
    const enHref = hasEnglishVersion(pathname)
        ? localizeHref(pathname, "en")
        : "/en/";
    const alternateLocale = locale === "ru" ? "en" : "ru";
    const alternateHref = locale === "ru" ? enHref : ruHref;
    const currentLanguageLabel = locale.toUpperCase();
    const alternateLanguageLabel = alternateLocale.toUpperCase();
    const buildMenuHref = (item: HeaderLinkItem) => {
        if (!item.href.startsWith("?")) {
            return localizeHref(item.href, locale);
        }
        // Param-ссылки (?cert-open=…) добавляем к текущему пути. Раньше здесь
        // мерджился useSearchParams(), но он уводил весь Header в CSR-bailout
        // (BAILOUT_TO_CLIENT_SIDE_RENDERING) при output:export → хедер выпадал
        // из статического HTML. Существующие query-параметры для cert-open
        // несущественны.
        return `${pathname}${item.href}`;
    };
    const getItemRel = (item: HeaderLinkItem) =>
        item.target === "_blank" ? "noopener noreferrer" : undefined;
    const renderNavItemLink = (item: HeaderLinkItem, className: string) => {
        const href = buildMenuHref(item);

        if (item.forceReload) {
            return (
                <a
                    href={href}
                    target={item.target}
                    rel={getItemRel(item)}
                    onClick={closeMenu}
                    className={className}
                >
                    {item.label}
                </a>
            );
        }

        return (
            <Link
                href={href}
                target={item.target}
                rel={
                    item.target === "_blank" ? "noopener noreferrer" : undefined
                }
                onClick={closeMenu}
                className={className}
            >
                {item.label}
            </Link>
        );
    };

    return (
        <>
            <div className={`h-14 xl:h-36 ${isHeaderFixed ? "hidden" : ""}`} />

            <m.header
                initial={isDesktop ? { y: -20, opacity: 0 } : false}
                animate={isDesktop ? { y: 0, opacity: 1 } : false}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 xl:pb-4 ${
                    isLight
                        ? "bg-white"
                        : "bg-linear-to-b from-black/80 via-black/60 to-transparent"
                }`}
            >
                <div className="flex items-center h-14 px-5 px-8 xl:px-0 relative xl:h-20 xl:mx-auto xl:w-full xl:max-w-7xl">
                    <div className="flex items-center xl:gap-32">
                        <div
                            className={`flex items-center gap-2 text-xs tracking-wider transition-colors duration-300 xl:hidden ${
                                isLight ? "text-[#96908D]" : "text-white/70"
                            }`}
                        >
                            <Link
                                href={ruHref}
                                className={`font-medium ${locale === "ru" ? (isLight ? "text-brand-brown" : "text-white") : "opacity-80 hover:opacity-100"}`}
                            >
                                RU
                            </Link>
                            <Link
                                href={enHref}
                                className={`font-medium ${locale === "en" ? (isLight ? "text-brand-brown" : "text-white") : "opacity-80 hover:opacity-100"}`}
                            >
                                ENG
                            </Link>
                        </div>
                        <div className="group relative hidden xl:block">
                            <Link
                                href={locale === "ru" ? ruHref : enHref}
                                aria-label={
                                    locale === "ru"
                                        ? "Русская версия"
                                        : "English version"
                                }
                                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-xs font-medium transition-colors duration-300 ${
                                    isLight
                                        ? "border-stone-300 text-brand-brown hover:border-brand-brown hover:text-brand-brown"
                                        : "border-white/40 text-white hover:border-white hover:bg-white/10"
                                }`}
                            >
                                <span>{currentLanguageLabel}</span>
                                <CaretDownIcon
                                    size={9}
                                    weight="bold"
                                    className="ml-0.5"
                                    aria-hidden="true"
                                />
                            </Link>
                            <span
                                className="absolute left-0 top-full z-50 h-1.5 w-11"
                                aria-hidden="true"
                            />
                            <Link
                                href={alternateHref}
                                aria-label={
                                    locale === "ru"
                                        ? "Switch to English"
                                        : "Переключить на русский"
                                }
                                className={`absolute left-0 top-[calc(100%+0.375rem)] z-50 inline-flex h-11 w-11 translate-y-1 items-center justify-center rounded-full border text-xs font-medium opacity-0 pointer-events-none transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto ${
                                    isLight
                                        ? "border-stone-300 bg-white text-brand-brown shadow-[0_10px_30px_rgba(0,0,0,0.16)] hover:border-brand-brown hover:text-brand-brown"
                                        : "border-white/70 bg-[#100b08] text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:border-white hover:bg-[#100b08]"
                                }`}
                            >
                                {alternateLanguageLabel}
                            </Link>
                        </div>
                        <a
                            href={HOTEL_CONTACTS.telephoneHref}
                            className={`hidden xl:inline-flex items-center gap-3 text-sm tracking-wide transition-colors duration-300 ${
                                isLight
                                    ? "text-brand-brown hover:text-brand-brown"
                                    : "text-white hover:text-white/90"
                            }`}
                        >
                            <PhoneIcon
                                size={16}
                                weight="fill"
                                aria-hidden="true"
                            />
                            {HOTEL_CONTACTS.telephoneDisplay}
                        </a>
                    </div>

                    {/* Плейн <a>, а не next/link: клик по лого — всегда полный
                        переход на "/". Работает даже до гидрации и сбрасывает
                        скролл; Link на том же маршруте давал no-op (клик мимо). */}
                    <a
                        href={localizeHref("/", locale)}
                        className="absolute left-1/2 -translate-x-1/2"
                    >
                        <Image
                            src="/logo.svg"
                            alt={copy.logoAlt}
                            width={150}
                            height={38}
                            className={`transition-all duration-300 cursor-pointer ${
                                isLight ? "" : "brightness-0 invert"
                            }`}
                        />
                    </a>

                    <div className="flex items-center ml-auto xl:gap-28">
                        <div className="hidden xl:grid min-w-[10.5rem] place-items-center">
                            <div className="relative h-11 w-full">
                                <button
                                    type="button"
                                    onClick={scrollToContacts}
                                    className={`absolute inset-0 inline-flex items-center justify-center gap-2 text-sm tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                                        scrolled
                                            ? "-translate-y-2 opacity-0 pointer-events-none"
                                            : "translate-y-0 opacity-100"
                                    } ${
                                        isLight
                                            ? "text-brand-brown"
                                            : "text-white"
                                    }`}
                                >
                                    <MapPinIcon
                                        size={16}
                                        weight="fill"
                                        aria-hidden="true"
                                    />
                                    {locale === "en"
                                        ? "Saint Petersburg"
                                        : "Санкт-Петербург"}
                                </button>
                                <Button
                                    href={localizeHref("/booking/", locale)}
                                    variant="primary"
                                    size="xs"
                                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                        scrolled
                                            ? "-translate-y-1/2 opacity-100"
                                            : "translate-y-1 opacity-0 pointer-events-none"
                                    }`}
                                >
                                    {copy.bookButton}
                                </Button>
                            </div>
                        </div>
                        <a
                            href={`https://guest.travelline.ru/guest-account/41018/profile/login${locale === "en" ? "?lang=en" : ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group hidden xl:flex items-center gap-3 text-sm transition-colors duration-300 ${
                                isLight ? "text-brand-brown" : "text-white"
                            }`}
                        >
                            <span
                                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 ${
                                    isLight
                                        ? "border-stone-300 group-hover:border-brand-brown"
                                        : "border-white/40 group-hover:border-white group-hover:bg-white/10"
                                }`}
                            >
                                <UserIcon
                                    size={13}
                                    weight="fill"
                                    aria-hidden="true"
                                />
                            </span>
                            {copy.loginButton}
                        </a>
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            className={`xl:hidden flex flex-col gap-1.5 cursor-pointer transition-colors duration-300 ${
                                isLight ? "text-brand-brown" : "text-white"
                            }`}
                            aria-label={copy.openMenuAria}
                        >
                            <span className="block w-5 h-px bg-current" />
                            <span className="block w-5 h-px bg-current" />
                        </button>
                    </div>
                </div>
                <div>
                    {/* Общая линия */}
                    <div
                        className={`relative border-b transition-colors duration-300 mx-5 xl:mx-auto xl:w-full xl:max-w-7xl ${
                            isLight ? "border-stone-200" : "border-white/20"
                        }`}
                    />
                </div>

                {/* Десктоп: дополнительное меню — на всех страницах */}
                {
                    <nav className="hidden xl:flex items-center justify-between gap-8 px-8 xl:px-0 h-13 mx-auto w-full max-w-7xl">
                        {visibleSubNavItems.map((item, index) => {
                            const hasDropdown = item.submenu?.length;
                            const isLastNavItem =
                                index === visibleSubNavItems.length - 1;
                            const dropdownPositionClass =
                                index === 0
                                    ? "left-0"
                                    : isLastNavItem
                                      ? "right-0"
                                      : "left-1/2 -translate-x-1/2";
                            const dropdownId = `nav-dropdown-${index}`;
                            const isDropdownFocused =
                                focusedDropdown === item.label;

                            if (hasDropdown) {
                                return (
                                    // biome-ignore lint/a11y/noStaticElementInteractions: focus wrapper only observes focus-within to mirror aria-expanded for keyboard users; the interactive control is the child <Link>, not this div
                                    <div
                                        key={item.href}
                                        className="group relative flex h-full items-center"
                                        onFocus={(e) => {
                                            // Only reflect aria-expanded for
                                            // keyboard focus (matches the
                                            // :focus-visible CSS that opens the
                                            // panel); mouse clicks do not.
                                            if (
                                                (
                                                    e.target as HTMLElement
                                                ).matches?.(":focus-visible")
                                            ) {
                                                setFocusedDropdown(item.label);
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (
                                                !e.currentTarget.contains(
                                                    e.relatedTarget as Node | null,
                                                )
                                            ) {
                                                setFocusedDropdown(null);
                                            }
                                        }}
                                    >
                                        <Link
                                            href={buildMenuHref(item)}
                                            target={item.target}
                                            rel={
                                                item.target === "_blank"
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={isDropdownFocused}
                                            aria-controls={dropdownId}
                                            className={`relative inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold uppercase tracking-wide transition-opacity duration-200 hover:opacity-70 ${
                                                isLight
                                                    ? "text-brand-brown"
                                                    : "text-white"
                                            }`}
                                        >
                                            {item.label}
                                            <CaretDownIcon
                                                size={10}
                                                weight="bold"
                                                aria-hidden="true"
                                                className="transition-transform duration-200 group-hover:rotate-180"
                                            />
                                        </Link>
                                        <div className="pointer-events-none fixed top-36 right-0 bottom-0 left-0 z-40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100" />
                                        <span
                                            className={`absolute top-full h-2 w-[19rem] ${dropdownPositionClass}`}
                                            aria-hidden="true"
                                        />
                                        <div
                                            id={dropdownId}
                                            className={`font-century-v2 pointer-events-none absolute top-[calc(100%+0.5rem)] z-50 w-[19rem] translate-y-2 rounded-sm border border-white/50 bg-white/72 px-8 py-6 opacity-0 shadow-[0_22px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:pointer-events-auto group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 ${dropdownPositionClass}`}
                                        >
                                            <div className="flex flex-col gap-4.5">
                                                {item.submenu?.map(
                                                    (subItem) => (
                                                        <div
                                                            key={`${item.href}-${subItem.label}`}
                                                        >
                                                            {renderNavItemLink(
                                                                subItem,
                                                                "block text-base font-semibold leading-none text-stone-800 opacity-100 transition-opacity duration-200 hover:opacity-90",
                                                            )}
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.href}
                                    href={localizeHref(item.href, locale)}
                                    target={item.target}
                                    rel={
                                        item.target === "_blank"
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className={`relative flex flex-col items-center whitespace-nowrap transition-opacity duration-200 hover:opacity-70 ${
                                        isLight
                                            ? "text-brand-brown"
                                            : "text-white"
                                    } text-sm font-semibold uppercase`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                }
            </m.header>

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
                            className="fixed inset-0 z-50 cursor-default bg-[rgba(14,18,24,0.24)] backdrop-blur-[3px]"
                            onClick={closeMenu}
                            aria-label={copy.closeMenuAria}
                        />

                        <m.div
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
                                        {copy.menuLabel}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={closeMenu}
                                        className="text-2xl leading-none cursor-pointer text-stone-400 transition-colors duration-200 hover:text-brand-brown"
                                        aria-label={copy.closeMenuAria}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <m.nav
                                    variants={menuListVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="flex flex-1 flex-col overflow-y-auto px-6 py-5"
                                >
                                    {visibleMobileNavItems.map((item) => {
                                        const isSubmenuOpen =
                                            activeSubmenu === item.label;

                                        return item.submenu ? (
                                            <m.div
                                                key={item.label}
                                                variants={menuItemVariants}
                                            >
                                                <div className="flex w-full items-center justify-between">
                                                    {renderNavItemLink(
                                                        item,
                                                        "py-3 text-sm transition-colors hover:text-brand-brown",
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveSubmenu(
                                                                isSubmenuOpen
                                                                    ? null
                                                                    : item.label,
                                                            )
                                                        }
                                                        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-end text-xl leading-none text-[#96908D]"
                                                        aria-label={item.label}
                                                    >
                                                        <span
                                                            className={`transition-transform duration-300 ${isSubmenuOpen ? "translate-x-1 rotate-90" : ""}`}
                                                        >
                                                            &rsaquo;
                                                        </span>
                                                    </button>
                                                </div>
                                                <m.div
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
                                                                <div
                                                                    key={`${item.href}-${sub.label}`}
                                                                >
                                                                    {renderNavItemLink(
                                                                        sub,
                                                                        "block py-2 text-sm text-[#96908D] transition-colors hover:text-brand-brown",
                                                                    )}
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </m.div>
                                            </m.div>
                                        ) : (
                                            <m.div
                                                key={item.href}
                                                variants={menuItemVariants}
                                            >
                                                {renderNavItemLink(
                                                    item,
                                                    "block py-3 text-sm transition-colors hover:text-brand-brown",
                                                )}
                                                {item.lineBelow && (
                                                    <div className="my-1 border-b border-stone-200" />
                                                )}
                                            </m.div>
                                        );
                                    })}
                                </m.nav>
                                <m.div
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
                                        href={`https://guest.travelline.ru/guest-account/41018/profile/login${locale === "en" ? "?lang=en" : ""}`}
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
                                        {copy.loginButton}
                                    </a>
                                    <Button
                                        href={localizeHref("/booking/", locale)}
                                        variant="primary"
                                        size="xs"
                                    >
                                        {copy.bookButton}
                                    </Button>
                                    <a
                                        href={HOTEL_CONTACTS.telephoneHref}
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
                                        {HOTEL_CONTACTS.telephoneDisplay}
                                    </a>
                                    <SocialLinks className="justify-center" />
                                </m.div>
                            </div>
                        </m.div>

                        <div className="pointer-events-none fixed inset-y-0 left-0 z-[60] hidden xl:flex items-start gap-2 p-2">
                            <m.div
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
                                        {copy.menuLabel}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={closeMenu}
                                        className="text-2xl leading-none cursor-pointer text-stone-400 transition-colors duration-200 hover:text-brand-brown"
                                        aria-label={copy.closeMenuAria}
                                    >
                                        &times;
                                    </button>
                                </div>

                                <m.nav
                                    variants={menuListVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="relative flex flex-col px-6 pb-6"
                                >
                                    {navItems.map((item) => {
                                        const isSubmenuOpen =
                                            activeSubmenu === item.label;

                                        return item.submenu ? (
                                            <m.div
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
                                                    className="flex w-full items-center justify-between py-3 text-left cursor-pointer text-sm transition-colors hover:text-brand-brown"
                                                >
                                                    <span>{item.label}</span>
                                                    <span
                                                        className={`text-xl text-[#96908D] leading-none transition-transform duration-300 ${isSubmenuOpen ? "translate-x-1 rotate-90" : ""}`}
                                                    >
                                                        &rsaquo;
                                                    </span>
                                                </button>
                                            </m.div>
                                        ) : (
                                            <m.div
                                                key={item.href}
                                                variants={menuItemVariants}
                                            >
                                                {renderNavItemLink(
                                                    item,
                                                    "block py-3 text-sm transition-colors hover:text-brand-brown",
                                                )}
                                                {item.lineBelow && (
                                                    <div className="border-b border-stone-200" />
                                                )}
                                            </m.div>
                                        );
                                    })}
                                </m.nav>

                                <m.div
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
                                        href={`https://guest.travelline.ru/guest-account/41018/profile/login${locale === "en" ? "?lang=en" : ""}`}
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
                                        {copy.loginButton}
                                    </a>
                                    <Button
                                        href={localizeHref("/booking/", locale)}
                                        variant="primary"
                                    >
                                        {copy.bookButton}
                                    </Button>
                                    <a
                                        href={HOTEL_CONTACTS.telephoneHref}
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
                                        {HOTEL_CONTACTS.telephoneDisplay}
                                    </a>
                                    <SocialLinks className="justify-center" />
                                </m.div>
                            </m.div>

                            <AnimatePresence>
                                {activeSubmenuItems.length > 0 && (
                                    <m.div
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
                                        <m.div
                                            variants={submenuListVariants}
                                            initial="hidden"
                                            animate="show"
                                            className="relative flex flex-col gap-1"
                                        >
                                            {activeSubmenuItems.map((sub) => (
                                                <m.div
                                                    key={sub.href}
                                                    variants={
                                                        submenuItemVariants
                                                    }
                                                >
                                                    <Link
                                                        href={localizeHref(
                                                            sub.href,
                                                            locale,
                                                        )}
                                                        target={sub.target}
                                                        rel={
                                                            sub.target ===
                                                            "_blank"
                                                                ? "noopener noreferrer"
                                                                : undefined
                                                        }
                                                        onClick={closeMenu}
                                                        className="block py-2 text-sm transition-colors hover:text-brand-brown"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                </m.div>
                                            ))}
                                        </m.div>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
