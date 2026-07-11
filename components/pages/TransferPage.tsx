import {
    AirplaneIcon,
    CarProfileIcon,
    TrainIcon,
} from "@phosphor-icons/react/dist/ssr";
import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import ServicesSlider from "@/components/ui/slider/ServicesSlider";
import { AllServices } from "@/data/ServicesData";
import type { Locale } from "@/lib/i18n/routing";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { ORDER_URL } from "@/lib/seo/site";

type TransferCopy = {
    title: string;
    subtitle: string;
    orderButton: string;
    description1: string;
    description2: string;
    description3: string;
    otherServicesTitle: string;
    items: string[];
    items2: string[];
    cards: { label: string; price: string; note?: string }[];
};

const copyByLocale: Record<Locale, TransferCopy> = {
    ru: {
        title: "ТРАНСФЕР",
        subtitle: "GAC M8",
        orderButton: "ЗАКАЗАТЬ",
        description1:
            "Индивидуальный трансфер без ожиданий и суеты. Мы встретим вас в аэропорту или на вокзале, доставим в отель и обеспечим передвижение по Петербургу во время вашего отдыха.",
        description2:
            "GAC M8 — это сочетание статуса, комфорта и безопасности. Просторный салон с премиальной отделкой и шумоизоляцией и мягкая подвеска гарантируют приятную поездку даже после длительного перелета.",
        description3:
            "Закажите трансфер через консьерж-службу или добавьте его к вашему бронированию.",
        otherServicesTitle: "Другие услуги",
        items: [
            "Встреча с именной табличкой водителем в деловом костюме",
            "Просторный, статусный и максимально комфортный GAC M8",
            "Кресла с функцией массажа",
            "Бутилированная вода, салфетки, зарядки в салоне",
            "Сопровождение с зонтом в случае дождя",
            "Музыка по вашему настроению или из вашего плейлиста",
        ],
        items2: [
            "Аэропорт — отель 4 000 ₽",
            "Вокзал — отель 2 000 ₽",
            "Аренда авто с водителем 3 500 ₽/час (мин. аренда 3 часа)",
        ],
        cards: [
            { label: "Аэропорт — отель", price: "от 4 000 ₽" },
            { label: "Вокзал — отель", price: "от 2 000 ₽" },
            {
                label: "Аренда авто с водителем",
                price: "от 10 500 ₽",
                note: "3 500 ₽/час (мин. аренда 3 часа)",
            },
        ],
    },
    en: {
        title: "TRANSFER",
        subtitle: "GAC M8",
        orderButton: "ORDER",
        description1:
            "A private transfer with no waiting or hassle. We’ll meet you at the airport or train station, take you to your hotel, and handle your transportation around St. Petersburg during your stay.",
        description2:
            "The GAC M8 combines prestige, comfort, and safety. A spacious interior with premium finishes and soundproofing, along with a smooth suspension, guarantee a pleasant ride even after a long flight.",
        description3:
            "Book a transfer through the concierge service or add it to your reservation.",
        otherServicesTitle: "Other services",
        items: [
            "Meet-and-greet with a personalized sign by a driver in a business suit",
            "The spacious, prestigious, and supremely comfortable GAC M8",
            "Seats with massage function",
            "Bottled water, napkins, and chargers in the cabin",
            "An umbrella provided in case of rain",
            "Music to suit your mood or from your playlist",
        ],
        items2: [
            "Airport to hotel: 4,000 ₽",
            "Train station to hotel 2,000 ₽",
            "Car rental with driver 3,500 ₽/hour (minimum rental 3 hours)",
        ],
        cards: [
            { label: "Airport — Hotel", price: "from 4 000 ₽" },
            { label: "Train station — Hotel", price: "from 2 000 ₽" },
            {
                label: "Car rental with driver",
                price: "from 10 500 ₽",
                note: "3 500 ₽/hour (min. rental 3 hours)",
            },
        ],
    },
};

const icons = [AirplaneIcon, TrainIcon, CarProfileIcon];

