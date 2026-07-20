import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import EventDates from "@/components/ui/EventDates";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import EventsSlider from "@/components/ui/slider/EventsSlider";
import {
    getEventBySlug,
    getEventCards,
    getPublishedEvents,
} from "@/data/EventsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/routing";
import { buildEventSchema } from "@/lib/seo/schema";

type Props = {
    params: Promise<{ slug: string }>;
    locale: Locale;
};

type EventDetailLabels = {
    brandSuffix: string;
    breadcrumbHome: string;
    breadcrumbEvents: string;
    book: string;
    otherEvents: string;
    dates: string;
};

const labelsByLocale: Record<Locale, EventDetailLabels> = {
    ru: {
        brandSuffix: "— ACADEMIA Особняк Шувалова",
        breadcrumbHome: "Главная",
        breadcrumbEvents: "Афиша мероприятий",
        book: "Забронировать",
        otherEvents: "Другие события",
        dates: "Ближайшие даты:",
    },
    en: {
        brandSuffix: "— ACADEMIA Shuvaloff Mansion",
        breadcrumbHome: "Home",
        breadcrumbEvents: "Events",
        book: "Book now",
        otherEvents: "Other events",
        dates: "Upcoming dates:",
    },
};

export function eventDetailParams(locale: Locale) {
    return getPublishedEvents(locale).map((event) => ({ slug: event.slug }));
}

export async function eventDetailMetadata(
    locale: Locale,
    params: Props["params"],
): Promise<Metadata> {
    const { slug } = await params;
    const event = getEventBySlug(locale, slug);
    if (!event) return {};
    return buildPageMetadata({
        locale,
        path: `/events/${slug}/`,
        title: `${event.title} ${labelsByLocale[locale].brandSuffix}`,
        description: event.subtitle,
        ogImage: event.imgUrl,
    });
}

export default async function EventDetailPage({ params, locale }: Props) {
    const { slug } = await params;
    const event = getEventBySlug(locale, slug);
    if (!event) notFound();

    const labels = labelsByLocale[locale];

    const otherEventCards = getEventCards(locale).filter(
        (c) => c.slug !== slug,
    );

    return (
        <main
            className="flex flex-col gap-8"
            itemScope
            itemType="https://schema.org/WebPage"
        >
            <StructuredData
                data={buildEventSchema({
                    locale,
                    path: `/events/${slug}/`,
                    event,
                    breadcrumbs: [
                        { name: labels.breadcrumbHome, path: "/" },
                        { name: labels.breadcrumbEvents, path: "/events/" },
                        { name: event.title, path: `/events/${slug}/` },
                    ],
                })}
            />
            <section className="flex flex-col gap-4 m-6 xl:w-full xl:max-w-7xl xl:mx-auto">
                <FadeUp className="md:text-center my-4">
                    <h1>{event.title}</h1>
                </FadeUp>
                <div className="flex flex-col xl:flex-row-reverse xl:items-start gap-6 xl:gap-8">
                    <FadeUp className="relative w-full aspect-4/3 xl:aspect-square rounded-md overflow-hidden xl:flex-1">
                        <Image
                            src={event.imgUrl}
                            alt={event.title}
                            fill
                            priority
                            sizes="(max-width: 1280px) 100vw, 50vw"
                            className="object-cover"
                            style={
                                event.mediaObjectPosition
                                    ? {
                                          objectPosition:
                                              event.mediaObjectPosition,
                                      }
                                    : undefined
                            }
                        />
                    </FadeUp>

                    <div className="flex flex-col gap-4 xl:flex-1 xl:gap-3">
                        {event.fullDescription && (
                            <FadeUp delay={0.1} className="mb-2 xl:mb-4">
                                <p>{event.fullDescription}</p>
                            </FadeUp>
                        )}

                        <FadeUp delay={0.3}>
                            <EventDates
                                dates={event.dates}
                                locale={locale}
                                title={labels.dates}
                            />
                        </FadeUp>

                        <FadeUp delay={0.4}>
                            <Button
                                href={event.bookingUrl}
                                target={
                                    event.bookingUrl.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                variant="primary"
                                size="xl"
                                className="self-start mt-3"
                            >
                                {labels.book}
                            </Button>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {otherEventCards.length > 0 && (
                <section className="bg-brand-light py-8 xl:py-12">
                    <div className="flex flex-col gap-6 mx-6 xl:w-full xl:max-w-7xl xl:mx-auto">
                        <FadeUp>
                            <h2 className="text-center xl:text-4xl mb-4 xl:mb-6">
                                {labels.otherEvents}
                            </h2>
                        </FadeUp>
                        <EventsSlider cards={otherEventCards} />
                    </div>
                </section>
            )}

            <Divider />
            <ContactsSection />
        </main>
    );
}
