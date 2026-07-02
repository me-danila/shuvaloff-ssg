import type { Metadata } from "next";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import ReviewsWidgetToggle from "@/components/ui/ReviewsWidgetToggle";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Reviews — ACADEMIA Mansion Shuvaloff",
    description: "Guest reviews for ACADEMIA Mansion Shuvaloff",
    alternates: getLocaleAlternates("/reviews/", "en"),
};

const reviewPlatforms = [
    {
        name: "Yandex Maps",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/ya-maps.avif",
        href: "https://yandex.ru/maps/org/akademia_osobnyak_shuvalova/71619247470/?ll=30.345467%2C59.945058&utm_source=share&z=16",
    },
    {
        name: "2GIS",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/2gis.avif",
        href: "https://2gis.ru/spb/firm/70000001069338040",
    },
    {
        name: "Ostrovok",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/Frame-48.avif",
        href: "https://ostrovok.ru/hotel/russia/st._petersburg/mid11198066/hotel_ACADEMIA_osobnyak_shuvaloff/?ysclid=lymv8ivhlg401545243",
    },
    {
        name: "Bronevik",
        image: "https://academia.spb.ru/wp-content/uploads/2025/10/Frame-49.avif",
        href: "https://bronevik.com/ru/hotel/russia/saint-petersburg/ACADEMIA-shuvaloff-mansion-ACADEMIA-shuvalov-mansion",
    },
];

export default function EnReviews() {
    return (
        <main className="mt-10 -mb-10 xl:mt-12 xl:-mb-20">
            <FadeUp className="mx-auto w-full max-w-7xl px-4">
                <h1>Thank you for choosing ACADEMIA Mansion Shuvaloff hotel</h1>
                <p className="mt-6">
                    We would be grateful if you leave us a review on one of the
                    platforms listed below!
                </p>
            </FadeUp>

            <section className="mx-auto mt-12 w-full max-w-7xl px-4">
                <FadeUp>
                    <p className="font-bold">Rate the hotel on:</p>
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {reviewPlatforms.map((platform) => (
                            <a
                                key={platform.name}
                                href={platform.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Leave a review on ${platform.name}`}
                                className="flex items-center justify-center rounded-md bg-brand-light p-8 transition-opacity hover:opacity-80"
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
                            buttonLabel="Reviews from all sources on our website"
                            title="Reviews"
                        />
                    </div>
                </FadeUp>
            </section>
        </main>
    );
}
