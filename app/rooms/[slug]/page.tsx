import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import DesktopHeroGrid from "@/components/ui/grids/DesktopHeroGrid";
import { BedIcon, SquareIcon, UserIcon } from "@/components/ui/icons";
import SliderMobile from "@/components/ui/slider/SliderMobile";
import { AllRooms } from "@/data/RoomsData";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return AllRooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const room = AllRooms.find((r) => r.slug === slug);
    if (!room) return {};
    return {
        title: `${room.title} — ACADEMIA Особняк Шувалова`,
        description: room.description,
    };
}

export default async function RoomPage({ params }: Props) {
    const { slug } = await params;
    const room = AllRooms.find((r) => r.slug === slug);
    if (!room) notFound();

    return (
        <main className="flex flex-col gap-4 xl:gap-10">
            <section className="flex flex-col gap-2 text-center xl:max-w-6xl xl:mx-auto xl:w-full">
                <div className="m-4 xl:w-full">
                    <h1>{room.title}</h1>
                    <p className="font-alistair text-2xl xl:text-[40px]">
                        {room.isHistorical
                            ? "Исторический люкс"
                            : "Классический номер"}
                    </p>
                </div>
                <SliderMobile images={room.gallery} />
                <DesktopHeroGrid images={room.gallery} />
            </section>
            <section className="flex flex-col gap-4 mx-6 mt-4 md:flex-row xl:max-w-6xl xl:mx-auto xl:w-full xl:gap-12">
                <div className="flex flex-col gap-6 bg-slate-100 rounded-md p-4 text-sm text-brand-blue md:flex-row md:items-center md:gap-8 md:min-w-xl md:px-6">
                    <p className="flex items-center gap-3 md:gap-4">
                        <BedIcon size={18} />
                        {room.bed}
                    </p>
                    <p className="flex items-center gap-3 md:gap-4">
                        <SquareIcon size={14} />
                        {room.area}
                    </p>
                    <p className="flex items-center gap-3 md:gap-4">
                        <UserIcon size={14} />
                        {room.guests}
                    </p>
                </div>
                <Button href={room.bookingUrl} variant="primary">
                    Забронировать
                </Button>
            </section>
            <section className="flex flex-col mx-6 my-4 gap-4 xl:max-w-6xl xl:mx-auto xl:my-2">
                <p>{room.fullDescription}</p>
                <ul className="columns-1 md:columns-2 xl:columns-3 gap-x-24 my-4 xl:max-w-6xl xl:mx-auto xl:w-full text-left space-y-4 xl:space-y-8 xl:mt-12">
                    {room.amenities.map((item) => (
                        <li
                            key={item}
                            className="flex items-start gap-2 break-inside-avoid"
                        >
                            <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-current" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
