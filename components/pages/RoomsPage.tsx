import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import RoomsSection from "@/components/sections/RoomsSection";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import { FadeUp } from "@/components/ui/Motion";
import { AllRooms, toRoomListItem } from "@/data/RoomsData";
import type { Locale } from "@/lib/i18n/routing";
import { buildCollectionPageSchema } from "@/lib/seo/schema";

const COPY = {
    ru: {
        h1: "Категории номеров",
        schemaName: "Категории номеров",
        schemaDescription:
            "Номера и люксы отеля ACADEMIA Особняк Шувалова в Санкт-Петербурге.",
        crumbs: { home: "Главная", rooms: "Номера" },
        intro1: (
            <>
                Номера оформлены в&nbsp;стиле современного неоклассицизма:
                светлые, спокойные цвета и&nbsp;четкие линии настраивают
                на&nbsp;отдых и&nbsp;расслабление.
            </>
        ),
        intro2: (
            <>
                В&nbsp;отеле-особняке представлены категории: классический
                Стандарт, изысканный Делюкс, двухкомнатный Джуниор Сьют
                с&nbsp;отдельной спальней, трехкомнатный Сьют с&nbsp;двумя
                спальнями и&nbsp;гостиной и&nbsp;два уникальных исторических
                люкса, названные в&nbsp;честь владельцев особняка.
            </>
        ),
    },
    en: {
        h1: "Room Categories",
        schemaName: "Room categories",
        schemaDescription:
            "Rooms and suites at ACADEMIA Mansion Shuvaloff in Saint Petersburg.",
        crumbs: { home: "Home", rooms: "Rooms" },
        intro1: (
            <>
                The rooms are designed in a modern neoclassical style: soft
                tones, measured lines, and a calm atmosphere built for rest.
            </>
        ),
        intro2: (
            <>
                The mansion hotel offers Standard, Superior, Junior Suite,
                Suite, and two distinctive historical residences named after the
                former owners of the mansion.
            </>
        ),
    },
} as const;

export default function RoomsPage({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const rooms = AllRooms[locale];

    return (
        <main
            className="flex flex-col gap-4 xl:gap-10"
            itemScope
            itemType="https://schema.org/CollectionPage"
        >
            <StructuredData
                data={buildCollectionPageSchema({
                    locale,
                    path: "/rooms/",
                    name: t.schemaName,
                    description: t.schemaDescription,
                    breadcrumbs: [
                        { name: t.crumbs.home, path: "/" },
                        { name: t.crumbs.rooms, path: "/rooms/" },
                    ],
                    items: rooms.map((room) => ({
                        name: room.title,
                        path: room.isHistorical
                            ? `/rooms/historical/${room.slug}/`
                            : `/rooms/${room.slug}/`,
                        image: room.image.src,
                        description: room.description,
                    })),
                })}
            />
            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-3xl xl:mx-auto">
                <FadeUp>
                    <h1>{t.h1}</h1>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="xl:mt-2">{t.intro1}</p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p>{t.intro2}</p>
                </FadeUp>
            </section>
            <BookingForm />
            <RoomsSection rooms={rooms.map(toRoomListItem)} />
            <Divider />
            <ContactsSection />
        </main>
    );
}
