import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/routing";

/**
 * Описание мероприятия. Одно мероприятие может проходить в несколько дат —
 * каждая дата разворачивается в отдельную карточку на странице афиши.
 *
 * `dates` — локальное время в формате ISO без таймзоны: "YYYY-MM-DDTHH:mm".
 * Хранится структурированно (не строкой), чтобы позже отдавать в календарь.
 *
 * `slug` — адрес индивидуальной страницы (`/events/<slug>/`).
 * `bookingUrl` — собственная ссылка бронирования кнопки на этой странице.
 *
 * `published` — флаг видимости. `false` полностью скрывает мероприятие:
 * нет карточки в афише, нет своей страницы (404), нет в sitemap и календаре.
 * Отсутствие поля = опубликовано (по умолчанию `true`), чтобы не помечать
 * каждое активное мероприятие вручную.
 */
export type EventDefinition = {
    slug: string;
    title: string;
    subtitle: string;
    imgUrl: string;
    mediaObjectPosition?: string;
    bookingUrl: string;
    fullDescription?: ReactNode;
    price?: string;
    dates: string[];
    published?: boolean;
};

/** Одна карточка = одно мероприятие в конкретную дату. */
export type EventCard = Omit<EventDefinition, "dates"> & {
    /** Исходная дата в ISO ("YYYY-MM-DDTHH:mm") — для сортировки и календаря. */
    start: string;
    /** Готовая подпись даты, напр. "1 июля". */
    dateLabel: string;
    /** Готовая подпись времени, напр. "17:00". */
    timeLabel: string;
};

// Общий «хвост» для исторических лекций (одинаков во всех трёх).
const LectureOutroRu = (
    <>
        Бар-ресторан ACADEMIA Шувалова приглашает гостей на&nbsp;исторические
        ужины в&nbsp;зале особняка. Вечер объединяет авторскую кухню
        и&nbsp;лекцию об&nbsp;истории Петербурга, позволяя провести ужин
        в&nbsp;атмосфере настоящего дворянского салона XIX&nbsp;века.
        <br />
        <br />
        Проводит встречи Анна Алексеевна&nbsp;&mdash; Хранительница архива
        Шуваловых. Согласно легенде особняка, она&nbsp;исследует семейный архив
        графского рода и&nbsp;делится найденными историями о&nbsp;жизни
        петербургской аристократии, архитектуре города и&nbsp;светских традициях
        прошлых столетий.
        <br />
        <br />
        Для гостей, проживающих в&nbsp;отелях коллекции ACADEMIA, посещение
        мероприятия бесплатно.
    </>
);

const LectureOutroEn = (
    <>
        ACADEMIA Shuvaloff Bar-Restaurant invites guests to&nbsp;historical
        dinners in&nbsp;the mansion's hall. The&nbsp;evening combines signature
        cuisine and&nbsp;a&nbsp;lecture on&nbsp;the history of&nbsp;Saint
        Petersburg, letting you dine in&nbsp;the atmosphere of&nbsp;a&nbsp;true
        19th-century aristocratic salon.
        <br />
        <br />
        The&nbsp;gatherings are hosted by&nbsp;Anna Alekseevna&nbsp;&mdash;
        Keeper of&nbsp;the Shuvalov archive. According to&nbsp;the mansion's
        legend, she&nbsp;studies the count family's archive and&nbsp;shares
        discovered stories about the life of&nbsp;the Petersburg aristocracy,
        the city's architecture, and&nbsp;the social traditions
        of&nbsp;centuries past.
        <br />
        <br />
        For guests staying at&nbsp;ACADEMIA collection hotels, attendance
        is&nbsp;free of&nbsp;charge.
    </>
);

