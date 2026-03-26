"use client";

import Link from "next/link";
import { useState } from "react";
import DesktopRoomsGrid from "@/components/ui/grids/DesktopRoomsGrid";
import SliderMobileRooms from "@/components/ui/slider/SliderMobileRooms";
import { AllRooms } from "@/data/RoomsData";

const classicalRooms = AllRooms.filter((r) => !r.isHistorical);
const historicalRooms = AllRooms.filter((r) => r.isHistorical);

export default function RoomsSection() {
    const [showHistorical, setShowHistorical] = useState(false);

    const activeRooms = showHistorical ? historicalRooms : classicalRooms;

    return (
        <>
            {/* Свитчер */}
            <section className="flex mx-6 xl:w-full xl:max-w-2xl xl:mx-auto xl:gap-3 xl:-mt-6">
                {/* Классические номера */}
                <div
                    className={`flex items-center flex-1 whitespace-nowrap xl:rounded-md transition-colors border border-brand-blue-100 ${!showHistorical ? "bg-brand-blue-100" : ""}`}
                >
                    {/* Мобайл */}
                    <button
                        type="button"
                        onClick={() => setShowHistorical(false)}
                        className={`flex-1 xl:hidden text-brand-blue text-xs py-4 px-2 cursor-pointer ${!showHistorical ? "font-semibold" : ""}`}
                    >
                        Классические номера
                    </button>

                    {/* Десктоп: ссылки на отдельные номера */}
                    {classicalRooms.map((room) => (
                        <Link
                            href={`/rooms/${room.slug}/`}
                            key={room.title}
                            className={`hidden xl:flex-1 xl:items-center xl:justify-center xl:text-center xl:block px-4 py-4 text-brand-blue text-sm hover:bg-slate-300 transition-colors duration-200 rounded-md xl:uppercase ${showHistorical ? "" : "font-semibold"}`}
                        >
                            {room.title}
                        </Link>
                    ))}
                </div>

                {/* Исторические люксы */}
                <button
                    type="button"
                    onClick={() => setShowHistorical(true)}
                    className={`flex flex-1 items-center justify-center border px-2 py-4 text-xs text-brand-blue transition-colors xl:px-6 whitespace-nowrap xl:text-sm xl:flex-none xl:rounded-md cursor-pointer xl:uppercase ${showHistorical ? "bg-brand-blue-100 border-brand-blue-100 font-semibold" : "border-brand-blue-100 hover:bg-slate-300"}`}
                >
                    Исторические люксы
                </button>
            </section>

            {/* Контент — key сбрасывает useSlider при смене таба */}
            <SliderMobileRooms
                key={showHistorical ? "historical" : "classical"}
                rooms={activeRooms}
            />
            <DesktopRoomsGrid rooms={activeRooms} />
        </>
    );
}
