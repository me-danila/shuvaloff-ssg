import Button from "@/components/ui/Button";
import { BedIcon, SquareIcon, UserIcon } from "@/components/ui/icons";
import Image from "@/components/ui/OptimizedImage";

type CardRoomHistoricalProps = {
    title: string;
    description: string;
    image: { src: string; alt: string };
    slug: string;
    bed: string;
    area: string;
    guests: string;
    bookingUrl: string;
};

export default function CardRoomHistorical({
    title,
    description,
    image,
    slug,
    bed,
    area,
    guests,
    bookingUrl,
}: CardRoomHistoricalProps) {
    return (
        <div className="flex flex-col gap-4 flex-1 xl:gap-6">
            {/* Фото с текстом поверх */}
            <a
                href={`/rooms/historical/${slug}/`}
                className="relative rounded-md overflow-hidden aspect-4/5 md:aspect-square md:flex-1"
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1200px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover object-bottom transition-transform duration-700 hover:scale-105"
                />

                {/* Градиент */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)",
                    }}
                />

                {/* Текст */}
                <div className="absolute inset-0 p-6 flex flex-col text-white z-10 xl:justify-between xl:p-8">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-baskerville uppercase text-2xl xl:text-[40px]/10">
                            {title}
                        </h3>
                        <p className="text-white/80">{description}</p>
                    </div>
                </div>
            </a>

            {/* Характеристики */}
            <p className="hidden text-sm text-brand-blue gap-8 xl:flex xl:items-center">
                <span className="flex items-center gap-3">
                    <BedIcon size={18} />
                    {bed}
                </span>
                <span className="flex items-center gap-3">
                    <SquareIcon size={14} />
                    {area}
                </span>
                <span className="flex items-center gap-3">
                    <UserIcon size={14} />
                    {guests}
                </span>
            </p>

            {/* Кнопки */}
            <div className="flex items-center gap-3">
                <Button
                    href={`/rooms/historical/${slug}/`}
                    variant="primary"
                    size="sm"
                    className="self-start"
                >
                    ПОДРОБНЕЕ
                </Button>
                <Button
                    href={bookingUrl}
                    variant="primary-outline"
                    size="sm"
                    className="self-start"
                >
                    ВЫБРАТЬ
                </Button>
            </div>
        </div>
    );
}
