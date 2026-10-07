import SkipLink from "@/components/a11y/SkipLink";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";
import type { LandingDictionary } from "@/data/landing";

/**
 * Chrome лендингов (/en/visit/, /it/, /de/, /fr/, /es/). Полностью отдельный
 * от SiteShell основного сайта: свой хедер, футер и скип-линк. Скрипты из
 * корневого layout (TravelLine, колтрекинг, Метрика, HotBot) работают и тут.
 */
export default function LandingShell({
    dict,
    children,
}: {
    dict: LandingDictionary;
    children: React.ReactNode;
}) {
    return (
        <>
            <SkipLink locale="en" label={dict.ui.skipLink} />
            <LandingHeader dict={dict} />
            <main
                id="main-content"
                data-landing-main
                tabIndex={-1}
                className="scroll-mt-24 focus:outline-none"
            >
                {children}
            </main>
            <LandingFooter dict={dict.footer} locale={dict.locale} />
        </>
    );
}
