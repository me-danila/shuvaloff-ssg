"use client";

import { BellIcon, ListHeartIcon } from "@phosphor-icons/react";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import type { HeroImage } from "@/components/sections/HeroWithPictures";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import DesktopHeroGrid from "@/components/ui/grids/DesktopHeroGrid";
import { FadeUp } from "@/components/ui/Motion";
import SliderMobile from "@/components/ui/slider/SliderMobile";
import type { Locale } from "@/lib/i18n/routing";

type ConciergeCopy = {
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    orderLabel: string;
    bellTitle: string;
    heartTitle: string;
    guidesTitle: string;
    guidesSubtitle: string;
    bellItems: string[];
    heartItems: string[];
    guideButtons: { label: string; href: string; external?: boolean }[];
};

const copyByLocale: Record<Locale, ConciergeCopy> = {
    ru: {
        title: "Консьерж сервис",
        subtitle: "Больше, чем сервис",
        description1:
            "Настоящее гостеприимство всегда больше, чем безупречный сервис. Это искреннее желание сделать лучшее из возможного, внимательность к деталям и чуткость к вашим пожеланиям. Консьерж-служба ACADEMIA Особняк Шувалова всегда готова помочь с решением любых, даже самых неожиданных, задач.",
        description2: `Мы подготовим полноценный сценарий отдыха под ваш запрос, удобно соберем, забронируем и организуем персональную программу отдыха: от завтрака в номер с букетом свежих цветов до эксклюзивных экскурсий с лучшими гидами и прогулок на яхте по Финскому заливу или романтичного вечера с фуршетом и игристым на роскошном катере.

Мы поможем решить любую задачу: от прогулки с вашим питомцем и записи в ACADEMIA SPA до поиска билетов в театр и особого украшения номера для дорогого вам человека. Мы предоставим вам VIP-трансфер и поможем организовать любое мероприятие — от фотосессии и девичника до изысканного банкета в Бар-ресторан ACADEMIA Шувалова.`,
        orderLabel: "Заказать",
        bellTitle: "Доверьте консьерж‑менеджеру рутинные задачи:",
        heartTitle: "Позвольте помочь вам со сценарием отдыха:",
        guidesTitle: "Специально для гостей особняка",
        guidesSubtitle:
            "мы создали тематические гайды по лучшим маршрутам рядом с особняком:",
        bellItems: [
            "Погулять с собакой",
            "Покормить домашнего питомца",
            "Заполнить холодильник продуктами",
            "Отнести вещи в химчистку",
            "Записать в салон красоты",
            "Записать на массаж в ACADEMIA SPA",
            "Купить абонемент в спортивный зал",
            "Заказать представительский трансфер",
        ],
        heartItems: [
            "Забронировать ресторан",
            "Найти билеты на спектакль или концерт",
            "Вызвать сомелье",
            "Организовать девичник",
            "Украсить номер к празднику",
            "Заказать букет любимых цветов",
            "Организовать уникальную экскурсию",
            "Предоставить гайд «Топ событий на выходные»",
        ],
        guideButtons: [
            { label: "Для пробежек", href: "/run/" },
            {
                label: "Для красивых прогулок поблизости",
                href: "https://static.academia.spb.ru/files/Маршруты_прогулки_Шувалов.pdf",
                external: true,
            },
            {
                label: "Для прогулок с питомцем",
                href: "https://static.academia.spb.ru/files/pet-route-shuvaloff.pdf",
                external: true,
            },
        ],
    },
    en: {
        title: "Concierge Service",
        subtitle: "More than service",
        description1:
            "True hospitality is always more than impeccable service. It is a sincere desire to do the best possible, attention to detail and sensitivity to your wishes. The ACADEMIA Shuvaloff Mansion concierge service is always ready to help with any, even the most unexpected, tasks.",
        description2: `We will prepare a full-fledged relaxation scenario for your request, conveniently collect, book and organize a personal relaxation program: from breakfast in the room with a bouquet of fresh flowers to exclusive excursions with the best guides and yacht trips along the Gulf of Finland or a romantic evening with a buffet and sparkling wine on a luxury boat.

We will help you solve any task: from walking your pet and booking an appointment at ACADEMIA SPA to finding theater tickets and special room decoration for a person dear to you. We will provide you with a VIP transfer and help you organize any event — from a photo session and a bachelorette party to an exquisite banquet at the ACADEMIA Shuvaloff Bar-Restaurant.`,
        orderLabel: "Order",
        bellTitle: "Entrust routine tasks to the concierge manager:",
        heartTitle: "Let us help you with your relaxation scenario:",
        guidesTitle: "Especially for the guests of the mansion",
        guidesSubtitle:
            "we have created thematic guides for the best routes near the mansion:",
        bellItems: [
            "Walk the dog",
            "Feed the pet",
            "Fill the fridge with groceries",
            "Take clothes to the dry cleaners",
            "Book a beauty salon appointment",
            "Book a massage at ACADEMIA SPA",
            "Buy a gym membership",
            "Order an executive transfer",
        ],
        heartItems: [
            "Book a restaurant",
            "Find theater or concert tickets",
            "Call a sommelier",
            "Organize a bachelorette party",
            "Decorate the room for a holiday",
            "Order a bouquet of favorite flowers",
            "Organize a unique excursion",
            "Provide 'Top Weekend Events' guide",
        ],
        guideButtons: [
            { label: "For jogging", href: "/en/run/" },
            {
                label: "For beautiful walks nearby",
                href: "https://static.academia.spb.ru/files/Маршруты_прогулки_Шувалов.pdf",
                external: true,
            },
            {
                label: "For walks with a pet",
                href: "https://static.academia.spb.ru/files/pet-route-shuvaloff.pdf",
                external: true,
            },
        ],
    },
};

