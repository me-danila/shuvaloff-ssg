import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/routing";

export type ServiceLink = {
    label: string;
    href: string;
};

type ServiceWithSlug = { slug: string; externalLink?: never };
type ServiceWithExternal = { externalLink: string; slug?: never };

export type Service = {
    title: string;
    subtitle: string;
    imgUrl: string;
    fullDescription?: ReactNode;
    links?: ServiceLink[];
    price?: string;
    comment?: ReactNode;
} & (ServiceWithSlug | ServiceWithExternal);

export const AllServices: Record<Locale, Service[]> = {
    ru: [
        {
            title: "ACADEMIA Консьерж‑сервис",
            subtitle:
                "Наша консьерж служба освободит Вас не только от рутинных дел, но и погрузит в эпоху историзма, что позволит Вам почувствовать себя настоящим графом и княгиней!",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/concierge.png",
            slug: "concierge",
        },
        {
            title: "Проживание с животными",
            subtitle:
                "Мы знаем, как важно путешествовать вместе с теми, кого любишь. В ACADEMIA ваши четвероногие спутники — такие же желанные гости.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/677b106d6785c2fc6382a613dc97304ea6050387.jpg",
            slug: "pets",
            fullDescription: (
                <>
                    Мы с удовольствием принимаем кошек и собак без ограничения
                    по весу, но не более одного животного в номере. При
                    заселении потребуется ветеринарный паспорт питомца.
                    <br />
                    Мы приготовили все необходимое:
                    <br />• удобную лежанку,
                    <br /> • миски для воды и еды,
                    <br /> • гигиенический набор,
                    <br /> • лакомства,
                    <br /> • по запросу консьерж организует выгул: с заботой и
                    по расписанию.
                    <br />
                    <br />
                    Путешествуйте вместе. Мы&nbsp;позаботимся о&nbsp;комфорте
                    каждого.
                </>
            ),
            price: "2 000 ₽ / ночь",
            comment: "Залог: 5 000 ₽ (возвращается после проверки номера)",
        },
        {
            title: "Представительский трансфер",
            subtitle:
                "Мы предлагаем вам индивидуальный трансфер без ожиданий и суеты — с заботой и вниманием к деталям.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_3137-1.avif",
            slug: "transfer",
        },
        {
            title: "Завтрак от шефа",
            subtitle:
                "Завтрак в Бар-ресторан ACADEMIA Шувалова — это не просто первый прием пищи, а часть изысканного и вкусного ритуала.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/20c4e203934b0b058e0e7ddd774d2fb2a841fdc3.jpg",
            slug: "breakfast",
            fullDescription: (
                <>
                    Специально для гостей отеля бренд-шеф Илья Харченко создал
                    разнообразное меню завтраков. В&nbsp;нем есть все самые
                    любимые и&nbsp;беспроигрышные позиции: сырники
                    с&nbsp;клубничным соусом, овсянка с&nbsp;яблочным конфи или
                    скрембл с&nbsp;трюфелем и&nbsp;креветками&nbsp;&mdash; всё
                    приготовлено с&nbsp;любовью и&nbsp;вниманием.
                    <br />
                    Если у&nbsp;вас будут вопросы или потребуется помощь
                    с&nbsp;заказом&nbsp;&mdash; мы&nbsp;на&nbsp;связи
                    и&nbsp;всегда рады помочь.
                </>
            ),
            links: [
                {
                    label: "Меню завтраков",
                    href: "https://static.academia.spb.ru/files/%D0%97%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA-%D0%BE%D1%82-%D1%88%D0%B5%D1%84%D0%B0.pdf",
                },
            ],
            price: "1 800 ₽",
            comment:
                "Время подачи завтраков в бутик-ресторане: с 8:00 до 12:00.",
        },
        {
            title: "ACADEMIA СПА",
            subtitle:
                "Мы создали ACADEMIA СПА для тех, кто ценит высокие стандарты сервиса, заботу о себе и о своём внутреннем комфорте",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/925be715d60c1f8fa9b77c8c64eedbc37e857989.jpg",
            externalLink: "https://academia-spa.ru/",
        },
        {
            title: "Девайсы для красоты и здоровья",
            subtitle:
                "Сделайте ваш отдых еще более приятным — закажите в номер девайсы для красоты и здоровья от бренда GESS.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/beauty-bar-menu.avif",
            slug: "beauty-bar",
        },
        {
            title: "Букет в номер",
            subtitle: "Жест внимания без повода или в особый момент.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/efc06e02ff905dba3b08435aa4be3aeab0fbe8ce.jpg",
            slug: "bouquet",
            fullDescription: (
                <>
                    Мы&nbsp;с&nbsp;радостью подберём идеальный букет
                    по&nbsp;вашему настроению и&nbsp;пожеланиям&nbsp;&mdash;
                    от&nbsp;нежной классики до&nbsp;выразительной композиции.
                    <br />
                    Если у&nbsp;вас будут вопросы или потребуется
                    помощь&nbsp;&mdash; мы&nbsp;на&nbsp;связи и&nbsp;всегда рады
                    помочь.
                </>
            ),
            price: "от 10 000 ₽",
        },
        {
            title: "Ужин от шефа",
            subtitle:
                "С радостью приглашаем вас провести время в Бар-ресторан ACADEMIA Шувалова — бутик-ресторане, расположенном в бывшем кабинете графа Шувалова.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/cb49c80b30436e5033eadfc5e2b8d6b3eef8205c.jpg",
            slug: "dinner",
            fullDescription: (
                <>
                    Ужин в&nbsp;этом зале&nbsp;&mdash; не&nbsp;просто
                    гастрономический опыт, а&nbsp;настоящее путешествие
                    в&nbsp;другой&nbsp;век. В&nbsp;камерной обстановке, среди
                    мрамора, лепнины и&nbsp;ручной мебели, оживает
                    история&nbsp;&mdash; тонко, чувственно, с&nbsp;тактом.
                    <br />
                    Вас ждут блюда классической кухни от&nbsp;бренд-шефа Ильи
                    Харченко, и&nbsp;коктейли от&nbsp;Даниила
                    Лемана&nbsp;&mdash; изысканные, с&nbsp;тонкой архитектурой
                    вкуса.
                    <br />
                    Это время&nbsp;&mdash; дань глубокому вкусу
                    и&nbsp;удовольствию быть здесь и&nbsp;сейчас.
                    <br />
                    И&nbsp;небольшая деталь, о&nbsp;которой хотелось&nbsp;бы
                    предупредить заранее: в&nbsp;ресторане действует лёгкий
                    дресс-код&nbsp;&mdash; casual & cocktails.
                    <br />
                    Если у&nbsp;вас будут вопросы или потребуется помощь
                    с&nbsp;бронированием столика&nbsp;&mdash;
                    мы&nbsp;на&nbsp;связи и&nbsp;всегда рады помочь.
                </>
            ),
            links: [
                {
                    label: "Меню ужина",
                    href: "https://static.academia.spb.ru/files/%D0%9E%D0%B1%D0%B5%D0%B4%20%D0%B8%20%D1%83%D0%B6%D0%B8%D0%BD%20%D0%BE%D1%82%20%D1%88%D0%B5%D1%84%D0%B0.pdf",
                },
                {
                    label: "Барная карта",
                    href: "https://static.academia.spb.ru/files/%D0%9C%D0%B5%D0%BD%D1%8E%20%D0%B1%D0%B0%D1%80%D0%B0%20Shuvaloff.pdf",
                },
            ],
            price: "2 250 ₽",
            comment: "Время подачи в бутик-ресторане: с 12:00 до 22:30.",
        },
        {
            title: "Аристократический вечер Ruinart",
            subtitle:
                "Изысканная услуга для особого события — вдохновлённая эпохой, когда дом Ruinart впервые заворожил аристократию.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/mobile_file_2025-09-19_07-33-26-3.avif",
            slug: "ruinart",
            fullDescription: (
                <>
                    Погрузитесь в&nbsp;атмосферу 18 века&nbsp;&mdash; эпоху
                    величия, где каждый жест был тонким, а&nbsp;каждый
                    момент&nbsp;&mdash; значимым.
                    <br />
                    Бутылка шампанского Ruinart&nbsp;&mdash; символ элегантности
                    и&nbsp;традиции, которую основал в&nbsp;1676 году дом
                    Руинарт
                    <br />
                    Коллекция Антипасти с&nbsp;легкими гастрономическими
                    сочетаниями
                    <br />
                    15 воздушных шаров в&nbsp;форме сердец&nbsp;&mdash; акцент,
                    подчеркивающий торжественность момента.
                </>
            ),
            price: "45 000 ₽",
        },
        {
            title: "День рождения",
            subtitle:
                "Особый формат поздравления в ACADEMIA, чтобы день рождения стал не просто поводом, а событием — красивым, тёплым, запоминающимся.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/02/bar4-1-1.avif",
            slug: "birthday",
            fullDescription: (
                <>
                    &bull; Воздушные шары в&nbsp;изысканных
                    оттенках&nbsp;&mdash; для лёгкого и&nbsp;радостного
                    настроения
                    <br />
                    &bull; Декоративная надпись HAPPY BIRTHDAY&nbsp;&mdash;
                    тонкий акцент на&nbsp;детали
                    <br />
                    &bull; Бутылка охлаждённого игристого вина&nbsp;&mdash; для
                    тоста в&nbsp;нужный момент
                    <br />
                    &bull; Фруктовая композиция из&nbsp;свежих сезонных фруктов
                    <br />
                    &bull; Десерт &laquo;Яблочный пирог&raquo;
                    от&nbsp;бренд-шефа Ильи Харченко
                    <br />
                    <br />
                    Если у&nbsp;вас будут вопросы или потребуется помощь
                    с&nbsp;заказом&nbsp;&mdash; мы&nbsp;на&nbsp;связи
                    и&nbsp;всегда рады помочь.
                </>
            ),
            price: "9 000 ₽",
        },
        {
            title: "Торт от бренд-шефа",
            subtitle:
                "Авторский торт от бренд-шефа, созданный по индивидуальному рецепту: из натуральных ингредиентов и без компромиссов по качеству.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/cake.avif",
            slug: "cake",
            fullDescription: (
                <>
                    Такой торт&nbsp;&mdash; не&nbsp;просто десерт,
                    а&nbsp;финальный аккорд важного дня.
                    <br />
                    Четыре изысканных варианта на&nbsp;выбор&nbsp;&mdash;
                    от&nbsp;классического Наполеона до&nbsp;Орео
                    с&nbsp;черничным кремю: воздушный бисквит, хрустящие нотки и
                    насыщенное черничное сердце.
                    <br />
                    Если у&nbsp;вас будут вопросы или потребуется помощь
                    с&nbsp;заказом&nbsp;&mdash; мы на&nbsp;связи и&nbsp;всегда
                    рады помочь.
                </>
            ),
            price: "от 3 500 ₽",
            links: [
                {
                    label: "Коллекция тортов",
                    href: "https://static.academia.spb.ru/files/chef-cake.pdf",
                },
            ],
        },
        {
            title: "Меню подушек",
            subtitle:
                "Мы понимаем, насколько важен качественный сон. Поэтому предлагаем выбор подушек с разным наполнением — для идеального комфорта.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/713adf1b0e6e935c524fc580d30892f328630057.jpg",
            slug: "pillows",
            fullDescription: (
                <>
                    Менеджер службы заботы с&nbsp;радостью подскажет, какие
                    варианты доступны, и&nbsp;поможет подобрать ту, что подойдёт
                    именно вам.
                    <br />
                    Если у&nbsp;вас будут вопросы или потребуется помощь
                    с&nbsp;выбором&nbsp;&mdash; мы&nbsp;на&nbsp;связи
                    и&nbsp;всегда рады помочь.
                </>
            ),
            price: "бесплатно",
            links: [
                {
                    label: "Меню подушек",
                    href: "https://static.academia.spb.ru/files/pillow-menu.pdf",
                },
            ],
        },
        {
            title: "Поздний выезд",
            subtitle:
                "Планируйте свое время так, как удобно именно вам, а мы подстроимся под ваш ритм. Пожалуйста, сообщите нам заранее о ваших предпочтениях.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/01d9eae6eceabd4c20d6304e8502e38b55cda58e.jpg",
            slug: "late-checkout",
            fullDescription: (
                <>
                    Чтобы оформить поздний выезд, свяжитесь с&nbsp;отделом
                    бронирования или добавьте нужное время выезда на&nbsp;втором
                    шаге бронирования на&nbsp;официальном сайте&nbsp;&mdash;
                    стоимость будет рассчитана автоматически.
                    <br />
                    <br />
                    Стандартное время выезда: до&nbsp;12:00
                    <br />
                    &bull; Выезд до&nbsp;18:00&nbsp;&mdash; +50%
                    от&nbsp;стоимости суток
                    <br />
                    &bull; Выезд после 18:00&nbsp;&mdash; +100%
                    от&nbsp;стоимости суток
                </>
            ),
        },
        {
            title: "Обед от шефа",
            subtitle:
                "С радостью приглашаем вас провести время в Бар-ресторан ACADEMIA Шувалова — бутик-ресторане, расположенном в бывшем кабинете графа Шувалова.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/%D0%A1%D1%83%D0%BF%D1%8B%D0%9E%D1%82%D0%A8%D0%B5%D1%84%D0%B0-1.avif",
            slug: "lunch",
            fullDescription: (
                <>
                    Обед в&nbsp;этом зале&nbsp;&mdash; не&nbsp;просто
                    гастрономический опыт, а&nbsp;настоящее путешествие
                    в&nbsp;другой&nbsp;век. В&nbsp;камерной обстановке, среди
                    мрамора, лепнины и&nbsp;ручной мебели, оживает
                    история&nbsp;&mdash; тонко, чувственно, с&nbsp;тактом.
                    <br />
                    Вас ждут блюда классической кухни от&nbsp;бренд-шефа Ильи
                    Харченко, и&nbsp;коктейли от&nbsp;Даниила
                    Лемана&nbsp;&mdash; изысканные, с&nbsp;тонкой архитектурой
                    вкуса.
                    <br />
                    Это время&nbsp;&mdash; дань глубокому вкусу
                    и&nbsp;удовольствию быть здесь и&nbsp;сейчас.
                    <br />
                    И&nbsp;небольшая деталь, о&nbsp;которой хотелось&nbsp;бы
                    предупредить заранее: в&nbsp;ресторане действует лёгкий
                    дресс-код&nbsp;&mdash; casual & cocktails.
                    <br />
                    Если у&nbsp;вас будут вопросы или потребуется помощь
                    с&nbsp;бронированием столика&nbsp;&mdash;
                    мы&nbsp;на&nbsp;связи и&nbsp;всегда рады помочь.
                </>
            ),
            links: [
                {
                    label: "Меню обеда",
                    href: "https://static.academia.spb.ru/files/%D0%9E%D0%B1%D0%B5%D0%B4%20%D0%B8%20%D1%83%D0%B6%D0%B8%D0%BD%20%D0%BE%D1%82%20%D1%88%D0%B5%D1%84%D0%B0.pdf",
                },
                {
                    label: "Барная карта",
                    href: "https://static.academia.spb.ru/files/%D0%9C%D0%B5%D0%BD%D1%8E%20%D0%B1%D0%B0%D1%80%D0%B0%20Shuvaloff.pdf",
                },
            ],
            price: "2 250 ₽",
            comment: "Время подачи в бутик-ресторане: с 12:00 до 22:30.",
        },
        {
            title: "Хранение багажа",
            subtitle:
                "Мы с радостью берём на себя заботу о вашем багаже в день заезда и выезда.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_2163.avif",
            slug: "luggage",
            fullDescription: (
                <>
                    Мы&nbsp;с&nbsp;радостью берем на&nbsp;себя заботу
                    о&nbsp;вашем багаже в&nbsp;дни заезда и&nbsp;выезда. Гуляйте
                    по&nbsp;городу, занимайтесь делами или просто наслаждайтесь
                    свободным временем, не&nbsp;беспокоясь о&nbsp;вещах.
                    <br />
                    Эту услугу не&nbsp;нужно бронировать заранее. Если
                    у&nbsp;вас будут вопросы или потребуется помощь&nbsp;&mdash;
                    мы&nbsp;на&nbsp;связи и&nbsp;всегда рады помочь.
                </>
            ),
            price: "бесплатно",
        },
        {
            title: "Экскурсия «Во времена графа Шувалова»",
            subtitle: "Индивидуальная экскурсия на компанию до 4-х человек.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/exc-shuvaloff.avif",
            slug: "history-trip",
            fullDescription: (
                <>
                    Погрузитесь в&nbsp;историю Петербурга: на&nbsp;элегантном
                    Mercedes вас доставят к&nbsp;одному из&nbsp;самых красивых
                    особняков на&nbsp;набережной Фонтанки. Вас ждёт прогулка
                    по&nbsp;парадным залам Шуваловского дворца, в&nbsp;котором
                    расположен Музей Фаберже, знакомство с&nbsp;его легендами
                    и&nbsp;тайнами, а&nbsp;также изысканное чаепитие
                    с&nbsp;десертом, вдохновлённым творчеством Карла Фаберже.
                    Завершение дня&nbsp;&mdash; возвращение в&nbsp;отель
                    на&nbsp;VIP-трансфере, сохраняя в&nbsp;памяти незабываемые
                    впечатления от&nbsp;дня, проведенного в&nbsp;окружении
                    истории и&nbsp;красоты.
                </>
            ),
            price: "10 500 ₽",
        },
        {
            title: "Приветственный сет в номер",
            subtitle: "Позвольте начать ваше пребывание с особого акцента.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/638720452918249784-db5c3134-880f-41e0-8487-575e96be39ef-1.avif",
            slug: "welcome-set",
            fullDescription: (
                <>
                    ПРИВЕТСТВЕННЫЙ СЕТ ACADEMIA&nbsp;&mdash; бутылка изысканного
                    игристого вина и&nbsp;на&nbsp;выбор&nbsp;&mdash; свежая
                    фруктовая тарелка, составленная с&nbsp;учётом сезонности,
                    или коллекция антипасти с&nbsp;лёгкими гастрономическими
                    сочетаниями. Идеальный пролог к&nbsp;вашему отдыху, задающий
                    тонкое настроение вечера.
                    <br />
                    <br />
                    <i>
                        Приветственный сет с&nbsp;игристым и&nbsp;лепестками
                        роз&nbsp;&mdash; 2 500 ₽
                        <br />
                        Приветственный сет с&nbsp;игристым и&nbsp;фруктовой
                        тарелкой&nbsp;&mdash; 3 500 ₽
                        <br />
                        Приветственный сет с&nbsp;игристым
                        и&nbsp;антипасти&nbsp;&mdash; 4 500 ₽
                    </i>
                </>
            ),
        },
        {
            title: "Романтический вечер на двоих",
            subtitle:
                "Особый формат оформления номера для тех, кто ценит не только путешествия, но и чувства.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/12/IMG_0162-2-1.avif",
            slug: "romantic",
            fullDescription: (
                <>
                    Чтобы визит в&nbsp;Петербург стал не&nbsp;просто
                    романтическим побегом, а&nbsp;моментом, который захочется
                    помнить&nbsp;&mdash; долго, нежно, с&nbsp;улыбкой.
                    <br />
                    &bull; Воздушные шары в&nbsp;форме сердца
                    <br />
                    &bull; Антипасти или большая фруктовая тарелка
                    <br />
                    &bull; Бутылка охлаждённого игристого вина
                    <br />
                    &bull; Свечи для создания атмосферы
                    <br />
                    &bull; Если у&nbsp;вас будут вопросы или потребуется помощь
                    с&nbsp;заказом&nbsp;&mdash; мы&nbsp;на&nbsp;связи
                    и&nbsp;всегда рады помочь.
                </>
            ),
            price: "10 000 ₽",
        },
        {
            title: "Отдых с детьми",
            subtitle: "Приезжайте к нам всей семьей!",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/1fb679af26b0660b3995ee5ffe668aca8196c3dd-1.avif",
            slug: "kids",
            fullDescription: (
                <>
                    Мы&nbsp;с&nbsp;радостью принимаем детей любого возраста,
                    а&nbsp;до&nbsp;3 лет включительно дети отдыхают у&nbsp;нас
                    бесплатно. Для всех детей мы&nbsp;приготовили специальные
                    халаты и&nbsp;тапочки&nbsp;&mdash; все как у&nbsp;взрослых.
                    <br />
                    Малышам до&nbsp;3-х лет мы&nbsp;бесплатно предоставим
                    детскую кроватку и, при необходимости, манеж под запрос.
                    После 3-х лет дети размещаются на&nbsp;диванах
                    в&nbsp;номерах, где это предусмотрено.
                    <br />
                    Мы&nbsp;предоставим под запрос ступеньку для раковины,
                    детское сиденье для унитаза и&nbsp;стульчик для кормления.
                    <br />
                    А&nbsp;чтобы сделать детский отдых еще более комфортным,
                    рассмотрите наше дополнительное предложение: детский набор,
                    созданный с&nbsp;любовью для маленьких гостей нашего отеля.
                    <br />
                    <br />
                    В&nbsp;набор входит:
                    <br />
                    &bull; Мягкая игрушка Академишка&nbsp;&mdash; идеальный
                    спутник для вашего ребенка во&nbsp;время отдыха
                    в&nbsp;отеле. Он&nbsp;сделан из&nbsp;высококачественных
                    материалов и&nbsp;прошел строгие тесты на&nbsp;безопасность,
                    так что с&nbsp;ним можно спокойно играть и&nbsp;обниматься;
                    <br />
                    &bull; Набор детской косметики, созданный специально для
                    чувствительной кожи малышей. В&nbsp;него входят:
                    шампунь-кондиционер, гель для душа, лосьон для тела,
                    освежающая салфетка и&nbsp;мыло. Все средства созданы
                    на&nbsp;основе натуральных ингредиентов и&nbsp;безопасны для
                    детей.
                </>
            ),
            price: "3 500 ₽",
        },
        {
            title: "Ранний заезд",
            subtitle: "Планируйте своё время так, как удобно именно вам.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/f985ce27a1e8c0fc23d3f9ecceb8a43016565c4a.jpg",
            slug: "early-checkin",
            fullDescription: (
                <>
                    Планируйте свое время так, как удобно именно вам,
                    а&nbsp;мы&nbsp;подстроимся под ваш ритм. Пожалуйста,
                    сообщите нам заранее о&nbsp;ваших предпочтениях.
                    <br />
                    Чтобы оформить ранний заезд, свяжитесь с&nbsp;отделом
                    бронирования или добавьте нужное время заезда на&nbsp;втором
                    шаге бронирования на&nbsp;официальном сайте&nbsp;&mdash;
                    стоимость будет рассчитана автоматически.
                    <br />
                    <br />
                    Стандартное время заезда: с&nbsp;14:00
                    <br />
                    &bull; Заезд до&nbsp;10:00&nbsp;&mdash; +100%
                    от&nbsp;стоимости суток
                    <br />
                    &bull; Заезд с&nbsp;10:00 до&nbsp;14:00&nbsp;&mdash; +50%
                    от&nbsp;стоимости суток
                </>
            ),
        },
        {
            title: "Приятный сюрприз",
            subtitle:
                "Особый формат оформления номера, чтобы ваш визит в Петербург стал не просто поводом, а событием.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/37c26c1c38aff8084c3dfe563c38d9371018eebe.png",
            slug: "surprise",
            fullDescription: (
                <>
                    &bull; 12 воздушных шаров в&nbsp;изысканных
                    оттенках&nbsp;&mdash; для лёгкого и&nbsp;радостного
                    настроения
                    <br />
                    &bull; Бутылка охлаждённого игристого вина
                    <br />
                    &bull; Фруктовая композиция из&nbsp;свежих сезонных фруктов
                    <br />
                    <br />
                    Если у&nbsp;вас будут вопросы или потребуется помощь
                    с&nbsp;заказом&nbsp;&mdash; мы&nbsp;на&nbsp;связи
                    и&nbsp;всегда рады помочь.
                </>
            ),
            price: "5 500 ₽",
        },
        {
            title: "Водная прогулка",
            subtitle:
                "Яхты и катеры для прогулок по рекам и каналам Санкт-Петербурга",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/water.avif",
            externalLink:
                "https://drive.google.com/file/d/1YSkGKD3VBFHNXyLwXAM3OlvkgjllnfTn",
        },
    ],
    en: [
        {
            title: "ACADEMIA Concierge Service",
            subtitle:
                "Our concierge service will free you not only from routine tasks but also immerse you in the era of historicism, allowing you to feel like a real count and princess!",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/concierge.png",
            slug: "concierge",
        },
        {
            title: "Pet-Friendly Stay",
            subtitle:
                "We know how important it is to travel with those you love. At ACADEMIA, your four-legged companions are just as welcome guests.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/677b106d6785c2fc6382a613dc97304ea6050387.jpg",
            slug: "pets",
            fullDescription: (
                <>
                    We happily accept cats and dogs without weight restrictions,
                    but no more than one pet per room. A pet's veterinary
                    passport is required at check-in.
                    <br />
                    We've prepared everything you need:
                    <br />• a comfortable bed,
                    <br /> • bowls for food and water,
                    <br /> • a hygiene kit,
                    <br /> • treats,
                    <br /> • upon request, the concierge can organize dog
                    walking: with care and on schedule.
                    <br />
                    <br />
                    Travel together. We'll take care of everyone's comfort.
                </>
            ),
            price: "2 000 ₽ / night",
            comment:
                "Security deposit: 5 000 ₽ (refundable after room inspection)",
        },
        {
            title: "Executive Transfer",
            subtitle:
                "We offer you an individual transfer without waiting or fuss — with care and attention to detail.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_3137-1.avif",
            slug: "transfer",
        },
        {
            title: "Chef's Breakfast",
            subtitle:
                "Breakfast at ACADEMIA Shuvaloff Bar-Restaurant is not just the first meal, but part of an exquisite and delicious ritual.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/20c4e203934b0b058e0e7ddd774d2fb2a841fdc3.jpg",
            slug: "breakfast",
            fullDescription: (
                <>
                    Specially for hotel guests, brand chef Ilya Kharchenko has
                    created a diverse breakfast menu. It features all the most
                    beloved and winning options: syrniki with strawberry sauce,
                    oatmeal with apple confit, or scramble with truffle and
                    shrimp — everything is prepared with love and attention.
                    <br />
                    If you have any questions or need help with your order — we
                    are here and always happy to help.
                </>
            ),
            links: [
                {
                    label: "Breakfast Menu",
                    href: "https://static.academia.spb.ru/files/%D0%97%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA-%D0%BE%D1%82-%D1%88%D0%B5%D1%84%D0%B0.pdf",
                },
            ],
            price: "1 800 ₽",
            comment:
                "Breakfast serving hours in the boutique restaurant: 8:00 AM to 12:00 PM.",
        },
        {
            title: "ACADEMIA SPA",
            subtitle:
                "We created ACADEMIA SPA for those who value high service standards, self-care, and their inner comfort.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/925be715d60c1f8fa9b77c8c64eedbc37e857989.jpg",
            externalLink: "https://academia-spa.ru/",
        },
        {
            title: "Beauty & Health Devices",
            subtitle:
                "Make your stay even more pleasant — order beauty and health devices from the GESS brand to your room.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/beauty-bar-menu.avif",
            slug: "beauty-bar",
        },
        {
            title: "Flower Bouquet to Room",
            subtitle:
                "A gesture of attention for no reason or for a special moment.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/efc06e02ff905dba3b08435aa4be3aeab0fbe8ce.jpg",
            slug: "bouquet",
            fullDescription: (
                <>
                    We'll be happy to select the perfect bouquet according to
                    your mood and wishes — from delicate classics to expressive
                    compositions.
                    <br />
                    If you have any questions or need help — we're here and
                    always happy to help.
                </>
            ),
            price: "from 10 000 ₽",
        },
        {
            title: "Chef's Dinner",
            subtitle:
                "We are happy to invite you to spend time at ACADEMIA Shuvaloff Bar-Restaurant — a boutique restaurant located in the former office of Count Shuvalov.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/cb49c80b30436e5033eadfc5e2b8d6b3eef8205c.jpg",
            slug: "dinner",
            fullDescription: (
                <>
                    Dinner in this hall is not just a gastronomic experience,
                    but a real journey to another century. In an intimate
                    setting, amidst marble, stucco, and handmade furniture,
                    history comes alive — subtly, sensually, with tact.
                    <br />
                    You'll enjoy classical cuisine dishes from brand chef Ilya
                    Kharchenko and cocktails from Daniil Lehman — exquisite,
                    with a delicate architecture of taste.
                    <br />
                    This time is a tribute to deep taste and the pleasure of
                    being here and now.
                    <br />
                    And a small detail we'd like to warn you about in advance: a
                    light dress code applies in the restaurant — casual &
                    cocktails.
                    <br />
                    If you have any questions or need help with a table
                    reservation — we're here and always happy to help.
                </>
            ),
            links: [
                {
                    label: "Dinner Menu",
                    href: "https://static.academia.spb.ru/files/%D0%9E%D0%B1%D0%B5%D0%B4%20%D0%B8%20%D1%83%D0%B6%D0%B8%D0%BD%20%D0%BE%D1%82%20%D1%88%D0%B5%D1%84%D0%B0.pdf",
                },
                {
                    label: "Bar Card",
                    href: "https://static.academia.spb.ru/files/%D0%9C%D0%B5%D0%BD%D1%8E%20%D0%B1%D0%B0%D1%80%D0%B0%20Shuvaloff.pdf",
                },
            ],
            price: "2 250 ₽",
            comment:
                "Serving hours in the boutique restaurant: 12:00 PM to 10:30 PM.",
        },
        {
            title: "Aristocratic Evening Ruinart",
            subtitle:
                "An exquisite service for a special event — inspired by the era when the House of Ruinart first enchanted the aristocracy.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/mobile_file_2025-09-19_07-33-26-3.avif",
            slug: "ruinart",
            fullDescription: (
                <>
                    Immerse yourself in the atmosphere of the 18th century — an
                    era of grandeur, where every gesture was subtle and every
                    moment significant.
                    <br />A bottle of Ruinart champagne — a symbol of elegance
                    and tradition founded in 1729 by the House of Ruinart.
                    <br />
                    Antipasti collection with light gastronomic combinations.
                    <br />
                    15 heart-shaped balloons — an accent highlighting the
                    solemnity of the moment.
                </>
            ),
            price: "45 000 ₽",
        },
        {
            title: "Birthday Celebration",
            subtitle:
                "A special celebration format at ACADEMIA to make your birthday not just an occasion, but a beautiful, warm, and memorable event.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/02/bar4-1-1.avif",
            slug: "birthday",
            fullDescription: (
                <>
                    &bull; Balloons in exquisite shades — for a light and joyful
                    mood.
                    <br />
                    &bull; HAPPY BIRTHDAY decorative inscription — a subtle
                    accent on detail.
                    <br />
                    &bull; A bottle of chilled sparkling wine — for a toast at
                    the right moment.
                    <br />
                    &bull; Fruit composition from fresh seasonal fruits.
                    <br />
                    &bull; "Apple Pie" dessert from brand chef Ilya Kharchenko.
                    <br />
                    <br />
                    If you have any questions or need help with your order — we
                    are here and always happy to help.
                </>
            ),
            price: "9 000 ₽",
        },
        {
            title: "Chef's Cake",
            subtitle:
                "Author's cake from the brand chef, created according to an individual recipe: from natural ingredients and without compromises on quality.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/cake.avif",
            slug: "cake",
            fullDescription: (
                <>
                    Such a cake is not just a dessert, but the final chord of an
                    important day.
                    <br />
                    Four exquisite options to choose from — from classic
                    Napoleon to Oreo with blueberry cremieux: airy sponge cake,
                    crunchy notes, and a rich blueberry heart.
                    <br />
                    If you have any questions or need help with your order — we
                    are here and always happy to help.
                </>
            ),
            price: "from 3 500 ₽",
            links: [
                {
                    label: "Cake Collection",
                    href: "https://static.academia.spb.ru/files/chef-cake.pdf",
                },
            ],
        },
        {
            title: "Pillow Menu",
            subtitle:
                "We understand how important quality sleep is. Therefore, we offer a choice of pillows with different fillings — for perfect comfort.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/713adf1b0e6e935c524fc580d30892f328630057.jpg",
            slug: "pillows",
            fullDescription: (
                <>
                    The guest relations manager will be happy to tell you what
                    options are available and help you choose the one that suits
                    you best.
                    <br />
                    If you have any questions or need help with your choice — we
                    are here and always happy to help.
                </>
            ),
            price: "free of charge",
            links: [
                {
                    label: "Pillow Menu",
                    href: "https://static.academia.spb.ru/files/pillow-menu.pdf",
                },
            ],
        },
        {
            title: "Late Check-out",
            subtitle:
                "Plan your time as it suits you best, and we'll adapt to your rhythm. Please inform us in advance of your preferences.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/01d9eae6eceabd4c20d6304e8502e38b55cda58e.jpg",
            slug: "late-checkout",
            fullDescription: (
                <>
                    To arrange a late check-out, contact the reservations
                    department or add the desired check-out time during the
                    second step of booking on the official website — the cost
                    will be calculated automatically.
                    <br />
                    <br />
                    Standard check-out time: until 12:00 PM
                    <br />
                    &bull; Check-out until 6:00 PM — +50% of the daily rate.
                    <br />
                    &bull; Check-out after 6:00 PM — +100% of the daily rate.
                </>
            ),
        },
        {
            title: "Chef's Lunch",
            subtitle:
                "We are happy to invite you to spend time at ACADEMIA Shuvaloff Bar-Restaurant — a boutique restaurant located in the former office of Count Shuvalov.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/%D0%A1%D1%83%D0%BF%D1%8B%D0%9E%D1%82%D0%A8%D0%B5%D1%84%D0%B0-1.avif",
            slug: "lunch",
            fullDescription: (
                <>
                    Lunch in this hall is not just a gastronomic experience, but
                    a real journey to another century. In an intimate setting,
                    amidst marble, stucco, and handmade furniture, history comes
                    alive — subtly, sensually, with tact.
                    <br />
                    You'll enjoy classical cuisine dishes from brand chef Ilya
                    Kharchenko and cocktails from Daniil Lehman — exquisite,
                    with a delicate architecture of taste.
                    <br />
                    This time is a tribute to deep taste and the pleasure of
                    being here and now.
                    <br />
                    And a small detail we'd like to warn you about in advance: a
                    light dress code applies in the restaurant — casual &
                    cocktails.
                    <br />
                    If you have any questions or need help with a table
                    reservation — we're here and always happy to help.
                </>
            ),
            links: [
                {
                    label: "Lunch Menu",
                    href: "https://static.academia.spb.ru/files/%D0%9E%D0%B1%D0%B5%D0%B4%20%D0%B8%20%D1%83%D0%B6%D0%B8%D0%BD%20%D0%BE%D1%82%20%D1%88%D0%B5%D1%84%D0%B0.pdf",
                },
                {
                    label: "Bar Card",
                    href: "https://static.academia.spb.ru/files/%D0%9C%D0%B5%D0%BD%D1%8E%20%D0%B1%D0%B0%D1%80%D0%B0%20Shuvaloff.pdf",
                },
            ],
            price: "2 250 ₽",
            comment:
                "Serving hours in the boutique restaurant: 12:00 PM to 10:30 PM.",
        },
        {
            title: "Luggage Storage",
            subtitle:
                "We are happy to take care of your luggage on the day of arrival and departure.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/IMG_2163.avif",
            slug: "luggage",
            fullDescription: (
                <>
                    We are happy to take care of your luggage on your arrival
                    and departure days. Walk around the city, do your business,
                    or simply enjoy your free time without worrying about your
                    things.
                    <br />
                    This service does not need to be booked in advance. If you
                    have any questions or need help — we're here and always
                    happy to help.
                </>
            ),
            price: "free of charge",
        },
        {
            title: "Excursion 'In the Times of Count Shuvalov'",
            subtitle: "Individual excursion for a group of up to 4 people.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/10/exc-shuvaloff.avif",
            slug: "history-trip",
            fullDescription: (
                <>
                    Immerse yourself in the history of St. Petersburg: an
                    elegant Mercedes will take you to one of the most beautiful
                    mansions on the Fontanka Embankment. A walk through the
                    ceremonial halls of the Shuvalov Palace, which houses the
                    Faberge Museum, awaits you, where you'll get to know its
                    legends and secrets, and enjoy an exquisite tea party with a
                    dessert inspired by the work of Carl Faberge. The day
                    concludes with a return to the hotel by VIP transfer,
                    keeping unforgettable impressions of a day spent surrounded
                    by history and beauty.
                </>
            ),
            price: "10 500 ₽",
        },
        {
            title: "Welcome Set to Room",
            subtitle: "Allow your stay to begin with a special touch.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/638720452918249784-db5c3134-880f-41e0-8487-575e96be39ef-1.avif",
            slug: "welcome-set",
            fullDescription: (
                <>
                    ACADEMIA WELCOME SET — a bottle of exquisite sparkling wine
                    and a choice of — a fresh fruit plate, composed according to
                    seasonality, or an antipasti collection with light
                    gastronomic combinations. The perfect prologue to your stay,
                    setting a delicate mood for the evening.
                    <br />
                    <br />
                    <i>
                        Welcome set with sparkling wine and rose petals — 2 500
                        ₽
                        <br />
                        Welcome set with sparkling wine and fruit plate — 3 500
                        ₽
                        <br />
                        Welcome set with sparkling wine and antipasti — 4 500 ₽
                    </i>
                </>
            ),
        },
        {
            title: "Romantic Evening for Two",
            subtitle:
                "A special room decoration format for those who value not only travel but also feelings.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/12/IMG_0162-2-1.avif",
            slug: "romantic",
            fullDescription: (
                <>
                    To make your visit to St. Petersburg not just a romantic
                    escape, but a moment you'll want to remember — for a long
                    time, tenderly, and with a smile.
                    <br />
                    &bull; Heart-shaped balloons.
                    <br />
                    &bull; Antipasti or a large fruit plate.
                    <br />
                    &bull; A bottle of chilled sparkling wine.
                    <br />
                    &bull; Candles to create an atmosphere.
                    <br />
                    &bull; If you have any questions or need help with your
                    order — we are here and always happy to help.
                </>
            ),
            price: "10 000 ₽",
        },
        {
            title: "Traveling with Children",
            subtitle: "Come visit us with the whole family!",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/1fb679af26b0660b3995ee5ffe668aca8196c3dd-1.avif",
            slug: "kids",
            fullDescription: (
                <>
                    We happily welcome children of any age, and children up to 3
                    years inclusive stay with us free of charge. We have
                    prepared special robes and slippers for all children — just
                    like for adults.
                    <br />
                    For toddlers up to 3 years old, we provide a baby cot and,
                    if necessary, a playpen upon request free of charge. After 3
                    years, children are accommodated on sofa beds in the rooms
                    where provided.
                    <br />
                    We provide a step for the sink, a child toilet seat, and a
                    high chair upon request.
                    <br />
                    And to make your child's stay even more comfortable,
                    consider our additional offer: a child's kit created with
                    love for the little guests of our hotel.
                    <br />
                    <br />
                    The kit includes:
                    <br />
                    &bull; Academishka soft toy — the perfect companion for your
                    child during their stay at the hotel. It's made of
                    high-quality materials and has passed strict safety tests,
                    so you can play and hug it without worry;
                    <br />
                    &bull; A set of children's cosmetics specially created for
                    the sensitive skin of little ones. It includes:
                    shampoo-conditioner, shower gel, body lotion, a refreshing
                    wipe, and soap. All products are based on natural
                    ingredients and are safe for children.
                </>
            ),
            price: "3 500 ₽",
        },
        {
            title: "Early Check-in",
            subtitle: "Plan your time as it suits you best.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/f985ce27a1e8c0fc23d3f9ecceb8a43016565c4a.jpg",
            slug: "early-checkin",
            fullDescription: (
                <>
                    Plan your time as it suits you best, and we'll adapt to your
                    rhythm. Please inform us in advance of your preferences.
                    <br />
                    To arrange an early check-in, contact the reservations
                    department or add the desired check-in time during the
                    second step of booking on the official website — the cost
                    will be calculated automatically.
                    <br />
                    <br />
                    Standard check-in time: from 2:00 PM
                    <br />
                    &bull; Check-in before 10:00 AM — +100% of the daily rate.
                    <br />
                    &bull; Check-in between 10:00 AM and 2:00 PM — +50% of the
                    daily rate.
                </>
            ),
        },
        {
            title: "Pleasant Surprise",
            subtitle:
                "A special room decoration format to make your visit to St. Petersburg not just an occasion, but an event.",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/37c26c1c38aff8084c3dfe563c38d9371018eebe.png",
            slug: "surprise",
            fullDescription: (
                <>
                    &bull; 12 balloons in exquisite shades — for a light and
                    joyful mood.
                    <br />
                    &bull; A bottle of chilled sparkling wine.
                    <br />
                    &bull; Fruit composition from fresh seasonal fruits.
                    <br />
                    <br />
                    If you have any questions or need help with your order — we
                    are here and always happy to help.
                </>
            ),
            price: "5 500 ₽",
        },
        {
            title: "Water Walk",
            subtitle:
                "Yachts and boats for trips along the rivers and canals of St. Petersburg",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2025/09/water.avif",
            externalLink:
                "https://drive.google.com/file/d/1YSkGKD3VBFHNXyLwXAM3OlvkgjllnfTn",
        },
    ],
};
