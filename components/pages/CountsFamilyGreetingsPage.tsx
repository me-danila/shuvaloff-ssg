import ContactsSection from "@/components/sections/ContactsSection";
import CountsFamilyRequestSection from "@/components/sections/CountsFamilyRequestSection";
import HeroFullscreen from "@/components/sections/HeroFullscreen";
import PhotoShootStepsSection, {
    type Step,
} from "@/components/sections/PhotoShootStepsSection";
import StructuredData from "@/components/seo/StructuredData";
import CardServiceBig from "@/components/ui/CardServiceBig";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import {
    COUNTS_FAMILY_GREETINGS_PATH,
    countsFamilyCopy,
    countsFamilyImages,
    countsFamilySeo,
    formatRub,
    type GreetingService,
    greetingGroups,
    greetingServices,
} from "@/data/countsFamilyGreetingsData";
import type { Locale } from "@/lib/i18n/routing";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { getAbsoluteUrl } from "@/lib/seo/site";
import { nbsp } from "@/lib/typography";

// Отступ якорных целей под фиксированную шапку (как на соседних страницах).
const SCROLL_MT = "scroll-mt-28 xl:scroll-mt-36";

const buildSteps = (locale: Locale): Step[] =>
    countsFamilyCopy[locale].steps.items.map((step, i) => ({
        id: step.id,
        icon: (
            <span
                aria-hidden="true"
                className="font-history text-3xl xl:text-4xl"
            >
                {i + 1}
            </span>
        ),
        caption: (
            <>
                <strong className="block font-semibold">{step.title}</strong>
                {step.text}
            </>
        ),
    }));

function ServiceDetails({
    service,
    locale,
}: {
    service: GreetingService;
    locale: Locale;
}) {
    return (
        <div className="border-t border-[#372a24]/15 pt-5 text-[#372a24]">
            <p className="font-history text-base font-semibold uppercase">
                {countsFamilyCopy[locale].priceLabel}:
            </p>
            <p className="mt-1 text-lg">
                {formatRub(service.price, service.fromPrice, locale)}
            </p>
            <ul className="mt-3 flex flex-col gap-0.5 text-base">
                {service.includes.map((item) => (
                    <li key={item}>{nbsp(item)}</li>
                ))}
            </ul>
        </div>
    );
}

export default function CountsFamilyGreetingsPage({
    locale,
}: {
    locale: Locale;
}) {
    const copy = countsFamilyCopy[locale];
    const seo = countsFamilySeo[locale];
    const services = greetingServices[locale];
    return (
        <main className="flex flex-col gap-8 xl:gap-12">
            <StructuredData
                data={buildWebPageSchema({
                    locale,
                    path: COUNTS_FAMILY_GREETINGS_PATH,
                    name: seo.name,
                    description: seo.description,
                    image: getAbsoluteUrl(countsFamilyImages.hero),
                    breadcrumbs: [
                        { name: copy.breadcrumbHome, path: "/" },
                        {
                            name: seo.name,
                            path: COUNTS_FAMILY_GREETINGS_PATH,
                        },
                    ],
                    offers: services.map((s) => ({
                        name: s.offerName ?? s.title,
                        description: s.description,
                        price: s.price,
                        minPrice: s.fromPrice,
                        image: s.image,
                    })),
                })}
            />

            {/* 2. Hero — полноэкранный, как на /photo-shoot/. */}
            <HeroFullscreen
                title={copy.hero.title}
                titleClassName="xl:max-w-2xl! xl:mb-2!"
                wideDescription
                withBookingForm
                image={{
                    src: countsFamilyImages.hero,
                    alt: copy.hero.imageAlt,
                    className: "object-[50%_40%]!",
                }}
            />

            {/* 3. Вводный текст и подпись-слоган. */}
            <section className="px-6 text-center text-brand-brown">
                <FadeUp>
                    <p className="mx-auto max-w-3xl text-base leading-relaxed xl:text-lg">
                        {copy.intro}
                    </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <p className="mt-4 font-alistair text-2xl xl:mt-6 xl:text-4xl">
                        {copy.tagline}
                    </p>
                </FadeUp>
            </section>

            {/* 5–6. Группы услуг: 3 / 2 / 1 колонки. */}
            {greetingGroups[locale].map((group) => (
                <section
                    key={group.id}
                    id={group.id}
                    aria-labelledby={`${group.id}-title`}
                    className={`px-6 xl:px-0 ${SCROLL_MT}`}
                >
                    <div className="mx-auto max-w-7xl">
                        <FadeUp>
                            <h2
                                id={`${group.id}-title`}
                                className="text-center text-brand-brown"
                            >
                                {group.title}
                            </h2>
                        </FadeUp>
                        <StaggerContainer className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:mt-10 xl:grid-cols-3">
                            {services
                                .filter((s) => s.group === group.id)
                                .map((service) => (
                                    <StaggerItem
                                        key={service.id}
                                        className="flex"
                                    >
                                        <CardServiceBig
                                            id={service.id}
                                            className={SCROLL_MT}
                                            title={nbsp(service.title)}
                                            imgUrl={service.image}
                                            imgPosition={service.imgPosition}
                                            subtitle={service.description}
                                            details={
                                                <ServiceDetails
                                                    service={service}
                                                    locale={locale}
                                                />
                                            }
                                            backgroundClassName="bg-[#ededeb]"
                                            imageFirst
                                            imageAspectClassName="aspect-4/5"
                                            titleHeightClassName={
                                                // «Особые события»: названия в 1–2 строки —
                                                // общая высота, чтобы описания начинались с одной линии.
                                                group.id === "special"
                                                    ? "md:min-h-[6.5rem]"
                                                    : ""
                                            }
                                            subtitleSpacingClassName="mt-0"
                                            orderOnly
                                        />
                                    </StaggerItem>
                                ))}
                        </StaggerContainer>
                    </div>
                </section>
            ))}

            {/* 7. Как это работает? */}
            <PhotoShootStepsSection
                locale={locale}
                heading={copy.steps.title}
                steps={buildSteps(locale)}
            />

            {/* 8. Условия. */}
            <section className="px-6 xl:px-0">
                <FadeUp className="mx-auto max-w-7xl border border-[#ccad6b] px-5 py-8 text-center text-brand-brown xl:px-12 xl:py-10">
                    <h2>{copy.terms.title}</h2>
                    <ul className="mt-4 flex flex-col gap-1 leading-snug xl:mt-6">
                        {copy.terms.items.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </FadeUp>
            </section>

            {/* 9–10. Финальный CTA, форма и «Спасибо». */}
            <CountsFamilyRequestSection locale={locale} />

            <Divider />
            <ContactsSection />
        </main>
    );
}
