import Button from "@/components/ui/Button";
import Image from "@/components/ui/OptimizedImage";
import { LANDING_LANGUAGE_NAMES, type LandingDictionary } from "@/data/landing";
import { LANDING_LOCALES, LANDING_PATHS } from "@/lib/i18n/routing";

/**
 * Хедер лендинга — каркас до ТЗ: лого, переключатель языков лендингов
 * (как мобильный RU/ENG основного хедера), кнопка бронирования — Button. Переключатель ведёт только между лендингами
 * (EN → /en/visit/, не на полный /en/).
 */
export default function LandingHeader({ dict }: { dict: LandingDictionary }) {
    return (
        <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
                <a href={LANDING_PATHS[dict.locale]}>
                    <Image
                        src="/logo.svg"
                        alt="ACADEMIA Mansion Shuvaloff"
                        width={130}
                        height={33}
                    />
                </a>
                <nav aria-label={dict.ui.languageSwitcherLabel}>
                    <ul className="flex items-center gap-3 text-sm uppercase text-brand-brown">
                        {LANDING_LOCALES.map((l) => (
                            <li key={l}>
                                <a
                                    href={LANDING_PATHS[l]}
                                    hrefLang={l}
                                    lang={l}
                                    title={LANDING_LANGUAGE_NAMES[l]}
                                    aria-current={
                                        l === dict.locale ? "page" : undefined
                                    }
                                    className={`font-medium ${l === dict.locale ? "text-brand-brown" : "opacity-80 hover:opacity-100"}`}
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
        </header>
    );
}
