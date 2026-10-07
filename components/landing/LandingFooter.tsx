import { Fragment } from "react";
import Image from "@/components/ui/OptimizedImage";
import SocialLinks from "@/components/ui/SocialLinks";
import { LANDING_LANGUAGE_NAMES, type LandingDictionary } from "@/data/landing";
import { LANDING_PATHS } from "@/lib/i18n/routing";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/seo/site";

/**
 * Порядок как в ТЗ (RU · IT · FR · ES · DE), EN — после RU. RU — полный
 * русский сайт, остальные — лендинги.
 */
const LANGUAGES = [
    { code: "ru", href: "/", name: "Русский" },
    ...(["en", "it", "fr", "es", "de"] as const).map((code) => ({
        code,
        href: LANDING_PATHS[code],
        name: LANDING_LANGUAGE_NAMES[code],
    })),
];

// Размеры — как в Footer основного сайта: мобила — крупнее (text-sm,
// white/90, заголовок как «Ежемесячная рассылка»), десктоп — text-xs.
const HEADING_CLASS =
    "text-base font-semibold leading-none text-white md:text-sm md:leading-snug md:text-white/80";
// Явно: глобальные стили p/ul иначе дают 14–16px.
const TEXT_CLASS = "text-sm leading-snug md:text-xs";

/**
 * Футер лендинга. Цвета, логотип, соцсети и юр. строки — как в футере
 * основного сайта (Footer), но без рассылки и ссылок коллекции: колонки по
 * ТЗ — языки, соцсети, юридическая информация. Статичный.
 *
 * Десктоп (md+): 4 колонки — логотип / языки / соцсети / юр. ссылки, под
 * ними строка с копирайтом и юрлицом. Мобила: единый список по центру.
 * Юр. документы — только на русском: ссылки на RU-страницы /policy/ и
 * /legal/ (hrefLang="ru").
 */
export default function LandingFooter({
    dict,
    locale,
}: {
    dict: LandingDictionary["footer"];
    locale: LandingDictionary["locale"];
}) {
    return (
        <footer
            className="w-full bg-[#372A24] font-century-v2 text-sm leading-snug text-white/90 md:text-xs md:text-white/80"
            itemScope
            itemType="https://schema.org/Hotel"
        >
            <meta itemProp="name" content="ACADEMIA Mansion Shuvaloff" />
            <meta itemProp="url" content={SITE_URL} />
            {SOCIAL_LINKS.map((href) => (
                <meta key={href} itemProp="sameAs" content={href} />
            ))}

            <div className="mx-auto flex max-w-120 flex-col items-center gap-10 px-6 py-12 text-center md:grid md:max-w-7xl md:grid-cols-4 md:items-start md:gap-x-16 md:gap-y-8 md:text-left xl:px-0">
                <a href="#main-content" aria-label={dict.home}>
                    <Image
                        src="/logo.svg"
                        alt="ACADEMIA Mansion Shuvaloff"
                        width={130}
                        height={44}
                        className="opacity-70 brightness-0 invert transition duration-200 hover:opacity-90"
                    />
                </a>

                <nav
                    aria-labelledby="landing-footer-languages"
                    className="flex flex-col items-center gap-3 md:items-start"
                >
                    <p id="landing-footer-languages" className={HEADING_CLASS}>
                        {dict.languages}
                    </p>
                    <ul
                        className={`flex flex-wrap items-center justify-center gap-x-2 uppercase ${TEXT_CLASS}`}
                    >
                        {LANGUAGES.map(({ code, href, name }, index) => (
                            <Fragment key={code}>
                                {index > 0 && (
                                    <li
                                        aria-hidden="true"
                                        className="text-white/30"
                                    >
                                        ·
                                    </li>
                                )}
                                <li>
                                    <a
                                        href={href}
                                        hrefLang={code}
                                        lang={code}
                                        title={name}
                                        aria-current={
                                            code === locale ? "page" : undefined
                                        }
                                        className={
                                            code === locale
                                                ? "text-white"
                                                : "text-white/60 transition-colors hover:text-white"
                                        }
                                    >
                                        {code}
                                    </a>
                                </li>
                            </Fragment>
                        ))}
                    </ul>
                </nav>

                <div className="flex flex-col items-center gap-3 md:items-start">
                    <p className={HEADING_CLASS}>{dict.social}</p>
                    <p className={`max-w-xs ${TEXT_CLASS}`}>
                        {dict.socialText}
                    </p>
                    <SocialLinks invert />
                </div>

                <div className="flex flex-col items-center gap-3 md:items-start">
                    <p className={HEADING_CLASS}>{dict.legal}</p>
                    <ul
                        className={`flex flex-col gap-2 md:gap-1.5 ${TEXT_CLASS}`}
                    >
                        <li>
                            <a
                                href="/policy/"
                                hrefLang="ru"
                                className="transition-colors hover:text-white"
                            >
                                {dict.policy}
                            </a>
                        </li>
                        <li>
                            <a
                                href="/legal/"
                                hrefLang="ru"
                                className="transition-colors hover:text-white"
                            >
                                {dict.legalInfo}
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-1 text-white md:col-span-4 md:text-white/50 md:flex-row md:gap-8 md:border-t md:border-white/10 md:pt-5">
                    {/* text-xs явно: глобальный стиль p увеличивает шрифт. */}
                    <p className="text-[12px] leading-snug md:text-xs">
                        {dict.copyright}
                    </p>
                    <p className="text-[12px] leading-snug md:text-xs">
                        {dict.company}
                    </p>
                </div>
            </div>
        </footer>
    );
}
