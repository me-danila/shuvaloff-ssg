import ContactsSection from "@/components/sections/ContactsSection";
import HeroFullscreen from "@/components/sections/HeroFullscreen";
import PhotoShootHeroCta from "@/components/sections/PhotoShootHeroCta";
import PhotoShootRequestSection from "@/components/sections/PhotoShootRequestSection";
import PhotoShootResidencesSection from "@/components/sections/PhotoShootResidencesSection";
import PhotoShootStepsSection from "@/components/sections/PhotoShootStepsSection";
import PhotoShootTariffsSection from "@/components/sections/PhotoShootTariffsSection";
import ResidenceSelectSection from "@/components/sections/ResidenceSelectSection";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";
import { buildWebPageSchema } from "@/lib/seo/schema";

type PhotoShootCopy = {
    heroTitle: string;
    heroDescription: string;
    heroAlt: string;
    requestButton: string;
    costButton: string;
    interiorsTitle: string;
    interiorsSubtitle: React.ReactNode;
};

const copyByLocale: Record<Locale, PhotoShootCopy> = {
    ru: {
        heroTitle: "Фотосессия в исторических интерьерах особняка Шувалова",
        heroDescription:
            "Изысканный исторический антураж для ваших эффектных кадров в атмосфере графского особняка XIX века",
        heroAlt: "Фотосессия в исторических интерьерах особняка Шувалова",
        requestButton: "Оставить заявку",
        costButton: "Узнать стоимость",
        interiorsTitle: "Исторические интерьеры",
        interiorsSubtitle: (
            <>
                с именем и характером —
                <br />
                атмосфера для стильных фотосессий
            </>
        ),
    },
    en: {
        heroTitle:
            "Photoshoot in the Historic Interiors of the Shuvaloff Mansion",
        heroDescription:
            "An exquisite historical setting for your striking shots in the atmosphere of a 19th-century count's mansion",
        heroAlt:
            "Photoshoot in the historic interiors of the Shuvaloff Mansion",
        requestButton: "Leave a request",
        costButton: "Inquire about cost",
        interiorsTitle: "Historic interiors",
        interiorsSubtitle: (
            <>
                with a name and character — the setting for stylish photo
                sessions
            </>
        ),
    },
};

const seoByLocale: Record<
    Locale,
    { name: string; description: string; homeCrumb: string }
> = {
    ru: {
        name: "Фотосессия в особняке Шувалова",
        description:
            "Фотосессия в исторических интерьерах особняка Шувалова XIX века в центре Санкт-Петербурга.",
        homeCrumb: "Главная",
    },
    en: {
        name: "Photoshoot at the Shuvaloff Mansion",
        description:
            "Photoshoot in the 19th-century historic interiors of the Shuvaloff Mansion in central Saint Petersburg.",
        homeCrumb: "Home",
    },
};

export default function PhotoShootPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const seo = seoByLocale[locale];

    return (
        <main className="flex flex-col gap-8">
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: "/photo-shoot/",
                    name: seo.name,
                    description: seo.description,
                    breadcrumbs: [
                        { name: seo.homeCrumb, path: "/" },
                        { name: seo.name, path: "/photo-shoot/" },
                    ],
                })}
            />

            <HeroFullscreen
                title={copy.heroTitle}
                description={copy.heroDescription}
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/07/AP_162-1-scaled.jpg",
                    alt: copy.heroAlt,
                }}
                actions={
                    <PhotoShootHeroCta
                        requestButton={copy.requestButton}
                        costButton={copy.costButton}
                    />
                }
            />

            <section className="px-6 py-4 text-center">
                <FadeUp>
                    <p className="font-alistair text-4xl">
                        {copy.interiorsTitle}
                    </p>
                    <p className="mt-2 xl:mt-3 text-base">
                        {copy.interiorsSubtitle}
                    </p>
                </FadeUp>
            </section>

            <ResidenceSelectSection locale={locale} />

            <PhotoShootStepsSection locale={locale} />

            <PhotoShootTariffsSection locale={locale} />

            <PhotoShootRequestSection locale={locale} />

            <PhotoShootResidencesSection locale={locale} />

            <Divider />
            <ContactsSection />
        </main>
    );
}
