import { Suspense } from "react";
import {
    BookingFormDesktop,
    BookingFormMobile,
} from "@/components/sections/BookingFormResponsive";
import ContactsSection from "@/components/sections/ContactsSection";
import Divider from "@/components/ui/Divider";
import EventsCalendar from "@/components/ui/EventsCalendar";
import EventsGrid from "@/components/ui/grids/EventsGrid";
import { FadeIn, FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/routing";

const eventsCopyByLocale: Record<
    Locale,
    { heroTitle: React.ReactNode; heroAlt: string; sectionTitle: string }
> = {
    ru: {
        heroTitle: (
            <>
                Приглашаем вас на&nbsp;мероприятия
                <br />в&nbsp;особняке Шувалова
            </>
        ),
        heroAlt: "Мероприятия в особняке Шувалова",
        sectionTitle: "Афиша мероприятий",
    },
    en: {
        heroTitle: (
            <>
                We invite you to&nbsp;events
                <br />
                at&nbsp;the Shuvaloff Mansion
            </>
        ),
        heroAlt: "Events at the Shuvaloff Mansion",
        sectionTitle: "Events",
    },
};

export default function EventsPage({ locale }: { locale: Locale }) {
    const copy = eventsCopyByLocale[locale];

    return (
        <main
            className="flex flex-col gap-6"
            itemScope
            itemType="https://schema.org/WebPage"
        >
            <section>
                <div className="relative overflow-hidden aspect-8/11 xl:aspect-[unset] xl:min-h-screen">
                    <FadeIn
                        duration={0.9}
                        className="absolute inset-0 h-full w-full"
                    >
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/07/%D0%BB%D0%B5%D0%BA%D1%86%D0%B8%D1%8F.png"
                            alt={copy.heroAlt}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-bottom bg-gray-100"
                        />
                    </FadeIn>

                    <div className="absolute bottom-10 md:bottom-20 xl:bottom-32 inset-x-0 text-center text-white z-10 flex flex-col gap-3 px-8 xl:px-0 xl:max-w-7xl xl:mx-auto xl:gap-6">
                        <FadeIn duration={1}>
                            <h1 className="font-alistair text-4xl normal-case leading-tight xl:text-5xl xl:mb-4 font-normal">
                                {copy.heroTitle}
                            </h1>
                        </FadeIn>
                        <Suspense
                            fallback={
                                <div className="h-20 animate-pulse bg-white/10 rounded-lg" />
                            }
                        >
                            <BookingFormDesktop />
                        </Suspense>
                    </div>
                </div>
            </section>

            <Suspense fallback={null}>
                <BookingFormMobile />
            </Suspense>

            <section className="bg-brand-light xl:bg-transparent">
                <div className="px-6 pt-8 xl:pb-10 xl:max-w-7xl xl:mx-auto xl:w-full">
                    <FadeUp className="text-center">
                        <h2>{copy.sectionTitle}</h2>
                    </FadeUp>
                </div>

                <div className="bg-brand-light pb-8 pt-8 xl:pt-10 xl:pb-12">
                    <div className="px-6 xl:px-0 xl:max-w-7xl xl:mx-auto xl:w-full xl:grid xl:grid-cols-3 xl:gap-8 xl:items-start">
                        <div className="xl:col-span-2 xl:order-1">
                            <EventsGrid />
                        </div>
                        <div className="mt-8 xl:mt-0 xl:order-2 xl:sticky xl:top-36">
                            <EventsCalendar />
                        </div>
                    </div>
                </div>
            </section>

            <Divider />
            <ContactsSection />
        </main>
    );
}
