import { ImageIcon } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/routing";

type TariffImage = { src: string; alt: string; imagePosition?: string };

const DASHKOVA_PHOTO_TOP =
    "https://academia.spb.ru/wp-content/uploads/2026/07/AP_08-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg";
const DASHKOVA_PHOTO_BOTTOM =
    "https://academia.spb.ru/wp-content/uploads/2026/07/AP_79-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg";
const SHUVALOV_PHOTO_TOP =
    "https://academia.spb.ru/wp-content/uploads/2026/07/AP_59-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg";
const SHUVALOV_PHOTO_BOTTOM =
    "https://academia.spb.ru/wp-content/uploads/2026/07/AP_29-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg";

type Tariff = {
    timeLabel: string;
    time: string;
    costLabel: string;
    price: string;
};

type Residence = {
    title: string;
    description: string;
    hourTariff: Tariff;
    twoHourTariff: Tariff;
    // Пока реальных фото нет — рендерим заполнители.
    // Когда появятся фото, передать `photoTop` / `photoBottom`.
    photoTop?: TariffImage;
    photoBottom?: TariffImage;
};

const sectionCopy: Record<
    Locale,
    { title: string; subtitle: string; residences: Residence[] }
> = {
    ru: {
        title: "Тарифы",
        subtitle: "Пространство для съёмки, где важна каждая деталь",
        residences: [
            {
                title: "Резиденция Дашковой",
                description:
                    "Светлое, нежное и яркое пространство в теплых тонах в неоклассическом стиле с антикварными деталями, высокими потолками, большими окнами и эффектной ванной комнатой с элегантной ванной в стеклянном кубе.",
                hourTariff: {
                    timeLabel: "Время проведения:",
                    time: "08:00 - 10:00",
                    costLabel: "Стоимость:",
                    price: "7 500 ₽",
                },
                twoHourTariff: {
                    timeLabel: "Время проведения:",
                    time: "16:00 - 18:00",
                    costLabel: "Стоимость:",
                    price: "15 500 ₽",
                },
                photoTop: {
                    src: DASHKOVA_PHOTO_TOP,
                    alt: "Резиденция Дашковой",
                },
                photoBottom: {
                    src: DASHKOVA_PHOTO_BOTTOM,
                    alt: "Резиденция Дашковой",
                },
            },
            {
                title: "Резиденция графа Шувалова",
                description:
                    "Просторное, элегантное и строгое пространство с антикварными предметами интерьера, высокими потолками с лепниной, большими окнами и ванной комнатой в стеклянном кубе в винтажном стиле.",
                hourTariff: {
                    timeLabel: "Время проведения:",
                    time: "12:00 - 14:00",
                    costLabel: "Стоимость:",
                    price: "10 500 ₽",
                },
                twoHourTariff: {
                    timeLabel: "Время проведения:",
                    time: "18:00 - 20:00",
                    costLabel: "Стоимость:",
                    price: "15 500 ₽",
                },
                photoTop: {
                    src: SHUVALOV_PHOTO_TOP,
                    alt: "Резиденция графа Шувалова",
                },
                photoBottom: {
                    src: SHUVALOV_PHOTO_BOTTOM,
                    alt: "Резиденция графа Шувалова",
                    imagePosition: "top",
                },
            },
        ],
    },
    en: {
        title: "Tariffs",
        subtitle: "A space to shoot in, where every detail matters",
        residences: [
            {
                title: "Dashkova Residence",
                description:
                    "A bright, tender and vivid space in warm tones, in a neoclassical style with antique details, high ceilings, large windows and a striking bathroom with an elegant bath in a glass cube for special shots.",
                hourTariff: {
                    timeLabel: "Time slot:",
                    time: "08:00 - 10:00",
                    costLabel: "Cost:",
                    price: "7 500 ₽",
                },
                twoHourTariff: {
                    timeLabel: "Time slot:",
                    time: "16:00 - 18:00",
                    costLabel: "Cost:",
                    price: "15 500 ₽",
                },
                photoTop: {
                    src: DASHKOVA_PHOTO_TOP,
                    alt: "Dashkova Residence",
                },
                photoBottom: {
                    src: DASHKOVA_PHOTO_BOTTOM,
                    alt: "Dashkova Residence",
                },
            },
            {
                title: "Count Shuvalov Residence",
                description:
                    "A spacious, elegant and stately space with antique interior pieces, high ceilings with moldings, large windows and a bathroom in a glass cube in a vintage style.",
                hourTariff: {
                    timeLabel: "Time slot:",
                    time: "12:00 - 14:00",
                    costLabel: "Cost:",
                    price: "10 500 ₽",
                },
                twoHourTariff: {
                    timeLabel: "Time slot:",
                    time: "18:00 - 20:00",
                    costLabel: "Cost:",
                    price: "15 500 ₽",
                },
                photoTop: {
                    src: SHUVALOV_PHOTO_TOP,
                    alt: "Count Shuvalov Residence",
                },
                photoBottom: {
                    src: SHUVALOV_PHOTO_BOTTOM,
                    alt: "Count Shuvalov Residence",
                    imagePosition: "top",
                },
            },
        ],
    },
};

