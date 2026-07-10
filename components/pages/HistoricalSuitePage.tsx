import AntiquesSection from "@/components/sections/AntiquesSection";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import HeroHistoricalRooms from "@/components/sections/HeroHistoricalRooms";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SliderMobile from "@/components/ui/slider/SliderMobile";
import {
    type HistoricalSuiteSlug,
    HistoricalSuites,
} from "@/data/HistoricalSuites";
import { AllRooms } from "@/data/RoomsData";
import type { Locale } from "@/lib/i18n/routing";
import { buildRoomSchema } from "@/lib/seo/schema";

const CRUMBS = {
    ru: { home: "Главная", rooms: "Номера", historical: "Исторические люксы" },
    en: { home: "Home", rooms: "Rooms", historical: "Historical suites" },
} as const;

export default function HistoricalSuitePage({
    locale,
    slug,
}: {
    locale: Locale;
    slug: HistoricalSuiteSlug;
}) {
    const content = HistoricalSuites[slug][locale];
    const room = AllRooms[locale].find((item) => item.slug === slug);
    const path = `/rooms/historical/${slug}/`;
    const crumbs = CRUMBS[locale];

    return (
        <main
            className="flex flex-col gap-6"
            itemScope
            itemType="https://schema.org/WebPage"
        >
            {room && (
                <StructuredData
                    data={buildRoomSchema({
                        locale,
                        path,
                        room,
                        breadcrumbs: [
                            { name: crumbs.home, path: "/" },
                            { name: crumbs.rooms, path: "/rooms/" },
                            {
                                name: crumbs.historical,
                                path: "/rooms/historical/",
                            },
                            { name: room.title, path },
                        ],
                    })}
                />
            )}
            <HeroHistoricalRooms
                title={content.hero.title}
                subtitle={content.hero.subtitle}
                image={content.hero.image}
            />
            <BookingForm />
            <FadeUp className="mx-6 my-2 xl:max-w-5xl xl:mx-auto xl:mt-6 xl:text-center">
                <p>{content.intro}</p>
            </FadeUp>
            <SliderMobile images={content.descriptionImages} />
            <StaggerContainer
                mode="inView"
                className="hidden xl:flex xl:h-110 xl:mt-4 xl:gap-4 xl:max-w-7xl xl:mx-auto xl:w-full"
            >
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                    <Image
                        src={content.descriptionImages[0].src}
                        alt={content.descriptionImages[0].alt}
                        fill
                        sizes="33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                    <Image
                        src={content.descriptionImages[1].src}
                        alt={content.descriptionImages[1].alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                    <Image
                        src={content.descriptionImages[2].src}
                        alt={content.descriptionImages[2].alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
            </StaggerContainer>
            <section className="flex flex-col gap-3 m-6 xl:max-w-7xl xl:mx-auto xl:text-center xl:my-8">
                <FadeUp>
                    <h2>{content.narrativeHeading}</h2>
                </FadeUp>
                {content.narrativeParagraphs.length > 0 && (
                    <div className="xl:mt-4 xl:max-w-5xl xl:mx-auto">
                        {content.narrativeParagraphs.map((paragraph, index) => (
                            <FadeUp
                                key={paragraph.id}
                                delay={0.1 + index * 0.1}
                                className={index > 0 ? "xl:mt-4" : undefined}
                            >
                                <p>{paragraph.body}</p>
                            </FadeUp>
                        ))}
                    </div>
                )}
            </section>
            <AntiquesSection
                intro={content.antiquesIntro}
                items={content.antiquesItems}
            />
            <Divider dark />
            <ContactsSection />
        </main>
    );
}
