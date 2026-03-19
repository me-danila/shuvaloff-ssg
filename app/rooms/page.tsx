import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import RoomsSection from "@/components/sections/RoomsSection";
import Divider from "@/components/ui/Divider";

export const metadata: Metadata = {
    title: "Категории номеров — ACADEMIA Особняк Шувалова",
    description:
        "Номера и люксы отеля ACADEMIA Особняк Шувалова в Санкт-Петербурге",
};

export default function Rooms() {
    return (
        <main className="flex flex-col gap-4 xl:gap-10">
            <section className="flex flex-col gap-4 m-6 xl:text-center xl:max-w-3xl xl:mx-auto">
                <h1>Категории номеров</h1>
                <p className="xl:mt-2">
                    Номера оформлены в&nbsp;стиле современного неоклассицизма:
                    светлые, спокойные цвета и&nbsp;четкие линии настраивают
                    на&nbsp;отдых и&nbsp;расслабление.
                </p>
                <p>
                    В&nbsp;отеле-особняке представлены категории: классический
                    Стандарт, изысканный Делюкс, двухкомнатный Джуниор Сьют
                    с&nbsp;отдельной спальней, трехкомнатный Сьют с&nbsp;двумя
                    спальнями и&nbsp;гостиной и&nbsp;два уникальных исторических
                    люкса, названные в&nbsp;честь владельцев особняка.
                </p>
            </section>
            <RoomsSection />
            <Divider />
            <ContactsSection />
        </main>
    );
}
