import Button from "@/components/ui/Button";
import Image from "@/components/ui/OptimizedImage";
import NewYearProgramSlider, {
    type NewYearProgramSlide,
} from "@/components/ui/slider/NewYearProgramSlider";
import { type Locale, localizeHref } from "@/lib/i18n/routing";
import { nbsp } from "@/lib/typography";

// Блок перенесен с academia.spb.ru
const SLIDE_IMAGES = [
    "https://academia.spb.ru/wp-content/uploads/2026/09/imgi_118_image-2.webp",
    "https://academia.spb.ru/wp-content/uploads/2026/09/2.png",
    "https://academia.spb.ru/wp-content/uploads/2026/09/3.webp",
    "https://academia.spb.ru/wp-content/uploads/2026/09/4.webp",
    "https://academia.spb.ru/wp-content/uploads/2026/09/5.webp",
    "https://academia.spb.ru/wp-content/uploads/2026/09/6.webp",
] as const;

type SectionCopy = {
    title: string;
    intro: string;
    date: string;
    textTop: string;
    textBottom: string;
    programLabel: string;
    tableLabel: string;
    bookLabel: string;
    sliderLabels: { region: string; prev: string; next: string; of: string };
    slides: Omit<NewYearProgramSlide, "number" | "image">[];
};

const copyByLocale: Record<Locale, SectionCopy> = {
    ru: {
        title: "ГДЕ ПРОВЕСТИ НОВОГОДНЮЮ НОЧЬ В САНКТ-ПЕТЕРБУРГЕ",
        intro: "Встречайте Новый год в Петербурге в особняке Шувалова.",
        date: "31 декабря 2026 | начало в 20:00",
        textTop:
            "Здесь Новый год начинается как настоящий прием в старинном петербургском особняке.",
        textBottom:
            "Вместо обычного ресторанного праздника — камерный вечер в атмосфере светского салона: графская семья, праздничный стол, живая музыка, танцы и традиции дома Шуваловых.",
        programLabel: "ПРОГРАММА ВЕЧЕРА",
        tableLabel: "ЗАБРОНИРОВАТЬ СТОЛ",
        bookLabel: "ГРАФСКИЙ НОВЫЙ ГОД 2027",
        sliderLabels: {
            region: "Программа новогодней ночи",
            prev: "Предыдущий слайд",
            next: "Следующий слайд",
            of: "из",
        },
        slides: [
            {
                label: "Welcome",
                title: "ЭЛЕГАНТНЫЙ WELCOME‑ФУРШЕТ",
                subtitle: "Игристое и закуски с первых минут вечера",
            },
            {
                label: "Ужин",
                title: "ПРАЗДНИЧНЫЙ КУРСОВОЙ УЖИН",
                subtitle:
                    "Гастрономическая программа с авторскими коктейлями и мясным или рыбным сетом на выбор",
            },
            {
                label: "Музыка",
                title: "ЖИВОЙ ВОКАЛ И DJ-СЕТЫ",
                subtitle:
                    "Музыкальное сопровождение от светского приема до новогодней ночи",
            },
            {
                label: "Праздничная программа",
                title: "В ЛУЧШИХ ТРАДИЦИЯХ СВЕТСКОГО БАЛА",
                subtitle:
                    "Интерактивная программа с ведущим, подарки от графа и памятные детали вечера",
            },
            {
                label: "Графская семья",
                title: "ПРИСУТСТВИЕ ГРАФА И ГРАФИНИ",
                subtitle:
                    "Граф и его семья станут участниками праздничного вечера и создадут атмосферу светского приема в доме Шуваловых",
            },
            {
                label: "Новогоднее чудо",
                title: "ДЕД МОРОЗ И СНЕГУРОЧКА",
                subtitle:
                    "В полночь главные герои Нового года поздравят гостей особняка",
            },
        ],
    },
    en: {
        title: "WHERE TO CELEBRATE NEW YEAR'S EVE IN SAINT PETERSBURG",
        intro: "Celebrate New Year in Saint Petersburg at the Shuvalov Mansion.",
        date: "31 December 2026 | starts at 8:00 pm",
        textTop:
            "Here, New Year begins as a true reception in a historic Saint Petersburg mansion.",
        textBottom:
            "Instead of an ordinary restaurant party — an intimate evening in the atmosphere of a high-society salon: the Count's family, a festive table, live music, dancing and the traditions of the Shuvalov house.",
        programLabel: "EVENING PROGRAMME",
        tableLabel: "BOOK A TABLE",
        bookLabel: "COUNT'S NEW YEAR 2027",
        sliderLabels: {
            region: "New Year's Eve programme",
            prev: "Previous slide",
            next: "Next slide",
            of: "of",
        },
        slides: [
            {
                label: "Welcome",
                title: "ELEGANT WELCOME BUFFET",
                subtitle:
                    "Sparkling wine and canapés from the very first minutes of the evening",
            },
            {
                label: "Dinner",
                title: "FESTIVE MULTI-COURSE DINNER",
                subtitle:
                    "A gastronomic programme with signature cocktails and a choice of meat or fish set",
            },
            {
                label: "Music",
                title: "LIVE VOCALS AND DJ SETS",
                subtitle:
                    "Music from the society reception through to New Year's midnight",
            },
            {
                label: "Festive programme",
                title: "IN THE BEST TRADITIONS OF A SOCIETY BALL",
                subtitle:
                    "An interactive programme with a host, gifts from the Count and memorable touches of the evening",
            },
            {
                label: "The Count's family",
                title: "THE COUNT AND COUNTESS IN ATTENDANCE",
                subtitle:
                    "The Count and his family join the celebration and create the atmosphere of a society reception in the Shuvalov house",
            },
            {
                label: "New Year magic",
                title: "FATHER FROST AND THE SNOW MAIDEN",
                subtitle:
                    "At midnight, the main characters of New Year greet the guests of the mansion",
            },
        ],
    },
};

