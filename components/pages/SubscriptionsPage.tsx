import type { ReactNode } from "react";
import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { BedIcon, SquareIcon, UserIcon } from "@/components/ui/icons";
import { FadeUp } from "@/components/ui/Motion";
import ImageGallerySlider from "@/components/ui/slider/ImageGallerySlider";
import { AllRooms } from "@/data/RoomsData";
import type { Locale } from "@/lib/i18n/routing";

type SubscriptionsCopy = {
    title: ReactNode;
    intro: ReactNode;
    chooseLabel: string;
    detailsLabel: string;
    tariffLabel: string;
    perNightLabel: string;
    tariffNotice: string;
    rulesTitle: string;
    rulesDescription: Array<{
        id: string;
        content: ReactNode;
    }>;
    rulesButton: string;
};

type SubscriptionExtraItem = {
    title: string;
    description: ReactNode;
    bookingHref: string;
    ctaLabel?: string;
    priceTotal: string;
    pricePerNight: string;
};

type SubscriptionGalleryImage = {
    src: string;
    alt: string;
};

type SubscriptionRoomExtra = {
    roomSlug: string;
    gallery: SubscriptionGalleryImage[];
    items: SubscriptionExtraItem[];
};

const copyByLocale: Record<Locale, SubscriptionsCopy> = {
    ru: {
        title: <>Деловой абонемент на&nbsp;проживание в&nbsp;отеле</>,
        intro: (
            <>
                Единый абонемент на несколько проживаний по фиксированной цене с
                гибкими датами заезда.
                <br />
                Специально для гостей, которые часто приезжают в командировки —
                удобное решение «Деловой абонемент». Деловой абонемент — это
                единое бронирование на 10 – 15 ночей, при котором вы сами
                решаете, когда и как распределить проживание. Абонемент доступен
                для проживания в категориях Супериор и Полулюкс.
            </>
        ),
        chooseLabel: "ЗАБРОНИРОВАТЬ",
        detailsLabel: "Подробнее о номере",
        perNightLabel: " за ночь",
        tariffLabel: "Количество ночей",
        tariffNotice:
            "* за исключением пиковых дат и праздничных календарных выходных",
        rulesTitle: "Правила использования «Делового абонемента»",
        rulesDescription: [
            {
                id: "buyer",
                content:
                    "Абонемент может приобрести физическое или юридическое лицо;",
            },
            {
                id: "prepayment",
                content:
                    "При бронировании абонемента необходимо оплатить 100% от его стоимости;",
            },
            {
                id: "expiration",
                content:
                    "После истечения указанного срока абонемент становится недействительным;",
            },
            {
                id: "period",
                content:
                    "Период действия абонемента: октябрь 2026 — март 2027, за исключением пиковых дат и праздничных календарных выходных. Перечень пиковых дат установлен средством размещения;",
            },
            {
                id: "direct-booking",
                content:
                    "Абонемент можно использовать только при бронировании без посредников;",
            },
            {
                id: "availability",
                content:
                    "Воспользоваться абонементом можно при наличии свободных номеров в выбранные даты в указанной категории номера;",
            },
            {
                id: "booking-contact",
                content: (
                    <>
                        Узнать о наличии свободных номеров и забронировать
                        проживание можно через отдел бронирования:{" "}
                        <a
                            href="mailto:reservation@academia.spb.ru"
                            className="underline underline-offset-2"
                        >
                            reservation@academia.spb.ru
                        </a>
                        . При бронировании, пожалуйста, укажите идентификатор
                        абонемента;
                    </>
                ),
            },
            {
                id: "restore-contact",
                content: (
                    <>
                        Если вы потеряли абонемент, его можно восстановить,
                        связавшись с отделом бронирования:{" "}
                        <a
                            href="mailto:reservation@academia.spb.ru"
                            className="underline underline-offset-2"
                        >
                            reservation@academia.spb.ru
                        </a>
                        ;
                    </>
                ),
            },
            {
                id: "nights-deduction",
                content:
                    "Использованные ночи пребывания списываются по факту заселения.",
            },
        ],
        rulesButton: "Забронировать",
    },
    en: {
        title: <>Business accommodation subscription</>,
        intro: (
            <>
                A single subscription for several stays at a fixed price with
                flexible arrival dates.
                <br />
                Created for guests who travel frequently on business, the
                Business Subscription offers a practical way to plan repeat
                visits. The subscription covers one booking for 10 to 15 nights,
                and you decide when and how to use them.
                <br />
                <br />
                Available room categories: Superior and Junior Suite.
            </>
        ),
        chooseLabel: "Book now",
        detailsLabel: "Room details",
        tariffLabel: "Number of nights",
        tariffNotice: "* excluding peak dates and public holiday weekends",
        rulesTitle: "Terms of the business subscription",
        rulesDescription: [
            {
                id: "buyer",
                content:
                    "The subscription can be purchased by an individual or a legal entity.",
            },
            {
                id: "prepayment",
                content:
                    "The full subscription price must be paid at the time of booking.",
            },
            {
                id: "expiration",
                content:
                    "The subscription becomes invalid after its expiration date.",
            },
            {
                id: "period",
                content:
                    "The validity period is October 2026 through March 2027, excluding peak dates and public holiday weekends. The list of peak dates is determined by the accommodation provider.",
            },
            {
                id: "direct-booking",
                content:
                    "The subscription can only be used for direct bookings without intermediaries.",
            },
            {
                id: "availability",
                content:
                    "The subscription may be used only if rooms in the selected category are available for the requested dates.",
            },
            {
                id: "booking-contact",
                content: (
                    <>
                        To check availability and book your stay, please contact
                        the reservations department:{" "}
                        <a
                            href="mailto:reservation@academia.spb.ru"
                            className="underline underline-offset-2"
                        >
                            reservation@academia.spb.ru
                        </a>
                        . Please include your subscription ID when booking.
                    </>
                ),
            },
            {
                id: "restore-contact",
                content: (
                    <>
                        If you lose your subscription, it can be restored by
                        contacting the reservations department:{" "}
                        <a
                            href="mailto:reservation@academia.spb.ru"
                            className="underline underline-offset-2"
                        >
                            reservation@academia.spb.ru
                        </a>
                        .
                    </>
                ),
            },
            {
                id: "nights-deduction",
                content: "Used nights are deducted upon check-in.",
            },
        ],
        perNightLabel: " per night",
        rulesButton: "Book now",
    },
};

