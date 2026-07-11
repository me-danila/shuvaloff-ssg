import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/routing";

/**
 * Контент двух исторических люксов (dashkova, shuvalov) по локали.
 * Живёт отдельным модулем (не в RoomsData) намеренно: подключается ТОЛЬКО
 * детальными страницами люксов через HistoricalSuitePage — проза не попадает
 * в клиентский бандл списка номеров.
 *
 * Форма JSX едина для обоих люксов (эталон — RU-версии). Rich-текст —
 * ReactNode, чтобы сохранить типографские &nbsp; из исходных страниц.
 */

type SuiteImage = { src: string; alt: string };
type SuiteAntique = {
    title: string;
    description: string;
    image?: SuiteImage;
};

export type HistoricalSuiteContent = {
    hero: { title: string; subtitle: ReactNode; image: SuiteImage };
    intro: ReactNode;
    descriptionImages: [SuiteImage, SuiteImage, SuiteImage];
    narrativeHeading: ReactNode;
    narrativeParagraphs: { id: string; body: ReactNode }[];
    antiquesIntro: ReactNode;
    antiquesItems: SuiteAntique[];
};

export type HistoricalSuiteSlug = "dashkova" | "shuvalov";

export const HistoricalSuites: Record<
    HistoricalSuiteSlug,
    Record<Locale, HistoricalSuiteContent>
