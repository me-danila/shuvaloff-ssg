"use client";

import { AirplaneIcon, CarProfileIcon, TrainIcon } from "@phosphor-icons/react";
import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import ServicesSlider from "@/components/ui/slider/ServicesSlider";
import { AllServices } from "@/data/ServicesData";
import type { Locale } from "@/lib/i18n/routing";

type TransferCopy = {
    title: string;
    subtitle: string;
    orderButton: string;
    description1: string;
    description2: string;
    otherServicesTitle: string;
    items: string[];
    cards: { label: string; price: string; note?: string }[];
};

const copyByLocale: Record<Locale, TransferCopy> = {
    ru: {
        title: "ТРАНСФЕР",
        subtitle: "на представительском Mercedes-Benz E-класса",
        orderButton: "ЗАКАЗАТЬ",
        description1:
            "Мы предлагаем вам индивидуальный трансфер без ожиданий и суеты, с заботой и вниманием к деталям. Мы встретим вас в аэропорту или на вокзале, доставим в отель и, при необходимости, обеспечим передвижение по Петербургу во время вашего отдыха.",
        description2:
            "Чтобы заказать трансфер, свяжитесь с нашей консьерж-службой или добавьте его к вашему бронированию на втором шаге оформления на официальном сайте.",
        otherServicesTitle: "Другие услуги",
        items: [
            "Подача автомобиля заранее, без ожидания и задержек.",
            "Встреча с именной табличкой водителя в деловом костюме.",
            "Просторный, статусный и максимально комфортный Mercedes-Benz E-класса.",
            "Спокойная поездка с бутилированной водой, салфетками и зарядками в салоне.",
            "Сопровождение с зонтом в случае дождя.",
            "Музыка по вашему настроению или по вашему плейлисту.",
        ],
        cards: [
            { label: "Аэропорт — отель", price: "от 3 500 ₽" },
            { label: "Вокзал — отель", price: "от 1 750 ₽" },
            {
                label: "Аренда авто с водителем",
                price: "от 7 500 ₽",
                note: "2 500 ₽/час (мин. аренда 3 часа)",
            },
        ],
    },
    en: {
        title: "TRANSFER",
        subtitle: "on executive Mercedes-Benz E-class",
        orderButton: "ORDER",
        description1:
            "We offer you an individual transfer without waiting or fuss, with care and attention to detail. We will meet you at the airport or train station, deliver you to the hotel and, if necessary, ensure movement around St. Petersburg during your stay.",
        description2:
            "To order a transfer, contact our concierge service or add it to your booking during the second step of the checkout on the official website.",
        otherServicesTitle: "Other services",
        items: [
            "Car arrival in advance, without waiting or delays.",
            "Meeting with a nameplate by a driver in a business suit.",
            "Spacious, status and most comfortable Mercedes-Benz E-class.",
            "A calm trip with bottled water, napkins and chargers in the cabin.",
            "Accompaniment with an umbrella in case of rain.",
            "Music according to your mood or your playlist.",
        ],
        cards: [
            { label: "Airport — Hotel", price: "from 3 500 ₽" },
            { label: "Train station — Hotel", price: "from 1 750 ₽" },
            {
                label: "Car rental with driver",
                price: "from 7 500 ₽",
                note: "2 500 ₽/hour (min. rental 3 hours)",
            },
        ],
    },
};

const icons = [AirplaneIcon, TrainIcon, CarProfileIcon];

export default function TransferPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const otherServices = AllServices[locale].filter(
        (s) => s.slug && !s.externalLink && s.slug !== "transfer",
    );

    return (
        <main className="flex flex-col gap-8 xl:gap-8">
            <section className="flex flex-col gap-3 mx-6 mt-6 xl:mt-8 xl:max-w-6xl xl:mx-auto xl:w-full">
                <FadeUp className="text-center flex flex-col">
                    <h1>{copy.title}</h1>
                    <p>{copy.subtitle}</p>
                </FadeUp>
            </section>

            <section className="mx-6 flex flex-col gap-4 xl:max-w-6xl xl:mx-auto xl:w-full xl:grid xl:grid-cols-[1fr_1.2fr] xl:items-stretch xl:gap-6">
                <StaggerContainer className="flex flex-col gap-4">
                    {copy.cards.map(({ label, price, note }, idx) => {
                        const Icon = icons[idx];
                        return (
                            <StaggerItem
                                key={label}
                                className="bg-brand-blue-100 rounded-md p-4 flex flex-col items-center text-center gap-3 xl:p-5 flex-1"
                            >
                                <Icon
                                    size={32}
                                    color="var(--color-brand-blue)"
                                    weight="fill"
                                />
                                <div className="flex flex-col items-center">
                                    <p>{label}</p>
                                    {note ? (
                                        <p className="text-xs md:text-sm text-taupe-600">
                                            {note}
                                        </p>
                                    ) : null}
                                </div>
                                <Button
                                    href="https://t.me/+79668342743"
                                    target="_blank"
                                    className="mt-1"
                                    uppercase={false}
                                >
                                    {price}
                                </Button>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
                <FadeUp className="relative w-full h-72 md:h-90 xl:h-full overflow-hidden rounded-md">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/03/e9183a601b63d6d7ac936e473edc7d34f03dec4b-1.avif"
                        alt={copy.title}
                        fill
                        sizes="(max-width: 1200px) 100vw, 55vw"
                        className="object-cover object-[50%_30%]"
                        priority
                    />
                </FadeUp>
            </section>

            <FadeUp className="mx-6 flex justify-center xl:max-w-6xl xl:mx-auto xl:w-full">
                <Button
                    href="https://t.me/+79668342743"
                    target="_blank"
                    variant="primary"
                >
                    {copy.orderButton}
                </Button>
            </FadeUp>

            <section className="mx-6 flex flex-col gap-4 xl:max-w-6xl xl:mx-auto xl:w-full xl:grid xl:grid-cols-[1.1fr_1fr] xl:gap-8 xl:items-start">
                <FadeUp className="relative w-full h-60 md:h-80 xl:h-full overflow-hidden rounded-md">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2025/09/IMG_8480-1.avif"
                        alt={copy.title}
                        fill
                        sizes="(max-width: 1200px) 100vw, 55vw"
                        className="object-cover"
                        priority
                    />
                </FadeUp>
                <FadeUp delay={0.1} className="flex flex-col gap-4">
                    <p>{copy.description1}</p>
                    <ul className="space-y-1 my-3">
                        {copy.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="mt-2 w-1 h-1 rounded-full bg-brand-blue" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p>{copy.description2}</p>
                </FadeUp>
            </section>

            {otherServices.length > 0 && (
                <section className="flex flex-col gap-4 xl:gap-6 mt-2 xl:mt-8 mx-6 xl:w-full xl:max-w-6xl xl:mx-auto">
                    <FadeUp>
                        <h2 className="text-center xl:text-4xl">
                            {copy.otherServicesTitle}
                        </h2>
                    </FadeUp>
                    <ServicesSlider services={otherServices} />
                </section>
            )}

            <Divider />
            <ContactsSection />
        </main>
    );
}