const extrasByLocale: Record<Locale, SubscriptionRoomExtra[]> = {
    ru: [
        {
            roomSlug: "superior",
            gallery: [
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/sup1-1.png",
                    alt: "Супериор",
                },
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/superior2.jpg",
                    alt: "Супериор",
                },
            ],
            items: [
                {
                    title: "10 ночей",
                    description: (
                        <>
                            Срок действия: 6 месяцев
                            <br />
                            Период использования:
                            <br />
                            октябрь 2026 — март 2027 *
                        </>
                    ),
                    bookingHref:
                        "?tl-booking-open=true&tl-booking-scenario=42761-subscription&be-room=395664",
                    ctaLabel: "Выбрать",
                    priceTotal: "75 000 ₽",
                    pricePerNight: "7 500 ₽",
                },
                {
                    title: "15 ночей",
                    description: (
                        <>
                            Срок действия: 6 месяцев
                            <br />
                            Период использования:
                            <br />
                            октябрь 2026 — март 2027 *
                        </>
                    ),
                    bookingHref:
                        "?tl-booking-open=true&tl-booking-scenario=42761-subscription&be-room=395597",
                    ctaLabel: "Выбрать",
                    priceTotal: "105 000 ₽",
                    pricePerNight: "7 000 ₽",
                },
            ],
        },
        {
            roomSlug: "junior-suite",
            gallery: [
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/junior1.jpg",
                    alt: "Полулюкс",
                },
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/junior2.jpg",
                    alt: "Полулюкс",
                },
            ],
            items: [
                {
                    title: "10 ночей",
                    description: (
                        <>
                            Срок действия: 6 месяцев
                            <br />
                            Период использования:
                            <br />
                            октябрь 2026 — март 2027 *
                        </>
                    ),
                    bookingHref:
                        "?tl-booking-open=true&tl-booking-scenario=42761-subscription&be-room=395663",
                    ctaLabel: "Выбрать",
                    priceTotal: "100 000 ₽",
                    pricePerNight: "10 000 ₽",
                },
                {
                    title: "15 ночей",
                    description: (
                        <>
                            Срок действия: 6 месяцев
                            <br />
                            Период использования:
                            <br />
                            октябрь 2026 — март 2027 *
                        </>
                    ),
                    bookingHref:
                        "?tl-booking-open=true&tl-booking-scenario=42761-subscription&be-room=394887",
                    ctaLabel: "Выбрать",
                    priceTotal: "142 500 ₽",
                    pricePerNight: "9 500 ₽",
                },
            ],
        },
    ],
    en: [
        {
            roomSlug: "superior",
            gallery: [
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/sup1-1.png",
                    alt: "Superior room",
                },
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/superior2.jpg",
                    alt: "Superior room",
                },
            ],
            items: [
                {
                    title: "10 nights",
                    description: (
                        <>
                            Valid for: 6 months
                            <br />
                            Usage period:
                            <br />
                            October 2026 — March 2027 *
                        </>
                    ),
                    bookingHref:
                        "?tl-booking-open=true&tl-booking-scenario=42761-subscription&be-room=395664",
                    ctaLabel: "Choose",
                    priceTotal: "75 000 ₽",
                    pricePerNight: "7 500 ₽",
                },
                {
                    title: "15 nights",
                    description: (
                        <>
                            Valid for: 6 months
                            <br />
                            Usage period:
                            <br />
                            October 2026 — March 2027 *
                        </>
                    ),
                    bookingHref:
                        "?tl-booking-open=true&tl-booking-scenario=42761-subscription&be-room=395597",
                    ctaLabel: "Choose",
                    priceTotal: "105 000 ₽",
                    pricePerNight: "7 000 ₽",
                },
            ],
        },
        {
            roomSlug: "junior-suite",
            gallery: [
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/junior1.jpg",
                    alt: "Junior suite",
                },
                {
                    src: "https://academia.spb.ru/wp-content/uploads/2026/04/junior2.jpg",
                    alt: "Junior suite",
                },
            ],
            items: [
                {
                    title: "10 nights",
                    description: (
                        <>
                            Valid for: 6 months
                            <br />
                            Usage period:
                            <br />
                            October 2026 — March 2027 *
                        </>
                    ),
                    bookingHref:
                        "?tl-booking-open=true&tl-booking-scenario=42761-subscription&be-room=395663",
                    ctaLabel: "Choose",
                    priceTotal: "100 000 ₽",
                    pricePerNight: "10 000 ₽",
                },
                {
                    title: "15 nights",
                    description: (
                        <>
                            Valid for: 6 months
                            <br />
                            Usage period:
                            <br />
                            October 2026 — March 2027 *
                        </>
                    ),
                    bookingHref:
                        "?tl-booking-open=true&tl-booking-scenario=42761-subscription&be-room=394887",
                    ctaLabel: "Choose",
                    priceTotal: "142 500 ₽",
                    pricePerNight: "9 500 ₽",
                },
            ],
        },
    ],
};

