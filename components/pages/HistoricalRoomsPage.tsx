import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import CardRoomHistorical from "@/components/ui/CardRoomHistorical";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { AllRooms } from "@/data/RoomsData";
import type { Locale } from "@/lib/i18n/routing";
import { buildCollectionPageSchema } from "@/lib/seo/schema";

type HistoricalCopy = {
    title: string;
    intro: React.ReactNode[];
    galleryHeading: string;
    schemaName: string;
    schemaDescription: string;
    breadcrumbHome: string;
    breadcrumbRooms: string;
    breadcrumbHistorical: string;
    descriptions: Record<string, string>;
    images: Record<string, { alt: string }>;
};

const copyByLocale: Record<Locale, HistoricalCopy> = {
    ru: {
        title: "ИСТОРИЧЕСКИЕ ЛЮКСЫ",
        intro: [
            <>
                Исторические люксы — объекты культурного наследия, в которых
                сохранены детали отделки, восстановлен изначальный цвет стен и
                добавлены подлинные антикварные предметы эпохи конца XIX — начала
                ХХ века.
            </>,
            <>
                Это резиденции, отражающие характер владельцев особняка: графа
                Андрея Шувалова и его дочери Елизаветы Воронцовой-Дашковой.
                Изысканные линии, глубокие цвета и изящные детали дают
                возможность почувствовать себя дорогим гостем одного из известных
                аристократических домов Российской Империи. Стены особняка хранят
                память о людях, которые здесь жили — не выдуманных персонажах, а
                реальных аристократах. Помнят их уклад жизни, вечерние разговоры
                при свечах, неспешные шаги по мраморной лестнице, звуки рояля,
                шелест парадного платья, мягкий свет люстры — всё это не
                декорации.
            </>,
            <>
                Это отблески жизни, которой когда-то был наполнен особняк.
            </>,
        ],
        galleryHeading: "Пространство, в котором дышит история Петербурга",
        schemaName: "Исторические люксы",
        schemaDescription:
            "Исторические люксы с подлинными антикварными элементами в особняке Шувалова.",
        breadcrumbHome: "Главная",
        breadcrumbRooms: "Номера",
        breadcrumbHistorical: "Исторические люксы",
        descriptions: {
            dashkova:
                "Изящный люкс, названный в честь Елизаветы Андреевны Воронцовой-Дашковой (урождённой Шуваловой, 1845-1924), с ярким, но утонченным интерьером, отражает многогранную личность хозяйки особняка.",
            shuvalov:
                "Просторный исторический люкс, посвященный графу Шувалову. Оформлен в стиле строгого неоклассицизма с подлинными антикварными деталями. Интерьер отражает эстетику зрелого вкуса, силу характера и уважение к традициям рода.",
        },
        images: {
            dashkova: { alt: "Резиденция Дашковой" },
            shuvalov: { alt: "Резиденция графа Шувалова" },
        },
    },
    en: {
        title: "HISTORICAL SUITES",
        intro: [
            <>
                These historical suites are protected heritage spaces with
                restored original colors, preserved decorative details, and
                authentic antique objects from the late 19th and early 20th
                centuries.
            </>,
            <>
                These residences reflect the personalities of the mansion owners:
                Count Andrey Shuvalov and his daughter Elizaveta
                Vorontsova-Dashkova. Elegant lines, deep colors, and curated
                details let you feel like an honored guest of one of Imperial
                Russia's aristocratic houses. The mansion preserves memories of
                real people who once lived here: their evenings by candlelight,
                their slow steps on marble stairs, the sound of the piano, and
                the soft glow of chandeliers.
            </>,
            <>This is not decoration. It is continuity.</>,
        ],
        galleryHeading: "A space where the history of Saint Petersburg still breathes",
        schemaName: "Historical suites",
        schemaDescription:
            "Historical suites with authentic antiques inside the Shuvaloff Mansion.",
        breadcrumbHome: "Home",
        breadcrumbRooms: "Rooms",
        breadcrumbHistorical: "Historical suites",
        descriptions: {
            dashkova:
                "An elegant suite dedicated to Elizaveta Vorontsova-Dashkova, with a bright and refined interior inspired by her character.",
            shuvalov:
                "A spacious historical suite dedicated to Count Shuvalov, designed in strict neoclassical style with authentic antique accents.",
        },
        images: {
            dashkova: { alt: "Dashkova Residence" },
            shuvalov: { alt: "Count Shuvalov Residence" },
        },
    },
};

const roomImageSrc: Record<string, string> = {
    dashkova: "https://academia.spb.ru/wp-content/uploads/2026/03/dashkova.png",
    shuvalov: "https://academia.spb.ru/wp-content/uploads/2026/03/shuvalov.png",
};

export default function HistoricalRoomsPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    const historicalRooms = AllRooms[locale]
        .filter((r) => r.isHistorical)
        .map((r) => ({
            ...r,
            description: copy.descriptions[r.slug],
            image: {
                src: roomImageSrc[r.slug],
                alt: copy.images[r.slug].alt,
            },
        }));

    return (
        <main
            className="flex flex-col gap-8"
            itemScope
            itemType="https://schema.org/CollectionPage"
        >
            <StructuredData
                data={buildCollectionPageSchema({
                    locale,
                    path: "/rooms/historical/",
                    name: copy.schemaName,
                    description: copy.schemaDescription,
                    breadcrumbs: [
                        { name: copy.breadcrumbHome, path: "/" },
                        { name: copy.breadcrumbRooms, path: "/rooms/" },
                        {
                            name: copy.breadcrumbHistorical,
                            path: "/rooms/historical/",
                        },
                    ],
                    items: historicalRooms.map((room) => ({
                        name: room.title,
                        path: `/rooms/historical/${room.slug}/`,
                        image: room.image.src,
                        description: room.description,
                    })),
                })}
            />
            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-5xl xl:mx-auto">
                <FadeUp>
                    <h1>{copy.title}</h1>
                </FadeUp>
                {copy.intro.map((paragraph, i) => (
                    <FadeUp
                        // biome-ignore lint/suspicious/noArrayIndexKey: static copy
                        key={i}
                        delay={0.1 * (i + 1)}
                        className="xl:mt-2"
                    >
                        <p>{paragraph}</p>
                    </FadeUp>
                ))}
            </section>

            <BookingForm />

            <section className="bg-[#ededeb] py-10 xl:py-16">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 xl:gap-12 xl:px-0">
                    <FadeUp className="text-center font-alistair text-2xl text-[#3d2b22] xl:text-[40px] xl:max-w-4xl xl:mx-auto">
                        {copy.galleryHeading}
                    </FadeUp>

                    <StaggerContainer className="flex flex-col gap-8 md:flex-row md:items-stretch">
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
                </div>
            </section>

            <Divider />
            <ContactsSection />
        </main>
    );
}
