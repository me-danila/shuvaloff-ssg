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
    title: "Count Shuvalov Residence — ACADEMIA Shuvaloff Mansion",
    description:
        "Historical suite 'Count Shuvalov Residence' with authentic antiques and aristocratic Saint Petersburg atmosphere",
    alternates: getLocaleAlternates("/rooms/historical/shuvalov/", "en"),
};

const descriptionImages = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/s1.png",
        alt: "Historical suite interior",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/s2.png",
        alt: "Historical suite interior",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/s3.png",
        alt: "Historical suite interior",
    },
];

const antiquesItems = [
    {
        title: "Late 19th-century bronze floor lamp with lion mascarons",
        description:
            "A finely crafted interior object created in Russia in the late 19th century, featuring lion mascarons - a symbol of power and nobility.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a1.png",
            alt: "Floor lamp",
        },
    },
    {
        title: "Coffered ceiling",
        description:
            "The suite's ceiling features an authentic coffered composition, carefully restored and preserved as a protected historical element of the mansion.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a2.png",
            alt: "Coffered ceiling",
        },
    },
    {
        title: "Porcelain figurines",
        description:
            "German Unterweissbach porcelain figurines with a Rococo-inspired gallant scene, highlighted by fine underglaze painting and gilded details.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a3.png",
            alt: "Porcelain figurines",
        },
    },
    {
        title: "Bronze candlesticks",
        description:
            "Antique French candlesticks with floral motifs and gilded finishing add a refined European accent to the interior.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a4.png",
            alt: "Candlesticks",
        },
    },
    {
        title: "Painting by Emile Tabary",
        description:
            "The painting 'Boat Ride' by French realist Emile Tabary enhances the suite's atmosphere with a graceful, aristocratic mood.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a5.png",
            alt: "Emile Tabary painting",
        },
    },
    {
        title: "Antique furniture",
        description:
            "A complete antique set in red wood from early 20th-century Saint Petersburg workshops, complemented by an English bronze side table.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a6.png",
            alt: "Antique furniture",
        },
    },
];

export default function HistoricalShuvalovEn() {
    return (
        <main className="flex flex-col gap-6">
            <HeroHistoricalRooms
                title="COUNT SHUVALOV RESIDENCE"
                subtitle={
                    <>
                        Strength, impeccable taste,
                        <br />
                        and aristocratic dignity
                    </>
                }
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/ef37be26c8b96f22c27a24b3de808de9ea48ddef-scaled.jpg",
                    alt: "Count Shuvalov Residence",
                }}
            />
            <BookingForm />
            <FadeUp className="mx-6 my-2 xl:max-w-5xl xl:mx-auto xl:mt-6 xl:text-center">
                <p>
                    This suite is dedicated to Count Andrey Pavlovich Shuvalov -
                    an educated, determined, and influential aristocrat. Its
                    concept reflects his personality and worldview.
                    <br />
                    <br />
                    Strict classical forms and balanced proportions create a
                    space where historical atmosphere and modern comfort work
                    together naturally.
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
                    <h2>A space with character</h2>
                </FadeUp>
            </section>
            <AntiquesSection
                intro="To reinforce the bond between the mansion's past and present, we paired contemporary comfort with expressive historical accents. Authentic antiques shape an elegant and deeply aristocratic atmosphere."
                items={antiquesItems}
            />
            <Divider dark />
            <ContactsSection />
        </main>
    );
}
