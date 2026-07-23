"use client";

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ImageIcon,
} from "@phosphor-icons/react/dist/ssr";
import { type ReactNode, useState } from "react";
import Image from "@/components/ui/OptimizedImage";

type ResidenceImage = {
    src: string;
    alt: string;
    // CSS object-position для этого фото. Не задан → "center center".
    imagePosition?: string;
};

type CardResidenceProps = {
    title: string;
    subtitle: ReactNode;
    description: string;
    prevLabel: string;
    nextLabel: string;
    // Пока реальных фото нет — рендерим заполнители; их число задаёт счётчик.
    // Когда появятся фото, передать `images` — заполнители исчезнут сами.
    photoCount?: number;
    images?: ResidenceImage[];
};

export default function CardResidence({
    title,
    subtitle,
    description,
    prevLabel,
    nextLabel,
    photoCount = 7,
    images,
}: CardResidenceProps) {
    const total = images?.length ?? photoCount;
    const [current, setCurrent] = useState(0);

    const go = (dir: -1 | 1) => setCurrent((c) => (c + dir + total) % total);

    const active = images?.[current];

    return (
        <div className="flex flex-col overflow-hidden rounded-[4px] bg-white">
            {/* Заголовок + рукописный подзаголовок */}
            <div className="px-6 pt-8 text-center xl:px-10 xl:pt-10">
                <h3 className="font-history text-xl uppercase leading-tight text-[#372a24] xl:text-2xl">
                    {title}
                </h3>
                <p className="mt-4 font-alistair text-2xl leading-tight text-[#372a24] xl:mt-5 xl:text-[32px]">
                    {subtitle}
                </p>
            </div>

            {/* Фото (во всю ширину карточки) */}
            <div className="relative mt-6 aspect-[4/3] w-full md:aspect-[5/2] xl:mt-8">
                {active ? (
                    <Image
                        key={active.src}
                        src={active.src}
                        alt={active.alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 50vw"
                        loading="lazy"
                        className="object-cover"
                        style={{
                            objectPosition:
                                active.imagePosition ?? "center center",
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-stone-200 text-stone-400">
                        <ImageIcon size={44} weight="thin" />
                        <span className="text-xs">Фото {current + 1}</span>
                    </div>
                )}
            </div>

            {/* Описание + навигация */}
            <div className="flex flex-1 flex-col items-center px-6 pt-6 pb-8 text-center xl:px-10 xl:pt-8 xl:pb-10">
                <p className="text-[#372a24]">{description}</p>

                <div className="mt-auto flex items-center gap-8 pt-6 xl:gap-10 xl:pt-8">
                    <button
                        type="button"
                        aria-label={prevLabel}
                        onClick={() => go(-1)}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#efefef] text-[#372a24] transition-colors duration-300 hover:bg-[#e5e5e3] active:bg-[#5c1f26] active:text-white xl:h-14 xl:w-14"
                    >
                        <ArrowLeftIcon size={22} weight="light" />
                    </button>
                    <span className="text-sm text-[#372a24] xl:text-lg">
                        {current + 1} / {total}
                    </span>
                    <button
                        type="button"
                        aria-label={nextLabel}
                        onClick={() => go(1)}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#efefef] text-[#372a24] transition-colors duration-300 hover:bg-[#e5e5e3] active:bg-[#5c1f26] active:text-white xl:h-14 xl:w-14"
                    >
                        <ArrowRightIcon size={22} weight="light" />
                    </button>
                </div>
            </div>
        </div>
    );
}
