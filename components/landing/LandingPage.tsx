import { LANDING_HERO_ATTR } from "@/components/landing/constants";
import LandingServices from "@/components/landing/LandingServices";
import HeroFullscreen from "@/components/sections/HeroFullscreen";
import type { LandingDictionary } from "@/data/landing";

/** Кадр первого экрана — тот же, что в hero главной. */
const HERO_IMAGE =
    "https://academia.spb.ru/wp-content/uploads/2026/06/ChatGPT-Image-28-%D0%BC%D0%B0%D1%8F-2026-%D0%B3.-15_43_59-1-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg";

/**
 * Тело лендинга. Секции из ТЗ собираются здесь по порядку; каждая читает
 * свою часть словаря и пропускается, если на языке её нет.
 */
export default function LandingPage({ dict }: { dict: LandingDictionary }) {
    return (
        <>
            {/* Hero: название, подзаголовок, модуль бронирования TravelLine. */}
            <HeroFullscreen
                title={dict.hero.title}
                caption={dict.hero.subtitle}
                image={{ src: HERO_IMAGE, alt: dict.hero.title }}
                gradient
                withBookingForm
                tightTitle
                wideDescription
                // Мобила — пропорции hero главной (8:11), десктоп — 80vh.
                frameSizeClassName="aspect-8/11 xl:aspect-[unset] xl:h-[80vh] xl:min-h-[40rem]"
                frameData={{ [LANDING_HERO_ATTR]: "" }}
            />
            <LandingServices dict={dict.services} />
        </>
    );
}
