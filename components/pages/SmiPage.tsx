import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import SmiGrid from "@/components/ui/grids/SmiGrid";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";
import { buildWebPageSchema } from "@/lib/seo/schema";

const titleByLocale: Record<Locale, string> = {
    ru: "СМИ О НАС",
    en: "MEDIA ABOUT US",
};

const seo = {
    ru: {
        name: "СМИ о нас",
        description: "Публикации СМИ об отеле ACADEMIA Особняк Шувалова",
        crumbs: ["Главная"],
    },
    en: {
        name: "Media About Us",
        description:
            "Media publications about ACADEMIA Shuvaloff Mansion hotel",
        crumbs: ["Home"],
    },
} as const;

const PARENT_PATHS = ["/"];

export default function SmiPage({ locale }: { locale: Locale }) {
    const copy = seo[locale];
    return (
        <main className="flex flex-col gap-4 xl:gap-10">
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: "/smi/",
                    name: copy.name,
                    description: copy.description,
                    breadcrumbs: [
                        ...copy.crumbs.map((name, i) => ({
                            name,
                            path: PARENT_PATHS[i],
                        })),
                        { name: copy.name, path: "/smi/" },
                    ],
                })}
            />
            <section className="mx-6 mt-6 xl:mx-auto xl:w-full xl:max-w-7xl">
                <FadeUp className="md:text-center">
                    <h1>{titleByLocale[locale]}</h1>
                </FadeUp>
            </section>
            <section className="bg-brand-light py-8 xl:py-12">
                <div className="mx-6 xl:mx-auto xl:w-full xl:max-w-7xl">
                    <SmiGrid locale={locale} />
                </div>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