export default function SubscriptionsPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const extras = extrasByLocale[locale];
    const rooms = AllRooms[locale].filter(
        (room) => room.slug === "superior" || room.slug === "junior-suite",
    );

    return (
        <main className="flex flex-col gap-10">
            <section className="mx-6 my-2 flex flex-col gap-4 xl:mx-auto xl:max-w-4xl">
                <FadeUp className="xl:text-center">
                    <h1>{copy.title}</h1>
                </FadeUp>
                <FadeUp
                    delay={0.2}
                    className="mt-2 xl:mx-auto xl:mt-4 xl:max-w-4xl xl:text-center"
                >
                    <p>{copy.intro}</p>
                </FadeUp>
            </section>

            <section className="mx-6 xl:mx-auto xl:max-w-6xl">
                <div className="grid gap-4 xl:gap-8">
                    {rooms.map((room, index) => {
                        const roomExtra = extras.find(
                            (extra) => extra.roomSlug === room.slug,
                        );
                        const roomExtras = roomExtra?.items ?? [];

                        return (
                            <FadeUp
                                key={room.slug}
                                delay={0.1 * (index + 1)}
                                className="overflow-hidden"
                            >
                                <article className="flex flex-col gap-4 rounded-lg xl:flex-row">
                                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] xl:min-h-[360px] xl:aspect-auto xl:min-w-[34rem]">
                                        <ImageGallerySlider
                                            images={roomExtra?.gallery ?? []}
                                            className="h-full"
                                            sizes="(max-width: 1280px) 100vw, 50vw"
                                            autoplay
                                        />
                                    </div>

                                    <div className="grid gap-4 xl:grid-rows-[auto_1fr] border border-brand-blue/15 rounded-md p-4 w-full">
                                        <div className="flex flex-col gap-3 rounded-lg p-3 xl:justify-between">
                                            <h3 className="font-baskerville text-2xl uppercase xl:text-3xl">
                                                {room.title}
                                            </h3>
                                            <p>{room.description}</p>
                                            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-brand-blue mt-2 xl:flex-row-reverse xl:justify-end">
                                                <span
                                                    className={`flex items-center gap-2 ${room.slug === "junior-suite" ? "xl:w-full" : ""}`}
                                                >
                                                    <BedIcon size={18} />
                                                    {room.bed}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <SquareIcon size={14} />
                                                    {room.area}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <UserIcon size={14} />
                                                    {room.guests}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            {roomExtras.map((item) => (
                                                <div
                                                    key={`${room.slug}-${item.title}`}
                                                    className="flex h-full flex-col gap-4 rounded-lg bg-brand-blue-100/40 p-5 xl:p-6"
                                                >
                                                    <div className="border-b border-brand-blue/10 pb-2 flex flex-col gap-2">
                                                        <p className="text-xs uppercase text-brand-blue/60">
                                                            {copy.tariffLabel}
                                                        </p>
                                                        <h3 className="font-baskerville uppercase text-xl xl:text-2xl">
                                                            {item.title}
                                                        </h3>
                                                    </div>

                                                    <p className="flex-1 text-sm leading-6 text-brand-blue/80">
                                                        {item.description}
                                                    </p>

                                                    <div className="flex justify-between text-brand-blue">
                                                        <p className="font-bold text-lg xl:text-xl font-baskerville">
                                                            {item.priceTotal}
                                                        </p>
                                                        <p>
                                                            {item.pricePerNight}
                                                            {copy.perNightLabel}
                                                        </p>
                                                    </div>

                                                    <Button
                                                        href={item.bookingHref}
                                                        size="sm"
                                                        className="w-full"
                                                    >
                                                        {item.ctaLabel ??
                                                            copy.chooseLabel}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm opacity-50">
                                            {copy.tariffNotice}
                                        </p>
                                    </div>
                                </article>
                            </FadeUp>
                        );
                    })}
                </div>
            </section>

            <section className="mx-6 flex flex-col gap-2 xl:w-full xl:max-w-6xl xl:mx-auto">
                <h3 className="text-lg xl:text-xl font-baskerville uppercase">
                    {copy.rulesTitle}
                </h3>
                <ul className="mt-1 list-disc space-y-1 pl-5 pb-4 xl:max-w-5xl">
                    {copy.rulesDescription.map((item) => (
                        <li key={item.id}>{item.content}</li>
                    ))}
                </ul>
                <Button href="?tl-booking-open=true&tl-booking-scenario=42761-subscription" className="xl:self-start">
                    {copy.rulesButton}
                </Button>
            </section>

            <Divider />
            <ContactsSection />
        </main>
    );
}
