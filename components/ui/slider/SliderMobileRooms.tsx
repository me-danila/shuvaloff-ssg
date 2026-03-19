"use client";

import Image from "next/image";
import { SquareIcon, UserIcon } from "@/components/ui/icons";
import { useSlider } from "@/hooks/useSlider";

type RoomSlide = {
    image: { src: string; alt: string };
    title: string;
    slug: string;
    area: string;
    guests: string;
    description: string;
};

type SliderMobileRoomsProps = {
    rooms: RoomSlide[];
};

export default function SliderMobileRooms({ rooms }: SliderMobileRoomsProps) {
    const { current, sliderRef, scrollTo } = useSlider();

    return (
        <div className="xl:hidden flex flex-col gap-4 px-6">
            {/* Слайдер */}
            <div className="relative">
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar rounded-lg"
                >
                    {rooms.map((room) => (
                        <a
                            href={`/rooms/${room.slug}/`}
                            key={room.title}
                            className="relative snap-start shrink-0 w-full h-90 overflow-hidden"
                        >
                            <Image
                                src={room.image.src}
                                alt={room.image.alt}
                                fill
                                sizes="100vw"
                                loading="lazy"
                                className="object-cover"
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
                                }}
                            />

                            {/* Заголовок и ссылка поверх фото */}
                            <div className="absolute top-0 inset-x-0 p-6 flex flex-col gap-2 z-10">
                                <h3 className="text-white font-baskerville uppercase text-2xl leading-tight">
                                    {room.title}
                                </h3>
                                <p className="flex items-center gap-3 text-white uppercase tracking-widest text-xs">
                                    Подробнее
                                    <span className="text-lg">›</span>
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Точки */}
                <div className="flex justify-center absolute bottom-4 inset-x-0 gap-2 z-10">
                    {rooms.map((room, i) => (
                        <button
                            type="button"
                            key={room.title}
                            onClick={() => scrollTo(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === current
                                    ? "bg-white w-3"
                                    : "bg-white/50 w-2"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Характеристики и описание текущего номера */}
            <div className="flex items-center gap-4 text-sm text-zinc-700">
                <span className="flex items-center gap-2">
                    <SquareIcon size={16} color="#364D6B" />
                    {rooms[current]?.area}
                </span>
                <span className="flex items-center gap-2">
                    <UserIcon size={12} color="#364D6B" />
                    {rooms[current]?.guests}
                </span>
            </div>
            <p className="text-zinc-700">{rooms[current]?.description}</p>
        </div>
    );
}