const BaseEvents: Record<Locale, EventDefinition[]> = {
    ru: [
        {
            slug: "one-night-in-petersburg-1899",
            title: "Лекция от историка: «Одна ночь в Петербурге 1899 года»",
            subtitle:
                "Путешествие в мир балов, светского этикета и дворянских традиций конца XIX века",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/Одна-ночь-в-Петербурге-1899.png",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/one-night?utm_campaign=hotel&utm_term=lecture",
            fullDescription: (
                <>
                    «Одна ночь в&nbsp;Петербурге 1899 года»&nbsp;&mdash;
                    путешествие в&nbsp;мир балов, светского этикета
                    и&nbsp;дворянских традиций конца XIX&nbsp;века, основанное
                    на&nbsp;мемуарах, дневниках и&nbsp;произведениях русской
                    классики.
                    <br />
                    <br />
                    {LectureOutroRu}
                </>
            ),
            dates: ["2026-07-09T19:00", "2026-07-30T19:00"],
        },
        {
            slug: "masonic-petersburg",
            title: "Лекция от историка: «Масонский Петербург XIX века: тайные общества, символы и мифы»",
            subtitle:
                "История масонских лож, их символики и легенд, которыми до сих пор окутан город",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/Масонский-Петербург.png",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/masonskij-peterburg?utm_campaign=hotel&utm_term=lecture",
            fullDescription: (
                <>
                    «Масонский Петербург XIX&nbsp;века: тайные общества, символы
                    и&nbsp;мифы»&nbsp;&mdash; история масонских лож, их&nbsp;
                    символики, влияния на&nbsp;Петербург и&nbsp;легенд, которыми
                    до&nbsp;сих пор окутан город.
                    <br />
                    <br />
                    {LectureOutroRu}
                </>
            ),
            dates: ["2026-07-16T19:00"],
        },
        {
            slug: "income-house",
            title: "Лекция от историка: «Как был устроен доходный дом и его экономика»",
            subtitle:
                "Как доходные дома формировали облик Петербурга и отражали социальную иерархию города",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/Доходный-дом.png",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/dohodnyi-dom?utm_campaign=hotel&utm_term=lecture",
            fullDescription: (
                <>
                    «Как был устроен доходный дом и&nbsp;его
                    экономика»&nbsp;&mdash; рассказ о&nbsp;том, как доходные
                    дома формировали облик Петербурга, отражали социальную
                    иерархию города и&nbsp;становились символом своего времени.
                    <br />
                    <br />
                    {LectureOutroRu}
                </>
            ),
            dates: ["2026-07-23T19:00"],
        },
        {
            slug: "comb-painting",
            title: "Роспись гребня с графиней",
            subtitle:
                "Творческий мастер-класс росписи гребня под руководством художницы с гастрономическим сопровождением",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/Роспись-Афиша.png",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/rospis-grebney?utm_campaign=hotel&utm_term=lecture",
            price: "7 500 ₽",
            fullDescription: (
                <>
                    Под руководством художницы гости распишут гребень-расческу,
                    превращая её&nbsp;в&nbsp;авторский аксессуар. Формат
                    подойдёт каждому&nbsp;&mdash; и&nbsp;тем, кто впервые
                    пробует себя в&nbsp;живописи, и&nbsp;тем, кто уже знаком
                    с&nbsp;декоративными техниками. В&nbsp;процессе работы
                    графиня поделится историями своего рода и&nbsp;создаст
                    атмосферу настоящего светского приёма.
                    <br />
                    <br />
                    Творческую часть дополнит гастрономическое сопровождение:
                    гостям подадут сет на&nbsp;выбор&nbsp;&mdash; мясной или
                    рыбный. Каждый включает закуску, горячее блюдо
                    и&nbsp;напиток, а&nbsp;сам мастер-класс начнётся
                    с&nbsp;приветственного бокала вина.
                    <br />
                    <br />
                    <b>Стоимость: 7 500 ₽</b>
                    <br />
                    <br />
                    <b>В&nbsp;стоимость входит:</b>
                    <br />• сопровождение профессионального художника
                    <br />• материалы для мастер-класса: гребень и&nbsp;краски
                    <br />• welcome бокал вина
                    <br />• сет на&nbsp;выбор с&nbsp;закуской, горячим
                    и&nbsp;напитком
                </>
            ),
            dates: ["2026-07-18T14:00"],
        },
        {
            slug: "count-dinner-benois",
            title: "Графский ужин с семьёй Бенуа",
            subtitle:
                "Камерный гастрономический вечер в ACADEMIA особняке Шувалова",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/Графский-ужин_1-1-scaled.avif",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/uzhin-u-grafa?utm_campaign=hotel&utm_term=benua",
            price: "9 500 ₽",
            fullDescription: (
                <>
                    Бар-ресторан ACADEMIA Шувалова приглашает гостей
                    на&nbsp;особенный Графский ужин&nbsp;&mdash; камерный вечер
                    в&nbsp;историческом особняке, который объединит гастрономию,
                    живое общение и&nbsp;историю двух известных дворянских
                    родов. Гостей вечера встретит Граф Шувалов,
                    а&nbsp;специальной гостьей станет Анастасия Олеговна
                    Мурзина-Бенуа&nbsp;&mdash; директор Музея-квартиры
                    Л.&nbsp;Н.&nbsp;Бенуа и&nbsp;праправнучка выдающегося
                    архитектора Леонтия Николаевича Бенуа.
                    <br />
                    <br />
                    В&nbsp;этот вечер гости соберутся за&nbsp;одним столом
                    в&nbsp;формате закрытого дворянского салона. Вместе
                    с&nbsp;Графом Шуваловым и&nbsp;представительницей семьи
                    Бенуа они станут участниками неспешной беседы
                    о&nbsp;дворянской культуре Петербурга XIX&nbsp;века.
                    Анастасия Олеговна расскажет историю семьи
                    Бенуа&nbsp;&mdash; от&nbsp;приезда основателя рода
                    в&nbsp;Россию в&nbsp;конце XVIII&nbsp;века до&nbsp;получения
                    дворянства, расцвета семьи и&nbsp;её вклада
                    в&nbsp;архитектуру и&nbsp;культуру Санкт-Петербурга. Это
                    не&nbsp;лекция в&nbsp;привычном смысле, а&nbsp;живая беседа,
                    наполненная семейными историями, архивными фактами
                    и&nbsp;личными воспоминаниями.
                    <br />
                    <br />
                    Гастрономическим сопровождением вечера станет ужин
                    из&nbsp;четырёх курсов. Гостей ждут закуски в&nbsp;стол
                    с&nbsp;бокалом игристого, авторская мимоза с&nbsp;угрем
                    и&nbsp;вишнёвой наливкой, каре ягнёнка по-дворянски
                    с&nbsp;коктейлем «Русский акцент», а&nbsp;завершит вечер
                    медовик на&nbsp;гречишном меду в&nbsp;сопровождении коктейля
                    «Жжёнка». Каждый курс продолжает историю вечера, объединяя
                    гастрономические традиции дворянской России
                    с&nbsp;современным авторским взглядом.
                    <br />
                    <br />
                    <b>Стоимость: 9 500 ₽</b>
                    <br />
                    <br />
                    В&nbsp;стоимость входит курсовой ужин и&nbsp;участие
                    в&nbsp;программе.
                </>
            ),
            dates: ["2026-07-24T19:00"],
        },
    ],
    en: [
        {
            slug: "one-night-in-petersburg-1899",
            title: 'Historian\'s lecture: "One night in Saint Petersburg, 1899"',
            subtitle:
                "A journey into the world of balls, high-society etiquette, and noble traditions of the late 19th century",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/Одна-ночь-в-Петербурге-1899.png",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/one-night?utm_campaign=hotel&utm_term=lecture",
            fullDescription: (
                <>
                    "One night in Saint Petersburg, 1899"&nbsp;&mdash;
                    a&nbsp;journey into the world of&nbsp;balls, high-society
                    etiquette, and&nbsp;noble traditions of&nbsp;the late
                    19th&nbsp;century, based on&nbsp;memoirs, diaries,
                    and&nbsp;works of&nbsp;Russian classics.
                    <br />
                    <br />
                    {LectureOutroEn}
                </>
            ),
            dates: ["2026-07-09T19:00", "2026-07-30T19:00"],
        },
        {
            slug: "masonic-petersburg",
            title: 'Historian\'s lecture: "Masonic Petersburg of the 19th century: secret societies, symbols, and myths"',
            subtitle:
                "The history of Masonic lodges, their symbolism, and the legends that still shroud the city",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/Масонский-Петербург.png",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/masonskij-peterburg?utm_campaign=hotel&utm_term=lecture",
            fullDescription: (
                <>
                    "Masonic Petersburg of&nbsp;the 19th&nbsp;century: secret
                    societies, symbols, and&nbsp;myths"&nbsp;&mdash; the history
                    of&nbsp;Masonic lodges, their symbolism, their influence
                    on&nbsp;Petersburg, and&nbsp;the legends that still shroud
                    the city.
                    <br />
                    <br />
                    {LectureOutroEn}
                </>
            ),
            dates: ["2026-07-16T19:00"],
        },
        {
            slug: "income-house",
            title: 'Historian\'s lecture: "How the tenement house worked and its economy"',
            subtitle:
                "How tenement houses shaped the look of Petersburg and reflected the city's social hierarchy",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/Доходный-дом.png",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/dohodnyi-dom?utm_campaign=hotel&utm_term=lecture",
            fullDescription: (
                <>
                    "How the tenement house worked and&nbsp;its
                    economy"&nbsp;&mdash; a&nbsp;story of&nbsp;how tenement
                    houses shaped the look of&nbsp;Petersburg, reflected the
                    city's social hierarchy, and&nbsp;became a&nbsp;symbol
                    of&nbsp;their time.
                    <br />
                    <br />
                    {LectureOutroEn}
                </>
            ),
            dates: ["2026-07-23T19:00"],
        },
        {
            slug: "comb-painting",
            title: "Comb painting with the countess",
            subtitle:
                "A creative comb-painting masterclass led by an artist, with a gastronomic accompaniment",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/07/Роспись-Афиша.png",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/rospis-grebney?utm_campaign=hotel&utm_term=lecture",
            price: "7 500 ₽",
            fullDescription: (
                <>
                    Under the guidance of&nbsp;an artist, guests will paint
                    a&nbsp;comb, turning it&nbsp;into a&nbsp;signature
                    accessory. The&nbsp;format suits everyone&nbsp;&mdash; both
                    those trying painting for the first time and&nbsp;those
                    already familiar with decorative techniques. During the
                    work, the countess will share stories of&nbsp;her lineage
                    and&nbsp;create the atmosphere of&nbsp;a&nbsp;true
                    high-society reception.
                    <br />
                    <br />
                    The&nbsp;creative part is&nbsp;complemented by&nbsp;a&nbsp;
                    gastronomic accompaniment: guests are served a&nbsp;set
                    of&nbsp;their choice&nbsp;&mdash; meat or&nbsp;fish. Each
                    includes a&nbsp;starter, a&nbsp;main course, and&nbsp;
                    a&nbsp;drink, and&nbsp;the masterclass itself begins with
                    a&nbsp;welcome glass of&nbsp;wine.
                    <br />
                    <br />
                    <b>Price: 7 500 ₽</b>
                    <br />
                    <br />
                    <b>The price includes:</b>
                    <br />• the guidance of&nbsp;a&nbsp;professional artist
                    <br />• masterclass materials: a&nbsp;comb and&nbsp;paints
                    <br />• a&nbsp;welcome glass of&nbsp;wine
                    <br />• a&nbsp;set of&nbsp;your choice with a&nbsp;starter,
                    main course, and&nbsp;drink
                </>
            ),
            dates: ["2026-07-18T14:00"],
        },
        {
            slug: "count-dinner-benois",
            title: "Count's Dinner with the Benois Family",
            subtitle:
                "An intimate gastronomic evening at ACADEMIA Shuvaloff Mansion",
            imgUrl: "https://academia.spb.ru/wp-content/uploads/2026/03/Графский-ужин_1-1-scaled.avif",
            bookingUrl:
                "https://shuvaloff.academia-rest.ru/afisha/uzhin-u-grafa?utm_campaign=hotel&utm_term=benua",
            price: "9 500 ₽",
            fullDescription: (
                <>
                    ACADEMIA Shuvaloff Bar-Restaurant invites guests
                    to&nbsp;a&nbsp;special Count's Dinner&nbsp;&mdash;
                    an&nbsp;intimate evening in&nbsp;the historic mansion that
                    brings together gastronomy, live conversation, and&nbsp;the
                    history of&nbsp;two renowned noble families. Guests will
                    be&nbsp;greeted by&nbsp;Count Shuvalov, and&nbsp;the special
                    guest will be&nbsp;Anastasia Olegovna
                    Murzina-Benois&nbsp;&mdash; director of&nbsp;the
                    L.&nbsp;N.&nbsp;Benois Museum-Apartment and&nbsp;the
                    great-great-granddaughter of&nbsp;the outstanding architect
                    Leonty Nikolaevich Benois.
                    <br />
                    <br />
                    This evening, guests will gather around a&nbsp;single table
                    in&nbsp;the format of&nbsp;a&nbsp;private aristocratic
                    salon. Together with Count Shuvalov
                    and&nbsp;a&nbsp;representative of&nbsp;the Benois family,
                    they will take part in&nbsp;an&nbsp;unhurried conversation
                    about the noble culture of&nbsp;19th-century
                    St.&nbsp;Petersburg. Anastasia Olegovna will tell the story
                    of&nbsp;the Benois family&nbsp;&mdash; from the arrival
                    of&nbsp;the family's founder in&nbsp;Russia at&nbsp;the end
                    of&nbsp;the 18th century to&nbsp;their ennoblement, the
                    family's flourishing, and&nbsp;its contribution to&nbsp;the
                    architecture and&nbsp;culture of&nbsp;St.&nbsp;Petersburg.
                    This is&nbsp;not a&nbsp;lecture in&nbsp;the usual sense, but
                    a&nbsp;lively conversation filled with family stories,
                    archival facts, and&nbsp;personal recollections.
                    <br />
                    <br />
                    The&nbsp;gastronomic accompaniment of&nbsp;the evening will
                    be&nbsp;a&nbsp;four-course dinner. Guests can look forward
                    to&nbsp;shared starters with a&nbsp;glass of&nbsp;sparkling
                    wine, a&nbsp;signature mimosa with eel and&nbsp;cherry
                    liqueur, rack of&nbsp;lamb in&nbsp;the noble style with the
                    &laquo;Russian Accent&raquo; cocktail, and&nbsp;the evening
                    will conclude with a&nbsp;medovik honey cake made with
                    buckwheat honey, accompanied by&nbsp;the
                    &laquo;Zhzhenka&raquo; cocktail. Each course continues the
                    story of&nbsp;the evening, blending the gastronomic
                    traditions of&nbsp;noble Russia with a&nbsp;modern signature
                    perspective.
                    <br />
                    <br />
                    <b>Price: 9 500 ₽</b>
                    <br />
                    <br />
                    The&nbsp;price includes a&nbsp;course dinner
                    and&nbsp;participation in&nbsp;the program.
                </>
            ),
            dates: ["2026-07-24T19:00"],
        },
    ],
};

