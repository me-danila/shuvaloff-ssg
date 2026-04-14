import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import HeroHistoricalRooms from "@/components/sections/HeroHistoricalRooms";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import DividerHistory from "@/components/ui/divider/History";
import ImageGrid from "@/components/ui/grids/ImageGrid";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import SliderMobile from "@/components/ui/slider/SliderMobile";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Графский Петербург — ACADEMIA Особняк Шувалова",
    description: "Особый отдых в формате пышных аристократических традиций",
    alternates: getLocaleAlternates("/aristocratic-spb/", "ru"),
};

type Bullets = string[];

const Bullets: Bullets = [
    "Атмосферный исторический особняк",
    "Гастрономические традиции",
    "Лучший опыт погружения в эпоху XIX века",
];

const descriptionImages = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/meet1.jpg",
        alt: "Графский Петербург",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-217.png",
        alt: "Графский Петербург",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-235.png",
        alt: "Графский Петербург",
    },
];

const cultureImages = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/culture1.jpg",
        alt: "Представительский трансфер",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/04/culture2.jpg",
        alt: "Отель-особняк в Санкт-Петербурге",
    },
];

export default function Meet() {
    return (
        <main className="flex flex-col gap-6">
            <HeroHistoricalRooms
                title="Графский Петербург"
                additionalTitle="Особый отдых в формате пышных аристократических традиций"
                image={{
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/offer.png",
                    alt: "Графский Петербург",
                }}
                button={{
                    label: "Забронировать",
                    href: "/booking/?&be-offer=910895",
                }}
            />

            <StaggerContainer
                staggerChildren={0.05}
                className="grid mx-6 gap-4 xl:grid-cols-3 xl:w-full xl:max-w-6xl xl:mx-auto"
            >
                {Bullets.map((item) => (
                    <StaggerItem
                        key={item}
                        className="text-center text-lg font-baskerville uppercase bg-gray-100 p-6 rounded"
                    >
                        <DividerHistory style={3} />
                        {item}
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <section className="mx-6 flex flex-col gap-4 xl:w-full xl:max-w-6xl xl:mx-auto xl:flex-row xl:gap-8 xl:my-8">
                <div className="flex flex-col gap-4 xl:w-full xl:gap-8">
                    <p className="font-alistair text-4xl xl:text-6xl xl:mb-2">
                        Петербург —
                    </p>
                    <p>
                        город многогранный, поэтому узнавать
                        <br />
                        его можно по-разному.
                    </p>
                    <div className="relative h-80 overflow-hidden rounded xl:h-full">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/spb.png"
                            alt="Петербург"
                            fill
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                </div>

                <StaggerContainer
                    staggerChildren={0.1}
                    className="p-4 xl:p-6 bg-gray-100 flex flex-col gap-4 xl:w-full xl:gap-8"
                >
                    <StaggerItem className="flex flex-col gap-2 flex-row xl:gap-4">
                        <p className="font-alistair text-4xl xl:-mt-3 whitespace-nowrap">
                            1 день:
                        </p>
                        <p>
                            особая встреча
                            <span className="block h-2 xl:h-4"></span>
                            Трансфер вокзал/аэропорт — особняк
                            <br />
                            Личное приветствие графом и рассказ об особняке
                            <br />
                            Заселение в особняк
                            <br />
                            Велнес-ритуал от Академиа СПА
                        </p>
                    </StaggerItem>
                    <StaggerItem className="flex flex-col gap-2 flex-row xl:gap-4">
                        <p className="font-alistair text-4xl xl:-mt-3 whitespace-nowrap">
                            2 день:
                        </p>
                        <p>
                            отдых с размахом
                            <span className="block h-2 xl:h-4"></span>
                            Именитый “Графский завтрак” в баре-ресторане
                            <br />
                            Эффектная поездка на ретро автомобиле
                            <br />
                            Водная прогулка-фуршет с лекцией
                            <br />
                            от уважаемого искусствоведа
                        </p>
                    </StaggerItem>
                    <StaggerItem className="flex flex-col gap-2 flex-row xl:gap-4">
                        <p className="font-alistair text-4xl xl:-mt-3 whitespace-nowrap">
                            3 день:
                        </p>
                        <p>
                            прощальная аудиенция
                            <span className="block h-2 xl:h-4"></span>
                            Завтрак в формате сет-меню от бренд-шефа Академиа
                            <br />
                            Личный прием графа Шувалова в связи с отъездом
                            <br />
                            Трансфер особняк — вокзал/аэропорт
                        </p>
                    </StaggerItem>
                </StaggerContainer>
            </section>

            <section className="m-6 flex flex-col gap-6 xl:flex-row-reverse xl:w-full xl:max-w-6xl xl:mx-auto">
                <FadeUp className="relative overflow-hidden rounded h-80 xl:w-360">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/04/герб-кириллица-наполовину-копия.png"
                        alt="Греб ACADEMIA Особняк Шувалова"
                        fill
                        loading="lazy"
                        className="object-contain"
                    />
                </FadeUp>
                <FadeUp className="flex flex-col gap-2">
                    <h2>В гости к графу</h2>
                    <p>
                        &laquo;Графский Петербург&raquo;&nbsp;&mdash; это
                        приглашение в&nbsp;гости к&nbsp;графу Шувалову
                        в&nbsp;его особняк XIX века на&nbsp;Моховой улице,
                        расположенный рядом с&nbsp;великолепными набережными
                        Фонтанки и&nbsp;Невы, Михайловским замком, Русским
                        музеем и&nbsp;Летним садом. Но, кроме прогулок
                        по&nbsp;самым красивым местам исторического центра, вас
                        ждет продуманная и&nbsp;насыщенная впечатлениями
                        программа отдыха, достойная гостей графа Шувалова.
                        <br />
                        <br />
                        Позвольте себе никуда не&nbsp;спешить и&nbsp;ничего
                        не&nbsp;планировать, сделайте паузу и&nbsp;погрузитесь
                        в&nbsp;атмосферу графского Петербурга.
                    </p>
                </FadeUp>
            </section>

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

            <div className="flex flex-col gap-6 bg-gray-100 px-6 py-10 xl:-mt-20 xl:pt-28">
                <FadeUp
                    duration={1.2}
                    className="flex flex-col gap-6 text-center xl:max-w-6xl xl:mx-auto"
                >
                    <h2 className="uppercase">ИСТОРИЧЕСКИЙ антураж</h2>
                    <p>
                        Вы&nbsp;можете остановиться в&nbsp;классическом номере
                        или выбрать один из&nbsp;просторных исторических
                        люксов-резиденций графа Шувалова и&nbsp;графини
                        Воронцовой-Дашковой, в&nbsp;которых сохранены подлинные
                        исторические детали отделки этих залов и&nbsp;добавлены
                        винтажные и&nbsp;антикварные предметы интерьера,
                        помогающие погрузиться в&nbsp;легкую ностальгию
                        по&nbsp;ушедшей прекрасной эпохе.
                    </p>
                </FadeUp>
                <DividerHistory style={2} />
            </div>

            <FadeUp className="m-6 text-center flex flex-col gap-4 xl:w-full xl:max-w-6xl xl:mx-auto">
                <h2>Особная встреча</h2>
                <p className="xl:max-w-4xl xl:mx-auto">
                    Ваш отдых начнется со&nbsp;встречи в&nbsp;аэропорту или
                    на&nbsp;вокзале и&nbsp;индивидуального трансфера
                    представительского класса в&nbsp;Особняк Шувалова. Здесь вас
                    встретит, расскажет об&nbsp;истории особняка, проводит
                    в&nbsp;номер и&nbsp;лично угостит фирменной вишневой
                    настойкой по&nbsp;семейному рецепту сам граф Шувалов
                    с&nbsp;семьей.
                </p>
                <ImageGrid
                    images={[
                        {
                            src: "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-205.png",
                            alt: "Вход",
                        },
                        {
                            src: "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-206.png",
                            alt: "Лаундж",
                        },
                    ]}
                />
                <p className="font-alistair text-2xl/7 xl:text-[40px]/10 xl:my-2">
                    После вашего отдыха граф непременно поинтересуется
                    во&nbsp;время прощальной аудиенции, как прошло ваше
                    погружение в&nbsp;&laquo;Графский Петербург&raquo;.
                </p>
                <DividerHistory style={3} />
            </FadeUp>

            <FadeUp duration={1.2} className="bg-gray-100">
                <div className="mx-6 my-8 text-center flex flex-col gap-4 xl:w-full xl:max-w-6xl xl:mx-auto xl:my-10">
                    <h2>Отдых в АКАДЕМИА СПА</h2>
                    <p className="xl:max-w-4xl xl:mx-auto">
                        Чтобы отдохнуть после дороги и&nbsp;знакомства
                        с&nbsp;особняком, предлагаем завершить ваш первый день
                        в&nbsp;гостях у&nbsp;графа Шувалова расслабляющим
                        массажем в&nbsp;камерном пространстве Академиа СПА
                        на&nbsp;четвертом этаже вашего особняка, где все
                        продумано в&nbsp;деталях: индивидуальный подход
                        к&nbsp;выбору и&nbsp;комбинации техник для ухода
                        и&nbsp;массажа.
                    </p>
                    <ImageGrid
                        images={[
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-207.png",
                                alt: "СПА",
                            },
                            {
                                src: "https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-220.png",
                                alt: "СПА",
                            },
                        ]}
                    />
                    <DividerHistory style={2} />
                </div>
            </FadeUp>

            <FadeUp
                duration={1.2}
                className="mx-6 my-8 flex flex-col gap-6 xl:w-full xl:max-w-6xl xl:mx-auto xl:flex-row xl:gap-10 xl:my-10"
            >
                <div className="relative w-full">
                    <div className="relative overflow-hidden aspect-4/3 rounded xl:mt-12">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/04/breakfast.jpg"
                            alt="Графский завтрак"
                            fill
                            loading="lazy"
                            className="object-cover"
                        />
                    </div>
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/04/Rectangle-209.png"
                        alt="Графский завтрак"
                        width={210}
                        height={200}
                        loading="lazy"
                        className="object-cover hidden xl:block xl:absolute xl:top-0 xl:-right-16 rounded"
                    />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <h2 className="text-center">ГРАФСКИЙ завтрак</h2>
                    <p className="font-alistair text-center text-2xl/7 xl:text-4xl/10">
                        Это утро,
                        <br />
                        которое вы запомните надолго!
                    </p>
                    <DividerHistory style={3} />
                    <p>
                        Предлагаем вам красивое начало самого насыщенного дня
                        вашей программы. Чтобы в&nbsp;полной мере ощутить
                        истинно аристократический гедонизм и&nbsp;настроиться
                        на&nbsp;неторопливый ритм жизни петербургского высшего
                        общества, необходим настоящий графский
                        завтрак&nbsp;&mdash; без суеты спешки,
                        но&nbsp;с&nbsp;изысканным набором блюд
                        по&nbsp;историческим рецептам, подлинной винтажной
                        сервировкой и&nbsp;эффектной подачей неоклассическом
                        интерьере бара-ресторана ACADEMIA Шувалова
                        на&nbsp;первом этаже особняка.
                    </p>
                </div>
            </FadeUp>

            <section duration={1.2} className="bg-gray-100">
                <StaggerContainer
                    mode="inView"
                    className="mx-6 my-8 text-center flex flex-col gap-4 xl:w-full xl:max-w-6xl xl:mx-auto xl:my-10 xl:gap-6"
                >
                    <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                        <h2>ПРОГУЛКА-ФУРШЕТ на&nbsp;катере</h2>
                    </StaggerItem>

                    <StaggerItem className="xl:max-w-4xl xl:mx-auto">
                        После гастрономических впечатлений мы&nbsp;приглашаем
                        вас отправиться за&nbsp;эстетическими&nbsp;&mdash;
                        на&nbsp;водную прогулку по&nbsp;рекам и&nbsp;каналам
                        Петербурга на&nbsp;фирменном катере. До&nbsp;причала
                        и&nbsp;обратно в&nbsp;отель после водной прогулки
                        вы&nbsp;отправитесь на&nbsp;эффектном ретроавтомобиле.
                        <br />
                        <br />
                        Вас будет сопровождать наш лектор искусствовед
                        со&nbsp;специально разработанной экскурсией. Вас ждут
                        дворцовые тайны, невероятные интриги, секреты знатных
                        семей, неписаные правила и&nbsp;традиции дворянской
                        жизни XIX века, и, конечно, сам город во&nbsp;всем его
                        имперском великолепии с&nbsp;лучшего ракурса.
                    </StaggerItem>
                    <StaggerItem>
                        <ImageGrid
                            images={[
                                {
                                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/2b503ea69def5076a79d54eda646bdd6431c8db1-scaled.jpg",
                                    alt: "Прогулка-фуршет на катере",
                                },
                            ]}
                        />
                    </StaggerItem>
                    <StaggerItem className="xl:max-w-4xl xl:mx-auto">
                        В&nbsp;качестве приятного дополнения к&nbsp;пище
                        духовной&nbsp;&mdash; легкий изысканный фуршет
                        на&nbsp;катере в&nbsp;французском стиле от&nbsp;Брассери
                        Академиа с&nbsp;традиционными закусками, сырами,
                        десертами и&nbsp;вином.
                    </StaggerItem>

                    <StaggerItem className="relative flex-1 min-w-0 overflow-hidden rounded-lg xl:rounded-md">
                        <DividerHistory style={3} />
                    </StaggerItem>
                </StaggerContainer>
            </section>

            <StaggerContainer
                mode="inView"
                className="text-center m-6 flex flex-col gap-4 xl:w-full xl:max-w-4xl xl:mx-auto"
            >
                <StaggerItem className="flex gap-3 justify-center">
                    <h2>Сюрприз от графа</h2>
                    <svg
                        width="28"
                        height="30"
                        viewBox="0 0 28 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="xl:mt-1"
                        role="img"
                        aria-label="ACADEMIA Icon"
                    >
                        <title>ACADEMIA Icon</title>
                        <path
                            d="M27.929 6.91a6.8 6.8 0 0 0-.843-2.433C25.892 2.388 23.592.987 21.172.811c-2.961-.223-6.099 1.37-7.28 4.094l-.042.1a8.4 8.4 0 0 0-1.227-2.362C11.439 1.06 9.499-.015 7.473 0c-1.23-.002-2.45.35-3.51.959-1.638.923-2.777 2.415-3.369 4.164-.91 2.821-.735 5.874.25 8.641.972 2.692 2.784 5.052 4.991 6.879 1.233 1.033 2.629 1.948 4.235 2.265.294.051.485-.292.294-.508a6 6 0 0 0-.314-.326c-.967-.962-2.07-1.781-3.063-2.7C3.76 16.39 1.928 12.247 2.472 7.877c.174-1.475.606-2.908 1.63-4.003.898-.943 2.194-1.562 3.51-1.568 1.371.01 2.914.586 3.951 1.456.621.522 1.576 1.732 1.992 2.589.134.279.447.22.6 0 .13-.184.337-.49.46-.644C16.172 3.8 18.8 2.772 21.235 3.16c1.319.231 2.544.982 3.31 2.068a4.46 4.46 0 0 1 .808 2.863c-.207 4.735-4.851 8.88-8.046 12.125-2.573 2.62-6.035 5.652-6.539 9.452-.019.345.4.437.56.2 1.054-1.504 2.3-2.805 3.6-4.104 1.962-2.006 4.096-3.848 6.143-5.79 2.502-2.402 4.974-5.005 6.228-8.297.56-1.508.842-3.163.628-4.768"
                            fill="#372a24"
                        />
                    </svg>
                </StaggerItem>
                <StaggerItem>
                    <p>
                        На&nbsp;водной прогулке вас ждет особый
                        сюрприз&nbsp;&mdash; вы&nbsp;познакомитесь
                        с&nbsp;необычным петербургским ритуалом, который
                        обязательно вам запомнится, и&nbsp;получите
                        в&nbsp;подарок аксессуар в&nbsp;духе времени, который
                        обязательно вдохновит вас на&nbsp;фотосессию
                        на&nbsp;фоне имперских красот. Детали мы&nbsp;пока
                        сохраним в&nbsp;секрете.
                    </p>
                </StaggerItem>
                <StaggerItem>
                    <DividerHistory style={2} />
                </StaggerItem>
            </StaggerContainer>

            <section className="bg-gray-100 px-6 py-8 xl:py-12">
                <div className="flex flex-col gap-4 xl:w-full xl:max-w-6xl xl:mx-auto">
                    <div className="flex flex-col gap-4 xl:max-w-4xl xl:mx-auto xl:text-center">
                        <h2>Культурный Петербург</h2>
                        <p>
                            Третий день вашего графского путешествия предлагаем
                            начать с&nbsp;изысканного завтрака
                            в&nbsp;баре-ресторане в&nbsp;особняке
                            по&nbsp;специальному сет-меню от&nbsp;бренд-шефа
                            и&nbsp;посвятить культурной программе.
                        </p>
                    </div>
                    <DividerHistory style={3} />

                    {/* Mobile */}
                    <div className="xl:hidden space-y-4">
                        <p>
                            Консьерж-сервис в&nbsp;Академиа как ваш личный
                            проводник в&nbsp;бескрайнем мире событий
                            и&nbsp;мероприятий Петербурга поможет организовать
                            отдых любого формата: эксклюзивные экскурсии,
                            например, на&nbsp;Императорский фарфоровый завод
                            с&nbsp;мастер-классом, Эрмитаж или Русский музей без
                            очереди, билеты на&nbsp;камерные концерты, знаковые
                            спектакли и&nbsp;актуальные выставки.
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            {cultureImages.map((item) => (
                                <div
                                    className="relative aspect-square overflow-hidden rounded"
                                    key={item.alt}
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        className="object-cover"
                                        sizes="50vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop */}
                    <div className="hidden xl:flex">
                        {/* Левое фото */}
                        <div className="relative shrink-0 w-[48%] overflow-hidden rounded h-90">
                            <Image
                                src={cultureImages[0].src}
                                alt={cultureImages[0].alt}
                                fill
                                className="object-cover"
                                sizes="48%"
                            />
                        </div>

                        {/* Правая колонка: текст + фото */}
                        <div className="flex-1 flex flex-col -ml-16">
                            <p className="mb-8 pl-24">
                                Консьерж-сервис в&nbsp;Академиа как ваш личный
                                проводник в&nbsp;бескрайнем мире событий
                                и&nbsp;мероприятий Петербурга поможет
                                организовать отдых любого формата: эксклюзивные
                                экскурсии, например, на&nbsp;Императорский
                                фарфоровый завод с&nbsp;мастер-классом, Эрмитаж
                                или Русский музей без очереди, билеты
                                на&nbsp;камерные концерты, знаковые спектакли
                                и&nbsp;актуальные выставки.
                            </p>

                            {/* Правое фото */}
                            <div className="relative w-full h-90 overflow-hidden rounded">
                                <Image
                                    src={cultureImages[1].src}
                                    alt={cultureImages[1].alt}
                                    fill
                                    className="object-cover"
                                    sizes="55%"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StaggerContainer
                mode="inView"
                className="text-center m-6 flex flex-col gap-4 xl:w-full xl:max-w-2xl xl:mx-auto"
            >
                <StaggerItem>
                    <p>
                        Специальное предложение &laquo;Графский Петербург&raquo;
                        от&nbsp;Академиа особняк Шувалова&nbsp;&mdash;
                        это&nbsp;мостик к&nbsp;культурному и&nbsp;полноценному
                        отдыху.
                        <br />
                        <br />
                        Для гостей, ценящих наследие, для тех, кто хочет прожить
                        свой лучший опыт погружения в&nbsp;эпоху прошлых веков.
                    </p>
                </StaggerItem>
                <StaggerItem className="flex flex-col gap-3 my-6 xl:flex-row xl:justify-center">
                    <Button href="/booking/?&be-offer=910895" variant="primary">
                        Забронировать
                    </Button>
                </StaggerItem>
                <StaggerItem>
                    <p className="font-alistair text-2xl/7 xl:text-4xl/10">
                        Соберите особую коллекцию впечатлений вашего
                        аристократического отдыха!
                    </p>
                </StaggerItem>
            </StaggerContainer>

            <Divider dark />
            <ContactsSection />
        </main>
    );
}
