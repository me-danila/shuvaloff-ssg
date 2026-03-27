import Image from "next/image";
import type React from "react";
import { FadeIn } from "@/components/ui/Motion";
import { Parallax } from "@/components/ui/Parallax";

type HeroHistoricalRoomsProps = {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    image: { src: string; alt: string };
};

export default function HeroHistoricalRooms({
    title,
    subtitle,
    image,
}: HeroHistoricalRoomsProps) {
    return (
        <section>
            {/* Заголовок */}
            <div className="m-6 xl:text-center xl:my-6">
                <h1>{title}</h1>
            </div>

            {/* Фото с подписью */}
            <div className="relative mx-6 xl:mx-0 rounded-md overflow-hidden aspect-3/4 xl:aspect-16/7">
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
                <p className="absolute bottom-8 inset-x-0 text-center font-alistair text-2xl xl:text-4xl text-white z-10">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}
