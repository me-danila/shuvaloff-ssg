import StructuredData from "@/components/seo/StructuredData";
import DividerHistory from "@/components/ui/divider/History";
import { FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { HistoryContent, type HistoryDetail } from "@/data/HistoryContent";
import type { Locale } from "@/lib/i18n/routing";
import { buildHistoryPageSchema } from "@/lib/seo/schema";

/**
 * Единый серверный компонент страницы «История особняка графа Шувалова».
 * RU и EN рендерят одну и ту же бесповторную JSX-структуру (38 секций),
 * подставляя строки из HistoryContent[locale]. RU-вывод — эталон, совпадает
 * байт-в-байт с прежней app/history/page.tsx.
 */

// Повторяющийся блок «антикварная деталь» люксов (16 секций: 8 в люксе
// Дашковой, 8 — в люксе Шувалова): разделитель, изображение, разделитель,
// опциональный заголовок и абзацы. Пункт без заголовка (h3) — «Бокал кувшинка».
function HistoryDetailSection({ detail }: { detail: HistoryDetail }) {
    return (
        <FadeUp duration={1.2}>
            <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                <DividerHistory style={2} />
                <Image
                    src={detail.image.src}
                    alt={detail.image.alt}
                    width={detail.image.width}
                    height={detail.image.height}
                    loading="lazy"
                    className={
                        detail.image.className ?? "object-contain mx-auto"
                    }
                />
                <DividerHistory style={3} />
                {detail.heading ? (
                    <h3 className="text-xl font-history uppercase">
                        {detail.heading}
                    </h3>
                ) : null}
                {detail.paragraphs.map((paragraph) => (
                    <p key={paragraph.id}>{paragraph.body}</p>
                ))}
            </section>
        </FadeUp>
    );
}

export default function HistoryPage({ locale }: { locale: Locale }) {
    const c = HistoryContent[locale];

    return (
        <main className="flex flex-col gap-6 xl:gap-6">
            <StructuredData
                data={buildHistoryPageSchema({
                    locale,
                    path: "/history/",
                    name: c.schemaName,
                    description: c.schemaDescription,
                    breadcrumbs: [
                        {
                            name: c.breadcrumbName,
                            path: "/history/",
                        },
                    ],
                })}
            />
            <FadeUp duration={1.2}>
                <section className="flex flex-col gap-6 mx-6 text-center xl:mx-auto mt-6 xl:max-w-3xl">
                    <FadeUp>
                        <h1>{c.heroTitle}</h1>
                    </FadeUp>
                    <FadeUp
                        delay={0.1}
                        className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl mx-auto xl:-mt-4"
                    >
                        {c.heroSubtitle}
                    </FadeUp>
                    <FadeUp delay={0.2}>{c.heroIntro1}</FadeUp>
                    <FadeUp delay={0.3}>
                        <p>{c.heroIntro2}</p>
                    </FadeUp>
                    <DividerHistory style={1} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <FadeUp duration={1.2}>
                    <section className="relative h-90 overflow-hidden rounded-lg xl:rounded-md xl:h-150">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/03/Антиквариат-в-резиденциях-Дашковой-и-Шувалова_page-0003.jpg"
                            alt={c.heroImageAlt}
                            fill
                            loading="lazy"
                            className="object-cover object-center"
                        />
                    </section>
                </FadeUp>
            </FadeUp>
            <FadeUp duration={1.2}>
                <FadeUp duration={1.2}>
                    <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                        <DividerHistory style={2} />
                        {c.mokhovaya.map((paragraph) => (
                            <p key={paragraph.id}>{paragraph.body}</p>
                        ))}
                        <DividerHistory style={3} />
                    </section>
                </FadeUp>
            </FadeUp>
            <FadeUp duration={1.2}>
                <FadeUp duration={1.2}>
                    <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                        <h2 className="text-center uppercase">
                            {c.mansionHeading}
                        </h2>
                        <p>{c.mansionIntro}</p>
                        <div className="relative my-8 mx-auto aspect-3/1 w-90 xl:w-200 xl:my-10">
                            <Image
                                src="https://academia.spb.ru/wp-content/uploads/2026/03/img13-Photoroom-1.png"
                                alt={c.mansionImageAlt}
                                fill
                                sizes="(max-width: 1200px) 360px, 800px"
                                loading="lazy"
                                className="object-contain"
                            />
                        </div>
                        <DividerHistory style={3} />
                    </section>
                </FadeUp>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    {c.ownership.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    {c.fire.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    {c.postwar.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <Image
                        src="https://academia.spb.ru/wp-content/uploads/2026/03/img27.jpg"
                        alt={c.coatImageAlt}
                        width={360}
                        height={390}
                        loading="lazy"
                        className="object-contain mx-auto"
                    />
                    <h2 className="text-center uppercase">{c.coatHeading}</h2>
                    <p>{c.coatIntro}</p>
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    {c.coatDetails.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <h2 className="text-center uppercase">{c.familyHeading}</h2>
                    {c.family.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 xl:max-w-3xl xl:mx-auto">
                    <div className="relative my-8 mx-auto aspect-square w-90 xl:w-200 xl:my-10">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/03/img250-1.png"
                            alt={c.facadeImageAlt}
                            fill
                            sizes="(max-width: 1200px) 360px, 800px"
                            loading="lazy"
                            className="object-contain"
                        />
                    </div>
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <div className="relative mx-auto aspect-6/5 w-90 xl:w-200">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/03/Антиквариат-в-резиденциях-Дашковой-и-Шувалова_page-0013-2.png"
                            alt={c.countImageAlt}
                            fill
                            sizes="(max-width: 1200px) 360px, 800px"
                            loading="lazy"
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-center uppercase mt-4 text-lg/6 xl:text-2xl">
                        {c.countHeading}
                    </h2>
                    {c.count.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    {c.countLife.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    <div className="relative mx-auto aspect-6/5 w-90 xl:w-200">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/03/Антиквариат-в-резиденциях-Дашковой-и-Шувалова_page-0016-1.png"
                            alt={c.countessImageAlt}
                            fill
                            sizes="(max-width: 1200px) 360px, 800px"
                            loading="lazy"
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-center uppercase mt-4 text-lg/6 xl:text-2xl">
                        {c.countessHeading}
                    </h2>
                    {c.countess.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    {c.countessLife.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <p className="font-alistair text-3xl/8 text-center xl:max-w-lg xl:mx-auto xl:my-6">
                        {c.countessQuote}
                    </p>
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    {c.mansionSpirit.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto">
                    {c.designers.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <p className="font-bold">{c.designersBold}</p>
                    <DividerHistory style={3} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto mt-4">
                    <h2 className="uppercase mt-4 text-xl text-center xl:text-2xl">
                        {c.dashkovaHeading}
                    </h2>
                    {c.dashkovaIntro.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={1} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 xl:max-w-3xl xl:mx-auto my-6">
                    <div className="relative mx-auto aspect-6/5 w-90 xl:w-200">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/03/Антиквариат-в-резиденциях-Дашковой-и-Шувалова_page-0022.jpg"
                            alt={c.dashkovaImageAlt}
                            fill
                            sizes="(max-width: 1200px) 360px, 800px"
                            loading="lazy"
                            className="object-contain"
                        />
                    </div>
                </section>
            </FadeUp>
            {c.dashkovaDetails.map((detail) => (
                <HistoryDetailSection key={detail.id} detail={detail} />
            ))}
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto mt-4">
                    <DividerHistory style={3} />
                    <h2 className="uppercase mt-4 text-xl text-center xl:text-2xl">
                        {c.shuvalovHeading}
                    </h2>
                    {c.shuvalovIntro.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                    <DividerHistory style={1} />
                </section>
            </FadeUp>
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 xl:max-w-3xl xl:mx-auto my-6">
                    <div className="relative mx-auto aspect-6/5 w-90 xl:w-200">
                        <Image
                            src="https://academia.spb.ru/wp-content/uploads/2026/03/Антиквариат-в-резиденциях-Дашковой-и-Шувалова_page-0040.jpg"
                            alt={c.shuvalovImageAlt}
                            fill
                            sizes="(max-width: 1200px) 360px, 800px"
                            loading="lazy"
                            className="object-contain"
                        />
                    </div>
                </section>
            </FadeUp>
            {c.shuvalovDetails.map((detail) => (
                <HistoryDetailSection key={detail.id} detail={detail} />
            ))}
            <FadeUp duration={1.2}>
                <section className="cv-history flex flex-col gap-4 mx-6 xl:max-w-3xl xl:mx-auto mt-4">
                    <DividerHistory style={1} />
                    {c.closing.map((paragraph) => (
                        <p key={paragraph.id}>{paragraph.body}</p>
                    ))}
                </section>
            </FadeUp>
        </main>
    );
}
