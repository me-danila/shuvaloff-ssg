import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import RoomsSection from "@/components/sections/RoomsSection";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import BookingForm from "@/components/sections/BookingForm";
import { FadeUp } from "@/components/ui/Motion";
import { AllRooms } from "@/data/RoomsData";
import { getLocaleAlternates } from "@/lib/i18n/metadata";
import { buildCollectionPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
    title: "Room Categories — ACADEMIA Mansion Shuvaloff",
    description:
        "Rooms and suites at ACADEMIA Mansion Shuvaloff in Saint Petersburg",
    alternates: getLocaleAlternates("/rooms/", "en"),
};

export default function RoomsEn() {
    return (
        <main
            className="flex flex-col gap-4 xl:gap-10"
            itemScope
            itemType="https://schema.org/CollectionPage"
        >
            <StructuredData
                data={buildCollectionPageSchema({
                    locale: "en",
                    path: "/rooms/",
                    name: "Room categories",
                    description:
                        "Rooms and suites at ACADEMIA Mansion Shuvaloff in Saint Petersburg.",
                    breadcrumbs: [
                        { name: "Home", path: "/" },
                        { name: "Rooms", path: "/rooms/" },
                    ],
                    items: AllRooms.en.map((room) => ({
                        name: room.title,
                        path: room.isHistorical
                            ? `/rooms/historical/${room.slug}/`
                            : `/rooms/${room.slug}/`,
                        image: room.image.src,
                        description: room.description,
                    })),
                })}
            />
            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-7xl xl:mx-auto">
                <FadeUp>
                    <h1>Room Categories</h1>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="xl:mt-2">
                        The rooms are designed in a modern neoclassical style:
                        soft tones, measured lines, and a calm atmosphere built
                        for rest.
                    </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p>
                        The mansion hotel offers Standard, Superior, Junior
                        Suite, Suite, and two distinctive historical residences
                        named after the former owners of the mansion.
                    </p>
                </FadeUp>
            </section>
            <BookingForm />
            <div />
            <RoomsSection />
            <Divider />
            <ContactsSection />
        </main>
    );
}
