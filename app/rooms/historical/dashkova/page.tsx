import type { Metadata } from "next";
import AntiquesSection from "@/components/sections/AntiquesSection";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import HeroHistoricalRooms from "@/components/sections/HeroHistoricalRooms";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SliderMobile from "@/components/ui/slider/SliderMobile";

export const metadata: Metadata = {
    title: "Резиденция Дашковой — ACADEMIA Особняк Шувалова",
    description:
        "Исторический люкс «Резиденция Дашковой» в атмосфере классического Петербурга с подлинными антикварными элементами",
};

const descriptionImages = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/d1.jpg",
        alt: "Фены Дайсон",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/d2.jpg",
        alt: "Косметические наборы",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/d3.jpg",
        alt: "Номер",
    },
];

const antiquesItems = [
    {
        title: "Французский каминный экран",
        description:
            "Главная жемчужина интерьера — старинный каминный экран второй половины ХIХ века из Франции. Он украшен изящной ручной вышивкой, напоминающей об ушедшей эпохе, полной изящества и красоты. Раньше такие экраны защищали от искр из камина, а сейчас он служит изысканным украшением интерьера.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/bd9ff8b9e2919acf61e680198bcd48e7124a2e08.png",
            alt: "Каминный экран",
        },
    },
    {
        title: "Торшер в стиле Ар-Нуво",
        description:
            "Изящный кованый торшер с плафоном из цветного стекла первой половины ХХ века, привезенный из Европы, вносит нотку легкомысленного изящества прекрасной эпохи.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/Frame-323.png",
            alt: "Торшер",
        },
    },
    {
        title: "Перламутровый веер ХIХ века",
        description:
            "Изящный женственный акцент в интерьере номера — это подлинный веер ХIХ века. Прекрасный предмет, ушедший из нашего обихода, как и тайный язык общения между влюбленными, в котором каждое движение невесомого веера имело смысл.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/3.png",
            alt: "Веер",
        },
    },
    {
        title: "Настольная лампа",
        description:
            "Изысканный предмет интерьера в стиле эклектика, созданный в России в начале ХХ века, с жанровой картинкой влюбленных настраивает на легкость, флирт и общение.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/4.png",
            alt: "Лампа",
        },
    },
    {
        title: "Боковой столик эпохи регентства",
        description:
            "Изысканный, но при этом функциональный столик из ореха, созданный в начале XX века в Англии, демонстрирует элементы, пришедшие из античности: львиные лапы на ножках и узор из листьев аканта на восьмиугольной столешнице, обтянутой красной кожей.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/5.png",
            alt: "Столик",
        },
    },
    {
        title: "Коллекционный фарфор",
        description:
            "Изящные статуэтки начала ХХ века, прибывшие к нам из Западной Европы, впечатляют изысканной проработкой деталей и грациозностью поз. Кажется, можно услышать их разговор. Вечные вопросы и вневременные сюжеты — это всё о любви, радости и удовольствии.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/6.png",
            alt: "Статуэтки",
        },
    },
    {
        title: "Парные прикроватные тумбы из палисандра",
        description:
            "Роскошное украшение интерьера — французские тумбы конца XIX века из ценного палисандра, привезенные из Франции. Тончайшая работа мастера видна в каждой детали: здесь нет декоративной краски — каждая прямоугольная каемка выложена тончайшими срезами шпона вручную с филигранной точностью.",
    },
];

export default function HistoricalRooms() {
    return (
        <main className="flex flex-col gap-6">
            <HeroHistoricalRooms
                title="РЕЗИДЕНЦИЯ ДАШКОВОЙ"
                subtitle={
                    <>
                        Классика Петербурга
                        <br />в современном прочтении
                    </>
                }
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/Rectangle-132.png",
                    alt: "Резиденция Дашковой",
                }}
            />
            <BookingForm />
            <FadeUp className="mx-6 my-2 xl:max-w-5xl xl:mx-auto xl:mt-6 xl:text-center">
                <p>
                    Этот номер назван в&nbsp;честь графини Елизаветы Андреевны
                    Воронцовой-Дашковой (урождённой Шуваловой, 1845−1924).
                    <br className="block xl:hidden" />
                    <br />
                    Мы&nbsp;постарались передать самые яркие качества этой
                    неординарной женщины: изящество, тонкий вкус,
                    интеллигентность, внутреннюю силу и&nbsp;творческий подход
                    к&nbsp;жизни.
                </p>
            </FadeUp>
            <SliderMobile images={descriptionImages} />
            <StaggerContainer
                mode="inView"
                className="hidden xl:flex xl:h-110 xl:mt-4 xl:gap-4 xl:max-w-6xl xl:mx-auto xl:w-full"
            >
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                    <Image
                        src={descriptionImages[0].src}
                        alt={descriptionImages[0].alt}
                        fill
                        sizes="33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                    <Image
                        src={descriptionImages[1].src}
                        alt={descriptionImages[1].alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
                <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                    <Image
                        src={descriptionImages[2].src}
                        alt={descriptionImages[2].alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </StaggerItem>
            </StaggerContainer>
            <section className="flex flex-col gap-3 m-6 xl:max-w-6xl xl:mx-auto xl:text-center xl:my-8">
                <FadeUp>
                    <h2>
                        Строгие линии, исторические детали и&nbsp;безупречный
                        комфорт
                    </h2>
                </FadeUp>
                <div className="xl:mt-4 xl:max-w-5xl xl:mx-auto">
                    <FadeUp delay={0.1}>
                        <p>
                            Исторический люкс Дашковой&nbsp;— просторный
                            однокомнатный номер with изысканным сочетанием
                            изящных и&nbsp;чётких линий неоклассицизма
                            с&nbsp;современным комфортом. Идеален для
                            романтических вечеров, долгих бесед на&nbsp;вечные
                            темы и&nbsp;роскошных фотосессий.
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.2} className="xl:mt-4">
                        <p>
                            Безупречное оснащение номера и&nbsp;необычная ванная
                            комната со&nbsp;стеклянными стенами&nbsp;— дань
                            нашему времени, несомненно, не&nbsp;просто создают
                            ожидаемый комфорт, но&nbsp;и&nbsp;добавляют элемент
                            неподвластной времени игры для двоих. Яркий
                            насыщенный цвет стен резиденции был восстановлен
                            по&nbsp;архивным материалам.
                        </p>
                    </FadeUp>
                </div>
            </section>
            <AntiquesSection
                intro="Изящные линии декора, стремление вверх и&nbsp;утонченность классического стиля мы&nbsp;дополнили подлинными артефактами конца XIX&nbsp;— начала XX века для создания атмосферы: прикроватными тумбами из&nbsp;палисандра, французским каминным экраном, изящными статуэтками, столиком и&nbsp;торшером."
                items={antiquesItems}
            />
            <Divider dark />
            <ContactsSection />
        </main>
    );
}
