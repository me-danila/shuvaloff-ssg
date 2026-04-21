"use client";

import Link from "next/link";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SocialLinks from "@/components/ui/SocialLinks";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

const NAV_LINKS = {
    ru: [
        {
            label: "Визовая поддержка",
            href: "https://www.bpltech.pro/guest_form/add/175a67939d61a46c4228b74d23823863/1/start/english/no#bplformtopiframewindow",
        },
        {
            label: "Сайт коллекции отелей ACADEMIA в особняках",
            href: "https://academia.spb.ru",
        },
        { label: "Стать собственником", href: "https://academia-suites.ru" },
    ],
    en: [
        {
            label: "Visa support",
            href: "https://www.bpltech.pro/guest_form/add/175a67939d61a46c4228b74d23823863/1/start/english/no#bplformtopiframewindow",
        },
        {
            label: "ACADEMIA mansion hotels collection",
            href: "https://academia.spb.ru",
        },
        { label: "Become an owner", href: "https://academia-suites.ru" },
    ],
} as const;

const LEGAL_LINKS = {
    ru: [
        {
            label: "Политика обработки персональных данных",
            href: "/policy/",
        },
        { label: "Правовая информация", href: "/legal/" },
    ],
    en: [
        {
            label: "Personal data policy",
            href: "/policy/",
        },
        { label: "Legal information", href: "/legal/" },
    ],
} as const;

export default function Footer() {
    const locale = useLocale();
    const navLinks = NAV_LINKS[locale];
    const legalLinks = LEGAL_LINKS[locale];
    const homeAria = locale === "ru" ? "На главную" : "Back to homepage";
    const logoAlt =
        locale === "ru"
            ? "ACADEMIA Особняк Шувалова"
            : "ACADEMIA Mansion Shuvaloff";
    const socialText =
        locale === "ru"
            ? "Присоединяйтесь к нам в соцсетях, чтобы первыми узнавать все анонсы, новости и спецпредложения!"
            : "Follow us on social media to be the first to know about announcements, news, and special offers.";
    const copyrightText =
        locale === "ru"
            ? "© 2026 Отель «ACADEMIA Особняк Шувалова», «ACADEMILAND»"
            : "© 2026 ACADEMIA Mansion Shuvaloff Hotel, ACADEMILAND";
    const cityText =
        locale === "ru" ? "®, г. Санкт-Петербург" : "®, Saint Petersburg";

    return (
        <footer className="mt-12 xl:mt-20 bg-[#1e2b3c] w-full">
            {/* ── Desktop ── */}
            <div className="hidden md:block max-w-6xl mx-auto py-12">
                <StaggerContainer
                    mode="inView"
                    delay={0.05}
                    staggerChildren={0.12}
                    className="grid grid-cols-[1fr_1fr_280px] gap-6"
                >
                    {/* R1C1 — Logo */}
                    <StaggerItem y={0}>
                        <Link
                            href={localizeHref("/", locale)}
                            aria-label={homeAria}
                        >
                            <Image
                                src="/logo.svg"
                                alt={logoAlt}
                                width={130}
                                height={44}
                                className="brightness-0 invert opacity-70 hover:opacity-90 transition duration-200"
                            />
                        </Link>
                    </StaggerItem>

                    {/* R1C2 — Nav */}
                    <StaggerItem y={12} className="flex flex-col">
                        {navLinks.map(({ label, href }) => (
                            <span key={href}>
                                <Link
                                    href={href}
                                    target="_blank"
                                    className="text-white/90 hover:text-white transition-colors text-xs"
                                >
                                    {label}
                                </Link>
                            </span>
                        ))}
                    </StaggerItem>

                    {/* R1C3 — Social text */}
                    <StaggerItem y={18} className="text-white/90 text-xs/6">
                        {socialText}
                    </StaggerItem>

                    {/* R2C1 — Copyright */}
                    <StaggerItem y={0} className="text-white/50 text-xs/5">
                        {copyrightText}
                        <br />
                        {cityText}
                    </StaggerItem>

                    {/* R2C2 — Legal links */}
                    <StaggerItem y={12} className="flex flex-col gap-1">
                        {legalLinks.map(({ label, href }) => (
                            <Link
                                key={href}
                                //                                href={localizeHref(href, locale)}
                                // this pages temporary are only in russian so localization is ignored
                                href={href}
                                className="text-white/40 hover:text-white/70 transition-colors text-xs"
                            >
                                {label}
                            </Link>
                        ))}
                    </StaggerItem>

                    {/* R2C3 — Social icons */}
                    <StaggerItem y={18}>
                        <SocialLinks invert />
                    </StaggerItem>
                </StaggerContainer>
            </div>

            {/* ── Mobile ── */}
            <div className="md:hidden max-w-120 mx-auto px-6 py-12">
                <FadeUp mode="inView" y={0}>
                    <ul className="flex flex-col items-center gap-2 text-center text-sm">
                        {navLinks.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    target="_blank"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </FadeUp>

                <FadeUp
                    mode="inView"
                    delay={0.1}
                    className="flex flex-col items-center text-center my-10 gap-6 max-w-xs mx-auto"
                    y={18}
                >
                    <p className="text-white/90 text-sm">{socialText}</p>
                    <div className="flex gap-4">
                        <SocialLinks invert />
                    </div>
                </FadeUp>

                <FadeUp
                    mode="inView"
                    delay={0.2}
                    className="flex flex-col items-center gap-4 text-center"
                    y={10}
                >
                    <p className="text-white/50 text-[12px] leading-snug">
                        {copyrightText}
                        <br />
                        {cityText}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                        {legalLinks.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={localizeHref(href, locale)}
                                className="text-white/40 hover:text-white/70 transition-colors text-[12px]"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </FadeUp>
            </div>
        </footer>
    );
}
