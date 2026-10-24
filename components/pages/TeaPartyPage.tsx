"use client";

import HeroFullscreen from "@/components/sections/HeroFullscreen";
import PhotoStripSection from "@/components/sections/PhotoStripSection";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Motion";
import {
    teaPartyCopy as copy,
    TEA_PARTY_BOOK_URL,
    TEA_PARTY_PATH,
    TEA_PARTY_VIDEO,
    teaPartyImages,
    teaPartySeo,
} from "@/data/teaPartyData";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { getAbsoluteUrl } from "@/lib/seo/site";

/** /tea-party/ — «Чаепитие у графини», по образцу страницы графского завтрака. */
export default function TeaPartyPage() {
    return (
        <main className="flex flex-col gap-4 xl:gap-16">
            <StructuredData
                data={buildWebPageSchema({
                    locale: "ru",
                    path: TEA_PARTY_PATH,
                    name: teaPartySeo.name,
                    description: teaPartySeo.description,
                    image: getAbsoluteUrl(teaPartyImages.hero),
                    breadcrumbs: [
                        { name: "Главная", path: "/" },
                        { name: teaPartySeo.name, path: TEA_PARTY_PATH },
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

            <section className="flex flex-col gap-4 my-6 px-6 xl:text-center w-full xl:max-w-7xl xl:mx-auto xl:px-0">
                <FadeUp className="xl:max-w-3xl xl:mx-auto">
                    <p>{copy.description}</p>
                </FadeUp>
            </section>

            {/* Видео вертикальное 720×1280: в широкий кадр не растягивать.
                На md+ — полоса с размытой копией видео на фоне и чётким
                вертикальным видео по центру; на мобиле — просто видео. */}
            <FadeUp className="relative mx-6 aspect-9/16 overflow-hidden rounded-lg md:mx-0 md:aspect-auto md:h-[80vh] md:max-h-[52rem] md:min-h-[36rem] xl:w-[98%] xl:mx-auto xl:rounded-xl">
                <video
                    src={TEA_PARTY_VIDEO}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="absolute inset-0 hidden h-full w-full scale-110 object-cover blur-xl brightness-75 md:block"
                />
                <div className="relative h-full md:flex md:items-center md:justify-center md:py-8">
                    <video
                        src={TEA_PARTY_VIDEO}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover md:aspect-9/16 md:w-auto md:rounded-md md:shadow-2xl"
                    />
                </div>
            </FadeUp>

            <section className="grid grid-cols-1 gap-8 px-6 md:grid-cols-2 xl:w-full xl:max-w-7xl xl:mx-auto xl:gap-10 xl:px-0">
                {copy.menus.map((menu, idx) => (
                    <FadeUp
                        key={menu.title}
                        delay={idx * 0.1}
                        className="flex flex-col gap-4"
                    >
                        <h3 className="font-alistair font-normal text-blue-800 text-4xl xl:text-5xl">
                            {menu.title}
                        </h3>
                        <div className="flex flex-col gap-[0.1875rem]">
                            <p className="font-semibold text-blue-800">
                                {menu.note}:
                            </p>
                            {menu.items.map((item) => (
                                <p key={item}>• {item}</p>
                            ))}
                        </div>
                        <p className="italic">{menu.price}</p>
                    </FadeUp>
                ))}
            </section>

            <section className="flex flex-col gap-4 my-6 px-6 xl:text-center w-full xl:max-w-4xl xl:mx-auto xl:px-0 xl:gap-6">
                <FadeUp className="xl:max-w-2xl xl:mx-auto">
                    <p>
                        <strong>{copy.scheduleLabel}</strong>
                        <br />
                        {copy.schedule}
                    </p>
                </FadeUp>
                <FadeUp className="flex flex-col gap-4 justify-center xl:flex-row">
                    <Button
                        href={TEA_PARTY_BOOK_URL}
                        target="_blank"
                        variant="primary"
                        size="sm"
                    >
                        {copy.bookTeaLabel}
                    </Button>
                    <Button
                        href="/booking/"
                        variant="primary-outline"
                        size="sm"
                    >
                        {copy.bookHotelLabel}
                    </Button>
                </FadeUp>
            </section>

            <PhotoStripSection images={teaPartyImages.gallery} />
        </main>
    );
}
