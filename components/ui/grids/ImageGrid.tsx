import Image from "@/components/ui/OptimizedImage";

type ImageItem = {
    src: string;
    alt?: string;
};

interface ImageGridProps {
    images: [ImageItem] | [ImageItem, ImageItem];
    className?: string;
    /** На мобиле показывать только первое фото: два квадрата в ряд мельчат. */
    singleOnMobile?: boolean;
}

export default function ImageGrid({
    images,
    className = "",
    singleOnMobile = false,
}: ImageGridProps) {
    // Single image — full width
    if (images.length === 1) {
        return (
            <div className={`w-full overflow-hidden rounded my-2 ${className}`}>
                <div className="relative w-full aspect-[16/9] xl:aspect-3/1">
                    <Image
                        src={images[0].src}
                        alt={images[0].alt ?? ""}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
            </div>
        );
    }

    // Two images — mobile: two squares | desktop: 2/3 + 1/3, equal height
    return (
        <div
            className={`
        grid gap-2
        grid-cols-2
        md:grid-cols-[2fr_1fr] md:h-[384px]
        my-2
        ${className}
      `}
        >
            <div
                className={`relative overflow-hidden rounded aspect-square md:aspect-auto md:h-full ${
                    singleOnMobile
                        ? "max-md:col-span-2 max-md:aspect-[16/9]"
                        : ""
                }`}
            >
                <Image
                    src={images[0].src}
                    alt={images[0].alt ?? ""}
                    fill
                    className="object-cover"
                    sizes={
                        singleOnMobile
                            ? "(max-width: 768px) 100vw, 66vw"
                            : "(max-width: 768px) 50vw, 66vw"
                    }
                />
            </div>

            <div
                className={`relative overflow-hidden rounded aspect-square md:aspect-auto md:h-full ${
                    singleOnMobile ? "max-md:hidden" : ""
                }`}
            >
                <Image
                    src={images[1].src}
                    alt={images[1].alt ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                />
            </div>
        </div>
    );
}
