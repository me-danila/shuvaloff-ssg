import ContactsSection from "@/components/sections/ContactsSection";
import PhotoShootHeroCta from "@/components/sections/PhotoShootHeroCta";
import PhotoShootRequestSection from "@/components/sections/PhotoShootRequestSection";
import PhotoShootResidencesSection from "@/components/sections/PhotoShootResidencesSection";
import PhotoShootStepsSection from "@/components/sections/PhotoShootStepsSection";
import PhotoShootTariffsSection from "@/components/sections/PhotoShootTariffsSection";
import ResidenceSelectSection from "@/components/sections/ResidenceSelectSection";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import {
    FadeIn,
    FadeUp,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { Parallax } from "@/components/ui/Parallax";
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
        name: "Фотосъемка в особняке Шувалова",
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

            <section>
                <div className="relative overflow-hidden aspect-8/15 xl:aspect-[unset] xl:min-h-screen">
                    <FadeIn
                        duration={0.9}
                        className="absolute inset-0 h-full w-full"
                    >
                        <Parallax className="h-full w-full" offset={80}>
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/07/AP_162-1-scaled.jpg"
                                alt={copy.heroAlt}
                                fill
                                sizes="100vw"
                                loading="eager"
                                priority
                                className="object-cover object-center"
                            />
                        </Parallax>
                    </FadeIn>

                    <StaggerContainer className="flex gap-2 h-65 xl:h-180 xl:gap-4 xl:w-full">
                        <div className="absolute bottom-10 md:bottom-20 xl:bottom-20 inset-x-0 text-center text-white z-10 flex flex-col gap-3 px-10 xl:max-w-5xl xl:mx-auto xl:gap-6">
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md xl:max-w-5xl xl:mx-auto xl:mb-6">
                                <h1 className="text-2xl xl:text-5xl uppercase xl:mt-10">
                                    {copy.heroTitle}
                                </h1>
                            </StaggerItem>
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md xl:max-w-xl xl:mx-auto">
                                <p className="text-base">
                                    {copy.heroDescription}
                                </p>
                            </StaggerItem>
                            <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                                <PhotoShootHeroCta
                                    requestButton={copy.requestButton}
                                    costButton={copy.costButton}
                                />
                            </StaggerItem>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

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