/**
 * Дубли мероприятий: полная копия исходной карточки (фото, текст, название),
 * но со своей ссылкой бронирования и своими датами. Даты этих дублей вынесены
 * из оригиналов выше, чтобы не задваиваться в афише.
 *
 * `baseSlug` — какое мероприятие клонировать; `slug` — адрес страницы копии;
 * `bookingUrl` — ссылка кнопки «Забронировать»; `dates` — даты копии.
 * Клонирование программное, чтобы контент оставался идентичным оригиналу.
 */
const EVENT_DUPLICATES: {
    baseSlug: string;
    slug: string;
    bookingUrl: string;
    dates: string[];
}[] = [
    {
        baseSlug: "masonic-petersburg",
        slug: "masonic-petersburg-august",
        bookingUrl:
            "https://shuvaloff.academia-rest.ru/afisha/masonskij-peterburg-august",
        dates: ["2026-08-06T19:00", "2026-08-27T19:00"],
    },
    {
        baseSlug: "income-house",
        slug: "income-house-august",
        bookingUrl:
            "https://shuvaloff.academia-rest.ru/afisha/dohodnyi-dom-august",
        dates: ["2026-08-13T19:00"],
    },
    {
        baseSlug: "one-night-in-petersburg-1899",
        slug: "one-night-in-petersburg-1899-august",
        bookingUrl:
            "https://shuvaloff.academia-rest.ru/afisha/one-night-august",
        dates: ["2026-08-20T19:00"],
    },
];

