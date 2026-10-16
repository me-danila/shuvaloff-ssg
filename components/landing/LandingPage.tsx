import { LANDING_HERO_ATTR } from "@/components/landing/constants";
import LandingContacts from "@/components/landing/LandingContacts";
import LandingMansion from "@/components/landing/LandingMansion";
import LandingOffers from "@/components/landing/LandingOffers";
import LandingRooms from "@/components/landing/LandingRooms";
import LandingScenarios from "@/components/landing/LandingScenarios";
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
                withBookingForm
                tightTitle
                // Десктоп: название над вывеской «Отель ACADEMIA Особняк
                // Шувалова» на фасаде, подпись остается на месте. Фото —
                // object-cover, вывеска на ~56% высоты кадра, поэтому отступ
                // считается от размеров экрана (0 там, где не перекрывает).
                titleClassName="xl:mb-[max(0px,calc(50vh-4.6vw-290px))]"
                wideDescription
                // Размер и фото — как у hero главной: мобила 8:11, десктоп — весь
                // экран, без затемнения поверх фото.
                frameSizeClassName="aspect-8/11 xl:aspect-[unset] xl:min-h-screen"
                frameData={{ [LANDING_HERO_ATTR]: "" }}
            />
            <LandingServices dict={dict.services} locale={dict.locale} />
            <LandingMansion dict={dict.mansion} />
            <LandingRooms dict={dict.rooms} locale={dict.locale} />
            <LandingOffers dict={dict.offers} locale={dict.locale} />
            <LandingScenarios dict={dict.scenarios} locale={dict.locale} />
            <LandingContacts dict={dict.contacts} locale={dict.locale} />
        </>
    );
}