const heroImages: [HeroImage, HeroImage, HeroImage, HeroImage] = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/da32b8b9bc44baddd8e44d8e60ddb347184d0876.jpg",
        alt: "Concierge service",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/2-2.jpg",
        alt: "Romantic evening",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/4-1.jpg",
        alt: "Academishka",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/3-2.jpg",
        alt: "ACADEMIA Tourism",
    },
];

export default function ConciergePage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    return (
        <main className="flex flex-col gap-4 xl:gap-10">
            <section className="flex flex-col gap-4 xl:gap-8 my-6 px-6 xl:text-center w-full xl:max-w-6xl xl:mx-auto xl:px-0">
                <FadeUp>
                    <h1>{copy.title}</h1>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center xl:-mt-6"
                >
                    {copy.subtitle}
                </FadeUp>
                <FadeUp delay={0.3} className="mx-auto xl:max-w-4xl">
                    <p>{copy.description1}</p>
                </FadeUp>
                <SliderMobile images={heroImages} />
                <DesktopHeroGrid images={heroImages} tone="inner" />
            </section>
            <BookingForm />
            <FadeUp className="px-6 w-full xl:max-w-6xl xl:mx-auto whitespace-pre-line">
                <p>{copy.description2}</p>
            </FadeUp>
            <section className="mx-6 xl:max-w-6xl xl:mx-auto xl:w-full">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <FadeUp className="bg-brand-blue-100 rounded-md p-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-4 xl:flex-row grow">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3 xl:flex-row xl:items-start">
                                    <BellIcon
                                        size={28}
                                        weight="fill"
                                        color="var(--color-brand-blue)"
                                        className="shrink-0 xl:mt-1"
                                    />
                                    <p className="xl:max-w-50">
                                        {copy.bellTitle}
                                    </p>
                                </div>
                                <Button
                                    href="https://t.me/+79668342743"
                                    target="_blank"
                                    variant="primary"
                                    className="max-xl:hidden xl:flex xl:mt-auto xl:self-start"
                                >
                                    {copy.orderLabel}
                                </Button>
                            </div>
                            <ul className="space-y-1 text-sm xl:text-base">
                                {copy.bellItems.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="mt-2 w-1 h-1 rounded-full bg-brand-blue" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button
                            href="https://t.me/+79668342743"
                            target="_blank"
                            variant="primary"
                            className="xl:hidden"
                        >
                            {copy.orderLabel}
                        </Button>
                    </FadeUp>

                    <FadeUp
                        delay={0.1}
                        className="bg-brand-blue-100 rounded-md p-6 flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-4 xl:flex-row grow">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3 xl:flex-row xl:items-start">
                                    <ListHeartIcon
                                        size={28}
                                        weight="fill"
                                        color="var(--color-brand-blue)"
                                        className="shrink-0 xl:mt-1"
                                    />
                                    <p className="xl:max-w-50">
                                        {copy.heartTitle}
                                    </p>
                                </div>
                                <Button
                                    href="https://t.me/+79668342743"
                                    target="_blank"
                                    variant="primary"
                                    className="max-xl:hidden xl:flex xl:mt-auto xl:self-start"
                                >
                                    {copy.orderLabel}
                                </Button>
                            </div>
                            <ul className="space-y-1 text-sm xl:text-base">
                                {copy.heartItems.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="mt-2 w-1 h-1 rounded-full bg-brand-blue" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button
                            href="https://t.me/+79668342743"
                            target="_blank"
                            variant="primary"
                            className="xl:hidden"
                        >
                            {copy.orderLabel}
                        </Button>
                    </FadeUp>
                </div>
            </section>
            <FadeUp className="max-xl:px-6 my-4 w-full xl:text-center xl:max-w-4xl xl:mx-auto">
                <h3 className="font-baskerville uppercase text-xl xl:text-2xl">
                    {copy.guidesTitle}
                </h3>
                <p>{copy.guidesSubtitle}</p>
                <div className="flex flex-col gap-3 mt-5 xl:flex-row">
                    {copy.guideButtons.map((btn) => (
                        <Button
                            key={btn.label}
                            href={btn.href}
                            target={btn.external ? "_blank" : undefined}
                            variant="primary-outline"
                            className="grow"
                            size="xl"
                            uppercase={false}
                        >
                            {btn.label}
                        </Button>
                    ))}
                </div>
            </FadeUp>
            <Divider />
            <ContactsSection />
        </main>
    );
}