const buttonClass = "rounded-lg! text-base! tracking-[0.5px]";

export default function NewYearNightSection({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const slides: NewYearProgramSlide[] = copy.slides.map((slide, i) => ({
        number: String(i + 1).padStart(2, "0"),
        label: slide.label,
        title: nbsp(slide.title),
        subtitle: nbsp(slide.subtitle),
        image: SLIDE_IMAGES[i],
    }));

    return (
        <section className="relative isolate -mt-6 overflow-hidden p-6">
            <Image
                src="https://academia.spb.ru/wp-content/uploads/2026/09/4852026b1f4f12c6f331e644a07cdb0078e1e1c8.avif"
                alt=""
                fill
                loading="lazy"
                sizes="100vw"
                className="-z-10 object-cover object-[top_right]"
            />
            <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center xl:mx-auto xl:max-w-6xl xl:items-stretch xl:gap-8">
                <div className="flex flex-col gap-4 text-white sm:flex-1 xl:my-8 xl:max-w-xl xl:justify-between xl:gap-6">
                    <div className="flex flex-col gap-2 xl:gap-6">
                        <h2 className="font-bold! leading-[1.2] xl:text-4xl">
                            {nbsp(copy.title)}
                        </h2>
                        <p className="sm:text-base">
                            {nbsp(copy.intro)}
                            <br />
                            <br />
                            {nbsp(copy.date)}
                            <br />
                            <br />
                            {nbsp(copy.textTop)}
                            <br />
                            {nbsp(copy.textBottom)}
                        </p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:mt-6">
                        <div className="flex flex-col gap-2 xl:flex-row">
                            <Button
                                href={localizeHref("/new-year-2027/", locale)}
                                variant="light"
                                className={`${buttonClass} xl:flex-1`}
                            >
                                {copy.programLabel}
                            </Button>
                            <Button
                                href="https://shuvaloff.academia-rest.ru/new-year-2027/?utm_source=hotelsNY"
                                target="_blank"
                                variant="light"
                                className={`${buttonClass} xl:flex-1`}
                            >
                                {copy.tableLabel}
                            </Button>
                        </div>
                        <Button
                            href={localizeHref(
                                "/booking/?hotel_id=41018&be-offer=973214%2C973208",
                                locale,
                            )}
                            className={buttonClass}
                        >
                            {copy.bookLabel}
                        </Button>
                    </div>
                </div>
                <NewYearProgramSlider
                    slides={slides}
                    labels={copy.sliderLabels}
                    className="h-[28rem] w-full min-w-0 sm:h-[36rem] sm:flex-1 xl:ml-auto xl:max-w-[27rem]"
                />
            </div>
        </section>
    );
}
