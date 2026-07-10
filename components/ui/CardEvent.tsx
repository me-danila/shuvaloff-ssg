"use client";

import Button from "@/components/ui/Button";
import Image from "@/components/ui/OptimizedImage";
import type { EventCard } from "@/data/EventsData";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

const moreLabel = { ru: "Подробнее", en: "Details" } as const;

export default function CardEvent({ event }: { event: EventCard }) {
    const locale = useLocale();
    const href = localizeHref(`/events/${event.slug}/`, locale);

    return (
        <article className="flex h-full w-full flex-col overflow-hidden rounded-[4px] bg-white pb-7 text-center">
            <a
                href={href}
                aria-label={event.title}
                className="relative aspect-[85/100] w-full overflow-hidden"
            >
                <Image
                    src={event.imgUrl}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                    style={
                        event.imgObjectPosition
                            ? { objectPosition: event.imgObjectPosition }
                            : undefined
                    }
                />
            </a>
            <p className="my-4 xl:my-6 px-4 font-history text-xl font-semibold uppercase leading-tight text-[#372a24] xl:text-[21px]">
                <time dateTime={event.start}>
                    {event.dateLabel}
                    <br />
                    {event.timeLabel}
                </time>
            </p>
            <h3 className="px-4 pb-1 font-history text-xl uppercase leading-tight text-[#372a24] xl:text-[21px]">
                <a
                    href={href}
                    className="transition-colors hover:text-brand-red"
                >
                    {event.title}
                </a>
            </h3>
            {/* flex-1 регион: растёт и держит кнопку внизу
                при любом (в т.ч. пустом) описании */}
            <div className="flex flex-1 flex-col px-5">
                {event.subtitle && (
                    <p className="mt-2 text-sm leading-6 text-[#372a24] xl:text-base">
                        {event.subtitle}
                    </p>
                )}
            </div>
            <div className="mt-6 px-5">
                <Button
                    href={href}
                    variant="primary"
                    size="xl"
                    className="xl:px-8 xl:py-3 xl:text-base"
                >
                    {moreLabel[locale]}
                </Button>
            </div>
        </article>
    );
}
