import type { Metadata } from "next";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import ReviewsWidgetToggle from "@/components/ui/ReviewsWidgetToggle";
import { getLocaleAlternates } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
    locale: Locale;
};

// Image + href are locale-independent; only the display name differs per locale.
const reviewPlatforms = [
    {
        key: "yandex",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/ya-maps.avif",
        href: "https://yandex.ru/maps/org/akademia_osobnyak_shuvalova/71619247470/?ll=30.345467%2C59.945058&utm_source=share&z=16",
    },
    {
        key: "2gis",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/2gis.avif",
        href: "https://2gis.ru/spb/firm/70000001069338040",
    },
    {
        key: "ostrovok",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/Frame-48.avif",
        href: "https://ostrovok.ru/hotel/russia/st._petersburg/mid11198066/hotel_ACADEMIA_osobnyak_shuvaloff/?ysclid=lymv8ivhlg401545243",
    },
    {
        key: "bronevik",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/Frame-49.avif",
        href: "https://bronevik.com/ru/hotel/russia/saint-petersburg/ACADEMIA-shuvaloff-mansion-ACADEMIA-shuvalov-mansion",
    },
] as const;

type ReviewsContent = {
    metaTitle: string;
    metaDescription: string;
    heading: string;
    intro: string;
    rateOn: string;
    ariaPrefix: string;
    widgetLabel: string;
    widgetTitle: string;
    names: Record<(typeof reviewPlatforms)[number]["key"], string>;
};

const contentByLocale: Record<Locale, ReviewsContent> = {
    ru: {
        metaTitle: "Отзывы — ACADEMIA Особняк Шувалова",
        metaDescription: "Отзывы гостей отеля ACADEMIA Особняк Шувалова",
        heading: "Спасибо, что выбрали отель ACADEMIA Особняк Шувалова",
        intro: "Будем благодарны если Вы оставите о нас отзыв на одной из платформ представленных ниже!",
        rateOn: "Оценить отель на:",
        ariaPrefix: "Оставить отзыв на",
        widgetLabel: "Отзывы со всех источников на нашем сайте",
        widgetTitle: "Отзывы",
        names: {
            yandex: "Яндекс Карты",
            "2gis": "2ГИС",
            ostrovok: "Островок",
            bronevik: "Bronevik",
        },
    },
    en: {
        metaTitle: "Reviews — ACADEMIA Mansion Shuvaloff",
        metaDescription: "Guest reviews for ACADEMIA Mansion Shuvaloff",
        heading: "Thank you for choosing ACADEMIA Mansion Shuvaloff hotel",
        intro: "We would be grateful if you leave us a review on one of the platforms listed below!",
        rateOn: "Rate the hotel on:",
        ariaPrefix: "Leave a review on",
        widgetLabel: "Reviews from all sources on our website",
        widgetTitle: "Reviews",
        names: {
            yandex: "Yandex Maps",
            "2gis": "2GIS",
            ostrovok: "Ostrovok",
            bronevik: "Bronevik",
        },
    },
};

export function reviewsMetadata(locale: Locale): Metadata {
    const content = contentByLocale[locale];
    return {
        title: content.metaTitle,
        description: content.metaDescription,
        alternates: getLocaleAlternates("/reviews/", locale),
    };
}

export default function ReviewsPage({ locale }: Props) {
    const content = contentByLocale[locale];

    return (
        <main className="my-10 xl:my-12">
            <FadeUp className="mx-auto w-full max-w-7xl px-4 xl:px-0">
                <h1>{content.heading}</h1>
                <p className="mt-6">{content.intro}</p>
            </FadeUp>

            <section className="mx-auto w-full max-w-7xl px-4 xl:px-0 mt-4 xl:mt-8">
                <FadeUp>
                    <p className="font-bold">{content.rateOn}</p>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {reviewPlatforms.map((platform) => {
                            const name = content.names[platform.key];
                            return (
                                <a
                                    key={name}
                                    href={platform.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${content.ariaPrefix} ${name}`}
                                    className="flex aspect-video items-center justify-center rounded-md bg-brand-light p-8 transition-opacity hover:opacity-80"
                                >
                                    <Image
                                        src={platform.image}
                                        alt={name}
                                        width={360}
                                        height={120}
                                        className="w-full object-contain"
                                    />
                                </a>
                            );
                        })}
                        <ReviewsWidgetToggle
                            buttonLabel={content.widgetLabel}
                            title={content.widgetTitle}
                        />
                    </div>
                </FadeUp>
            </section>
        </main>
    );
}
