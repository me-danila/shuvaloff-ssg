import DesktopHeroGrid from "@/components/ui/grids/DesktopHeroGrid";
import { FadeUp } from "@/components/ui/Motion";
import SliderMobile from "@/components/ui/slider/SliderMobile";
import type { RoomImage } from "@/data/RoomsData";
import type { Locale } from "@/lib/i18n/routing";

// Два блока с фото-галереей резиденций: заголовок + сетка hero
// (SliderMobile на мобилке, DesktopHeroGrid — 1 большое + 4 малых — на десктопе).

type FiveImages = [RoomImage, RoomImage, RoomImage, RoomImage, RoomImage];

const DASHKOVA_URLS = [
    "https://academia.spb.ru/wp-content/uploads/2026/07/11.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/12.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/13.png",
    "https://academia.spb.ru/wp-content/uploads/2026/07/14.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/15.jpg",
];

const SHUVALOV_URLS = [
    "https://academia.spb.ru/wp-content/uploads/2026/07/21.jpg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/22.jpeg",
    "https://academia.spb.ru/wp-content/uploads/2026/07/23.png",
    "https://academia.spb.ru/wp-content/uploads/2026/07/24.png",
    "https://academia.spb.ru/wp-content/uploads/2026/07/25.jpg",
];

// Точечная подстройка object-position для десктопного грида (по индексу фото).
const SHUVALOV_POSITIONS: Record<number, string> = {
    0: "center 40%",
    2: "center top",
    3: "center bottom",
};

const toImages = (
    urls: string[],
    alt: string,
    positions: Record<number, string> = {},
): FiveImages =>
    urls.map((src, i) => ({
        src,
        alt,
        imagePosition: positions[i],
    })) as FiveImages;

type Residence = { title: string; images: FiveImages };

const residencesByLocale: Record<Locale, Residence[]> = {
    ru: [
        {
            title: "Резиденция Дашковой",
            images: toImages(DASHKOVA_URLS, "Резиденция Дашковой"),
        },
        {
            title: "Резиденция графа Шувалова",
            images: toImages(
                SHUVALOV_URLS,
                "Резиденция графа Шувалова",
                SHUVALOV_POSITIONS,
            ),
        },
    ],
    en: [
        {
            title: "Dashkova Residence",
            images: toImages(DASHKOVA_URLS, "Dashkova Residence"),
        },
        {
            title: "Count Shuvalov Residence",
            images: toImages(
                SHUVALOV_URLS,
                "Count Shuvalov Residence",
                SHUVALOV_POSITIONS,
            ),
        },
    ],
};

export default function PhotoShootResidencesSection({
    locale,
}: {
    locale: Locale;
}) {
    const residences = residencesByLocale[locale];

    return (
        // Одна серая секция: заголовок / грид / заголовок / грид. Внешние
        // отступы крупные, между парами — умеренный gap.
        <section className="bg-[#ededeb] py-12 xl:py-20">
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 xl:gap-14 xl:px-0">
                {residences.map((residence) => (
                    <div key={residence.title}>
                        <FadeUp>
                            <h2 className="text-center text-[#372a24]">
                                {residence.title}
                            </h2>
                        </FadeUp>
                        <FadeUp className="mt-8 xl:mt-10">
                            <SliderMobile images={residence.images} />
                            <DesktopHeroGrid
                                images={residence.images}
                                tone="inner"
                            />
                        </FadeUp>
                    </div>
                ))}
            </div>
        </section>
    );
}
