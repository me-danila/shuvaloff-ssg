import type { Metadata } from "next";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import ReviewsWidgetToggle from "@/components/ui/ReviewsWidgetToggle";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Отзывы — ACADEMIA Особняк Шувалова",
    description: "Отзывы гостей отеля ACADEMIA Особняк Шувалова",
    alternates: getLocaleAlternates("/reviews/", "ru"),
};

const reviewPlatforms = [
    {
        name: "Яндекс Карты",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/ya-maps.avif",
        href: "https://yandex.ru/maps/org/akademia_osobnyak_shuvalova/71619247470/?ll=30.345467%2C59.945058&utm_source=share&z=16",
    },
    {
        name: "2ГИС",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/2gis.avif",
        href: "https://2gis.ru/spb/firm/70000001069338040",
    },
    {
        name: "Островок",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/Frame-48.avif",
        href: "https://ostrovok.ru/hotel/russia/st._petersburg/mid11198066/hotel_ACADEMIA_osobnyak_shuvaloff/?ysclid=lymv8ivhlg401545243",
    },
    {
        name: "Bronevik",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/Frame-49.avif",
        href: "https://bronevik.com/ru/hotel/russia/saint-petersburg/ACADEMIA-shuvaloff-mansion-ACADEMIA-shuvalov-mansion",
    },
];

export default function Reviews() {
    return (
        <main className="my-10 xl:my-12">
            <FadeUp className="mx-auto w-full max-w-7xl px-4 xl:px-0">
                <h1>Спасибо, что выбрали отель ACADEMIA Особняк Шувалова</h1>
                <p className="mt-6">
                    Будем благодарны если Вы оставите о нас отзыв на одной из
                    платформ представленных ниже!
                </p>
            </FadeUp>

            <section className="mx-auto w-full max-w-7xl px-4 xl:px-0 mt-4 xl:mt-8">
                <FadeUp>
                    <p className="font-bold">Оценить отель на:</p>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {reviewPlatforms.map((platform) => (
                            <a
                                key={platform.name}
                                href={platform.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Оставить отзыв на ${platform.name}`}
                                className="flex aspect-video items-center justify-center rounded-md bg-brand-light p-8 transition-opacity hover:opacity-80"
                            >
                                <Image
                                    src={platform.image}
                                    alt={platform.name}
                                    width={360}
                                    height={120}
                                    className="w-full object-contain"
                                />
                            </a>
                        ))}
                        <ReviewsWidgetToggle
                            buttonLabel="Отзывы со всех источников на нашем сайте"
                            title="Отзывы"
                        />
                    </div>
                </FadeUp>
            </section>
        </main>
    );
}
