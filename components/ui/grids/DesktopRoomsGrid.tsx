"use client";

import Button from "@/components/ui/Button";
import { SquareIcon, UserIcon } from "@/components/ui/icons";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import ImageGallerySlider from "@/components/ui/slider/ImageGallerySlider";
import type { RoomListItem } from "@/data/RoomsData";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

type DesktopRoomsGridProps = {
    rooms: RoomListItem[];
};

export default function DesktopRoomsGrid({ rooms }: DesktopRoomsGridProps) {
    const locale = useLocale();
    const detailsLabel = locale === "ru" ? "Подробнее" : "Details";
    const chooseLabel = locale === "ru" ? "Выбрать" : "Choose";
    const getRoomHref = (slug: string, isHistorical: boolean) =>
        localizeHref(
            isHistorical ? `/rooms/historical/${slug}/` : `/rooms/${slug}/`,
            locale,
        );

    return (
        <StaggerContainer
            className="hidden xl:grid xl:grid-cols-2 xl:gap-8 xl:max-w-7xl xl:mx-auto xl:w-full"
            itemScope
            itemType="https://schema.org/ItemList"
        >
            {rooms.map((room, index) => (
                <StaggerItem
                    key={room.title}
                    className="flex flex-col gap-2"
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                >
                    <meta itemProp="position" content={`${index + 1}`} />
                    {/* Фото */}
                    <div
                        className="relative w-full h-90 overflow-hidden rounded-md"
                        itemProp="item"
                        itemScope
                        itemType="https://schema.org/HotelRoom"
                    >
                        <meta itemProp="name" content={room.title} />
                        <meta
                            itemProp="description"
                            content={room.description}
                        />
                        <meta
                            itemProp="url"
                            content={getRoomHref(room.slug, room.isHistorical)}
                        />
                        <meta itemProp="image" content={room.gallery[0].src} />
                        <ImageGallerySlider
                            images={room.gallery}
                            className="h-full"
                            sizes="50vw"
                        />
                        <a
                            className="absolute inset-0 z-10 opacity-0"
                            href={getRoomHref(room.slug, room.isHistorical)}
                            aria-label={room.title}
                        >
                            {room.title}
                        </a>
                    </div>

                    {/* Заголовок */}
                    <h3 className="uppercase text-xl mt-3">{room.title}</h3>

                    {/* Описание */}
                    <p className="text-zinc-600">{room.description}</p>

                    {/* Кнопка + характеристики */}
                    <div className="flex items-center gap-8 xl:mt-2">
                        <div className="flex gap-2">
                            <Button
                                href={room.bookingUrl}
                                variant="primary"
                                size="sm"
                            >
                                {chooseLabel}
                            </Button>
                            <Button
                                href={getRoomHref(room.slug, room.isHistorical)}
                                variant="primary-outline"
                                size="sm"
                            >
                                {detailsLabel}
                            </Button>
                        </div>
                        <span className="flex items-center gap-2 text-sm text-zinc-600">
                            <SquareIcon size={16} color="#372A24" />
                            {room.area}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-zinc-600">
                            <UserIcon size={12} color="#372A24" />
                            {room.guests}
                        </span>
                    </div>
                </StaggerItem>
            ))}
        </StaggerContainer>
    );
}
