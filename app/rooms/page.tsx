import type { Metadata } from "next";
import dynamic from "next/dynamic";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import { AllRooms } from "@/data/RoomsData";
import { getLocaleAlternates } from "@/lib/i18n/metadata";
import { buildCollectionPageSchema } from "@/lib/seo/schema";

const ContactsSection = dynamic(
    () => import("@/components/sections/ContactsSection"),
    { ssr: true },
);
const RoomsSection = dynamic(
    () => import("@/components/sections/RoomsSection"),
    { ssr: true },
);

export const metadata: Metadata = {
    title: "Категории номеров — ACADEMIA Особняк Шувалова",
    description:
        "Номера и люксы отеля ACADEMIA Особняк Шувалова в Санкт-Петербурге",
    alternates: getLocaleAlternates("/rooms/", "ru"),
};

export default function Rooms() {
    return (
        <main
            className="flex flex-col gap-4 xl:gap-10"
            itemScope
            itemType="https://schema.org/CollectionPage"
        >
            <StructuredData
                data={buildCollectionPageSchema({
                    locale: "ru",
                    path: "/rooms/",
                    name: "Категории номеров",
                    description:
                        "Номера и люксы отеля ACADEMIA Особняк Шувалова в Санкт-Петербурге.",
                    breadcrumbs: [
                        { name: "Главная", path: "/" },
                        { name: "Номера", path: "/rooms/" },
                    ],
                    items: AllRooms.ru.map((room) => ({
                        name: room.title,
                        path: room.isHistorical
                            ? `/rooms/historical/${room.slug}/`
                            : `/rooms/${room.slug}/`,
                        image: room.image.src,
                        description: room.description,
                    })),
                })}
            />
            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-6xl xl:mx-auto">
                <FadeUp>
                    <h1>Категории номеров</h1>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="xl:mt-2">
                        Номера оформлены в&nbsp;стиле современного
                        неоклассицизма: светлые, спокойные цвета и&nbsp;четкие
                        линии настраивают на&nbsp;отдых и&nbsp;расслабление.
                    </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p>
                        В&nbsp;отеле-особняке представлены категории:
                        классический Стандарт, изысканный Супериор,
                        двухкомнатный Полулюкс, Двухкомнатный люкс и&nbsp;два
                        уникальных исторических люкса, названные в&nbsp;честь
                        владельцев особняка.
                    </p>
                </FadeUp>
            </section>
            <RoomsSection />
            <Divider />
            <ContactsSection />
        </main>
    );
}
