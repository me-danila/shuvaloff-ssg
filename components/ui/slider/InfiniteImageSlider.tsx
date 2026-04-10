import ExportedImage from "next-image-export-optimizer";

export interface InfiniteSliderImage {
    src: string;
    alt: string;
}

interface Props {
    images: InfiniteSliderImage[];
}

export default function InfiniteImageSlider({ images }: Props) {
    const track = [...images, ...images];

    return (
        <div className="overflow-hidden">
            <div className="flex animate-marquee gap-3 xl:gap-4 w-max">
                {track.map((image, index) => (
                    <div
                        key={`${image.src}-${index}`}
                        className="relative rounded-md h-90 w-60 shrink-0 overflow-hidden lg:h-120 lg:w-90"
                    >
                        <ExportedImage
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
