import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import EventsSlider from "@/components/ui/slider/EventsSlider";
import { AllEvents, getEventBySlug, getEventCards } from "@/data/EventsData";
import { getLocaleAlternates } from "@/lib/i18n/metadata";
import { buildEventSchema } from "@/lib/seo/schema";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return AllEvents.en.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const event = getEventBySlug("en", slug);
    if (!event) return {};
    return {
        title: `${event.title} — ACADEMIA Shuvaloff Mansion`,
        description: event.subtitle,
        alternates: getLocaleAlternates(`/events/${slug}/`, "en"),
    };
}

export default async function EventPageEn({ params }: Props) {
    const { slug } = await params;
    const event = getEventBySlug("en", slug);
    if (!event) notFound();

    const otherEventCards = getEventCards("en").filter((c) => c.slug !== slug);

    return (
        <main
            className="flex flex-col gap-8"
            itemScope
            itemType="https://schema.org/WebPage"
        >
            <StructuredData
                data={buildEventSchema({
                    locale: "en",
                    path: `/events/${slug}/`,
                    event,
                    breadcrumbs: [
                        { name: "Home", path: "/" },
                        { name: "Events", path: "/events/" },
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
                                event.imgObjectPosition
                                    ? {
                                          objectPosition:
                                              event.imgObjectPosition,
                                      }
                                    : undefined
                            }
                        />
                    </FadeUp>

                    <div className="flex flex-col gap-4 xl:flex-1 xl:gap-3">
                        <FadeUp delay={0.1}>
                            <p>{event.subtitle}</p>
                        </FadeUp>
                        {event.fullDescription && (
                            <FadeUp delay={0.2} className="mb-2 xl:mb-4">
                                <p>{event.fullDescription}</p>
                            </FadeUp>
                        )}

                        <FadeUp delay={0.3}>
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
                                Book now
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
                                Other events
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
