import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import ServicesSlider from "@/components/ui/slider/ServicesSlider";
import { AllServices } from "@/data/ServicesData";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/routing";
import { buildServiceSchema } from "@/lib/seo/schema";
import { ORDER_URL } from "@/lib/seo/site";

type Props = {
    params: Promise<{ slug: string }>;
    locale: Locale;
};

type ServiceDetailLabels = {
    brandSuffix: string;
    breadcrumbHome: string;
    breadcrumbServices: string;
    price: string;
    order: string;
    otherServices: string;
};

const labelsByLocale: Record<Locale, ServiceDetailLabels> = {
    ru: {
        brandSuffix: "— ACADEMIA Особняк Шувалова",
        breadcrumbHome: "Главная",
        breadcrumbServices: "Услуги",
        price: "Стоимость: ",
        order: "Заказать",
        otherServices: "Другие услуги",
    },
    en: {
        brandSuffix: "— ACADEMIA Shuvaloff Mansion",
        breadcrumbHome: "Home",
        breadcrumbServices: "Services",
        price: "Price: ",
        order: "Order",
        otherServices: "Other services",
    },
};

export function serviceDetailParams(locale: Locale) {
    return AllServices[locale]
        .filter((s) => s.slug && s.slug !== "pets")
        .map((s) => ({ slug: s.slug }));
}

export async function serviceDetailMetadata(
    locale: Locale,
    params: Props["params"],
): Promise<Metadata> {
    const { slug } = await params;
    const service = AllServices[locale].find((s) => s.slug === slug);
    if (!service) return {};
    return buildPageMetadata({
        locale,
        path: `/services/${slug}/`,
        title: `${service.title} ${labelsByLocale[locale].brandSuffix}`,
        description: service.subtitle,
        ogImage: service.imgUrl,
    });
}

export default async function ServiceDetailPage({ params, locale }: Props) {
    const { slug } = await params;
    const service = AllServices[locale].find((s) => s.slug === slug);
    if (!service) notFound();

    const labels = labelsByLocale[locale];

    const otherServices = AllServices[locale].filter(
        (s) => s.slug && !s.externalLink && s.slug !== slug,
    );

    return (
        <main
            className="flex flex-col gap-8"
            itemScope
            itemType="https://schema.org/WebPage"
        >
            <StructuredData
                data={buildServiceSchema({
                    locale,
                    path: `/services/${slug}/`,
                    service,
                    breadcrumbs: [
                        { name: labels.breadcrumbHome, path: "/" },
                        { name: labels.breadcrumbServices, path: "/services/" },
                        { name: service.title, path: `/services/${slug}/` },
                    ],
                })}
            />
            <section className="flex flex-col gap-4 m-6 xl:w-full xl:max-w-7xl xl:mx-auto">
                <FadeUp className="md:text-center my-4">
                    <h1>{service.title}</h1>
                </FadeUp>
                <div className="flex flex-col xl:flex-row-reverse xl:items-start gap-6 xl:gap-8">
                    <FadeUp className="relative w-full aspect-4/3 xl:aspect-square rounded-md overflow-hidden xl:flex-1">
                        <Image
                            src={service.imgUrl}
                            alt={service.title}
                            fill
                            priority
                            sizes="(max-width: 1280px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </FadeUp>

                    <div className="flex flex-col gap-4 xl:flex-1 xl:gap-3">
                        <FadeUp delay={0.1}>
                            <p>{service.subtitle}</p>
                        </FadeUp>
                        {service.fullDescription && (
                            <FadeUp delay={0.2} className="mb-2 xl:mb-4">
                                <p>{service.fullDescription}</p>
                            </FadeUp>
                        )}

                        {service.links && service.links.length > 0 && (
                            <StaggerContainer
                                delay={0.3}
                                className="flex flex-col gap-1"
                            >
                                {service.links.map((link) => (
                                    <StaggerItem key={link.href}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-brand-brown"
                                        >
                                            {link.label}
                                            <span className="text-xl">
                                                &rsaquo;
                                            </span>
                                        </a>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        )}

                        <FadeUp delay={0.4}>
                            {service.price && (
                                <p className="mt-2 italic">
                                    {labels.price}
                                    {service.price}
                                </p>
                            )}
                            {service.comment && <p>{service.comment}</p>}

                            <Button
                                href={ORDER_URL}
                                target="_blank"
                                variant="primary"
                                size="xl"
                                className="self-start mt-3"
                            >
                                {labels.order}
                            </Button>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {otherServices.length > 0 && (
                <section className="bg-brand-light py-8 xl:py-12">
                    <div className="flex flex-col gap-6 mx-6 xl:w-full xl:max-w-7xl xl:mx-auto">
                        <FadeUp>
                            <h2 className="text-center xl:text-4xl">
                                {labels.otherServices}
                            </h2>
                        </FadeUp>
                        <ServicesSlider services={otherServices} />
                    </div>
                </section>
            )}

            <Divider />
            <ContactsSection />
        </main>
    );
}
