"use client";

import { useState } from "react";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";

export type AntiqueItem = {
    title: string;
    description: React.ReactNode;
    image?: { src: string; alt: string };
};

type AntiquesSectionProps = {
    intro?: React.ReactNode;
    items: AntiqueItem[];
};

function MobileCard({ item }: { item: AntiqueItem }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-md overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full text-left flex flex-col p-6 gap-6"
            >
                {item.image && (
                    <div
                        className="overflow-hidden transition-all duration-500 ease-in-out"
                        style={{ maxHeight: open ? "0px" : "400px" }}
                    >
                        <div className="relative w-full aspect-square">
                            <Image
                                src={item.image.src}
                                alt={item.image.alt}
                                fill
                                sizes="100vw"
                                loading="lazy"
                                className="object-contain p-2"
                            />
                        </div>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl/7 font-baskerville uppercase">
                        {item.title}
                    </h3>
                    <span
                        className="text-2xl text-zinc-400 ml-4 shrink-0 transition-transform duration-300"
                        style={{
                            transform: open ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                    >
                        ›
                    </span>
                </div>
            </button>
            <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: open ? "600px" : "0px" }}
            >
                <p className="px-6 pb-6 text-zinc-600 leading-relaxed">
                    {item.description}
                </p>
            </div>
        </div>
    );
}

export default function AntiquesSection({
    intro,
    items,
}: AntiquesSectionProps) {
    const isLastOdd = items.length % 2 !== 0;

    return (
        <section className="flex flex-col py-8 gap-6 bg-stone-200 xl:py-12">
            {intro && (
                <FadeUp className="mx-8 text-neutral-900 xl:text-center xl:max-w-6xl xl:mx-auto">
                    {intro}
                </FadeUp>
            )}

            <Divider />

            {/* Мобайл */}
            <div className="flex flex-col gap-3 xl:hidden">
                {items.map((item) => (
                    <MobileCard key={item.title} item={item} />
                ))}
            </div>

            {/* Десктоп */}
            <StaggerContainer className="hidden xl:grid xl:grid-cols-2 xl:gap-4 xl:max-w-6xl xl:mx-auto xl:w-full xl:mt-2">
                {items.map((item, i) => {
                    const isLastAndOdd = isLastOdd && i === items.length - 1;
                    return (
                        <StaggerItem
                            key={item.title}
                            className={`bg-white rounded-md p-8 flex flex-col items-center text-center gap-4 mt-2 ${isLastAndOdd ? "xl:col-span-2" : ""}`}
                        >
                            {item.image && (
                                <div className="relative w-full h-90">
                                    <Image
                                        src={item.image.src}
                                        alt={item.image.alt}
                                        fill
                                        sizes={isLastAndOdd ? "80vw" : "40vw"}
                                        loading="lazy"
                                        className="object-contain"
                                    />
                                </div>
                            )}
                            <h3 className="font-baskerville uppercase text-2xl/7 xl:mt-4">
                                {item.title}
                            </h3>
                            <p className="text-zinc-600 leading-relaxed">
                                {item.description}
                            </p>
                        </StaggerItem>
                    );
                })}
            </StaggerContainer>
        </section>
    );
}
