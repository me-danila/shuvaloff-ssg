import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { RoomImage } from "@/data/RoomsData";

type DesktopHeroGridProps = {
    images:
        | [RoomImage, RoomImage, RoomImage, RoomImage]
        | [RoomImage, RoomImage, RoomImage, RoomImage, RoomImage];
    tone?: "home" | "inner";
};

export default function DesktopHeroGrid({
    images,
    tone = "home",
}: DesktopHeroGridProps) {
    const isFour = images.length === 4;
    const isInner = tone === "inner";

    return (
        <StaggerContainer
            delay={isInner ? 0.22 : 0.15}
            mode="mount"
            staggerChildren={isInner ? 0.12 : 0.08}
            className="hidden xl:grid xl:mt-2 gap-3 grid-rows-2 grid-cols-[2fr_1fr_1fr] aspect-21/9 w-full"
        >
            <StaggerItem
                y={isInner ? 8 : 0}
                className="relative row-span-2 rounded-md overflow-hidden"
            >
                <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    fill
                    priority
                    sizes="52vw"
                    className="object-cover"
                />
            </StaggerItem>
            {images.slice(1).map((image, i) => (
                <StaggerItem
                    key={image.src}
                    y={isInner ? 10 : 0}
                    className={`relative rounded-md overflow-hidden ${isFour && i === images.length - 3 ? "row-span-2" : ""}`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        loading={isInner ? "eager" : undefined}
                        sizes="25vw"
                        className="object-cover"
                    />
                </StaggerItem>
            ))}
        </StaggerContainer>
    );
}
