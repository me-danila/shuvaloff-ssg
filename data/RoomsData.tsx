import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/routing";

export type RoomImage = {
    src: string;
    alt: string;
};

export type Room = {
    title: string;
    image: RoomImage;
    gallery: [RoomImage, RoomImage, RoomImage, RoomImage, RoomImage];
    slug: string;
    bookingUrl: string;
    bed: string;
    area: string;
    guests: string;
    description: string;
    fullDescription: ReactNode;
    amenities: string[];
    isHistorical: boolean;
};

const roomsRu: Room[] = [
    {
        title: "Стандарт",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/standard.png",
            alt: "Стандарт",
        },
        gallery: [
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/s1.jpg",
                alt: "Стандарт",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/s2.jpg",
                alt: "Стандарт",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/s3.jpg",
                alt: "Стандарт",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/s4.jpg",
                alt: "Стандарт",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/s5.jpg",
                alt: "Стандарт",
            },
        ],
        slug: "standard",
        bookingUrl: "/booking/?be-room=262143",
        bed: "Одна большая кровать",
        area: "17 м²",
        guests: "х 1-2",
        description:
            "Классический гостиничный номер с двуспальной кроватью с ортопедическим матрасом и просторной ванной комнатой с душевой",
        fullDescription: (
            <>
                Небольшой светлый номер в&nbsp;классическом стиле
                с&nbsp;изящными деталями. Здесь предусмотрено все необходимое
                для спокойного отдыха: ванная комната с&nbsp;душевой
                и&nbsp;теплым полом, кондиционер, двуспальная кровать, удобный
                шкаф для одежды и&nbsp;столик с&nbsp;креслами для работы или
                чаепития.
            </>
        ),
        amenities: [
            "Бутилированная вода при заезде",
            "Двуспальная кровать с ортопедическим матрасом и высоким текстильным изголовьем",
            "Просторная ванная комната с душевой, теплым полом, халатами, тапочками, премиальной гостиничной косметикой и парфюмерией",
            "Чайная станция и капсульная кофемашина",
            "Smart-TV, Wi-Fi, письменные принадлежности",
            "Сплит-система и многоуровневое освещение для максимального комфорта",
            "Блэкаут-шторы и москитные сетки на окнах",
            "Утюг, гладильная доска, фен, сейф, мини-холодильник",
            "Круглосуточное обслуживание номера, электронный консьерж 24/7 и сопровождение менеджера службы заботы",
        ],
        isHistorical: false,
    },
    {
        title: "Супериор",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/1.jpg",
            alt: "Супериор",
        },
        gallery: [
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/1.jpg",
                alt: "Супериор",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/2.jpg",
                alt: "Супериор",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/3.jpg",
                alt: "Супериор",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/4.jpg",
                alt: "Супериор",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/5.jpg",
                alt: "Супериор",
            },
        ],
        slug: "superior",
        bookingUrl: "/booking/?be-room=262213",
        bed: "Одна большая кровать",
        area: "18-25 м²",
        guests: "х 1-2",
        description:
            "Улучшенный номер с двуспальной кроватью, зоной отдыха и просторной ванной комнатой с душевой",
        fullDescription: (
            <>
                Интерьер номера объединяет неоклассический стиль
                с&nbsp;современным комфортом и&nbsp;держит тонкий баланс между
                эстетикой и&nbsp;функциональностью. Изящные детали отделки
                погружают в&nbsp;историю и&nbsp;создают настроение,
                а&nbsp;современное оснащение номера обеспечивает удобство
                во&nbsp;всех важных мелочах.
                <br />
                <br />
                Большая двуспальная кровать с&nbsp;ортопедическим матрасом
                и&nbsp;изысканным текстильным изголовьем, постельное белье
                премиального качества, светлая ванная комната с&nbsp;ванной или
                душем, кондиционер и&nbsp;блэкаут шторы, удобный шкаф для
                одежды, столик с&nbsp;креслами для неспешной беседы
                за&nbsp;чаепитием и&nbsp;китчинет со&nbsp;стеклянной витриной
                и&nbsp;зоной для макияжа&nbsp;— все для того, чтобы
                вы&nbsp;могли расслабиться и&nbsp;погрузиться в&nbsp;атмосферу
                отдыха.
            </>
        ),
        amenities: [
            "Бутилированная вода",
            "Кровать с ортопедическим матрасом и высоким текстильным изголовьем",
            "Удобный столик с креслами для работы или чаепития",
            "В некоторых номерах мансардные окна, создающие особую атмосферу света и уюта",
            "Ванная комната с душевой, гигиеническим душем, тёплым полом, халатами, тапочками, гостиничной парфюмерией и косметическими наборами",
            "Мягкая мебель, обеденный стол, багажная тумба, зеркало в полный рост, шкаф для одежды и пуфик",
            "Блэкаут-шторы и москитные сетки на окнах",
            "Smart TV, Wi-Fi, письменные принадлежности и многоуровневое освещение",
            "Индивидуальная сплит-система",
            "Чайная станция, капсульная кофемашина, набор для приготовления напитков",
            "Зона для макияжа",
            "Утюг, гладильная доска, фен, сейф, мини-холодильник",
            "Круглосуточное обслуживание номеров, электронный консьерж 24/7 и сопровождение личного менеджера службы заботы",
        ],
        isHistorical: false,
    },
    {
        title: "Полулюкс",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/1-1.jpg",
            alt: "Полулюкс",
        },
        gallery: [
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/1-1.jpg",
                alt: "Полулюкс",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/2-1.jpg",
                alt: "Полулюкс",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/3-1.jpg",
                alt: "Полулюкс",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/4-1.jpg",
                alt: "Полулюкс",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/5-1.jpg",
                alt: "Полулюкс",
            },
        ],
        slug: "junior-suite",
        bookingUrl: "/booking/?be-room=262255",
        bed: "Одна большая кровать и диван-кровать / кресло-кровать",
        area: "30-40 м²",
        guests: "х 1-4",
        description:
            "Номер повышенной комфортности с изолированной спальней, гостиной комнатой для отдыха и просторной ванной комнатой",
        fullDescription: (
            <>
                Номер с&nbsp;отдельной спальней и&nbsp;уютной гостиной
                с&nbsp;раскладным диваном или креслом-кроватью и&nbsp;столиком
                с&nbsp;креслами для общения за&nbsp;вечерним чаем. Подойдет для
                тех, кто особенно ценит личное пространство и&nbsp;для семейного
                размещения.
                <br />
                <br />
                В&nbsp;интерьере номера сочетаются неоклассический стиль
                и&nbsp;современное наполнение. Удобная мебель, продуманное
                оснащение номера и&nbsp;эргономичная планировка обеспечивают ваш
                комфорт, а&nbsp;изысканные детали отделки помогают погрузиться
                в&nbsp;историческую атмосферу особняка.
            </>
        ),
        amenities: [
            "Бутилированная вода",
            "Просторный двухкомнатный номер: изолированная спальня с большой кроватью и гостиная с мягкой мебелью",
            "Удобный столик с креслами для работы или чаепития",
            "Диван-кровать или кресло-кровать для дополнительных гостей",
            "В некоторых номерах мансардные окна, наполняющие интерьер мягким естественным светом",
            "Блэкаут-шторы и москитные сетки на окнах",
            "Ванная комната с ванной или душевой кабиной, гигиеническим душем, тёплым полом, халатами, тапочками, гостиничной парфюмерией и косметическими наборами",
            "Письменный стол, зеркало в полный рост, эксклюзивная дизайнерская мебель и багажная тумба",
            "Smart TV, Wi-Fi, многоуровневое освещение и индивидуальная сплит-система",
            "Гладильные принадлежности, сейф и фен, мини-холодильник",
            "Круглосуточное обслуживание номеров, электронный консьерж 24/7 и сопровождение личного менеджера службы заботы",
            "Чайная станция, капсульная кофемашина, набор для приготовления напитков",
            "Зона для макияжа",
        ],
        isHistorical: false,
    },
    {
        title: "Двухкомнатный люкс",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/04/1-2.jpg",
            alt: "Двухкомнатный люкс",
        },
        gallery: [
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/1-2.jpg",
                alt: "Двухкомнатный люкс",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/2-2.jpg",
                alt: "Двухкомнатный люкс",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/3-2.jpg",
                alt: "Двухкомнатный люкс",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/4-2.jpg",
                alt: "Двухкомнатный люкс",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/04/5-2.jpg",
                alt: "Двухкомнатный люкс",
            },
        ],
        slug: "suite",
        bookingUrl: "/booking/?be-room=262262",
        bed: "Одна большая кровать и одна большая кровать или две отдельные кровати",
        area: "50 м²",
        guests: "х 1-4",
        description:
            "Трехкомнатный люкс с двумя изолированными спальнями, гостиной и просторной ванной комнатой",
        fullDescription: (
            <>
                Баланс уюта и&nbsp;практичности для тех, кто ценит приватность,
                простор и&nbsp;продуманный сервис. Идеальный выбор для
                насыщенных дней и&nbsp;тихих вечеров в&nbsp;ритме вашего личного
                Петербурга. В&nbsp;номере две светлые спальни и&nbsp;уютная
                гостиная зона с&nbsp;диваном и&nbsp;столиком с&nbsp;креслами.
                В&nbsp;одной из&nbsp;спален можно сделать две односпальных
                кровати.
                <br />
                <br />
                В&nbsp;интерьере номера изящно сочетаются неоклассический стиль
                и&nbsp;современное наполнение. Удобная мебель, продуманное
                оснащение номера и&nbsp;эргономичная планировка обеспечивают ваш
                комфорт, а&nbsp;изысканные детали отделки в&nbsp;стиле
                неоклассицизма помогают погрузиться в&nbsp;историческую
                атмосферу особняка.
            </>
        ),
        amenities: [
            "Бутилированная вода",
            "Просторный трехкомнатный номер: две изолированные спальни и гостиная с мягкой мебелью",
            "Гостиная с диваном, креслом, журнальным столиком и столом для чаепития",
            "Письменный стол с принадлежностями, зеркало в полный рост, шкаф для одежды, багажная тумба, стулья, пуфики и вешалки-плечики",
            "Ванная комната с ванной или душевой кабиной, гигиеническим душем, теплым полом, халатами, тапочками, гостиничной парфюмерией и косметическими наборами",
            "Smart TV, Wi-Fi, индивидуальная сплит-система и многоуровневое освещение",
            "Блэкаут-шторы и москитные сетки на окнах",
            "Гладильная доска, утюг, фен и сейф, мини-холодильник",
            "Круглосуточное обслуживание номеров, электронный консьерж 24/7 и сопровождение личного менеджера службы заботы",
            "Чайная станция, капсульная кофемашина, набор для приготовления напитков",
            "Зона для макияжа",
        ],
        isHistorical: false,
    },
    {
        title: "Резиденция Дашковой",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/da1.jpg",
            alt: "Резиденция Дашковой",
        },
        gallery: [
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/1.jpg",
                alt: "Резиденция Дашковой",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/2-1.jpg",
                alt: "Резиденция Дашковой",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/3-1.jpg",
                alt: "Резиденция Дашковой",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/4.jpg",
                alt: "Резиденция Дашковой",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/5.jpg",
                alt: "Резиденция Дашковой",
            },
        ],
        slug: "dashkova",
        bookingUrl: "/booking/?be-room=262233",
        bed: "Одна большая кровать",
        area: "42 м²",
        guests: "х 1-2",
        description:
            "Изящный люкс, названный в честь Елизаветы Андреевны Воронцовой-Дашковой (урождённой Шуваловой, 1845−1924), с ярким, но утонченным интерьером, отражает многогранную личность хозяйки особняка",
        fullDescription: (
            <>
                Этот номер назван в&nbsp;честь графини Елизаветы Андреевны
                Воронцовой-Дашковой (урождённой Шуваловой, 1845−1924).
                Мы&nbsp;постарались передать самые яркие качества этой
                неординарной женщины: изящество, тонкий вкус, интеллигентность,
                внутреннюю силу и&nbsp;творческий подход к&nbsp;жизни.
                <br />
                <br />
                Исторический люкс Дашковой&nbsp;— просторный однокомнатный номер
                с&nbsp;изысканным сочетанием изящных и&nbsp;чётких линий
                неоклассицизма с&nbsp;современным комфортом. С&nbsp;уважением
                к&nbsp;истории особняка и&nbsp;сохранением охраняемых элементов
                культурного наследия мы&nbsp;создали утонченное пространство
                четких форм и&nbsp;наполнили его всем необходимым для гостя
                нашего времени.
                <br />
                <br />
                Антикварные детали XIX века в&nbsp;интерьере погружают
                в&nbsp;историю и&nbsp;создают особое настроение: французский
                каминный экран с&nbsp;изящной вышивкой, прикроватные тумбы
                из&nbsp;палисандра, изящный торшер, перламутровый веер
                и&nbsp;палисандровый столик с&nbsp;ножками в&nbsp;форме
                львиных&nbsp;лап. Безупречное оснащение номера и&nbsp;необычная
                ванная комната со&nbsp;стеклянными стенами&nbsp;— дань нашему
                времени, несомненно, не&nbsp;просто создают ожидаемый комфорт,
                но&nbsp;и&nbsp;добавляют элемент неподвластной времени игры для
                двоих.
            </>
        ),
        amenities: [
            "Кровать с ортопедическим матрасом",
            "Рабочее пространство с письменным столом и принадлежностями, зеркало в полный рост, шкаф для одежды, багажная тумба, стулья, пуфики и вешалки-плечики",
            "Smart TV, Wi-Fi, индивидуальная сплит-система и многоуровневое освещение",
            "Оригинальная просторная ванная комната с ванной и душем, гигиеническим душем, теплым полом, халатами, тапочками, гостиничной парфюмерией и расширенным косметическим набором",
            "Фен Dyson",
            "Кофемашина, чайная станция и набор для приготовления напитков",
            "Бутилированная вода",
            "Утюг и гладильная доска",
            "Антикварные предметы в интерьере: французский каминный экран второй половины XIX века, торшер эпохи модерн (Франция), коллекционные фарфоровые статуэтки начала XX века (Западная Европа), английский боковой столик эпохи регентства, перламутровый веер XIX века, палисандровые прикроватные тумбы XIX века (Франция)",
        ],
        isHistorical: true,
    },
    {
        title: "Резиденция графа Шувалова",
        image: {
            src: "https://academia.spb.ru/wp-content/uploads/2026/03/sh1.jpg",
            alt: "Резиденция графа Шувалова",
        },
        gallery: [
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/sh1-1.jpg",
                alt: "Резиденция графа Шувалова",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/sh2.jpg",
                alt: "Резиденция графа Шувалова",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/sh3.jpg",
                alt: "Резиденция графа Шувалова",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/sh4.jpg",
                alt: "Резиденция графа Шувалова",
            },
            {
                src: "https://academia.spb.ru/wp-content/uploads/2026/03/sh5.jpg",
                alt: "Резиденция графа Шувалова",
            },
        ],
        slug: "shuvalov",
        bookingUrl: "/booking/?be-room=262240",
        bed: "Одна большая кровать и диван‑кровать",
        area: "64 м²",
        guests: "х 1-4",
        description:
            "Просторный исторический люкс, посвященный графу Шувалову. Оформлен в стиле строгого неоклассицизма с подлинными антикварными деталями",
        fullDescription: (
            <>
                Просторный исторический люкс, посвященный графу Шувалову&nbsp;—
                одному из&nbsp;самых влиятельных людей своего времени, оформлен
                в&nbsp;стиле строгого неоклассицизма с&nbsp;подлинными
                антикварными деталями. Интерьер отражает эстетику зрелого вкуса,
                силу характера и&nbsp;уважение к&nbsp;традициям рода.
                <br />
                <br />
                С&nbsp;уважением к&nbsp;истории особняка мы&nbsp;восстановили
                охраняемые элементы культурного наследия (включая исторический
                цвет стен) и&nbsp;наполнили пространство всем необходимым для
                гостя нашего времени.
                <br />
                <br />
                Подлинные антикварные детали в&nbsp;интерьере погружают
                в&nbsp;историю и&nbsp;создают особую атмосферу: кессонный
                потолок с&nbsp;карнизом, изящный бронзовый торшер
                с&nbsp;маскаронами в&nbsp;виде львов, изысканный гарнитур
                из&nbsp;красного дерева в&nbsp;стиле модерн, фарфоровые
                статуэтки, английский бронзовый столик и&nbsp;французские
                подсвечники конца XIX века. Безупречное оснащение номера всем
                необходимым и&nbsp;необычная ванная комната со&nbsp;стеклянными
                стенами не&nbsp;просто создают ожидаемый комфорт,
                но&nbsp;и&nbsp;добавляют элемент неподвластной времени игры для
                двоих.
            </>
        ),
        amenities: [
            "Кровать размера с ортопедическим матрасом",
            "Просторная зона отдыха с диваном, креслом, журнальным столиком",
            "Рабочее пространство с письменным столом и принадлежностями, зеркало в полный рост, шкаф для одежды, багажная тумба, стулья, пуфики и вешалки-плечики",
            "Smart TV, Wi-Fi, индивидуальная сплит-система и многоуровневое освещение",
            "Оригинальная просторная ванная комната с ванной и душем, гигиеническим душем, теплым полом, халатами, тапочками, гостиничной парфюмерией и расширенным косметическим набором",
            "Фен Dyson",
            "Кофемашина, чайная станция и набор для приготовления напитков",
            "Бутилированная вода",
            "Утюг и гладильная доска",
            "Антикварные предметы в интерьере: бронзовый торшер XIX века с львиными маскаронами, кессонированный потолок как античный ритм в аристократическом интерьере, картина французского художника Эмиля Табари «Прогулка в лодке» (11108), французские подсвечники XIX века с растительным орнаментом, фарфоровые статуэтки Unterweissbach",
        ],
        isHistorical: true,
    },
];

