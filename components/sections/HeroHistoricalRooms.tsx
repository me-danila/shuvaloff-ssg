import type React from "react";
import Button from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { Parallax } from "@/components/ui/Parallax";

type HeroHistoricalRoomsProps = {
    title: React.ReactNode;
    additionalTitle?: React.ReactNode;
    subtitle?: React.ReactNode;
    image: { src: string; alt: string };
    button?: { label: string; href: string };
};

export default function HeroHistoricalRooms({
    title,
    additionalTitle,
    subtitle,
    image,
    button,
}: HeroHistoricalRoomsProps) {
    return (
        <section>
            {/* Заголовок */}
            <div className="m-6 xl:text-center xl:my-6">
                <h1>{title}</h1>
                {additionalTitle && (
                    <p className="xl:text-center font-alistair text-2xl/7 xl:text-[40px] xl:mx-auto xl:mt-2 xl:mb-10">
                        {additionalTitle}
                    </p>
                )}
            </div>

            {/* Фото с подписью */}
            <div className="relative mx-6 xl:mx-0 rounded-md overflow-hidden aspect-3/4 xl:aspect-14/6 flex items-end p-6 justify-center">
                <FadeIn
                    duration={0.9}
                    className="absolute inset-0 h-full w-full"
                >
                    <Parallax className="h-full w-full" offset={80}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="100vw"
                            loading="eager"
                            className="object-cover"
                        />
                    </Parallax>
                </FadeIn>

                {/* Градиент снизу */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0.125) 50%, rgba(0,0,0,0.45) 100%)",
                    }}
                />

                {/* Subtitle */}
                {subtitle && (
                    <p className="absolute bottom-8 inset-x-0 text-center font-alistair text-2xl xl:text-4xl text-white z-10">
                        {subtitle}
                    </p>
                )}

                {/* Button */}
                {button && (
                    <Button href={button.href} variant="primary">
                        {button.label}
                    </Button>
                )}
            </div>
        </section>
    );
}
