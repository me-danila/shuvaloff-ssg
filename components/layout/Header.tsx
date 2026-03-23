"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

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
        label: "Отель-Особняк",
        href: "/",
        submenu: [
            { label: "Категории номеров", href: "/rooms/" },
            { label: "Исторические люксы", href: "/rooms/historical/" },
            { label: "Специальные предложения", href: "/sales/" },
            { label: "ACADEMIA REWARDS", href: "/rewards/" },
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
        href: "https://static.academia.spb.ru/files/История_Особняка_Шувалова.pdf",
        target: "_blank",
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
    { label: "ACADEMIA REWARDS", href: "/rewards/" },
    {
        label: "Ресторан",
        href: "https://shuvaloff.academia-rest.ru/?utm_source=hotels",
        target: "_blank" as const,
    },
];

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

    const closeMenu = () => {
        setMenuOpen(false);
        setSubmenuOpen(false);
    };

    const isLight = !scrolled;

    return (
        <>
            <div className={`h-22 ${isHome ? "xl:h-26" : "xl:h-36"}`} />

            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 xl:pb-10 ${
                    isLight
                        ? "bg-white"
                        : "bg-linear-to-b from-black/80 via-black/60 to-transparent"
                }`}
            >
                <div className="flex items-center h-14 xl:h-16 px-5 xl:px-8 relative">
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
            </header>

            {/* Оверлей */}
            {menuOpen && (
                <button
                    type="button"
                    className="fixed inset-0 z-50 bg-black/20 cursor-default"
                    onClick={closeMenu}
                    aria-label="Закрыть меню"
                />
            )}

            {/* ===================== МОБАЙЛ offcanvas ===================== */}
            <div
                className={`xl:hidden fixed top-0 left-0 z-50 h-full w-72 bg-white flex flex-col transition-transform duration-300 ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-6 h-14 border-b border-stone-100 shrink-0">
                    <span className="text-xs uppercase tracking-widest text-[#96908D]">
                        Меню
                    </span>
                    <button
                        type="button"
                        onClick={closeMenu}
                        className="text-2xl leading-none cursor-pointer text-stone-400"
                        aria-label="Закрыть меню"
                    >
                        &times;
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto flex flex-col px-6 py-4">
                    {navItems.map((item) =>
                        item.submenu ? (
                            <div key={item.label}>
                                <button
                                    type="button"
                                    onClick={() => setSubmenuOpen((v) => !v)}
                                    className="flex items-center justify-between w-full py-3 text-left cursor-pointer"
                                >
                                    <span className="text-sm">
                                        {item.label}
                                    </span>
                                    <span
                                        className={`text-xl text-[#96908D] transition-transform duration-200 leading-none ${submenuOpen ? "rotate-90" : ""}`}
                                    >
                                        &rsaquo;
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${submenuOpen ? "max-h-96" : "max-h-0"}`}
                                >
                                    <div className="flex flex-col pl-3 pb-2">
                                        {item.submenu.map((sub) => (
                                            <Link
                                                key={sub.href}
                                                href={sub.href}
                                                onClick={closeMenu}
                                                className="py-2 text-sm text-[#96908D] hover:text-brand-blue transition-colors"
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key={item.href}>
                                <Link
                                    href={item.href}
                                    target={item.target}
                                    onClick={closeMenu}
                                    className="block py-3 text-sm hover:text-brand-blue transition-colors"
                                >
                                    {item.label}
                                </Link>
                                {item.lineBelow && (
                                    <div className="border-b border-stone-200 my-1" />
                                )}
                            </div>
                        ),
                    )}
                </nav>
                <div className="px-6 py-5 border-t border-stone-100 flex flex-col gap-3 shrink-0">
                    <Button href="/booking/" variant="primary">
                        Забронировать
                    </Button>
                    <a
                        href="https://guest.travelline.ru/guest-account/41018/profile/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm justify-center text-stone-600"
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
                </div>
            </div>

            {/* ===================== ДЕСКТОП offcanvas ===================== */}
            <div
                className={`hidden xl:flex fixed top-0 left-0 z-50 transition-transform duration-300 ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Основная панель — авто высота */}
                <div
                    className="relative bg-white w-64 flex flex-col min-h-137.5 rounded m-1"
                    style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
                >
                    <div className="flex items-center justify-between px-6 h-16 shrink-0">
                        <span className="text-xs uppercase tracking-widest text-[#96908D]">
                            Меню
                        </span>
                        <button
                            type="button"
                            onClick={closeMenu}
                            className="text-2xl leading-none cursor-pointer text-stone-400 hover:text-stone-700"
                            aria-label="Закрыть меню"
                        >
                            &times;
                        </button>
                    </div>

                    <nav className="flex flex-col px-6 pb-6">
                        {navItems.map((item) =>
                            item.submenu ? (
                                <div key={item.label}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSubmenuOpen((v) => !v)
                                        }
                                        className="flex items-center justify-between w-full py-3 text-left cursor-pointer text-sm hover:text-brand-blue transition-colors"
                                    >
                                        <span>{item.label}</span>
                                        <span className="text-xl text-[#96908D] leading-none">
                                            &rsaquo;
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <div key={item.href}>
                                    <Link
                                        href={item.href}
                                        target={item.target}
                                        onClick={closeMenu}
                                        className="block py-3 text-sm hover:text-brand-blue transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                    {item.lineBelow && (
                                        <div className="border-b border-stone-200" />
                                    )}
                                </div>
                            ),
                        )}
                    </nav>

                    <div className="px-6 pb-6 flex flex-col gap-3 mt-auto">
                        <Button href="/booking/" variant="primary">
                            Забронировать
                        </Button>
                        <a
                            href="https://guest.travelline.ru/guest-account/41018/profile/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm justify-center text-stone-600"
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
                    </div>
                </div>

                {/* Абсолютное подменю — рядом с панелью */}
                {submenuOpen && (
                    <div
                        className="bg-white w-60 py-4 px-6 flex flex-col gap-1 self-start mt-20 -ml-2 z-1 rounded"
                        style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.25)" }}
                    >
                        {navItems[0].submenu?.map((sub) => (
                            <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={closeMenu}
                                className="py-2 text-sm hover:text-brand-blue transition-colors"
                            >
                                {sub.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
