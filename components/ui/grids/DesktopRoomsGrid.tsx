"use client";

import Button from "@/components/ui/Button";
import { SquareIcon, UserIcon } from "@/components/ui/icons";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import ImageGallerySlider from "@/components/ui/slider/ImageGallerySlider";
import type { Room } from "@/data/RoomsData";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

type DesktopRoomsGridProps = {
    rooms: Room[];
};

export default function DesktopRoomsGrid({ rooms }: DesktopRoomsGridProps) {
    const locale = useLocale();
    const detailsLabel = locale === "ru" ? "Подробнее" : "Details";
    const chooseLabel = locale === "ru" ? "Выбрать" : "Choose";

    return (
        <StaggerContainer className="hidden xl:grid xl:grid-cols-2 xl:gap-8 xl:max-w-6xl xl:mx-auto xl:w-full">
            {rooms.map((room) => (
                <StaggerItem key={room.title} className="flex flex-col gap-2">
                    {/* Фото */}
                    <div className="relative w-full h-90 overflow-hidden rounded-md">
                        <ImageGallerySlider
                            images={room.gallery}
                            className="h-full"
                            sizes="50vw"
                        />
                        <a
                            className="absolute inset-0 z-10 opacity-0"
                            href={localizeHref(`/rooms/${room.slug}/`, locale)}
                            aria-label={room.title}
                        >
                            a{room.title}
                        </a>
                    </div>

                    {/* Заголовок */}
                    <h3 className="uppercase text-xl mt-3">{room.title}</h3>

                    {/* Описание */}
                    <p className="text-zinc-600">{room.description}</p>

                    {/* Кнопка + характеристики */}
                    <div className="flex items-center gap-8 xl:mt-2">
                        <div className="flex gap-4">
                            <Button
                                href={localizeHref(
                                    `/rooms/${room.slug}/`,
                                    locale,
                                )}
                                variant="primary"
                                size="sm"
                            >
                                {detailsLabel}
                            </Button>
                            <Button
                                href={room.bookingUrl}
                                variant="primary-outline"
                                size="sm"
                            >
                                {chooseLabel}
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
