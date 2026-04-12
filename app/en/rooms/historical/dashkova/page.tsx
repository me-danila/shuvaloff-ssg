import type { Metadata } from "next";
import AntiquesSection from "@/components/sections/AntiquesSection";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import HeroHistoricalRooms from "@/components/sections/HeroHistoricalRooms";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SliderMobile from "@/components/ui/slider/SliderMobile";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Dashkova Residence — ACADEMIA Shuvaloff Mansion",
    description:
        "Historical suite 'Dashkova Residence' with authentic antiques and the atmosphere of classic Saint Petersburg",
    alternates: getLocaleAlternates("/rooms/historical/dashkova/", "en"),
};

const descriptionImages = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/d1.jpg",
        alt: "Dyson hair dryer",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/d2.jpg",
        alt: "Bath amenities",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/d3.jpg",
        alt: "Suite interior",
    },
];

const antiquesItems = [
    {
        title: "French fireplace screen",
        description:
            "The key gem of the interior is a 19th-century French fireplace screen decorated with hand embroidery. Originally used to protect from sparks, it now serves as a graceful decorative centerpiece.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/bd9ff8b9e2919acf61e680198bcd48e7124a2e08.png",
            alt: "Fireplace screen",
        },
    },
    {
        title: "Art Nouveau floor lamp",
        description:
            "An elegant forged floor lamp with a stained-glass shade from early 20th-century Europe adds a light Belle Epoque character to the space.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/Frame-323.png",
            alt: "Floor lamp",
        },
    },
    {
        title: "19th-century mother-of-pearl fan",
        description:
            "A refined and feminine interior accent - an authentic 19th-century fan that recalls the era's subtle social language and craftsmanship.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/3.png",
            alt: "Fan",
        },
    },
    {
        title: "Table lamp",
        description:
            "An eclectic Russian table lamp from the early 20th century with a romantic scene sets a mood of ease, conversation, and charm.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/4.png",
            alt: "Table lamp",
        },
    },
    {
        title: "Regency side table",
        description:
            "A walnut side table made in early 20th-century England combines function and elegance, with lion-paw legs and acanthus motifs on the leather-covered top.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/5.png",
            alt: "Side table",
        },
    },
    {
        title: "Collectible porcelain",
        description:
            "Early 20th-century figurines from Western Europe stand out for their delicate craftsmanship and expressive poses.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/6.png",
            alt: "Porcelain figurines",
        },
    },
    {
        title: "Pair of rosewood bedside cabinets",
        description:
            "A luxurious pair of late 19th-century French bedside cabinets in rosewood, veneered by hand with remarkable precision.",
    },
];

export default function HistoricalDashkovaEn() {
    return (
        <main className="flex flex-col gap-6">
            <HeroHistoricalRooms
                title="DASHKOVA RESIDENCE"
                subtitle={
                    <>
                        Classic Saint Petersburg
                        <br />
                        in a contemporary reading
                    </>
                }
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/Rectangle-132.png",
                    alt: "Dashkova Residence",
                }}
            />
            <BookingForm />
            <FadeUp className="mx-6 my-2 xl:max-w-5xl xl:mx-auto xl:mt-6 xl:text-center">
                <p>
                    This suite is named after Countess Elizaveta Andreevna
                    Vorontsova-Dashkova (born Shuvalova, 1845-1924).
                    <br className="block xl:hidden" />
                    <br />
                    Its concept reflects her defining qualities: elegance,
                    refined taste, intellect, inner strength, and creativity.
                </p>
            </FadeUp>
            <SliderMobile images={descriptionImages} />
            <StaggerContainer
                mode="inView"
                className="hidden xl:flex xl:h-110 xl:mt-4 xl:gap-4 xl:max-w-6xl xl:mx-auto xl:w-full"
            >
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                    <Image
                        src={descriptionImages[0].src}
                        alt={descriptionImages[0].alt}
                        fill
                        sizes="33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                    <Image
                        src={descriptionImages[1].src}
                        alt={descriptionImages[1].alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                    <Image
                        src={descriptionImages[2].src}
                        alt={descriptionImages[2].alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
            </StaggerContainer>
            <section className="flex flex-col gap-3 m-6 xl:max-w-6xl xl:mx-auto xl:text-center xl:my-8">
                <FadeUp>
                    <h2>
                        Strict lines, historical details,
                        <br className="max-xl:hidden" /> and impeccable comfort
                    </h2>
                </FadeUp>
                <div className="xl:mt-4 xl:max-w-5xl xl:mx-auto">
                    <FadeUp delay={0.1}>
                        <p>
                            The Dashkova historical suite is a spacious studio
                            room where neoclassical elegance meets modern
                            comfort. It is ideal for romantic evenings, long
                            conversations, and memorable photo sessions.
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.2} className="xl:mt-4">
                        <p>
                            Its striking wall color was restored from archival
                            materials, while the unusual glass-walled bathroom
                            and premium equipment add a contemporary layer to
                            the historical setting.
                        </p>
                    </FadeUp>
                </div>
            </section>
            <AntiquesSection
                intro="To support the mood of the suite, we added authentic late 19th and early 20th century artifacts: rosewood bedside cabinets, a French fireplace screen, porcelain figurines, and decorative furniture accents."
                items={antiquesItems}
            />
            <Divider dark />
            <ContactsSection />
        </main>
    );
}