function PriceTile({
    tariff,
    labelClassName,
}: {
    tariff: Tariff;
    // Класс подзаголовков «Время проведения:» / «Стоимость:». Задаётся
    // блоком-вариантом (рукописный font-alistair или полужирный капс).
    labelClassName: string;
}) {
    return (
        <div className="flex aspect-square flex-col items-center justify-center gap-4 bg-[#ededeb] p-4 text-center text-[#372a24]">
            <div className="flex flex-col gap-0.5 text-sm xl:text-base">
                <span className={labelClassName}>{tariff.timeLabel}</span>
                <span>{tariff.time}</span>
            </div>
            <div className="flex flex-col gap-0.5 text-sm xl:text-base">
                <span className={labelClassName}>{tariff.costLabel}</span>
                <span>{tariff.price}</span>
            </div>
        </div>
    );
}

function PhotoTile({ image, index }: { image?: TariffImage; index: number }) {
    if (!image) {
        return (
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 bg-stone-200 text-stone-400">
                <ImageIcon size={40} weight="thin" />
                <span className="text-xs">Фото {index}</span>
            </div>
        );
    }

    return (
        <div className="relative aspect-square w-full overflow-hidden">
            <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1200px) 50vw, 25vw"
                loading="lazy"
                className="object-cover"
                style={{
                    objectPosition: image.imagePosition ?? "center center",
                }}
            />
        </div>
    );
}

function ResidenceTariff({
    residence,
    labelClassName,
}: {
    residence: Residence;
    labelClassName: string;
}) {
    return (
        <div className="grid grid-rows-[auto_auto_auto] gap-y-4 md:row-span-3 md:grid-rows-subgrid md:gap-y-4">
            <h3 className="text-center font-history text-lg font-semibold uppercase text-[#372a24] xl:text-2xl">
                {residence.title}
            </h3>
            <p className="text-center text-[#372a24]">
                {residence.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
                <PriceTile
                    tariff={residence.hourTariff}
                    labelClassName={labelClassName}
                />
                <PhotoTile image={residence.photoTop} index={1} />
                <PhotoTile image={residence.photoBottom} index={2} />
                <PriceTile
                    tariff={residence.twoHourTariff}
                    labelClassName={labelClassName}
                />
            </div>
        </div>
    );
}

// Два варианта оформления подзаголовков в плитках — для сравнения дизайна.
// Каждый рендерит одинаковую сетку резиденций, отличается только класс
// подписей «Время проведения:» / «Стоимость:».
const LABEL_VARIANTS = [
    { key: "alistair", labelClassName: "font-alistair text-2xl xl:text-3xl" },
    { key: "history", labelClassName: "font-history font-semibold" },
] as const;

function TariffsGrid({
    residences,
    labelClassName,
}: {
    residences: Residence[];
    labelClassName: string;
}) {
    return (
        <FadeUp className="mt-8 grid grid-cols-1 gap-y-12 md:grid-cols-2 md:grid-rows-[auto_auto_auto] md:gap-x-8 md:gap-y-8 xl:mt-10 xl:gap-x-10">
            {residences.map((residence) => (
                <ResidenceTariff
                    key={residence.title}
                    residence={residence}
                    labelClassName={labelClassName}
                />
            ))}
        </FadeUp>
    );
}

export default function PhotoShootTariffsSection({
    locale,
}: {
    locale: Locale;
}): ReactNode {
    const copy = sectionCopy[locale];

    return (
        <section
            id="tariffs"
            className="scroll-mt-28 px-6 xl:scroll-mt-36 xl:px-0 xl:py-10"
        >
            <div className="mx-auto max-w-7xl">
                <FadeUp className="text-center">
                    <h2 className="text-[#372a24]">{copy.title}</h2>
                    <p className="mt-1 text-[#372a24]">{copy.subtitle}</p>
                </FadeUp>

                {LABEL_VARIANTS.map((variant) => (
                    <TariffsGrid
                        key={variant.key}
                        residences={copy.residences}
                        labelClassName={variant.labelClassName}
                    />
                ))}
            </div>
        </section>
    );
}