> = {
    dashkova: {
        ru: {
            hero: {
                title: "РЕЗИДЕНЦИЯ ДАШКОВОЙ",
                subtitle: (
                    <>
                        Классика Петербурга
                        <br />в современном прочтении
                    </>
                ),
                image: {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/Rectangle-132.png",
                    alt: "Резиденция Дашковой",
                },
            },
            intro: (
                <>
                    Этот номер назван в&nbsp;честь графини Елизаветы Андреевны
                    Воронцовой-Дашковой (урождённой Шуваловой, 1845−1924).
                    <br className="block xl:hidden" />
                    <br />
                    Мы&nbsp;постарались передать самые яркие качества этой
                    неординарной женщины: изящество, тонкий вкус,
                    интеллигентность, внутреннюю силу и&nbsp;творческий подход
                    к&nbsp;жизни.
                </>
            ),
            descriptionImages: [
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
            ],
            narrativeHeading: (
                <>
                    Строгие линии, исторические детали и&nbsp;безупречный
                    комфорт
                </>
            ),
            narrativeParagraphs: [
                {
                    id: "suite",
                    body: (
                        <>
                            Исторический люкс Дашковой&nbsp;— просторный
                            однокомнатный номер с изысканным сочетанием изящных
                            и&nbsp;чётких линий неоклассицизма
                            с&nbsp;современным комфортом. Идеален для
                            романтических вечеров, долгих бесед на&nbsp;вечные
                            темы и&nbsp;роскошных фотосессий.
                        </>
                    ),
                },
                {
                    id: "bath",
                    body: (
                        <>
                            Безупречное оснащение номера и&nbsp;необычная ванная
                            комната со&nbsp;стеклянными стенами&nbsp;— дань
                            нашему времени, несомненно, не&nbsp;просто создают
                            ожидаемый комфорт, но&nbsp;и&nbsp;добавляют элемент
                            неподвластной времени игры для двоих. Яркий
                            насыщенный цвет стен резиденции был восстановлен
                            по&nbsp;архивным материалам.
                        </>
                    ),
                },
            ],
            antiquesIntro: (
                <>
                    Изящные линии декора, стремление вверх и&nbsp;утонченность
                    классического стиля мы&nbsp;дополнили подлинными артефактами
                    конца XIX&nbsp;— начала XX века для создания атмосферы:
                    прикроватными тумбами из&nbsp;палисандра, французским
                    каминным экраном, изящными статуэтками, столиком
                    и&nbsp;торшером.
                </>
            ),
            antiquesItems: [
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
            ],
        },
        en: {
            hero: {
                title: "DASHKOVA RESIDENCE",
                subtitle: (
                    <>
                        Classic Saint Petersburg
                        <br />
                        in a contemporary reading
                    </>
                ),
                image: {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/Rectangle-132.png",
                    alt: "Dashkova Residence",
                },
            },
            intro: (
                <>
                    This suite is named after Countess Elizaveta Andreevna
                    Vorontsova-Dashkova (born Shuvalova, 1845-1924).
                    <br className="block xl:hidden" />
                    <br />
                    Its concept reflects her defining qualities: elegance,
                    refined taste, intellect, inner strength, and creativity.
                </>
            ),
            descriptionImages: [
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/d1.jpg",
                    alt: "Dyson hair dryer",
                },
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/d2.jpg",
                    alt: "Bath amenities",
                },
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/d3.jpg",
                    alt: "Suite interior",
                },
            ],
            narrativeHeading:
                "Strict lines, historical details, and impeccable comfort",
            narrativeParagraphs: [
                {
                    id: "suite",
                    body: "The Dashkova historical suite is a spacious studio room where neoclassical elegance meets modern comfort. It is ideal for romantic evenings, long conversations, and memorable photo sessions.",
                },
                {
                    id: "bath",
                    body: "Its striking wall color was restored from archival materials, while the unusual glass-walled bathroom and premium equipment add a contemporary layer to the historical setting.",
                },
            ],
            antiquesIntro:
                "To support the mood of the suite, we added authentic late 19th and early 20th century artifacts: rosewood bedside cabinets, a French fireplace screen, porcelain figurines, and decorative furniture accents.",
            antiquesItems: [
                {
                    title: "French fireplace screen",
                    description:
                        "The key gem of the interior is a 19th-century French fireplace screen decorated with hand embroidery. Originally used to protect from sparks, it now serves as a graceful decorative centerpiece.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/bd9ff8b9e2919acf61e680198bcd48e7124a2e08.png",
                        alt: "Fireplace screen",
                    },
                },
                {
                    title: "Art Nouveau floor lamp",
                    description:
                        "An elegant forged floor lamp with a stained-glass shade from early 20th-century Europe adds a light Belle Epoque character to the space.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/Frame-323.png",
                        alt: "Floor lamp",
                    },
                },
                {
                    title: "19th-century mother-of-pearl fan",
                    description:
                        "A refined and feminine interior accent - an authentic 19th-century fan that recalls the era's subtle social language and craftsmanship.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/3.png",
                        alt: "Fan",
                    },
                },
                {
                    title: "Table lamp",
                    description:
                        "An eclectic Russian table lamp from the early 20th century with a romantic scene sets a mood of ease, conversation, and charm.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/4.png",
                        alt: "Table lamp",
                    },
                },
                {
                    title: "Regency side table",
                    description:
                        "A walnut side table made in early 20th-century England combines function and elegance, with lion-paw legs and acanthus motifs on the leather-covered top.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/5.png",
                        alt: "Side table",
                    },
                },
                {
                    title: "Collectible porcelain",
                    description:
                        "Early 20th-century figurines from Western Europe stand out for their delicate craftsmanship and expressive poses.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/6.png",
                        alt: "Porcelain figurines",
                    },
                },
                {
                    title: "Pair of rosewood bedside cabinets",
                    description:
                        "A luxurious pair of late 19th-century French bedside cabinets in rosewood, veneered by hand with remarkable precision.",
                },
            ],
        },
    },
    shuvalov: {
        ru: {
            hero: {
                title: "РЕЗИДЕНЦИЯ ГРАФА ШУВАЛОВА",
                subtitle: (
                    <>
                        Сила, безупречный вкус
                        <br />и аристократическое достоинство
                    </>
                ),
                image: {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/ef37be26c8b96f22c27a24b3de808de9ea48ddef-scaled.jpg",
                    alt: "Резиденция графа Шувалова",
                },
            },
            intro: (
                <>
                    Номер посвящен графу Андрею Павловичу Шувалову&nbsp;—
                    истинному аристократу: образованному, деятельному,
                    целеустремленному. Мы&nbsp;создавали это пространство, как
                    отражение его вкуса и&nbsp;взгляда на&nbsp;мир.
                    В&nbsp;интерьере доминируют строгие и&nbsp;ясные
                    классические формы, что подчеркивает интеллигентную
                    сдержанность и&nbsp;благородство. Резиденция Шувалова&nbsp;—
                    это место, где дыхание истории и&nbsp;современный комфорт
                    не&nbsp;спорят, а&nbsp;дополняют друг друга.
                </>
            ),
            descriptionImages: [
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
            ],
            narrativeHeading: "Пространство с характером",
            narrativeParagraphs: [],
            antiquesIntro:
                "Чтобы подчеркнуть единство между прошлым и настоящим особняка мы дополнили современный комфорт яркими акцентами прошедшей эпохи. Антикварная мебель притягивает взгляды и наполняет пространство изысканным благородством, характерным для истинно аристократического дома. Номер наполнен подлинными антикварными предметами, которые мягко погружают в историческую эпоху.",
            antiquesItems: [
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
                        "Картина французского художника-реалиста Эмиля Табари «Прогулка в лодке», созданная в 1888 году, украшает стену номера. Юные аристократки, словно застывшие в безмятежном моменте, символизируют утонченную и безмятежную жизнь высшего света. Особый акцент — японский зонт, проникший в европейское искусство после открытия Японии миру в середине XIX века. Этот элемент подчеркивает тонкий вкус, открытость к новым идеям и эстетическим впечатлениям — характерные черты эпохи.",
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
            ],
        },
        en: {
            hero: {
                title: "COUNT SHUVALOV RESIDENCE",
                subtitle: (
                    <>
                        Strength, impeccable taste,
                        <br />
                        and aristocratic dignity
                    </>
                ),
                image: {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/ef37be26c8b96f22c27a24b3de808de9ea48ddef-scaled.jpg",
                    alt: "Count Shuvalov Residence",
                },
            },
            intro: (
                <>
                    This suite is dedicated to Count Andrey Pavlovich Shuvalov -
                    an educated, determined, and influential aristocrat. Its
                    concept reflects his personality and worldview.
                    <br />
                    <br />
                    Strict classical forms and balanced proportions create a
                    space where historical atmosphere and modern comfort work
                    together naturally.
                </>
            ),
            descriptionImages: [
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/s1.png",
                    alt: "Historical suite interior",
                },
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/s2.png",
                    alt: "Historical suite interior",
                },
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/03/s3.png",
                    alt: "Historical suite interior",
                },
            ],
            narrativeHeading: "A space with character",
            narrativeParagraphs: [],
            antiquesIntro:
                "To reinforce the bond between the mansion's past and present, we paired contemporary comfort with expressive historical accents. Authentic antiques shape an elegant and deeply aristocratic atmosphere.",
            antiquesItems: [
                {
                    title: "Late 19th-century bronze floor lamp with lion mascarons",
                    description:
                        "A finely crafted interior object created in Russia in the late 19th century, featuring lion mascarons - a symbol of power and nobility.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/a1.png",
                        alt: "Floor lamp",
                    },
                },
                {
                    title: "Coffered ceiling",
                    description:
                        "The suite's ceiling features an authentic coffered composition, carefully restored and preserved as a protected historical element of the mansion.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/a2.png",
                        alt: "Coffered ceiling",
                    },
                },
                {
                    title: "Porcelain figurines",
                    description:
                        "German Unterweissbach porcelain figurines with a Rococo-inspired gallant scene, highlighted by fine underglaze painting and gilded details.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/a3.png",
                        alt: "Porcelain figurines",
                    },
                },
                {
                    title: "Bronze candlesticks",
                    description:
                        "Antique French candlesticks with floral motifs and gilded finishing add a refined European accent to the interior.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/a4.png",
                        alt: "Candlesticks",
                    },
                },
                {
                    title: "Painting by Emile Tabary",
                    description:
                        "The painting 'Boat Ride' by French realist Emile Tabary enhances the suite's atmosphere with a graceful, aristocratic mood.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/a5.png",
                        alt: "Emile Tabary painting",
                    },
                },
                {
                    title: "Antique furniture",
                    description:
                        "A complete antique set in red wood from early 20th-century Saint Petersburg workshops, complemented by an English bronze side table.",
                    image: {
                        src: "https://academia.spb.ru/wp-content/uploads/2026/03/a6.png",
                        alt: "Antique furniture",
                    },
                },
            ],
        },
    },
};
