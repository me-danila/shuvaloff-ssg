import type { Metadata } from "next";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import CardRoomHistorical from "@/components/ui/CardRoomHistorical";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { AllRooms } from "@/data/RoomsData";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Исторические люксы — ACADEMIA Особняк Шувалова",
    description:
        "Уникальные исторические люксы отеля ACADEMIA Особняк Шувалова в Санкт-Петербурге",
    alternates: getLocaleAlternates("/rooms/historical/", "ru"),
};

const historicalExtras: Record<
    string,
    { description: string; image: { src: string; alt: string } }
> = {
    dashkova: {
        description:
            "Изящный люкс, названный в честь Елизаветы Андреевны Воронцовой-Дашковой (урождённой Шуваловой, 1845-1924), с ярким, но утонченным интерьером, отражает многогранную личность хозяйки особняка.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/dashkova.png",
            alt: "Резиденция Дашковой",
        },
    },
    shuvalov: {
        description:
            "Просторный исторический люкс, посвященный графу Шувалову. Оформлен в стиле строгого неоклассицизма с подлинными антикварными деталями. Интерьер отражает эстетику зрелого вкуса, силу характера и уважение к традициям рода.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/shuvalov.png",
            alt: "Резиденция графа Шувалова",
        },
    },
};

const historicalRooms = AllRooms.ru
    .filter((r) => r.isHistorical)
    .map((r) => ({
        ...r,
        ...historicalExtras[r.slug],
    }));

export default function HistoricalRooms() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-5xl xl:mx-auto">
                <FadeUp>
                    <h1>ИСТОРИЧЕСКИЕ ЛЮКСЫ</h1>
                </FadeUp>
                <FadeUp delay={0.1} className="xl:mt-2">
                    <p>
                        Исторические люксы — объекты культурного наследия, в
                        которых сохранены детали отделки, восстановлен
                        изначальный цвет стен и добавлены подлинные антикварные
                        предметы эпохи конца XIX — начала ХХ века.
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
                        Это резиденции, отражающие характер владельцев особняка:
                        графа Андрея Шувалова и его дочери Елизаветы
                        Воронцовой-Дашковой. Изысканные линии, глубокие цвета и
                        изящные детали дают возможность почувствовать себя
                        дорогим гостем одного из известных аристократических
                        домов Российской Империи.
                    </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p>
                        Стены особняка хранят память о людях, которые здесь жили
                        — не выдуманных персонажах, а реальных аристократах.
                        Помнят их уклад жизни, вечерние разговоры при свечах,
                        неспешные шаги по мраморной лестнице, звуки рояля,
                        шелест парадного платья, мягкий свет люстры — всё это не
                        декорации.
                    </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p>
                        Это отблески жизни, которой когда-то был наполнен
                        особняк.
                    </p>
                </FadeUp>
                <FadeUp
                    delay={0.3}
                    className="mx-4 text-center font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:mt-4"
                >
                    Пространство, в котором дышит история Петербурга
                </FadeUp>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
