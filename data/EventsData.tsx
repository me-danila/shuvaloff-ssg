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

export const AllEvents: Record<Locale, EventDefinition[]> = {
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
            dates: ["2026-07-09T19:00", "2026-07-30T19:00", "2026-08-20T19:00"],
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
            dates: ["2026-07-16T19:00", "2026-08-06T19:00", "2026-08-27T19:00"],
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
            dates: ["2026-07-23T19:00", "2026-08-13T19:00"],
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
                    В&nbsp;стоимость входит:
                    <br />• сопровождение профессионального художника
                    <br />• материалы для мастер-класса: гребень и&nbsp;краски
                    <br />• welcome бокал вина
                    <br />• сет на&nbsp;выбор с&nbsp;закуской, горячим
                    и&nbsp;напитком
                </>
            ),
            dates: ["2026-07-18T14:00"],
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
            dates: ["2026-07-09T19:00", "2026-07-30T19:00", "2026-08-20T19:00"],
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
            dates: ["2026-07-16T19:00", "2026-08-06T19:00", "2026-08-27T19:00"],
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
            dates: ["2026-07-23T19:00", "2026-08-13T19:00"],
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
                    The price includes:
                    <br />• the guidance of&nbsp;a&nbsp;professional artist
                    <br />• masterclass materials: a&nbsp;comb and&nbsp;paints
                    <br />• a&nbsp;welcome glass of&nbsp;wine
                    <br />• a&nbsp;set of&nbsp;your choice with a&nbsp;starter,
                    main course, and&nbsp;drink
                </>
            ),
            dates: ["2026-07-18T14:00"],
        },
    ],
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
 * Разворачивает мероприятия в карточки (по одной на дату) и сортирует
 * по возрастанию даты — от ближних к дальним.
 */
export function getEventCards(locale: Locale): EventCard[] {
    const cards = AllEvents[locale].flatMap(({ dates, ...event }) =>
        dates.map((start) => ({
            ...event,
            start,
            ...formatOccurrence(start, locale),
        })),
    );

    return cards.sort((a, b) => a.start.localeCompare(b.start));
}

/** Мероприятие по slug (или undefined). */
export function getEventBySlug(
    locale: Locale,
    slug: string,
): EventDefinition | undefined {
    return AllEvents[locale].find((event) => event.slug === slug);
}

/** Даты мероприятия с готовыми подписями, отсортированные по возрастанию. */
export function getEventOccurrences(event: EventDefinition, locale: Locale) {
    return [...event.dates]
        .sort((a, b) => a.localeCompare(b))
        .map((start) => ({ start, ...formatOccurrence(start, locale) }));
}
