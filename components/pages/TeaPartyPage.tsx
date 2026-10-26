"use client";

import { ChampagneIcon, CoffeeIcon } from "@phosphor-icons/react/dist/ssr";
import HeroFullscreen from "@/components/sections/HeroFullscreen";
import PhotoStripSection from "@/components/sections/PhotoStripSection";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import {
    TEA_PARTY_BOOK_URL,
    TEA_PARTY_PATH,
    TEA_PARTY_VIDEO,
    teaPartyCopy,
    teaPartyImages,
    teaPartySeo,
} from "@/data/teaPartyData";
import { type Locale, localizeHref } from "@/lib/i18n/routing";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { getAbsoluteUrl, ORDER_URL } from "@/lib/seo/site";

// Орнамент-разделитель сайта (тот же, что в components/ui/Divider).
const DIVIDER_SRC =
    "https://academia.spb.ru/wp-content/uploads/2026/03/divider.png";

/** /tea-party/ и /en/tea-party/ — «Чаепитие у графини», по образцу страницы графского завтрака. */
export default function TeaPartyPage({ locale }: { locale: Locale }) {
    const copy = teaPartyCopy[locale];
    const seo = teaPartySeo[locale];
    return (
        <main className="flex flex-col gap-4 xl:gap-16">
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: TEA_PARTY_PATH,
                    name: seo.name,
                    description: seo.description,
                    image: getAbsoluteUrl(teaPartyImages.hero),
                    breadcrumbs: [
                        { name: copy.breadcrumbHome, path: "/" },
                        { name: seo.name, path: TEA_PARTY_PATH },
                    ],
                })}
            />

            <HeroFullscreen
                title={copy.title}
                description={copy.subtitle}
                image={{ src: teaPartyImages.hero, alt: copy.heroAlt }}
                compactMobile
                gradient
                actions={
                    <Button
                        href={TEA_PARTY_BOOK_URL}
                        target="_blank"
                        variant="primary"
                    >
                        {copy.bookLabel}
                    </Button>
                }
            />

            {/* Текст и вертикальное видео 720×1280 одним блоком: на md+ текст
                слева, видео справа; на мобиле — текст над видео. */}
            <section className="grid grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 xl:w-full xl:max-w-7xl xl:mx-auto xl:gap-16 xl:px-0">
                <FadeUp className="flex flex-col gap-4 xl:gap-6">
                    <h2 className="text-xl/snug xl:text-[28px]/snug">
                        {copy.serving}
                    </h2>
                    <p>{copy.description}</p>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="mx-auto aspect-9/16 w-full overflow-hidden rounded-lg md:max-h-[80vh] md:w-auto md:h-[46rem] xl:rounded-xl"
                >
                    <video
                        src={TEA_PARTY_VIDEO}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                    />
                </FadeUp>
            </section>

            {/* Меню и время подачи — раскладка как на сайте ресторана
                (две колонки в карточке, рамка с орнаментом), стили сайта. */}
            <section className="bg-brand-light px-4 py-10 xl:py-16">
                <div className="flex flex-col gap-10 xl:mx-auto xl:max-w-6xl xl:gap-14">
                    <FadeUp className="grid grid-cols-1 rounded-xl bg-white px-5 py-8 md:grid-cols-2 md:divide-x md:divide-stone-200 md:px-0 xl:py-12">
                        {copy.menus.map((menu, idx) => {
                            const MenuIcon =
                                menu.icon === "tea"
                                    ? CoffeeIcon
                                    : ChampagneIcon;
                            return (
                                <div
                                    key={menu.title}
                                    className={`flex flex-col md:px-8 xl:px-14 ${idx > 0 ? "mt-10 border-t border-stone-200 pt-10 md:mt-0 md:border-t-0 md:pt-0" : ""}`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <MenuIcon
                                            size={56}
                                            weight="thin"
                                            aria-hidden="true"
                                            className="text-brand-red"
                                        />
                                        <h3 className="mt-4 font-history font-normal text-2xl uppercase xl:text-[28px]">
                                            {menu.title}
                                        </h3>
                                        <p className="mt-1 text-stone-500">
                                            {menu.note}
                                        </p>
                                        <span
                                            aria-hidden="true"
                                            className="my-5 h-px w-12 bg-brand-red/40"
                                        />
                                        <p className="font-history text-2xl text-brand-red xl:text-[28px]">
                                            {menu.price}
                                        </p>
                                    </div>
                                    <ul className="mt-8 mb-10 flex flex-col gap-4">
                                        {menu.items.map((item) => (
                                            <li
                                                key={item.name}
                                                className="relative pl-5"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute top-[0.6em] left-0 size-1.5 rotate-45 bg-brand-red"
                                                />
                                                <p>{item.name}</p>
                                                {item.details && (
                                                    <p className="text-xs/5 text-stone-500 xl:text-sm/6">
                                                        {item.details}
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        href={ORDER_URL}
                                        target="_blank"
                                        variant="primary"
                                        size="sm"
                                        className="mt-auto w-full"
                                    >
                                        {copy.orderLabel}
                                    </Button>
                                </div>
                            );
                        })}
                    </FadeUp>

                    <FadeUp className="relative rounded-xl border border-brand-red/40 px-6 pt-10 pb-8 text-center xl:pt-12 xl:pb-10">
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-light px-4">
                            <Image
                                src={DIVIDER_SRC}
                                width={149}
                                height={42}
                                alt=""
                            />
                        </span>
                        <h2 className="font-normal text-xl text-brand-red xl:text-[28px]">
                            {copy.scheduleLabel}
                        </h2>
                        <p className="mt-3 text-stone-500">{copy.schedule}</p>
                    </FadeUp>

                    <FadeUp className="flex flex-col justify-center gap-4 xl:flex-row">
                        <Button
                            href={ORDER_URL}
                            target="_blank"
                            variant="primary"
                            size="sm"
                        >
                            {copy.bookTeaLabel}
                        </Button>
                        <Button
                            href={localizeHref("/booking/", locale)}
                            variant="primary-outline"
                            size="sm"
                        >
                            {copy.bookHotelLabel}
                        </Button>
                    </FadeUp>
                </div>
            </section>

            <PhotoStripSection images={teaPartyImages.gallery[locale]} />
        </main>
    );
}
