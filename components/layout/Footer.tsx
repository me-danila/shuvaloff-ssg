import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
    {
        label: "Визовая поддержка",
        href: "https://www.bpltech.pro/guest_form/add/175a67939d61a46c4228b74d23823863/1/start/english/no#bplformtopiframewindow",
    },
    {
        label: "Сайт коллекции отелей ACADEMIA в особняках",
        href: "https://academia.spb.ru",
    },
    { label: "Стать собственником", href: "https://academia-suites.ru" },
];

const LEGAL_LINKS = [
    {
        label: "Политика обработки персональных данных",
        href: "/policy/",
    },
    { label: "Правовая информация", href: "/legal/" },
];

const SOCIAL_LINKS = [
    {
        label: "Telegram",
        href: "https://t.me/academia_land_hotels",
        icon: "/icons/tg-icon.svg",
    },
    {
        label: "ВКонтакте",
        href: "https://vk.com/academia.hotels",
        icon: "/icons/vk-icon.svg",
    },
    {
        label: "Дзен",
        href: "https://dzen.ru/id/68d159b4a453c61d666c47fb",
        icon: "/icons/zen-icon.svg",
    },
];

export default function Footer() {
    return (
        <footer className="mt-12 xl:mt-20 bg-[#1e2b3c] w-full">
            {/* ── Desktop ── */}
            <div className="hidden md:block max-w-6xl mx-auto py-12">
                <div className="grid grid-cols-[1fr_1fr_280px] gap-6">
                    {/* R1C1 — Logo */}
                    <div>
                        <Link href="/" aria-label="На главную">
                            <Image
                                src="/logo.svg"
                                alt="ACADEMIA Особняк SHUVALOFF"
                                width={130}
                                height={44}
                                className="brightness-0 invert opacity-70 hover:opacity-90 transition duration-200"
                            />
                        </Link>
                    </div>

                    {/* R1C2 — Nav */}
                    <ul className="flex flex-col">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    target="_blank"
                                    className="text-white/90 hover:text-white transition-colors text-xs"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* R1C3 — Social text */}
                    <p className="text-white/90 text-xs/6">
                        Присоединяйтесь к&nbsp;нам в&nbsp;соцсетях, чтобы
                        первыми узнавать все анонсы, новости
                        и&nbsp;спецпредложения!
                    </p>

                    {/* R2C1 — Copyright */}
                    <p className="text-white/50 text-xs/5">
                        © 2026 Отель «ACADEMIA Особняк Шувалова», «ACADEMILAND»
                        <br />
                        ®, г. Санкт-Петербург
                    </p>

                    {/* R2C2 — Legal links */}
                    <div className="flex flex-col gap-1">
                        {LEGAL_LINKS.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-white/40 hover:text-white/70 transition-colors text-xs"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* R2C3 — Social icons */}
                    <div className="flex items-start gap-4">
                        {SOCIAL_LINKS.map(({ label, href, icon }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                                <Image
                                    src={icon}
                                    alt={label}
                                    width={28}
                                    height={28}
                                    className="brightness-0 invert"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Mobile ── */}
            <div className="md:hidden max-w-120 mx-auto px-6 py-12">
                {/* Nav */}
                <ul className="flex flex-col items-center gap-2 text-center text-sm">
                    {NAV_LINKS.map(({ label, href }) => (
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

                {/* Social */}
                <div className="flex flex-col items-center text-center my-10 gap-6 max-w-xs mx-auto">
                    <p className="text-white/90 text-sm">
                        Присоединяйтесь к&nbsp;нам в&nbsp;соцсетях, чтобы
                        первыми узнавать все анонсы, новости
                        и&nbsp;спецпредложения!
                    </p>
                    <div className="flex gap-4">
                        {SOCIAL_LINKS.map(({ label, href, icon }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                                <Image
                                    src={icon}
                                    alt={label}
                                    width={28}
                                    height={28}
                                    className="brightness-0 invert"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Copyright + legal */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-white/50 text-[12px] leading-snug">
                        © 2026 Отель «ACADEMIA Особняк Шувалова», «ACADEMILAND»
                        <br />
                        ®, г. Санкт-Петербург
                    </p>
                    <div className="flex flex-col items-center gap-2">
                        {LEGAL_LINKS.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-white/40 hover:text-white/70 transition-colors text-[12px]"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
