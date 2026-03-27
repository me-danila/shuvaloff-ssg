import Image from "next/image";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import SliderMobile from "@/components/ui/slider/SliderMobile";

type DescriptionImage = {
    src: string;
    alt: string;
};

type DescriptionWithPicturesProps = {
    title?: string;
    subtitle: string;
    images: DescriptionImage[];
};

export default function DescriptionWithPictures({
    title,
    subtitle,
    images,
}: DescriptionWithPicturesProps) {
    return (
        <section>
            <div className="text-center m-4">
                {title && (
                    <FadeUp>
                        <h2 className="mb-4">{title}</h2>
                    </FadeUp>
                )}
                <FadeUp delay={0.1}>
                    <p className="max-w-2xl mx-auto">{subtitle}</p>
                </FadeUp>
            </div>

            {/* DESKTOP: flex 3 колонки */}
            <StaggerContainer
                mode="inView"
                className="hidden xl:flex gap-3 max-w-6xl mx-auto mt-6"
            >
                {images.slice(0, 3).map((img) => (
                    <StaggerItem
                        key={img.src}
                        className="flex-1 aspect-3/4 rounded-xl overflow-hidden"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={600}
                            height={800}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>

            {/* MOBILE: слайдер */}
            <SliderMobile images={images} />
        </section>
    );
}
