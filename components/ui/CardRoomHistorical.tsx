"use client";

import Button from "@/components/ui/Button";
import { BedIcon, SquareIcon, UserIcon } from "@/components/ui/icons";
import Image from "@/components/ui/OptimizedImage";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

type CardRoomHistoricalProps = {
    title: string;
    description: string;
    image: { src: string; alt: string };
    slug: string;
    bed: string;
    area: string;
    guests: string;
    bookingUrl: string;
};

export default function CardRoomHistorical({
    title,
    description,
    image,
    slug,
    bed,
    area,
    guests,
    bookingUrl,
}: CardRoomHistoricalProps) {
    const locale = useLocale();
    const detailsLabel = locale === "ru" ? "ПОДРОБНЕЕ" : "DETAILS";
    const bookLabel = locale === "ru" ? "ЗАБРОНИРОВАТЬ" : "BOOK NOW";
    const detailsHref = localizeHref(`/rooms/historical/${slug}/`, locale);

    return (
        <div
            className="flex flex-1 flex-col rounded-[4px] bg-white p-5 xl:p-8"
            itemScope
            itemType="https://schema.org/HotelRoom"
        >
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta itemProp="url" content={detailsHref} />
            <meta itemProp="image" content={image.src} />

            {/* Заголовок и описание */}
            <a
                href={detailsHref}
                className="flex flex-col text-center md:min-h-[160px]"
                itemProp="url"
            >
                <h3 className="font-history text-2xl uppercase leading-tight text-[#372a24] xl:text-3xl">
                    {title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#372a24]/85 xl:text-base">
                    {description}
                </p>
            </a>

            {/* Фото */}
            <a
                href={detailsHref}
                className="relative mt-6 block aspect-4/5 overflow-hidden rounded-md md:aspect-square"
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1200px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover object-bottom transition-transform duration-700 hover:scale-105"
                />
            </a>

            {/* Характеристики */}
            <div className="mt-6 flex flex-col gap-4 text-sm text-[#372a24]">
                <span className="flex items-center gap-3">
                    <BedIcon size={18} color="#372a24" />
                    {bed}
                </span>
                <span className="flex items-center gap-8">
                    <span className="flex items-center gap-3">
                        <SquareIcon size={14} color="#372a24" />
                        {area}
                    </span>
                    <span className="flex items-center gap-3">
                        <UserIcon size={14} color="#372a24" />
                        {guests}
                    </span>
                </span>
            </div>

            {/* Кнопки */}
            <div className="mt-7 flex gap-2">
                <Button
                    href={bookingUrl}
                    variant="primary"
                    size="sm"
                    className="shrink-0 xl:px-6"
                >
                    {bookLabel}
                </Button>
                <Button
                    href={detailsHref}
                    variant="primary-outline"
                    size="sm"
                    className="shrink-0 xl:px-6"
                >
                    {detailsLabel}
                </Button>
            </div>
        </div>
    );
}
