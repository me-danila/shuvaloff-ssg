import Image from "next/image";
import type { RoomImage } from "@/data/RoomsData";

type DesktopHeroGridProps = {
    images:
        | [RoomImage, RoomImage, RoomImage, RoomImage]
        | [RoomImage, RoomImage, RoomImage, RoomImage, RoomImage];
};

export default function DesktopHeroGrid({ images }: DesktopHeroGridProps) {
    const isFour = images.length === 4;

    return (
        <div className="hidden xl:grid xl:mt-2 gap-3 grid-rows-2 grid-cols-[2fr_1fr_1fr] aspect-1200/520 w-full">
            <div className="relative row-span-2 rounded-md overflow-hidden">
                <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    fill
                    priority
                    sizes="52vw"
                    className="object-cover"
                />
            </div>
            {images.slice(1).map((image, i) => (
                <div
                    key={image.src}
                    className={`relative rounded-md overflow-hidden ${isFour && i === images.length - 3 ? "row-span-2" : ""}`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="25vw"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}
