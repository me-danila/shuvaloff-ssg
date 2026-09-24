"use client";

import { Fragment, type ReactNode, useId, useState } from "react";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";

export type ExpandableCard = {
    id: string;
    title: string;
    image: { src: string; alt: string };
    /** Раскрываемое содержимое: рендерится всегда (для поиска), видно по клику. */
    content: ReactNode;
};

/**
 * Карточки-фото с «+»: клик раскрывает панель с подробностями, открыта
 * максимум одна. На мобиле панель встает сразу под своей карточкой, с двух
 * колонок — под всем рядом во всю ширину.
 *
 * Раскрытие плавное: высота анимируется через grid-template-rows 0fr → 1fr,
 * поэтому закрытая панель остается в DOM (inert) и ее текст видят поисковики.
 * Вертикальные отступы — внутри панели, а не row-gap сетки: иначе закрытые
 * панели оставляли бы пустые зазоры.
 */
export default function ExpandableCards({
    items,
    defaultOpenId = null,
    className = "",
}: {
    items: ExpandableCard[];
    defaultOpenId?: string | null;
    className?: string;
}) {
    const [openId, setOpenId] = useState<string | null>(defaultOpenId);
    const baseId = useId();

    return (
        <StaggerContainer
            staggerChildren={0.05}
            className={`grid gap-x-2 sm:grid-cols-2 xl:gap-x-4 ${className}`}
        >
            {items.map((item, index) => {
                const isOpen = openId === item.id;
                const panelId = `${baseId}-${item.id}`;

                return (
                    <Fragment key={item.id}>
                        <StaggerItem
                            className={index > 0 ? "max-sm:mt-2" : undefined}
                        >
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() =>
                                    setOpenId(isOpen ? null : item.id)
                                }
                                className="relative isolate flex h-60 w-full cursor-pointer items-end justify-between gap-4 overflow-hidden p-6 text-left text-white xl:h-72"
                            >
                                <Image
                                    src={item.image.src}
                                    alt={item.image.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                    className="-z-10 object-cover"
                                />
                                <span className="font-history text-xl uppercase xl:text-3xl">
                                    {item.title}
                                </span>
                                <PlusIcon open={isOpen} />
                            </button>
                        </StaggerItem>

                        <div
                            id={panelId}
                            inert={!isOpen}
                            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:order-last sm:col-span-2 ${
                                isOpen
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="min-h-0 overflow-hidden">
                                <div className="pt-2 xl:pt-4">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </StaggerContainer>
    );
}

function PlusIcon({ open }: { open: boolean }) {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 32 32"
            className={`size-7 shrink-0 transition-transform duration-300 xl:size-8 ${
                open ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="16" cy="16" r="14.5" />
            <path d="M16 10v12M10 16h12" strokeLinecap="round" />
        </svg>
    );
}
