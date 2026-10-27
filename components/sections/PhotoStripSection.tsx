import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";

type PhotoStripSectionProps = {
    images: { src: string; alt: string }[];
};

/**
 * Полоса из фото в ряд (/services/aristocratic-breakfast/details/, /services/tea-party/details/).
 * Рассчитана на вертикальные кадры; на мобиле третий кадр скрыт.
 */
export default function PhotoStripSection({ images }: PhotoStripSectionProps) {
    return (
        <StaggerContainer className="flex gap-2 h-65 xl:h-180 xl:gap-4 xl:w-full">
            {images.map((img, idx) => (
                <StaggerItem
                    key={img.src}
                    className={`relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md ${idx === 2 ? "hidden xl:block" : ""}`}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={
                            idx === 1
                                ? "(max-width: 1200px) 100vw, 33vw"
                                : "33vw"
                        }
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
            ))}
        </StaggerContainer>
    );
}
