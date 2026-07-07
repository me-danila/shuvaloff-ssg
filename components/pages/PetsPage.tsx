import type { ReactNode } from "react";
import HeroHistoricalRooms from "@/components/sections/HeroHistoricalRooms";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { AllServices } from "@/data/ServicesData";
import type { Locale } from "@/lib/i18n/routing";
import { buildServiceSchema } from "@/lib/seo/schema";

const HERO_IMAGE =
    "https://academia.spb.ru/wp-content/uploads/2026/03/IMG_6497-1.avif";

type PetsCopy = {
    title: string;
    contentTitle: ReactNode;
    paragraphs: { id: string; text: ReactNode }[];
    guideLabel: string;
    conciergeTitle: ReactNode;
    conciergeItems: { id: string; text: ReactNode }[];
    conciergeParagraphs: { id: string; text: ReactNode }[];
    kitTitle: ReactNode;
    kitIntro: ReactNode;
    kitItems: { id: string; text: ReactNode }[];
    pricing: ReactNode;
    galleryTitle: ReactNode;
};

const galleryImages = [
    "https://academia.spb.ru/wp-content/uploads/2026/03/IMG_0626.avif",
    "https://academia.spb.ru/wp-content/uploads/2026/03/IMG_5452.avif",
    "https://academia.spb.ru/wp-content/uploads/2026/03/IMG_6527-576x1024.avif",
];

