import type { Metadata } from "next";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import CardRoomHistorical from "@/components/ui/CardRoomHistorical";
import Divider from "@/components/ui/Divider";
import { AllRooms } from "@/data/RoomsData";

export const metadata: Metadata = {
    title: "Исторические люксы — ACADEMIA Особняк Шувалова",
    description:
        "Уникальные исторические люксы отеля ACADEMIA Особняк Шувалова в Санкт-Петербурге",
};

const historicalExtras: Record<
    string,
    { description: string; image: { src: string; alt: string } }
> = {
    "Резиденция Дашковой": {
        description:
            "Изящный люкс, названный в честь Елизаветы Андреевны Воронцовой-Дашковой (урождённой Шуваловой, 1845-1924), с ярким, но утонченным интерьером, отражает многогранную личность хозяйки особняка.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/dashkova.png",
            alt: "Резиденция Дашковой",
        },
    },
    "Резиденция графа Шувалова": {
        description:
            "Просторный исторический люкс, посвященный графу Шувалову. Оформлен в стиле строгого неоклассицизма с подлинными антикварными деталями. Интерьер отражает эстетику зрелого вкуса, силу характера и уважение к традициям рода.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/shuvalov.png",
            alt: "Резиденция графа Шувалова",
        },
    },
};

const historicalRooms = AllRooms.filter((r) => r.isHistorical).map((r) => ({
    ...r,
    ...historicalExtras[r.title],
}));

export default function HistoricalRooms() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-5xl xl:mx-auto">
                <h1>ИСТОРИЧЕСКИЕ ЛЮКСЫ</h1>
                <p className="xl:mt-2">
                    Исторические люксы — объекты культурного наследия, в которых
                    сохранены детали отделки, восстановлен изначальный цвет стен
                    и добавлены подлинные антикварные предметы эпохи конца XIX —
                    начала ХХ века.
                </p>
            </section>

            <BookingForm />

            <section className="flex flex-col gap-8 mx-4 mb-4 md:flex-row xl:w-full xl:max-w-6xl xl:mx-auto xl:mt-6">
                {historicalRooms.map((room) => (
                    <CardRoomHistorical
                        key={room.title}
                        title={room.title}
                        description={room.description}
                        image={room.image}
                        slug={room.slug}
                        bed={room.bed}
                        area={room.area}
                        guests={room.guests}
                        bookingUrl={room.bookingUrl}
                    />
                ))}
            </section>

            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-5xl xl:mx-auto">
                <p>
                    Это резиденции, отражающие характер владельцев особняка:
                    графа Андрея Шувалова и его дочери Елизаветы
                    Воронцовой-Дашковой. Изысканные линии, глубокие цвета и
                    изящные детали дают возможность почувствовать себя дорогим
                    гостем одного из известных аристократических домов
                    Российской Империи.
                </p>
                <p>
                    Стены особняка хранят память о людях, которые здесь жили —
                    не выдуманных персонажах, а реальных аристократах. Помнят их
                    уклад жизни, вечерние разговоры при свечах, неспешные шаги
                    по мраморной лестнице, звуки рояля, шелест парадного платья,
                    мягкий свет люстры — всё это не декорации.
                </p>
                <p>
                    Это отблески жизни, которой когда-то был наполнен особняк.
                </p>
                <p className="mx-4 text-center font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:mt-4">
                    Пространство, в котором дышит история Петербурга
                </p>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
