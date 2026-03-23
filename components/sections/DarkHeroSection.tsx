import Image from "next/image";
import type React from "react";

type ContentBlock = {
    title: React.ReactNode;
    paragraphs: string[];
};

type DarkHeroSectionProps = {
    blocks: ContentBlock[];
    image: { src: string; alt: string };
    imageMobile?: { src: string; alt: string };
    size?: "xl" | "2xl" | "3xl";
    imageGradient?: boolean;
};

const sizeClass: Record<NonNullable<DarkHeroSectionProps["size"]>, string> = {
    xl: "xl:max-w-xl",
    "2xl": "xl:max-w-2xl",
    "3xl": "xl:max-w-3xl",
};

export default function DarkHeroSection({
    blocks,
    image,
    imageMobile,
    size = "xl",
    imageGradient = true,
}: DarkHeroSectionProps) {
    const mobileImage = imageMobile ?? image;

    return (
        <section className="relative bg-zinc-950 text-white overflow-hidden">
            {/* MOBILE: фото снизу 55% */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] xl:hidden">
                <Image
                    src={mobileImage.src}
                    alt={mobileImage.alt}
                    fill
                    sizes="100vw"
                    loading="lazy"
                    className="object-cover object-top"
                />
                {imageGradient ? (
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(180deg, #161113 0%, rgba(21,17,19,0.85) 30%, rgba(20,16,19,0.4) 65%, rgba(20,16,19,0) 100%)",
                        }}
                    />
                ) : null}
            </div>

            {/* DESKTOP: фото на весь блок */}
            <div className="hidden xl:block absolute inset-0">
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100vw"
                    loading="lazy"
                    className="object-cover"
                />
                {imageGradient ? (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(#161113, rgba(21,17,19,0.51), rgba(20,16,19,0))",
                        }}
                    />
                ) : null}
            </div>

            {/* Контент */}
            <div
                className={`relative z-10 px-6 pt-12 pb-64 xl:pb-40 xl:px-20 xl:pt-20 ${sizeClass[size]} flex flex-col gap-8`}
            >
                {blocks.map((block) => (
                    <div
                        key={block.paragraphs[0]}
                        className="flex flex-col gap-4"
                    >
                        <h3 className="mt-4 font-baskerville text-2xl xl:text-4xl uppercase leading-tight">
                            {block.title}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {block.paragraphs.map((text) => (
                                <p
                                    key={text}
                                    className="text-zinc-300 leading-relaxed"
                                >
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
