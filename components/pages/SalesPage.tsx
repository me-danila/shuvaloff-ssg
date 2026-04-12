import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import SalesGrid from "@/components/ui/grids/SalesGrid";
import { FadeUp } from "@/components/ui/Motion";
import TransportSlider from "@/components/ui/TransportSlider";
import type { Locale } from "@/lib/i18n/routing";

type SalesCopy = {
    title: string;
    transportTitle: string;
    transportDescription: string;
};

const copyByLocale: Record<Locale, SalesCopy> = {
    ru: {
        title: "Специальные предложения",
        transportTitle: "Путь в Петербург из Москвы — без лишних забот",
        transportDescription:
            "Мы сделали всё, чтобы поездка началась легко: выберите билеты на самолёт или «Сапсан» прямо на сайте — и сосредоточьтесь на главном — предвкушении встречи с городом и с ACADEMIA.",
    },
    en: {
        title: "Special Offers",
        transportTitle:
            "The journey to St. Petersburg from Moscow — without extra worries",
        transportDescription:
            "We have made everything to ensure your trip starts easily: choose your plane or Sapsan train tickets right on the website — and focus on the main thing — the anticipation of meeting the city and ACADEMIA.",
    },
};

export default function SalesPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    return (
        <main className="flex flex-col gap-4 xl:gap-10">
            <section className="flex flex-col gap-4 m-6 mb-4 xl:max-w-6xl xl:mx-auto xl:w-full">
                <FadeUp className="md:text-center">
                    <h1>{copy.title}</h1>
                </FadeUp>
                <SalesGrid />
            </section>
            <section className="mx-6 my-4 xl:max-w-6xl xl:mx-auto xl:w-full flex flex-col gap-6 xl:my-2">
                <FadeUp className="xl:max-w-4xl">
                    <h2 className="xl:text-2xl">{copy.transportTitle}</h2>
                    <p className="mt-2 hidden md:block">
                        {copy.transportDescription}
                    </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <TransportSlider />
                </FadeUp>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
