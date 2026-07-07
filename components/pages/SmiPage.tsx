import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import SmiGrid from "@/components/ui/grids/SmiGrid";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";

const titleByLocale: Record<Locale, string> = {
    ru: "СМИ О НАС",
    en: "MEDIA ABOUT US",
};

export default function SmiPage({ locale }: { locale: Locale }) {
    return (
        <main className="flex flex-col gap-4 xl:gap-10">
            <section className="mx-6 mt-6 xl:mx-auto xl:w-full xl:max-w-7xl">
                <FadeUp className="md:text-center">
                    <h1>{titleByLocale[locale]}</h1>
                </FadeUp>
            </section>
            <section className="bg-brand-light py-8 xl:py-12">
                <div className="mx-6 xl:mx-auto xl:w-full xl:max-w-7xl">
                    <SmiGrid />
                </div>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
