import type { ReactNode } from "react";
import CardResidence from "@/components/ui/CardResidence";
import { FadeUp } from "@/components/ui/Motion";
import type { Locale } from "@/lib/i18n/routing";

type ResidenceImage = { src: string; alt: string; imagePosition?: string };

type Residence = {
    title: string;
    subtitle: ReactNode;
    description: string;
    images?: ResidenceImage[];
};

// Заглавное фото каждой резиденции (первый слайд) — остаётся неизменным.
const SHUVALOV_PHOTO =
    "https://academia.spb.ru/wp-content/uploads/2026/07/%D0%BC%D1%83%D0%B6%D0%B8%D0%BA-%D0%B2-%D0%B7%D0%B5%D0%BB%D1%91%D0%BD%D0%BE%D0%BC.png";
const DASHKOVA_PHOTO =
    "https://academia.spb.ru/wp-content/uploads/2026/07/%D0%B4%D0%B5%D0%B2%D1%83%D1%88%D0%BA%D0%B0-%D0%B2-%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D0%BE%D0%BC.png";

// Остальные слайды (кириллица в имени → percent-encoded: д=%D0%B4, ш=%D1%88).
const DASHKOVA_SLIDES = [1, 2, 3, 4, 5, 6].map(
    (n) => `https://academia.spb.ru/wp-content/uploads/2026/07/%D0%B4${n}.jpeg`,
);
const SHUVALOV_SLIDES = [1, 2, 3, 4, 5, 6].map(
    (n) => `https://academia.spb.ru/wp-content/uploads/2026/07/%D1%88${n}.jpeg`,
);

// object-position для слайдов на десктопе. Ключ — индекс в массиве слайдов
// (0 = первое НЕзаглавное фото; заглавное — отдельный первый слайд).
const DASHKOVA_SLIDE_POS: Record<number, string> = {
    3: "center 67%", // д4 — 5-е фото
    4: "center 75%", // д5 — 6-е фото
    5: "center 70%", // д6 — 7-е фото
};
const SHUVALOV_SLIDE_POS: Record<number, string> = {
    0: "center 80%", // ш1 — 2-е фото
    1: "center 55%", // ш2 — 3-е фото
    2: "center 60%", // ш3 — 4-е фото
    3: "center 63%", // ш4 — 5-е фото
    4: "center 80%", // ш5 — 6-е фото
};

const sectionCopy: Record<
    Locale,
    { title: string; prev: string; next: string; residences: Residence[] }
> = {
    ru: {
        title: "Выберите резиденцию",
        prev: "Предыдущее фото",
        next: "Следующее фото",
        residences: [
            {
                title: "Резиденция Дашковой",
                subtitle: (
                    <>
                        Классика Петербурга
                        <br />в современном прочтении
                    </>
                ),
                description:
                    "Изящная, яркая и светлая резиденция с мягким светом, антикварными предметами интерьера и подлинной лепниной, вдохновленное образом графини Елизаветы Воронцовой-Дашковой",
                images: [
                    { src: DASHKOVA_PHOTO, alt: "Резиденция Дашковой" },
                    ...DASHKOVA_SLIDES.map((src, i) => ({
                        src,
                        alt: "Резиденция Дашковой",
                        imagePosition: DASHKOVA_SLIDE_POS[i],
                    })),
                ],
            },
            {
                title: "Резиденция графа Шувалова",
                subtitle: (
                    <>
                        Сила, безупречный вкус
                        <br />и аристократическое достоинство
                    </>
                ),
                description:
                    "Просторная парадная резиденция в строгом неоклассическом стиле и историческими деталями, отражающая силу духа и благородство истинного аристократа — графа Андрея Шувалова",
                images: [
                    { src: SHUVALOV_PHOTO, alt: "Резиденция графа Шувалова" },
                    ...SHUVALOV_SLIDES.map((src, i) => ({
                        src,
                        alt: "Резиденция графа Шувалова",
                        imagePosition: SHUVALOV_SLIDE_POS[i],
                    })),
                ],
            },
        ],
    },
    en: {
        title: "Choose a residence",
        prev: "Previous photo",
        next: "Next photo",
        residences: [
            {
                title: "Dashkova Residence",
                subtitle: (
                    <>
                        Petersburg classics
                        <br />
                        in a modern reading
                    </>
                ),
                description:
                    "An elegant, bright and light residence with soft light, antique interior pieces and authentic moldings, inspired by the image of Countess Elizaveta Vorontsova-Dashkova",
                images: [
                    { src: DASHKOVA_PHOTO, alt: "Dashkova Residence" },
                    ...DASHKOVA_SLIDES.map((src, i) => ({
                        src,
                        alt: "Dashkova Residence",
                        imagePosition: DASHKOVA_SLIDE_POS[i],
                    })),
                ],
            },
            {
                title: "Count Shuvalov Residence",
                subtitle: (
                    <>
                        Strength, impeccable taste
                        <br />
                        and aristocratic dignity
                    </>
                ),
                description:
                    "A spacious formal residence in a strict neoclassical style with historical details, reflecting the strength of spirit and the nobility of a true aristocrat — Count Andrei Shuvalov",
                images: [
                    { src: SHUVALOV_PHOTO, alt: "Count Shuvalov Residence" },
                    ...SHUVALOV_SLIDES.map((src, i) => ({
                        src,
                        alt: "Count Shuvalov Residence",
                        imagePosition: SHUVALOV_SLIDE_POS[i],
                    })),
                ],
            },
        ],
    },
};

export default function ResidenceSelectSection({ locale }: { locale: Locale }) {
    const copy = sectionCopy[locale];

    return (
        <section className="bg-[#ededeb] py-10 xl:py-16">
            <div className="mx-auto max-w-7xl px-6 xl:px-0">
                <FadeUp>
                    <h2 className="text-center text-[#3d2b22]">{copy.title}</h2>
                </FadeUp>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3 xl:mt-12">
                    {copy.residences.map((residence) => (
                        <CardResidence
                            key={residence.title}
                            title={residence.title}
                            subtitle={residence.subtitle}
                            description={residence.description}
                            images={residence.images}
                            prevLabel={copy.prev}
                            nextLabel={copy.next}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
