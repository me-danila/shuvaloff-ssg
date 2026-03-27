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
    title: "Резиденция графа Шувалова — ACADEMIA Особняк Шувалова",
    description:
        "Исторический люкс «Резиденция графа Шувалова» с антикварными деталями и атмосферой аристократического Петербурга",
};

const descriptionImages = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/s1.png",
        alt: "Исторический люкс графа Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/s2.png",
        alt: "Исторический люкс графа Шувалова",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/s3.png",
        alt: "Исторический люкс графа Шувалова",
    },
];

const antiquesItems = [
    {
        title: "Бронзовый торшер конца XIX века с львиными маскаронами",
        description:
            "Изящный предмет интерьера, созданный в России в последней четверти XIX века с традиционной для Петербурга отделкой в виде маскаронов со львами — символами власти, силы и благородства. Детали отлиты с исключительной точностью, а изящный столик отделан ониксом.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a1.png",
            alt: "Торшер",
        },
    },
    {
        title: "Потолок с кессонами",
        description:
            "Потолок люкса украшен кессонированной композицией — элементом, пришедшим из античных храмов. Первоначально возникшие как конструктивная особенность деревянных перекрытий, кессоны стали декоративным символом изысканности, повторяясь в римских и греческих храмах, и, спустя века, — в парадных интерьерах аристократии. Это подлинные детали интерьера особняка, находящиеся под охраной КГИОП, которые мы бережно отреставрировали.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a2.png",
            alt: "Потолок с кессонами",
        },
    },
    {
        title: "Фарфоровые статуэтки",
        description:
            "Фарфоровые статуэтки немецкой мануфактуры Unterweissbach (Унтервайсбах), изображающие прогулку — характерный галантный сюжет эпохи рококо. Филигранная подглазурная роспись, золочение и изящество деталей этой композиции притягивают взгляд и настраивают на легкость и безмятежность.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a3.png",
            alt: "Статуэтки",
        },
    },
    {
        title: "Бронзовые подсвечники",
        description:
            "На столе — антикварные подсвечники с растительными мотивами. Оцените изящное литье и безупречную чеканку с золочением, выполненные французскими мастерами конца XIX века. Изысканный французский акцент, характерный для европейских интерьеров эпохи.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a4.png",
            alt: "Подсвечники",
        },
    },
    {
        title: "Картина Эмиля Табари",
        description:
            "Картина французского художника-реалиста Эмиля Табари «Прогулка в лодке», созданная в 11108 году, украшает стену номера. Юные аристократки, словно застывшие в безмятежном моменте, символизируют утонченную и безмятежную жизнь высшего света. Особый акцент — японский зонт, проникший в европейское искусство после открытия Японии миру в середине XIX века. Этот элемент подчеркивает тонкий вкус, открытость к новым идеям и эстетическим впечатлениям — характерные черты эпохи.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a5.png",
            alt: "Картина Эмиля Табари",
        },
    },
    {
        title: "Антикварная мебель",
        description:
            "Антикварный гарнитур (диван, кресла и стулья) из красного дерева, созданный в мастерских Санкт-Петербурга в начале XX века, выполнен в стиле модерн. Композиция дополнена английским бронзовым столиком с ножками в форме львиных лап и столешницей с отделкой из красной кожи.",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/a6.png",
            alt: "Антикварная мебель",
        },
    },
];

export default function HistoricalRooms() {
    return (
        <main className="flex flex-col gap-6">
            <HeroHistoricalRooms
                title="РЕЗИДЕНЦИЯ ГРАФА ШУВАЛОВА"
                subtitle={
                    <>
                        Сила, безупречный вкус
                        <br />и аристократическое достоинство
                    </>
                }
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/ef37be26c8b96f22c27a24b3de808de9ea48ddef-scaled.jpg",
                    alt: "Резиденция графа Шувалова",
                }}
            />
            <BookingForm />
            <FadeUp className="mx-6 my-2 xl:max-w-5xl xl:mx-auto xl:mt-6 xl:text-center">
                <p>
                    Номер посвящен графу Андрею Павловичу Шувалову&nbsp;—
                    истинному аристократу: образованному, деятельному,
                    целеустремленному. Мы&nbsp;создавали это пространство, как
                    отражение его вкуса и&nbsp;взгляда на&nbsp;мир.
                    В&nbsp;интерьере доминируют строгие и&nbsp;ясные
                    классические формы, что подчеркивает интеллигентную
                    сдержанность и&nbsp;благородство. Резиденция Шувалова&nbsp;—
                    это место, где дыхание истории и&nbsp;современный комфорт
                    не&nbsp;спорят, а&nbsp;дополняют друг друга.
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
                    <h2>Пространство с характером</h2>
                </FadeUp>
            </section>
            <AntiquesSection
                intro="Чтобы подчеркнуть единство между прошлым и настоящим особняка мы дополнили современный комфорт яркими акцентами прошедшей эпохи. Антикварная мебель притягивает взгляды и наполняет пространство изысканным благородством, характерным для истинно аристократического дома. Номер наполнен подлинными антикварными предметами, которые мягко погружают в историческую эпоху."
                items={antiquesItems}
            />
            <Divider dark />
            <ContactsSection />
        </main>
    );
}