const seo = {
    ru: {
        name: "Трансфер",
        description:
            "Индивидуальный представительский трансфер в ACADEMIA Особняк Шувалова",
        crumbs: ["Главная", "Услуги"],
    },
    en: {
        name: "Transfer",
        description:
            "Individual executive transfer to ACADEMIA Shuvaloff Mansion",
        crumbs: ["Home", "Services"],
    },
} as const;

const SEO_PATHS = ["/", "/services/"] as const;

export default function TransferPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const otherServices = AllServices[locale].filter(
        (s) => s.slug && !s.externalLink && s.slug !== "transfer",
    );

    return (
        <main className="flex flex-col gap-8 xl:gap-8">
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: "/services/transfer/",
                    name: seo[locale].name,
                    description: seo[locale].description,
                    breadcrumbs: [
                        ...seo[locale].crumbs.map((name, i) => ({
                            name,
                            path: SEO_PATHS[i],
                        })),
                        {
                            name: seo[locale].name,
                            path: "/services/transfer/",
                        },
                    ],
                })}
            />
            <section className="flex flex-col gap-3 mx-6 mt-6 xl:mt-8 xl:max-w-7xl xl:mx-auto xl:w-full">
                <FadeUp className="text-center flex flex-col">
                    <h1>{copy.title}</h1>
                    <p>{copy.subtitle}</p>
                </FadeUp>
            </section>

            <section className="mx-6 flex flex-col gap-4 xl:max-w-7xl xl:mx-auto xl:w-full xl:grid xl:grid-cols-[1fr_1.2fr] xl:items-stretch xl:gap-6">
                <StaggerContainer className="flex flex-col gap-4">
                    {copy.cards.map(({ label, price, note }, idx) => {
                        const Icon = icons[idx];
                        return (
                            <StaggerItem
                                key={label}
                                className="bg-brand-light rounded-md p-4 flex flex-col items-center text-center gap-3 xl:p-5 flex-1"
                            >
                                <Icon
                                    size={32}
                                    color="var(--color-brand-brown)"
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
                                    href={ORDER_URL}
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

            <FadeUp className="mx-6 flex justify-center xl:max-w-7xl xl:mx-auto xl:w-full">
                <Button href={ORDER_URL} target="_blank" variant="primary">
                    {copy.orderButton}
                </Button>
            </FadeUp>

            <section className="mx-6 flex flex-col gap-4 xl:max-w-7xl xl:mx-auto xl:w-full xl:grid xl:grid-cols-[1.1fr_1fr] xl:gap-8 xl:items-start">
                <FadeUp className="relative w-full h-60 md:h-80 xl:h-full overflow-hidden rounded-md">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/06/hf_20260604_144842_063a0fa9-b31d-4114-9e32-e077ede99549-2.avif"
                        alt={copy.title}
                        fill
                        sizes="(max-width: 1200px) 100vw, 55vw"
                        className="object-cover"
                        priority
                    />
                </FadeUp>
                <FadeUp delay={0.1} className="flex flex-col gap-4">
                    <p>{copy.description1}</p>
                    <p>{copy.description2}</p>
                    <ul className="space-y-1 my-3">
                        {copy.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="mt-2 w-1 h-1 rounded-full bg-brand-brown" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="space-y-1 my-3">
                        {copy.items2.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="mt-2 w-1 h-1 rounded-full bg-brand-brown" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p>{copy.description3}</p>
                    <Button href={ORDER_URL} target="_blank" variant="primary">
                        {copy.orderButton}
                    </Button>
                </FadeUp>
            </section>

            {otherServices.length > 0 && (
                <section className="bg-brand-light py-8 xl:py-12 mt-2 xl:mt-8">
                    <div className="flex flex-col gap-4 xl:gap-6 mx-6 xl:w-full xl:max-w-7xl xl:mx-auto">
                        <FadeUp>
                            <h2 className="text-center xl:text-4xl">
                                {copy.otherServicesTitle}
                            </h2>
                        </FadeUp>
                        <ServicesSlider services={otherServices} />
                    </div>
                </section>
            )}

            <Divider />
            <ContactsSection />
        </main>
    );
}
