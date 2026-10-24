import {
    ArrowRightIcon,
    ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import SkipLink from "@/components/a11y/SkipLink";
import PoseidonFooter from "@/components/poseidon/PoseidonFooter";
import PoseidonForm from "@/components/poseidon/PoseidonForm";
import PoseidonHeader from "@/components/poseidon/PoseidonHeader";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import { FadeIn, FadeUp } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { Parallax } from "@/components/ui/Parallax";
import {
    POSEIDON_PATH,
    poseidonCopy,
    poseidonImages,
    poseidonLegal,
    poseidonSeo,
} from "@/data/poseidonData";
import { buildWebPageSchema } from "@/lib/seo/schema";

const FORM_ID = "invitation";

// Подзаголовок-«надстрочник» секций: Century Gothic капсом с разрядкой.
const EYEBROW =
    "text-sm uppercase tracking-[0.2em] text-neutral-900 xl:text-base xl:tracking-[0.25em]";
// Заголовки секций: History Pro без жирности, как в макете.
const H2 =
    "font-normal text-[28px] leading-[1.1] text-neutral-900 xl:text-[40px]";
const MUTED = "text-[#605f5c]";

function CtaButton({ className = "" }: { className?: string }) {
    return (
        <Button
            href={`#${FORM_ID}`}
            size="sm"
            className={`whitespace-nowrap xl:text-[15px] ${className}`}
        >
            <span className="flex items-center gap-3">
                {poseidonCopy.form.submit}
                <ArrowRightIcon size={22} weight="light" aria-hidden="true" />
            </span>
        </Button>
    );
}

/**
 * Промо-страница /poseidon/: розыгрыш «Графских выходных» для гостей
 * ресторана «Посейдон». Своя «рамка» (хедер с логотипами партнеров и
 * футер-баннеры), без SiteShell основного сайта; кнопки, шрифты и цвета —
 * общие.
 */
export default function PoseidonPage() {
    const { hero, form, prize, steps, faq } = poseidonCopy;

    return (
        <div className="bg-[#f2efe8] text-neutral-900">
            <StructuredData
                data={buildWebPageSchema({
                    locale: "ru",
                    path: POSEIDON_PATH,
                    name: poseidonSeo.name,
                    description: poseidonSeo.description,
                    breadcrumbs: [
                        { name: "Главная", path: "/" },
                        { name: poseidonSeo.name, path: POSEIDON_PATH },
                    ],
                })}
            />
            <SkipLink locale="ru" />
            <PoseidonHeader />

            <main
                id="main-content"
                tabIndex={-1}
                className="focus:outline-none"
            >
                {/* Hero: фото особняка, текст внизу кадра. Нижний отступ
                    оставляет место карточке с формой, которая наезжает на кадр. */}
                <section className="relative flex min-h-[690px] flex-col justify-end overflow-hidden px-6 pb-[150px] text-center text-white xl:min-h-[842px] xl:pb-[180px]">
                    <FadeIn
                        mode="mount"
                        duration={0.9}
                        className="absolute inset-0"
                    >
                        <Parallax
                            className="relative h-full w-full"
                            offset={80}
                        >
                            <Image
                                src={poseidonImages.hero}
                                alt="Фасад особняка Шувалова на Моховой улице"
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover object-[62%_center] xl:object-center"
                            />
                        </Parallax>
                    </FadeIn>
                    {/* Затемнение как в макете: ровный фильтр по всему кадру +
                        маска — градиент, плотнеющий от середины кадра к низу,
                        под заголовком и карточкой. */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-black/35"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_22%,rgb(0_0_0/0.05)_33%,rgb(0_0_0/0.28)_52%,rgb(0_0_0/0.35)_70%)]"
                    />
                    <FadeUp
                        mode="mount"
                        delay={0.2}
                        className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 xl:gap-8"
                    >
                        <p className="whitespace-pre-line text-base/snug uppercase tracking-[0.15em] xl:whitespace-normal xl:max-w-none xl:text-base xl:tracking-[0.25em]">
                            {hero.eyebrow}
                        </p>
                        <h1 className="max-w-[300px] text-balance text-[38px] font-normal leading-[1.08] xl:max-w-none xl:text-[55px] xl:leading-[1.1]">
                            {/* Десктоп — три строки, как в макете; мобила — по ширине. */}
                            {hero.title.map((line, index) => (
                                <span key={line} className="xl:block">
                                    {index > 0 && " "}
                                    {line}
                                </span>
                            ))}
                        </h1>
                    </FadeUp>
                </section>

                {/* Карточка-приглашение с формой. */}
                <section
                    id={FORM_ID}
                    className="relative z-10 -mt-[120px] scroll-mt-6 px-5 xl:-mt-[136px] xl:px-6"
                >
                    <FadeUp
                        mode="mount"
                        delay={0.35}
                        className="mx-auto max-w-[1020px] rounded-[20px] bg-[#f4f1eb] p-2 shadow-[0_20px_50px_-20px_rgba(55,42,36,0.25)]"
                    >
                        <div className="grid gap-6 rounded-2xl border border-[#bca589] px-6 py-10 xl:grid-cols-[1fr_auto_1fr] xl:gap-12 xl:px-12 xl:py-12">
                            <div className="flex flex-col text-center xl:justify-between xl:text-left">
                                <div>
                                    <h2 className="whitespace-pre-line font-century-v2 text-[20px] font-normal leading-[1.2] text-brand-red xl:text-[28px]">
                                        {form.title}
                                    </h2>
                                    <p
                                        className={`mt-3 whitespace-pre-line text-[15px]/6 xl:mt-4 xl:text-base/6 ${MUTED}`}
                                    >
                                        {form.intro}
                                    </p>
                                </div>
                                <div className="mt-8 flex flex-col items-center gap-3 border-t border-[#e3dbcf] pt-8 xl:mt-10 xl:flex-row xl:gap-7 xl:pt-10">
                                    <span className="text-[40px] leading-none text-brand-red xl:text-[48px]">
                                        {form.discount}
                                    </span>
                                    <p
                                        className={`text-sm/5 xl:hidden ${MUTED}`}
                                    >
                                        {form.discountNoteMobile}
                                    </p>
                                    <p
                                        className={`hidden whitespace-pre-line text-[12px] leading-snug xl:block ${MUTED}`}
                                    >
                                        {form.discountNoteDesktop}
                                    </p>
                                </div>
                            </div>

                            {/* Вертикальный разделитель с геральдической лилией. */}
                            <div
                                aria-hidden="true"
                                className="hidden flex-col items-center gap-2 xl:flex"
                            >
                                <div className="w-px flex-1 bg-[#bca589]" />
                                <Image
                                    src={poseidonImages.fleur}
                                    alt=""
                                    width={16}
                                    height={17}
                                    sizes="32px"
                                />
                                <div className="w-px flex-1 bg-[#bca589]" />
                            </div>

                            <PoseidonForm />
                        </div>
                    </FadeUp>
                </section>

                {/* Приз. */}
                <section className="pt-20 xl:pt-28">
                    <FadeUp className="px-5 xl:px-6 xl:text-center">
                        <p className={EYEBROW}>{prize.eyebrow}</p>
                        <h2
                            className={`mt-5 xl:mx-auto xl:max-w-[640px] ${H2}`}
                        >
                            {prize.title}
                        </h2>
                        <p
                            className={`mt-5 text-[15px]/6 xl:text-base/6 ${MUTED}`}
                        >
                            {prize.text[0]}
                            <br />
                            {prize.text[1]}
                        </p>
                    </FadeUp>
                    <div className="mt-8 grid gap-0 xl:mt-10 xl:grid-cols-2 xl:gap-2.5">
                        {prize.items.map((item) => (
                            <figure
                                key={item.label}
                                className="relative aspect-[360/400] overflow-hidden xl:aspect-[692/430]"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    loading="lazy"
                                    sizes="(min-width: 1200px) 50vw, 100vw"
                                    className="object-cover"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/45 to-transparent"
                                />
                                <figcaption className="absolute inset-x-5 bottom-8 text-lg uppercase tracking-[0.2em] text-white xl:inset-x-6 xl:bottom-9 xl:text-center xl:text-xl">
                                    {item.label}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </section>

                {/* Три шага. */}
                <section className="px-5 pt-20 pb-12 xl:px-6 xl:pt-28 xl:pb-16">
                    <div className="mx-auto max-w-[1160px]">
                        <FadeUp className="xl:text-center">
                            <p className={EYEBROW}>{steps.eyebrow}</p>
                            <h2
                                className={`mt-5 max-w-[320px] xl:max-w-none ${H2}`}
                            >
                                {steps.title}
                            </h2>
                        </FadeUp>
                        <ol className="mt-12 grid gap-12 xl:mt-16 xl:grid-cols-3 xl:gap-10">
                            {steps.items.map((step, index) => (
                                <li key={step.numeral} className="list-none">
                                    <FadeUp delay={index * 0.1}>
                                        <span
                                            aria-hidden="true"
                                            className="inline-flex size-7 items-center justify-center rounded-md bg-[#eae5de] text-[15px] text-brand-red"
                                        >
                                            {step.numeral}
                                        </span>
                                        <h3 className="mt-8 text-lg font-normal uppercase xl:mt-10 xl:text-xl">
                                            {step.title}
                                        </h3>
                                        <p
                                            className={`mt-3 max-w-[370px] text-base/6 ${MUTED}`}
                                        >
                                            {step.text}
                                        </p>
                                    </FadeUp>
                                </li>
                            ))}
                        </ol>
                        <CtaButton className="mt-12 w-full xl:hidden" />
                    </div>
                </section>

                {/* Фото-полоса с кнопкой (кнопка на фото — только десктоп). */}
                <section className="relative flex h-[290px] items-center justify-center overflow-hidden xl:h-[365px]">
                    <Image
                        src={poseidonImages.cta}
                        alt={steps.ctaAlt}
                        fill
                        loading="lazy"
                        sizes="100vw"
                        className="object-cover object-[70%_center] xl:object-center"
                    />
                    <div className="relative hidden xl:block">
                        <CtaButton className="w-[425px]" />
                    </div>
                </section>

                {/* Условия участия. */}
                <section
                    id="conditions"
                    className="scroll-mt-6 px-5 pt-14 pb-16 xl:px-6 xl:pt-28 xl:pb-24"
                >
                    <div className="mx-auto grid max-w-[1160px] gap-8 xl:grid-cols-[1fr_600px] xl:gap-16">
                        <FadeUp className="flex flex-col">
                            <p className={EYEBROW}>{faq.eyebrow}</p>
                            <h2 className={`mt-5 ${H2}`}>{faq.title}</h2>
                            <a
                                href={poseidonLegal.rules.href}
                                className="mt-24 hidden w-fit items-center gap-1 border-b border-brand-red pb-0.5 text-lg text-brand-red transition-colors hover:border-brand-red-dark hover:text-brand-red-dark xl:inline-flex"
                            >
                                {faq.rulesLabel}
                                <ArrowUpRightIcon size={14} weight="bold" />
                            </a>
                        </FadeUp>
                        <FadeUp delay={0.1}>
                            <div className="border-t border-[#d8d3cb]">
                                {faq.items.map((item) => (
                                    <details
                                        key={item.question}
                                        className="group border-b border-[#d8d3cb]"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-base/6 [&::-webkit-details-marker]:hidden">
                                            {item.question}
                                            <span
                                                aria-hidden="true"
                                                className="relative size-3.5 shrink-0 text-brand-red transition-transform duration-300 group-open:rotate-45"
                                            >
                                                <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
                                                <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current" />
                                            </span>
                                        </summary>
                                        <p
                                            className={`-mt-2 pb-7 pr-10 text-base/6 ${MUTED}`}
                                        >
                                            {item.answer}
                                        </p>
                                    </details>
                                ))}
                            </div>
                            <a
                                href={poseidonLegal.rules.href}
                                className="mt-10 inline-flex items-center gap-1 border-b border-brand-red pb-0.5 text-lg text-brand-red xl:hidden"
                            >
                                {faq.rulesLabel}
                                <ArrowUpRightIcon size={14} weight="bold" />
                            </a>
                        </FadeUp>
                    </div>
                </section>
            </main>

            <PoseidonFooter />
        </div>
    );
}
