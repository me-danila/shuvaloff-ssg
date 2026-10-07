import SkipLink from "@/components/a11y/SkipLink";
import LandingHeader from "@/components/landing/LandingHeader";
import Footer from "@/components/layout/Footer";
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
                tabIndex={-1}
                className="scroll-mt-24 focus:outline-none"
            >
                {children}
            </main>
            {/* Временно — футер основного сайта (EN), пока нет ТЗ на футер лендинга. */}
            <Footer locale="en" />
        </>
    );
}
