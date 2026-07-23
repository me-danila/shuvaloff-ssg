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

const SHUVALOV_PHOTO =
    "https://academia.spb.ru/wp-content/uploads/2026/07/%D0%BC%D1%83%D0%B6%D0%B8%D0%BA-%D0%B2-%D0%B7%D0%B5%D0%BB%D1%91%D0%BD%D0%BE%D0%BC.png";
const DASHKOVA_PHOTO =
    "https://academia.spb.ru/wp-content/uploads/2026/07/%D0%B4%D0%B5%D0%B2%D1%83%D1%88%D0%BA%D0%B0-%D0%B2-%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D0%BE%D0%BC.png";

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
                images: [{ src: DASHKOVA_PHOTO, alt: "Резиденция Дашковой" }],
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
                images: [{ src: DASHKOVA_PHOTO, alt: "Dashkova Residence" }],
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