/** Достраивает список локали дублями из EVENT_DUPLICATES. */
function withDuplicates(locale: Locale): EventDefinition[] {
    const base = BaseEvents[locale];
    const dups = EVENT_DUPLICATES.map(
        ({ baseSlug, slug, bookingUrl, dates }) => {
            const original = base.find((event) => event.slug === baseSlug);
            if (!original) {
                throw new Error(
                    `EVENT_DUPLICATES: базовое мероприятие "${baseSlug}" не найдено`,
                );
            }
            return { ...original, slug, bookingUrl, dates };
        },
    );
    return [...base, ...dups];
}

export const AllEvents: Record<Locale, EventDefinition[]> = {
    ru: withDuplicates("ru"),
    en: withDuplicates("en"),
};

const MONTHS: Record<Locale, string[]> = {
    ru: [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ],
    en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
};

/** Разбирает "YYYY-MM-DDTHH:mm" в подписи даты/времени без учёта таймзоны. */
function formatOccurrence(start: string, locale: Locale) {
    const [datePart, timePart = "00:00"] = start.split("T");
    const [, month, day] = datePart.split("-").map(Number);
    const dateLabel = `${day} ${MONTHS[locale][month - 1]}`;
    return { dateLabel, timeLabel: timePart };
}

/**
 * Опубликованные мероприятия локали — единая точка фильтрации по `published`.
 * Все публичные списки (афиша, календарь, sitemap, generateStaticParams)
 * должны идти через неё, а не читать `AllEvents` напрямую.
 */