const copyByLocale: Record<Locale, PetsCopy> = {
    ru: {
        title: "ПРОЖИВАНИЕ С ЖИВОТНЫМ",
        contentTitle: (
            <>
                Очень важно не&nbsp;расставаться в&nbsp;путешествии с&nbsp;теми,
                кого любишь
            </>
        ),
        paragraphs: [
            {
                id: "welcome",
                text: (
                    <>
                        Поэтому мы&nbsp;всегда с&nbsp;удовольствием принимаем
                        ваших четвероногих спутников. В&nbsp;коллекции особняков
                        ACADEMIA есть все необходимое и&nbsp;даже больше, чтобы
                        ваша поездка с&nbsp;питомцем была легкой и&nbsp;удобной.
                    </>
                ),
            },
            {
                id: "care",
                text: (
                    <>
                        Мы&nbsp;позаботились не&nbsp;только о&nbsp;стандартном
                        наборе принадлежностей, но&nbsp;также подготовили
                        маршруты для прогулок поблизости, список зоомагазинов
                        и&nbsp;дружелюбных к&nbsp;животным кафе
                        и&nbsp;ресторанов, чтобы вам было удобно.
                    </>
                ),
            },
        ],
        guideLabel: "ВСЕ ДЛЯ ОТДЫХА С ПИТОМЦЕМ",
        conciergeTitle: <>Наша консьерж-служба всегда готова помочь:</>,
        conciergeItems: [
            { id: "walk", text: <>погулять с&nbsp;вашим питомцем,</> },
            { id: "feed", text: <>покормить в&nbsp;нужное время,</> },
            {
                id: "grooming",
                text: <>записать на&nbsp;груминг или в&nbsp;ветклинику.</>,
            },
        ],
        conciergeParagraphs: [
            {
                id: "partners",
                text: (
                    <>
                        Кроме того, мы&nbsp;предоставляем нашим гостям
                        специальные условия на&nbsp;услуги профессионального
                        груминга или ветеринарного сопровождения от&nbsp;наших
                        партнеров.
                    </>
                ),
            },
            {
                id: "rules",
                text: (
                    <>
                        Мы&nbsp;с&nbsp;удовольствием принимаем кошек
                        и&nbsp;собак без ограничения по&nbsp;весу,
                        но&nbsp;не&nbsp;более одного животного в&nbsp;номере.
                        <br />
                        <strong>
                            При заселении потребуется ветеринарный паспорт
                            питомца.
                        </strong>
                    </>
                ),
            },
        ],
        kitTitle: (
            <>
                Вместе с&nbsp;сетью зоомагазинов «Четыре лапы»
                мы&nbsp;подготовили наборы со&nbsp;всеми нужными
                принадлежностями,
            </>
        ),
        kitIntro: (
            <>
                так что вы&nbsp;можете быть уверены в&nbsp;том, что отдых
                с&nbsp;любимым питомцем будет комфортным:
            </>
        ),
        kitItems: [
            { id: "bed", text: <>удобную лежанку,</> },
            { id: "bowls", text: <>миски для воды и&nbsp;еды,</> },
            {
                id: "hygiene",
                text: <>гигиенический набор, лакомства.</>,
            },
        ],
        pricing: (
            <>
                <strong>Стоимость размещения:</strong> 2&nbsp;000&nbsp;₽ / ночь
                <br />
                Залог: 5&nbsp;000&nbsp;₽ (возвращается после проверки номера)
            </>
        ),
        galleryTitle: (
            <>
                Путешествуйте вместе.
                <br />
                Мы&nbsp;позаботимся о&nbsp;комфорте каждого!
            </>
        ),
    },
    en: {
        title: "PET-FRIENDLY STAY",
        contentTitle:
            "It is so important not to part with those you love when traveling",
        paragraphs: [
            {
                id: "welcome",
                text: (
                    <>
                        That is&nbsp;why we&nbsp;are always happy
                        to&nbsp;welcome your four-legged companions. The
                        ACADEMIA collection of&nbsp;mansions has everything you
                        need and more to&nbsp;make your trip with your pet easy
                        and convenient.
                    </>
                ),
            },
            {
                id: "care",
                text: (
                    <>
                        We&nbsp;have taken care not only of&nbsp;the standard
                        set of&nbsp;essentials, but also prepared nearby walking
                        routes, a&nbsp;list of&nbsp;pet stores, and pet-friendly
                        cafes and restaurants for your convenience.
                    </>
                ),
            },
        ],
        guideLabel: "EVERYTHING FOR A PET-FRIENDLY STAY",
        conciergeTitle: <>Our concierge service is always ready to help:</>,
        conciergeItems: [
            { id: "walk", text: <>walk your pet,</> },
            { id: "feed", text: <>feed it at&nbsp;the right time,</> },
            {
                id: "grooming",
                text: (
                    <>
                        book a&nbsp;grooming session or a&nbsp;vet clinic
                        appointment.
                    </>
                ),
            },
        ],
        conciergeParagraphs: [
            {
                id: "partners",
                text: (
                    <>
                        In&nbsp;addition, we&nbsp;offer our guests special terms
                        for professional grooming and veterinary support
                        services from our partners.
                    </>
                ),
            },
            {
                id: "rules",
                text: (
                    <>
                        We&nbsp;are happy to&nbsp;welcome cats and dogs with
                        no&nbsp;weight limit, but no&nbsp;more than one pet per
                        room.
                        <br />
                        <strong>
                            A&nbsp;veterinary passport is&nbsp;required
                            at&nbsp;check-in.
                        </strong>
                    </>
                ),
            },
        ],
        kitTitle: (
            <>
                Together with the Four Paws pet store chain, we&nbsp;have
                prepared kits with all the essentials,
            </>
        ),
        kitIntro: (
            <>
                so&nbsp;you can be&nbsp;sure that a&nbsp;stay with your beloved
                pet will be&nbsp;comfortable:
            </>
        ),
        kitItems: [
            { id: "bed", text: <>a&nbsp;cozy pet bed,</> },
            { id: "bowls", text: <>water and food bowls,</> },
            { id: "hygiene", text: <>a&nbsp;hygiene kit and treats.</> },
        ],
        pricing: (
            <>
                <strong>Pet stay fee:</strong> 2,000&nbsp;₽ / night
                <br />
                Deposit: 5,000&nbsp;₽ (refunded after room inspection)
            </>
        ),
        galleryTitle: (
            <>
                Travel together.
                <br />
                We&nbsp;will take care of&nbsp;everyone&rsquo;s comfort!
            </>
        ),
    },
};

const breadcrumbLabels: Record<Locale, { home: string; services: string }> = {
    ru: {
        home: "Главная",
        services: "Услуги",
    },
    en: {
        home: "Home",
        services: "Services",
    },
};

