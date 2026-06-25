"use client";

import { PlayIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SocialLinks from "@/components/ui/SocialLinks";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/seo/site";

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
        { label: "Политика обработки персональных данных", href: "/policy/" },
        { label: "Правовая информация", href: "/legal/" },
    ],
    en: [
        { label: "Personal data policy", href: "/policy/" },
        { label: "Legal information", href: "/legal/" },
    ],
} as const;

const RATING_IMG = "https://academia.spb.ru/wp-content/uploads/2026/06/10.png";

export default function FooterV2() {
    const locale = useLocale();
    const navLinks = NAV_LINKS[locale];
    const legalLinks = LEGAL_LINKS[locale];
    const homeAria = locale === "ru" ? "На главную" : "Back to homepage";
    const logoAlt =
        locale === "ru"
            ? "ACADEMIA Особняк Шувалова"
            : "ACADEMIA Mansion Shuvaloff";
    const ratingAlt =
        locale === "ru" ? "Отлично, 5000 отзывов" : "Excellent, 5000 reviews";
    const socialText =
        locale === "ru"
            ? "Присоединяйтесь к нам в соцсетях, чтобы первыми узнавать все анонсы, новости и спецпредложения!"
            : "Follow us on social media to be the first to know about announcements, news, and special offers.";
    const copyrightText =
        locale === "ru"
            ? "© 2026 Отель «ACADEMIA Особняк SHUVALOFF», «ACADEMILAND»"
            : "© 2026 ACADEMIA Mansion Shuvaloff Hotel, ACADEMILAND";
    const cityText =
        locale === "ru" ? "®, г. Санкт-Петербург" : "®, Saint Petersburg";
    const copyrightLine1 =
        locale === "ru"
            ? "© 2026 Отель «ACADEMIA Особняк SHUVALOFF»,"
            : "© 2026 ACADEMIA Mansion Shuvaloff Hotel,";
    const copyrightLine2 =
        locale === "ru"
            ? "«ACADEMILAND» ®, г. Санкт-Петербург"
            : "ACADEMILAND ®, Saint Petersburg";

    const newsletterTitle =
        locale === "ru" ? "Ежемесячная рассылка" : "Monthly newsletter";
    const newsletterText =
        locale === "ru"
            ? "Подпишитесь, чтобы получать актуальную информацию о главных событиях и мероприятиях отеля."
            : "Subscribe to our monthly newsletter for the latest news on hotel events, concierge recommendations and engaging video content.";
    const consentPrefix =
        locale === "ru"
            ? "Подписавшись, вы соглашаетесь с "
            : "By subscribing, you agree to the ";
    const consentLink =
        locale === "ru" ? "Политикой конфиденциальности" : "Privacy Policy";
    const consentSuffix =
        locale === "ru"
            ? " Академиа Особняк Шувалова"
            : " of ACADEMIA Shuvaloff";

    // Десктоп: кнопка отдельным блоком. Мобайл: кнопка внутри поля.
    const SubscribeForm = ({ inset = false }: { inset?: boolean }) =>
        inset ? (
            <form onSubmit={(e) => e.preventDefault()} className="relative">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md bg-white py-3.5 pl-4 pr-14 text-sm text-stone-800 placeholder:text-stone-400 outline-none"
                />
                <button
                    type="submit"
                    aria-label={locale === "ru" ? "Подписаться" : "Subscribe"}
                    className="absolute inset-y-1.5 right-1.5 flex items-center justify-center rounded-md bg-[#5c1f26] px-3 text-white cursor-pointer transition-colors duration-300 hover:bg-[#46161c]"
                >
                    <PlayIcon size={16} weight="fill" />
                </button>
            </form>
        ) : (
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-stretch gap-2"
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="min-w-0 flex-1 rounded-md bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none"
                />
                <button
                    type="submit"
                    aria-label={locale === "ru" ? "Подписаться" : "Subscribe"}
                    className="flex shrink-0 items-center justify-center rounded-md bg-[#5c1f26] px-4 text-white cursor-pointer transition-colors duration-300 hover:bg-[#46161c]"
                >
                    <PlayIcon size={18} weight="fill" />
                </button>
            </form>
        );

    const Consent = () => (
        <p className="text-white/40 text-xs leading-normal">
            {consentPrefix}
            <Link href="/policy/" className="text-white/60 underline">
                {consentLink}
            </Link>
            {consentSuffix}
        </p>
    );

    return (
        <footer
            className="mt-12 xl:mt-20 bg-[#372A24] w-full font-century-v2"
            itemScope
            itemType="https://schema.org/Hotel"
        >
            <meta
                itemProp="name"
                content={
                    locale === "ru"
                        ? "ACADEMIA Особняк Шувалова"
                        : "ACADEMIA Mansion Shuvaloff"
                }
            />
            <meta itemProp="url" content={SITE_URL} />
            {SOCIAL_LINKS.map((href) => (
                <meta key={href} itemProp="sameAs" content={href} />
            ))}

            {/* ── Desktop ── рассылка справа, рейтинг+соцсети в центре */}
            <div className="hidden md:block">
                <div className="mx-auto max-w-6xl py-12">
                    <StaggerContainer
                        mode="inView"
                        delay={0.05}
                        staggerChildren={0.08}
                        className="grid grid-cols-[1fr_1fr_400px] gap-x-16 gap-y-8 items-start text-xs leading-snug text-white/80"
                    >
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
                                    className="brightness-0 invert opacity-70 transition duration-200 hover:opacity-90"
                                />
                            </Link>
                        </StaggerItem>

                        <StaggerItem
                            y={0}
                            className="col-start-3 row-span-2 flex flex-col gap-3"
                        >
                            <p className="mb-[-0.5rem] text-sm font-semibold leading-snug text-white/80">
                                {newsletterTitle}
                            </p>
                            <p className="text-xs leading-snug text-white/80">
                                {newsletterText}
                            </p>
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex w-[228px] items-stretch gap-2"
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="h-10 min-w-0 flex-1 rounded-md bg-white px-3 text-xs text-stone-800 placeholder:text-stone-400 outline-none"
                                />
                                <button
                                    type="submit"
                                    aria-label={
                                        locale === "ru"
                                            ? "Подписаться"
                                            : "Subscribe"
                                    }
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#5c1f26] text-white transition-colors duration-300 hover:bg-[#46161c]"
                                >
                                    <PlayIcon size={16} weight="fill" />
                                </button>
                            </form>
                            <p className="text-xs leading-snug text-white/50">
                                {consentPrefix}
                                <Link
                                    href="/policy/"
                                    className="text-white/60 underline transition-colors hover:text-white/80"
                                >
                                    {consentLink}
                                </Link>
                                {consentSuffix}
                            </p>
                        </StaggerItem>

                        <StaggerItem
                            y={0}
                            className="col-start-2 row-start-1 flex justify-start"
                        >
                            <Image
                                src={RATING_IMG}
                                alt={ratingAlt}
                                width={169}
                                height={35}
                                className="brightness-0 invert"
                            />
                        </StaggerItem>

                        <StaggerItem
                            y={12}
                            className="col-start-1 row-start-2 flex flex-col gap-1.5"
                        >
                            {navLinks.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    {label}
                                </Link>
                            ))}
                        </StaggerItem>

                        <StaggerItem
                            y={12}
                            className="col-start-2 row-start-2 flex flex-col gap-5"
                        >
                            <p className="text-xs leading-snug text-white/80">
                                {socialText}
                            </p>
                            <SocialLinks invert />
                        </StaggerItem>

                        <div className="col-span-3 flex flex-wrap items-start gap-x-8 gap-y-2 border-t border-white/10 pt-5">
                            <StaggerItem
                                y={0}
                                className="text-xs leading-snug text-white/50"
                            >
                                {copyrightText} {cityText}
                            </StaggerItem>

                            <StaggerItem
                                y={0}
                                className="flex flex-wrap gap-x-6 gap-y-1 justify-self-start"
                            >
                                {legalLinks.map(({ label, href }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="text-white/50 transition-colors hover:text-white/75"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </StaggerItem>
                        </div>
                    </StaggerContainer>
                </div>
            </div>

            {/* ── Desktop v5 ── 3×3: лого/нав/копи · пусто/соцсети/легал · рейтинг/рассылка */}
            <div className="hidden md:block border-t border-white/10">
                <div className="mx-auto max-w-6xl py-12">
                    <StaggerContainer
                        mode="inView"
                        delay={0.05}
                        staggerChildren={0.08}
                        className="grid grid-cols-[1fr_1fr_400px] gap-x-16 gap-y-8 items-start text-xs leading-snug text-white/80"
                    >
                        {/* Колонка 1 */}
                        <StaggerItem y={0} className="col-start-1 row-start-1">
                            <Link
                                href={localizeHref("/", locale)}
                                aria-label={homeAria}
                            >
                                <Image
                                    src="/logo.svg"
                                    alt={logoAlt}
                                    width={130}
                                    height={44}
                                    className="brightness-0 invert opacity-70 transition duration-200 hover:opacity-90"
                                />
                            </Link>
                        </StaggerItem>

                        <StaggerItem
                            y={12}
                            className="col-start-1 row-start-2 flex flex-col gap-1.5"
                        >
                            {navLinks.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    {label}
                                </Link>
                            ))}
                        </StaggerItem>

                        <StaggerItem
                            y={0}
                            className="col-start-1 row-start-3 text-xs leading-snug text-white/50"
                        >
                            {copyrightText} {cityText}
                        </StaggerItem>

                        {/* Колонка 2 */}
                        <StaggerItem
                            y={12}
                            className="col-start-2 row-start-2 flex flex-col gap-5"
                        >
                            <p className="text-xs leading-snug text-white/80">
                                {socialText}
                            </p>
                            <SocialLinks invert />
                        </StaggerItem>

                        <StaggerItem
                            y={0}
                            className="col-start-2 row-start-3 flex flex-wrap gap-x-6 gap-y-1"
                        >
                            {legalLinks.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-white/50 transition-colors hover:text-white/75"
                                >
                                    {label}
                                </Link>
                            ))}
                        </StaggerItem>

                        {/* Колонка 3 */}
                        <StaggerItem
                            y={0}
                            className="col-start-3 row-start-1 flex justify-start"
                        >
                            <Image
                                src={RATING_IMG}
                                alt={ratingAlt}
                                width={169}
                                height={35}
                                className="brightness-0 invert"
                            />
                        </StaggerItem>

                        <StaggerItem
                            y={0}
                            className="col-start-3 row-start-2 row-span-2 flex flex-col gap-3"
                        >
                            <p className="mb-[-0.5rem] text-sm font-semibold leading-snug text-white/80">
                                {newsletterTitle}
                            </p>
                            <p className="text-xs leading-snug text-white/80">
                                {newsletterText}
                            </p>
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex w-[228px] items-stretch gap-2"
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="h-10 min-w-0 flex-1 rounded-md bg-white px-3 text-xs text-stone-800 placeholder:text-stone-400 outline-none"
                                />
                                <button
                                    type="submit"
                                    aria-label={
                                        locale === "ru"
                                            ? "Подписаться"
                                            : "Subscribe"
                                    }
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#5c1f26] text-white transition-colors duration-300 hover:bg-[#46161c]"
                                >
                                    <PlayIcon size={16} weight="fill" />
                                </button>
                            </form>
                            <p className="text-xs leading-snug text-white/50">
                                {consentPrefix}
                                <Link
                                    href="/policy/"
                                    className="text-white/60 underline transition-colors hover:text-white/80"
                                >
                                    {consentLink}
                                </Link>
                                {consentSuffix}
                            </p>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </div>

            {/* ── Mobile ── */}
            <div className="md:hidden max-w-120 mx-auto px-6 py-12">
                <FadeUp mode="inView" y={0} className="flex justify-center">
                    <Link
                        href={localizeHref("/", locale)}
                        aria-label={homeAria}
                    >
                        <Image
                            src="/logo.svg"
                            alt={logoAlt}
                            width={130}
                            height={44}
                            className="brightness-0 invert opacity-70"
                        />
                    </Link>
                </FadeUp>

                <FadeUp mode="inView" delay={0.05} y={10}>
                    <ul className="flex flex-col items-center gap-2 text-center text-sm mt-8">
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
                    <SocialLinks invert />
                </FadeUp>

                <FadeUp
                    mode="inView"
                    delay={0.12}
                    y={10}
                    className="flex justify-center"
                >
                    <Image
                        src={RATING_IMG}
                        alt={ratingAlt}
                        width={169}
                        height={35}
                        className="brightness-0 invert"
                    />
                </FadeUp>

                {/* Подписка — враппер */}
                <FadeUp
                    mode="inView"
                    delay={0.15}
                    y={12}
                    className="mt-10 rounded-2xl bg-white/5 p-6 flex flex-col gap-3 text-center"
                >
                    <p className="text-white text-base font-semibold leading-none">
                        {newsletterTitle}
                    </p>
                    <p className="text-white/90 text-xs leading-snug pb-1">
                        {newsletterText}
                    </p>
                    <SubscribeForm inset />
                    <Consent />
                </FadeUp>

                <FadeUp
                    mode="inView"
                    delay={0.2}
                    className="flex flex-col items-center gap-4 text-center mt-10"
                    y={10}
                >
                    <div className="flex flex-col items-center gap-2">
                        {legalLinks.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-white/40 hover:text-white/70 transition-colors text-[12px]"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                    <p className="text-white text-[12px] leading-snug">
                        {copyrightText}
                        <br />
                        {cityText}
                    </p>
                </FadeUp>
            </div>
        </footer>
    );
}
