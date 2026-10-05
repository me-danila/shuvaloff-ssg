import type React from "react";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import { FadeIn, FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/routing";
import { buildWebPageSchema } from "@/lib/seo/schema";

type PageCopy = {
    title: React.ReactNode;
    additionalTitle: string;
    lead: React.ReactNode;
    nomination: React.ReactNode;
    voteLabel: string;
    imageAlt: string;
};

const VOTE_URL =
    "https://hotelawards.ru/hotels/butik-otel-academia-osobnyak-shuvaloff-2-3/luchshiy-butik-otel";

const copyByLocale: Record<Locale, PageCopy> = {
    ru: {
        title: (
            <>
                Дорогой гость,
                <br />
                нам важен каждый голос!
            </>
        ),
        // Рукописный шрифт — без капса, поэтому «Academia», а не «ACADEMIA».
        additionalTitle:
            "Благодарим вас за выбор коллекции особняков Academia!",
        lead: (
            <>
                Как вы знаете, мы часто участвуем в&nbsp;различных престижных
                премиях и, что особенно приятно, мы побеждаем с&nbsp;помощью
                вашей поддержки!
            </>
        ),
        nomination: (
            <>
                Отель ACADEMIA особняк Шувалова номинирован на&nbsp;премию
                &laquo;Лучший бутик-отель 2026&raquo;
                от&nbsp;&laquo;Национальной гостиничной премии&raquo;
            </>
        ),
        voteLabel: "Проголосовать",
        imageAlt:
            "Особняк Шувалова — номинант премии «Лучший бутик-отель 2026»",
    },
    en: {
        title: (
            <>
                Dear guest,
                <br />
                every vote matters to us!
            </>
        ),
        additionalTitle:
            "Thank you for choosing the Academia mansion collection!",
        lead: "As you know, we often take part in prestigious awards — and, best of all, we win thanks to your support!",
        nomination: (
            <>
                ACADEMIA Shuvaloff Mansion is nominated for &laquo;Best Boutique
                Hotel 2026&raquo; at the National Hotel Award
            </>
        ),
        voteLabel: "Vote",
        imageAlt: "Shuvaloff Mansion — nominee for «Best Boutique Hotel 2026»",
    },
};

const seo = {
    ru: {
        name: "Номинация на премию «Лучший бутик-отель 2026»",
        description:
            "Особняк Шувалова номинирован на «Национальную гостиничную премию» в категории «Лучший бутик-отель 2026». Поддержите нас своим голосом!",
        crumbs: ["Главная"],
    },
    en: {
        name: "Nomination for «Best Boutique Hotel 2026»",
        description:
            "Shuvaloff Mansion is nominated for «Best Boutique Hotel 2026» at the National Hotel Award. Support us with your vote!",
        crumbs: ["Home"],
    },
} as const;

const PAGE_PATH = "/national-award-2026/";

export default function NationalAward2026Page({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];

    return (
        <main>
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: PAGE_PATH,
                    name: seo[locale].name,
                    description: seo[locale].description,
                    breadcrumbs: [
                        { name: seo[locale].crumbs[0], path: "/" },
                        { name: seo[locale].name, path: PAGE_PATH },
                    ],
                })}
            />

            {/* Контент в пределах одного экрана: высоту ограничивает только фото
                (вьюпорт минус шапка и текст), секция — по содержимому. */}
            <section className="mx-6 flex flex-col gap-5 pt-2 xl:mx-auto xl:grid xl:w-full xl:max-w-7xl xl:grid-cols-[26rem_1fr] xl:items-center xl:gap-16 xl:pt-4">
                <FadeIn
                    duration={0.9}
                    className="relative h-[min(32svh,16rem)] min-h-40 overflow-hidden rounded-md xl:h-[min(32rem,calc(100svh-14rem))]"
                >
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/02/02_MMI_9908_327_maxiimov-1.avif"
                        alt={copy.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 26rem, 100vw"
                        loading="eager"
                        className="object-cover"
                    />
                </FadeIn>

                <div className="flex flex-col gap-4 xl:gap-6">
                    <FadeUp mode="mount" delay={0.1}>
                        <h1 className="text-2xl/7 xl:text-4xl/11">
                            {copy.title}
                        </h1>
                    </FadeUp>
                    <FadeUp mode="mount" delay={0.2}>
                        <p className="font-alistair text-2xl/7 xl:text-4xl/10">
                            {copy.additionalTitle}
                        </p>
                    </FadeUp>
                    <FadeUp
                        mode="mount"
                        delay={0.3}
                        className="flex flex-col gap-3 text-sm xl:gap-4 xl:text-base"
                    >
                        <p>{copy.lead}</p>
                        <p className="font-semibold">{copy.nomination}</p>
                    </FadeUp>
                    <FadeUp mode="mount" delay={0.4}>
                        <Button
                            href={VOTE_URL}
                            target="_blank"
                            size="xl"
                            className="w-full xl:w-auto"
                        >
                            {copy.voteLabel}
                        </Button>
                    </FadeUp>
                </div>
            </section>
        </main>
    );
}
