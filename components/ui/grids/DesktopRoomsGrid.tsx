import Image from "next/image";
import Button from "@/components/ui/Button";
import { SquareIcon, UserIcon } from "@/components/ui/icons";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";

type RoomSlide = {
    image: { src: string; alt: string };
    title: string;
    slug: string;
    area: string;
    guests: string;
    description: string;
    bookingUrl: string;
};

type DesktopRoomsGridProps = {
    rooms: RoomSlide[];
};

export default function DesktopRoomsGrid({ rooms }: DesktopRoomsGridProps) {
    return (
        <StaggerContainer className="hidden xl:grid xl:grid-cols-2 xl:gap-8 xl:max-w-6xl xl:mx-auto xl:w-full">
            {rooms.map((room) => (
                <StaggerItem key={room.title} className="flex flex-col gap-2">
                    {/* Фото */}
                    <a
                        className="relative w-full h-90 overflow-hidden rounded-md"
                        href={`/rooms/${room.slug}/`}
                    >
                        <Image
                            src={room.image.src}
                            alt={room.image.alt}
                            fill
                            sizes="50vw"
                            loading="lazy"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </a>

                    {/* Заголовок */}
                    <h3 className="uppercase text-xl mt-3">{room.title}</h3>

                    {/* Описание */}
                    <p className="text-zinc-600">{room.description}</p>

                    {/* Кнопка + характеристики */}
                    <div className="flex items-center gap-8 xl:mt-2">
                        <div className="flex gap-4">
                            <Button
                                href={`/rooms/${room.slug}/`}
                                variant="primary"
                                size="sm"
                            >
                                Подробнее
                            </Button>
                            <Button
                                href={room.bookingUrl}
                                variant="primary-outline"
                                size="sm"
                            >
                                Выбрать
                            </Button>
                        </div>
                        <span className="flex items-center gap-2 text-sm text-zinc-600">
                            <SquareIcon size={16} color="#364D6B" />
                            {room.area}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-zinc-600">
                            <UserIcon size={12} color="#364D6B" />
                            {room.guests}
                        </span>
                    </div>
                </StaggerItem>
            ))}
        </StaggerContainer>
    );
}