type RoomTranslation = {
    title: string;
    imageAlt: string;
    galleryAlt: string;
    bed: string;
    guests: string;
    description: string;
    fullDescription: ReactNode;
    amenities: string[];
};

const roomTranslationsEn: Record<string, RoomTranslation> = {
    standard: {
        title: "Standard",
        imageAlt: "Standard room",
        galleryAlt: "Standard room",
        bed: "One double bed",
        guests: "x 1-2",
        description:
            "A classic room with a double bed, orthopedic mattress, and a spacious bathroom with a shower",
        fullDescription: (
            <>
                A compact and bright room in a classic style with elegant
                details. Everything you need for a calm and comfortable stay is
                already here: a bathroom with shower and heated floor, air
                conditioning, a double bed, a wardrobe, and a small table with
                armchairs for work or tea.
            </>
        ),
        amenities: [
            "Bottled water upon arrival",
            "Double bed with an orthopedic mattress and upholstered headboard",
            "Spacious bathroom with shower, heated floor, bathrobes, slippers, and premium hotel toiletries",
            "Tea station and capsule coffee machine",
            "Smart TV, Wi-Fi, and writing essentials",
            "Split-system air conditioning and multi-level lighting",
            "Blackout curtains and mosquito screens",
            "Iron, ironing board, hair dryer, safe, and mini fridge",
            "24/7 room service, digital concierge, and dedicated guest care manager",
        ],
    },
    superior: {
        title: "Superior",
        imageAlt: "Superior room",
        galleryAlt: "Superior room",
        bed: "One double bed",
        guests: "x 1-2",
        description:
            "An upgraded room with a double bed, lounge area, and a spacious bathroom with a shower",
        fullDescription: (
            <>
                The interior combines neoclassical aesthetics with modern
                comfort, balancing visual elegance and functionality. Decorative
                details create a historical mood, while modern room equipment
                keeps everyday comfort effortless.
                <br />
                <br />A large bed with orthopedic mattress, premium linens, a
                bright bathroom with bath or shower, air conditioning, blackout
                curtains, and a cozy tea corner make this room a great choice
                for a relaxed city stay.
            </>
        ),
        amenities: [
            "Bottled water",
            "Bed with orthopedic mattress and upholstered headboard",
            "Comfortable table with armchairs",
            "Some rooms feature mansard windows",
            "Bathroom with shower, heated floor, bathrobes, slippers, and hotel toiletries",
            "Soft seating, dining table, luggage stand, full-length mirror, wardrobe, and pouf",
            "Blackout curtains and mosquito screens",
            "Smart TV, Wi-Fi, writing essentials, and multi-level lighting",
            "Individual split-system air conditioning",
            "Tea station, capsule coffee machine, and drink set",
            "Vanity zone",
            "Iron, ironing board, hair dryer, safe, and mini fridge",
            "24/7 room service, digital concierge, and dedicated guest care manager",
        ],
    },
    "junior-suite": {
        title: "Junior Suite",
        imageAlt: "Junior suite",
        galleryAlt: "Junior suite",
        bed: "One double bed and sofa bed / armchair bed",
        guests: "x 1-4",
        description:
            "A junior suite with a separate bedroom, living room, and spacious bathroom",
        fullDescription: (
            <>
                A suite with a separate bedroom and a cozy living area with a
                sofa bed or armchair bed. It is ideal for guests who value
                privacy and for families who need more space.
                <br />
                <br />
                The interior blends neoclassical style with modern comfort:
                ergonomic layout, elegant furniture, and thoughtful amenities
                for longer and more comfortable stays in the city.
            </>
        ),
        amenities: [
            "Bottled water",
            "Spacious two-room layout: separate bedroom and living room",
            "Comfortable table with armchairs",
            "Sofa bed or armchair bed for extra guests",
            "Some rooms feature mansard windows with soft natural light",
            "Blackout curtains and mosquito screens",
            "Bathroom with bath or shower, heated floor, bathrobes, slippers, and hotel toiletries",
            "Writing desk, full-length mirror, designer furniture, and luggage stand",
            "Smart TV, Wi-Fi, multi-level lighting, and individual split-system air conditioning",
            "Ironing amenities, safe, hair dryer, and mini fridge",
            "24/7 room service, digital concierge, and dedicated guest care manager",
            "Tea station, capsule coffee machine, and drink set",
            "Vanity zone",
        ],
    },
    suite: {
        title: "Suite",
        imageAlt: "Suite",
        galleryAlt: "Suite",
        bed: "One double bed and one double bed or two separate beds",
        guests: "x 1-4",
        description:
            "A three-room suite with two separate bedrooms, a living room, and a spacious bathroom",
        fullDescription: (
            <>
                A practical yet elegant layout for guests who value privacy,
                generous space, and attentive service. The suite includes two
                bright bedrooms and a comfortable living room with a sofa and
                tea table.
                <br />
                <br />
                The interior combines neoclassical details with modern
                conveniences, creating a calm and well-balanced atmosphere for
                both short and extended stays.
            </>
        ),
        amenities: [
            "Bottled water",
            "Spacious three-room layout: two separate bedrooms and a living room",
            "Living room with sofa, armchair, coffee table, and tea table",
            "Writing desk with amenities, full-length mirror, wardrobe, luggage stand, chairs, poufs, and hangers",
            "Bathroom with bath or shower, heated floor, bathrobes, slippers, and hotel toiletries",
            "Smart TV, Wi-Fi, individual split-system air conditioning, and multi-level lighting",
            "Blackout curtains and mosquito screens",
            "Iron, ironing board, hair dryer, safe, and mini fridge",
            "24/7 room service, digital concierge, and dedicated guest care manager",
            "Tea station, capsule coffee machine, and drink set",
            "Vanity zone",
        ],
    },
    dashkova: {
        title: "Dashkova Residence",
        imageAlt: "Dashkova Residence",
        galleryAlt: "Dashkova Residence",
        bed: "One double bed",
        guests: "x 1-2",
        description:
            "An elegant historical suite dedicated to Elizaveta Vorontsova-Dashkova with a bright and refined interior",
        fullDescription: (
            <>
                This suite is dedicated to Countess Elizaveta Andreevna
                Vorontsova-Dashkova (born Shuvalova, 1845-1924). The design
                reflects her strongest qualities: grace, intellect, inner
                strength, and refined taste.
                <br />
                <br />
                Historic character and modern comfort are carefully combined
                here. Preserved architectural elements, antique objects, and
                contemporary amenities create a rare stay experience in a true
                St. Petersburg mansion.
            </>
        ),
        amenities: [
            "Bed with orthopedic mattress",
            "Workspace with writing desk, full-length mirror, wardrobe, luggage stand, chairs, and poufs",
            "Smart TV, Wi-Fi, individual split-system air conditioning, and multi-level lighting",
            "Spacious bathroom with bath and shower, heated floor, bathrobes, slippers, and extended toiletries set",
            "Dyson hair dryer",
            "Coffee machine, tea station, and drink set",
            "Bottled water",
            "Iron and ironing board",
            "Antique details: 19th-century French fireplace screen, Art Nouveau floor lamp, collectible porcelain figurines, English Regency side table, mother-of-pearl fan, and rosewood bedside tables",
        ],
    },
    shuvalov: {
        title: "Count Shuvalov Residence",
        imageAlt: "Count Shuvalov Residence",
        galleryAlt: "Count Shuvalov Residence",
        bed: "One double bed and sofa bed",
        guests: "x 1-4",
        description:
            "A spacious historical suite dedicated to Count Shuvalov in strict neoclassical style with genuine antiques",
        fullDescription: (
            <>
                This spacious historical suite is dedicated to Count Shuvalov,
                one of the most influential figures of his time. The interior
                follows strict neoclassical lines and includes original antique
                details.
                <br />
                <br />
                Protected heritage elements and historic wall tones were
                carefully restored. Together with modern amenities, they create
                a distinctive atmosphere where history and comfort coexist
                naturally.
            </>
        ),
        amenities: [
            "Bed with orthopedic mattress",
            "Spacious lounge area with sofa, armchair, and coffee table",
            "Workspace with writing desk, full-length mirror, wardrobe, luggage stand, chairs, and poufs",
            "Smart TV, Wi-Fi, individual split-system air conditioning, and multi-level lighting",
            "Spacious bathroom with bath and shower, heated floor, bathrobes, slippers, and extended toiletries set",
            "Dyson hair dryer",
            "Coffee machine, tea station, and drink set",
            "Bottled water",
            "Iron and ironing board",
            "Antique details: 19th-century bronze floor lamp with lion mascarons, coffered ceiling, Emile Tabary painting, French 19th-century candlesticks, and Unterweissbach porcelain figurines",
        ],
    },
};

const translateRoomToEn = (room: Room): Room => {
    const translation = roomTranslationsEn[room.slug];

    if (!translation) {
        return room;
    }

    return {
        ...room,
        title: translation.title,
        image: {
            ...room.image,
            alt: translation.imageAlt,
        },
        gallery: room.gallery.map((image) => ({
            ...image,
            alt: translation.galleryAlt,
        })) as [RoomImage, RoomImage, RoomImage, RoomImage, RoomImage],
        bed: translation.bed,
        guests: translation.guests,
        description: translation.description,
        fullDescription: translation.fullDescription,
        amenities: translation.amenities,
    };
};

export const AllRooms: Record<Locale, Room[]> = {
    ru: roomsRu,
    en: roomsRu.map(translateRoomToEn),
};
