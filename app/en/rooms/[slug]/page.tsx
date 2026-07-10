import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import DesktopHeroGrid from "@/components/ui/grids/DesktopHeroGrid";
import { BedIcon, SquareIcon, UserIcon } from "@/components/ui/icons";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import SliderMobile from "@/components/ui/slider/SliderMobile";
import { AllRooms } from "@/data/RoomsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { buildRoomSchema } from "@/lib/seo/schema";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return AllRooms.en
        .filter((room) => !room.isHistorical)
        .map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const room = AllRooms.en.find((r) => r.slug === slug && !r.isHistorical);
    if (!room) return {};

    return buildPageMetadata({
        locale: "en",
        path: `/rooms/${slug}/`,
        title: `${room.title} — ACADEMIA Shuvaloff Mansion`,
        description: room.description,
        ogImage: room.gallery[0].src,
    });
}

export default async function RoomPageEn({ params }: Props) {
    const { slug } = await params;
    const room = AllRooms.en.find((r) => r.slug === slug && !r.isHistorical);
    if (!room) notFound();

    return (
        <main
            className="flex flex-col gap-4 xl:gap-6"
            itemScope
            itemType="https://schema.org/WebPage"
        >
            <StructuredData
                data={buildRoomSchema({
                    locale: "en",
                    path: `/rooms/${slug}/`,
                    room,
                    breadcrumbs: [
                        { name: "Home", path: "/" },
                        { name: "Rooms", path: "/rooms/" },
                        { name: room.title, path: `/rooms/${slug}/` },
                    ],
                })}
            />
            <section className="flex flex-col gap-2 text-center xl:max-w-7xl xl:mx-auto xl:w-full">
                <div className="m-4 xl:w-full xl:my-0">
                    <FadeUp>
                        <h1>{room.title}</h1>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <p className="font-alistair text-2xl xl:text-[40px] xl:-mt-2">
                            {room.isHistorical
                                ? "Historical Suite"
                                : "Classic Room"}
                        </p>
                    </FadeUp>
                </div>
                <SliderMobile images={room.gallery} />
                <DesktopHeroGrid images={room.gallery} tone="inner" />
            </section>
            <BookingForm />
            <section className="flex flex-col gap-4 mx-6 mt-4 md:flex-row xl:max-w-7xl xl:mx-auto xl:w-full xl:gap-8">
                <FadeUp className="flex flex-col gap-6 bg-brand-light rounded-md p-4 text-sm text-brand-brown md:flex-row md:items-center md:gap-8 md:min-w-xl md:px-6">
                    <p className="flex items-center gap-3 md:gap-4 xl:leading-6">
                        <BedIcon size={18} />
                        {room.bed}
                    </p>
                    <p className="flex items-center gap-3 md:gap-4 shrink-0">
                        <SquareIcon size={14} />
                        {room.area}
                    </p>
                    <p className="flex items-center gap-3 md:gap-4 shrink-0">
                        <UserIcon size={14} />
                        {room.guests}
                    </p>
                </FadeUp>
                <Button href={room.bookingUrl} variant="primary">
                    CHOOSE A ROOM
                </Button>
                <Button
                    href="/en/rooms/"
                    variant="primary-outline"
                    className="shrink-0"
                >
                    ALL CATEGORIES
                </Button>
            </section>
            <section className="flex flex-col mx-6 my-4 gap-4 xl:max-w-7xl xl:mx-auto xl:my-2">
                <FadeUp>
                    <p>{room.fullDescription}</p>
                </FadeUp>
                <StaggerContainer
                    staggerChildren={0.05}
                    className="columns-1 md:columns-2 xl:columns-3 gap-x-24 xl:max-w-7xl xl:mx-auto xl:w-full text-left space-y-4 xl:space-y-8 mt-4 xl:mt-6 text-sm md:text-base"
                >
                    {room.amenities.map((item) => (
                        <StaggerItem
                            key={item}
                            className="flex items-start gap-2 break-inside-avoid"
                        >
                            <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-current" />
                            <span>{item}</span>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