export default function PetsPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const breadcrumbs = breadcrumbLabels[locale];
    const service = AllServices[locale].find((item) => item.slug === "pets");

    if (!service) {
        return null;
    }

    const serviceForPage = {
        ...service,
        title: copy.title,
        imgUrl: HERO_IMAGE,
    };

    return (
        <main className="flex flex-col gap-8">
            <StructuredData
                data={buildServiceSchema({
                    locale,
                    path: "/services/pets/",
                    service: serviceForPage,
                    breadcrumbs: [
                        { name: breadcrumbs.home, path: "/" },
                        { name: breadcrumbs.services, path: "/services/" },
                        { name: copy.title, path: "/services/pets/" },
                    ],
                })}
            />

            <HeroHistoricalRooms
                title={copy.title}
                image={{
                    src: HERO_IMAGE,
                    alt: copy.title,
                }}
                withBookingForm
            />

            <section className="mx-6 grid gap-6 xl:mx-auto xl:my-4 xl:w-full xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] xl:items-stretch xl:gap-14">
                <FadeUp
                    delay={0.2}
                    className="relative min-h-[320px] overflow-hidden rounded-md xl:min-h-0 xl:w-[92%] xl:justify-self-end"
                >
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/03/IMG_0594-1.avif"
                        alt={copy.title}
                        fill
                        sizes="(max-width: 1280px) 100vw, 50vw"
                        className="object-cover"
                    />
                </FadeUp>
                <FadeUp
                    delay={0.3}
                    className="flex flex-col justify-center gap-4 xl:py-10"
                >
                    <h2 className="xl:text-4xl mb-2 xl:mb-3">
                        {copy.contentTitle}
                    </h2>
                    {copy.paragraphs.map(({ id, text }) => (
                        <p key={id}>{text}</p>
                    ))}
                    <Button
                        href="https://static.academia.spb.ru/files/pet-route-shuvaloff.pdf"
                        target="_blank"
                        variant="primary"
                        className="mt-2 xl:mt-3 self-start"
                    >
                        {copy.guideLabel}
                    </Button>
                </FadeUp>
            </section>

            <section className="bg-[#ededeb] py-10 xl:py-16">
                <div className="mx-6 grid gap-10 xl:mx-auto xl:w-full xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] xl:items-start xl:gap-14">
                    <FadeUp
                        delay={0.2}
                        className="flex max-w-2xl flex-col gap-4 xl:py-6"
                    >
                        <h2 className="uppercase xl:text-4xl mb-2">
                            {copy.conciergeTitle}
                        </h2>
                        <ul className="flex flex-col gap-1">
                            {copy.conciergeItems.map(({ id, text }) => (
                                <li key={id}>• {text}</li>
                            ))}
                        </ul>
                        {copy.conciergeParagraphs.map(({ id, text }) => (
                            <p key={id}>{text}</p>
                        ))}
                        <h3 className="font-history uppercase mt-6 xl:text-xl">
                            {copy.kitTitle}
                        </h3>
                        <p>{copy.kitIntro}</p>
                        <ul className="flex flex-col gap-1">
                            {copy.kitItems.map(({ id, text }) => (
                                <li key={id}>• {text}</li>
                            ))}
                        </ul>
                    </FadeUp>
                    <FadeUp delay={0.3} className="flex flex-col gap-5">
                        <div className="relative aspect-[25/36] w-full max-w-md overflow-hidden rounded-md">
                            <video
                                src="https://static.academia.spb.ru/video/shuvaloff-dog.webm"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                        <p>{copy.pricing}</p>
                    </FadeUp>
                </div>
            </section>

            <section className="mx-6 grid gap-6 xl:mx-auto xl:my-10 xl:w-full xl:max-w-7xl xl:grid-cols-3 xl:gap-10">
                <FadeUp
                    delay={0.2}
                    className="relative aspect-[7/10] xl:aspect-auto"
                >
                    <div className="absolute inset-0 overflow-hidden rounded-md xl:top-6">
                        <Image
                            src={galleryImages[0]}
                            alt={copy.title}
                            fill
                            sizes="(max-width: 1280px) 100vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                </FadeUp>
                <FadeUp delay={0.3} className="relative aspect-[7/10]">
                    <div className="absolute inset-0 overflow-hidden rounded-md xl:bottom-6">
                        <Image
                            src={galleryImages[1]}
                            alt={copy.title}
                            fill
                            sizes="(max-width: 1280px) 100vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                </FadeUp>
                <FadeUp
                    delay={0.4}
                    className="flex flex-col xl:flex-col-reverse gap-6 xl:gap-10"
                >
                    <div className="relative aspect-[7/10] overflow-hidden rounded-md xl:aspect-auto xl:flex-1">
                        <Image
                            src={galleryImages[2]}
                            alt={copy.title}
                            fill
                            sizes="(max-width: 1280px) 100vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                    <h2 className="text-center text-lg xl:text-right xl:text-xl xl:pt-6">
                        {copy.galleryTitle}
                    </h2>
                </FadeUp>
            </section>
        </main>
    );
}
