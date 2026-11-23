import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import EventDates from "@/components/ui/EventDates";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import EventsSlider from "@/components/ui/slider/EventsSlider";
import {
    getEventBySlug,
    getEventCards,
    getEventOccurrences,
    getPublishedEvents,
} from "@/data/EventsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/routing";
import { buildEventSchema } from "@/lib/seo/schema";

// Inline the same date resolver used after hydration. Static exports serve one
// HTML file for every ?date= value, so only the browser knows the requested day.
const firstPaintScript =
    readFileSync(join(process.cwd(), "lib/eventDateDisplay.js"), "utf8") +
    '\nconst root = document.getElementById("event-schedule"); if (root) initializeEventDateDisplay(root);';

type Props = {
    params: Promise<{ slug: string }>;
    locale: Locale;
};

type EventDetailLabels = {
    brandSuffix: string;
    breadcrumbHome: string;
    breadcrumbEvents: string;
    otherEvents: string;
};

const labelsByLocale: Record<Locale, EventDetailLabels> = {
    ru: {
        brandSuffix: "— ACADEMIA Особняк Шувалова",
        breadcrumbHome: "Главная",
        breadcrumbEvents: "Афиша мероприятий",
        otherEvents: "Другие события",
    },
    en: {
        brandSuffix: "— ACADEMIA Shuvaloff Mansion",
        breadcrumbHome: "Home",
        breadcrumbEvents: "Events",
        otherEvents: "Other events",
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
                <h1 className="my-4 md:text-center">{event.title}</h1>
                <div className="flex flex-col xl:flex-row-reverse xl:items-start gap-6 xl:gap-8">
                    <div className="relative w-full aspect-4/3 xl:aspect-square rounded-md overflow-hidden xl:flex-1">
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
                    </div>

                    <div className="flex flex-col gap-4 xl:flex-1 xl:gap-3">
                        {event.fullDescription && (
                            <p className="mb-2 xl:mb-4">
                                {event.fullDescription}
                            </p>
                        )}

                        <EventDates
                            occurrences={getEventOccurrences(
                                event.dates,
                                locale,
                            )}
                            locale={locale}
                            eventTitle={event.title}
                            bookingUrl={event.bookingUrl}
                        />
                        <script
                            type="module"
                            async
                            // biome-ignore lint/security/noDangerouslySetInnerHtml: fixed local module, contains no event or URL interpolation.
                            dangerouslySetInnerHTML={{
                                __html: firstPaintScript,
                            }}
                        />
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
