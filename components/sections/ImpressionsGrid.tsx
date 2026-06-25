import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";

type Img = { src: string; alt: string; w: number; h: number };

const base = "https://academia.spb.ru/wp-content/uploads/2026/06";

// Десктопный грид (5 фото) — порядок как в hero отелей: [0] большое слева, далее 2×2
const gridImages: Img[] = [
    {
        src: `${base}/fasad.png`,
        alt: "Фасад особняка ACADEMIA",
        w: 2560,
        h: 1843,
    },
    {
        src: `${base}/IMG_0412.jpeg`,
        alt: "Водная прогулка по каналам",
        w: 1783,
        h: 2560,
    },
    { src: `${base}/3-scaled.jpg`, alt: "Завтрак в номере", w: 1707, h: 2560 },
    {
        src: `${base}/4-scaled.jpg`,
        alt: "Театрализованный сервис",
        w: 1707,
        h: 2560,
    },
    {
        src: `${base}/5-scaled.jpg`,
        alt: "Гости за чаепитием",
        w: 1707,
        h: 2560,
    },
];

// 6-е фото (только мобильная мозаика)
const bedroom: Img = {
    src: `${base}/35025f793764a0ba861c56044240451000234756-scaled.jpg`,
    alt: "Номер отеля",
    w: 1706,
    h: 2560,
};

// Мобильная мозаика: вес = доля высоты колонки (колонки равной высоты)
type Tile = Img & { flex: number };
// Лево: 1 и 3 — горизонтальные, среднее — вертикальное
const mobileLeft: Tile[] = [
    { ...bedroom, flex: 27 },
    { ...gridImages[0], flex: 46 },
    { ...gridImages[2], flex: 27 },
];
// Право: среднее — узкое горизонтальное, остальные — вертикальные
const mobileRight: Tile[] = [
    { ...gridImages[1], flex: 37 },
    { ...gridImages[4], flex: 26 },
    { ...gridImages[3], flex: 37 },
];

function MosaicTile({ tile }: { tile: Tile }) {
    return (
        <div
            style={{ flex: `${tile.flex} 1 0%` }}
            className="relative overflow-hidden rounded-md"
        >
            <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="50vw"
                loading="lazy"
                className="object-cover"
            />
        </div>
    );
}

export default function ImpressionsGrid() {
    return (
        <>
            {/* Мобайл: мозаика 2 колонки от края до края, равной высоты */}
            <div className="-mx-6 flex aspect-[7/11] gap-1.5 xl:hidden">
                <div className="flex flex-1 flex-col gap-1.5">
                    {mobileLeft.map((tile) => (
                        <MosaicTile key={tile.src} tile={tile} />
                    ))}
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                    {mobileRight.map((tile) => (
                        <MosaicTile key={tile.src} tile={tile} />
                    ))}
                </div>
            </div>

            {/* Десктоп: грид как в hero отелей (5 фото) */}
            <StaggerContainer
                delay={0.15}
                mode="mount"
                staggerChildren={0.08}
                className="hidden xl:grid xl:mt-2 gap-3 grid-rows-2 grid-cols-[2fr_1fr_1fr] aspect-21/9 w-full"
            >
                <StaggerItem className="relative row-span-2 rounded-md overflow-hidden">
                    <Image
                        src={gridImages[0].src}
                        alt={gridImages[0].alt}
                        fill
                        sizes="52vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
                {gridImages.slice(1).map((img) => (
                    <StaggerItem
                        key={img.src}
                        className="relative rounded-md overflow-hidden"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="25vw"
                            loading="lazy"
                            className="object-cover"
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </>
    );
}