export function getPublishedEvents(locale: Locale): EventDefinition[] {
    return AllEvents[locale].filter((event) => event.published !== false);
}

/**
 * Разворачивает мероприятия в карточки (по одной на дату) и сортирует
 * по возрастанию даты — от ближних к дальним.
 */
export function getEventCards(locale: Locale): EventCard[] {
    const cards = getPublishedEvents(locale).flatMap(({ dates, ...event }) =>
        dates.map((start) => ({
            ...event,
            start,
            ...formatOccurrence(start, locale),
        })),
    );

    return cards.sort((a, b) => a.start.localeCompare(b.start));
}

/** Одна дата проведения с готовыми подписями. */
export type EventOccurrence = {
    start: string;
    dateLabel: string;
    timeLabel: string;
};

/**
 * Разворачивает `dates` мероприятия в подписи дата/время и сортирует
 * по возрастанию. Фильтрация прошедших — на стороне вызова (в рантайме),
 * чтобы статическая сборка не «замораживала» результат.
 */
export function getEventOccurrences(
    dates: string[],
    locale: Locale,
): EventOccurrence[] {
    return dates
        .map((start) => ({ start, ...formatOccurrence(start, locale) }))
        .sort((a, b) => a.start.localeCompare(b.start));
}

/** Опубликованное мероприятие по slug (или undefined). */
export function getEventBySlug(
    locale: Locale,
    slug: string,
): EventDefinition | undefined {
    return getPublishedEvents(locale).find((event) => event.slug === slug);
}
