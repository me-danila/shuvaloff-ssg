import type { Metadata } from "next";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import CardRoomHistorical from "@/components/ui/CardRoomHistorical";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { AllRooms } from "@/data/RoomsData";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Historical Suites — ACADEMIA Shuvaloff Mansion",
    description:
        "Unique historical suites at ACADEMIA Shuvaloff Mansion in Saint Petersburg",
    alternates: getLocaleAlternates("/rooms/historical/", "en"),
};

const historicalExtras: Record<
    string,
    { description: string; image: { src: string; alt: string } }
> = {
    dashkova: {
        description:
            "An elegant suite dedicated to Elizaveta Vorontsova-Dashkova, with a bright and refined interior inspired by her character.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/dashkova.png",
            alt: "Dashkova Residence",
        },
    },
    shuvalov: {
        description:
            "A spacious historical suite dedicated to Count Shuvalov, designed in strict neoclassical style with authentic antique accents.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/shuvalov.png",
            alt: "Count Shuvalov Residence",
        },
    },
};

const historicalRooms = AllRooms.en
    .filter((r) => r.isHistorical)
    .map((r) => ({
        ...r,
        ...historicalExtras[r.slug],
    }));

export default function HistoricalRoomsEn() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-5xl xl:mx-auto">
                <FadeUp>
                    <h1>HISTORICAL SUITES</h1>
                </FadeUp>
                <FadeUp delay={0.1} className="xl:mt-2">
                    <p>
                        These historical suites are protected heritage spaces
                        with restored original colors, preserved decorative
                        details, and authentic antique objects from the late
                        19th and early 20th centuries.
                    </p>
                </FadeUp>
            </section>

            <BookingForm />

            <StaggerContainer className="flex flex-col gap-8 mx-4 mb-4 md:flex-row md:items-stretch xl:w-full xl:max-w-6xl xl:mx-auto xl:mt-6">
                {historicalRooms.map((room) => (
                    <StaggerItem
                        key={room.title}
                        className="flex flex-1 basis-0 min-w-0"
                    >
                        <CardRoomHistorical
                            title={room.title}
                            description={room.description}
                            image={room.image}
                            slug={room.slug}
                            bed={room.bed}
                            area={room.area}
                            guests={room.guests}
                            bookingUrl={room.bookingUrl}
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-5xl xl:mx-auto">
                <FadeUp>
                    <p>
                        These residences reflect the personalities of the
                        mansion owners: Count Andrey Shuvalov and his daughter
                        Elizaveta Vorontsova-Dashkova. Elegant lines, deep
                        colors, and curated details let you feel like an honored
                        guest of one of Imperial Russia's aristocratic houses.
                    </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p>
                        The mansion preserves memories of real people who once
                        lived here: their evenings by candlelight, their slow
                        steps on marble stairs, the sound of the piano, and the
                        soft glow of chandeliers.
                    </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p>This is not decoration. It is continuity.</p>
                </FadeUp>
                <FadeUp
                    delay={0.3}
                    className="mx-4 text-center font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:mt-4"
                >
                    A space where the history of Saint Petersburg still breathes
                </FadeUp>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
