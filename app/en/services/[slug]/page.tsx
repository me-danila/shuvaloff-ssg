import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import ServicesSlider from "@/components/ui/slider/ServicesSlider";
import { AllServices } from "@/data/ServicesData";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return AllServices.en.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = AllServices.en.find((s) => s.slug === slug);
    if (!service) return {};
    return {
        title: `${service.title} — ACADEMIA Shuvaloff Mansion`,
        description: service.subtitle,
        alternates: getLocaleAlternates(`/services/${slug}/`, "en"),
    };
}

export default async function ServicePageEn({ params }: Props) {
    const { slug } = await params;
    const service = AllServices.en.find((s) => s.slug === slug);
    if (!service) notFound();

    const otherServices = AllServices.en.filter(
        (s) => s.slug && !s.externalLink && s.slug !== slug,
    );

    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:w-full xl:max-w-6xl xl:mx-auto">
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
                                            className="flex items-center gap-3 text-brand-blue"
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
                                    Price: {service.price}
                                </p>
                            )}
                            {service.comment && (
                                <p className="-mt-2 xl:-mt-3">
                                    {service.comment}
                                </p>
                            )}

                            <Button
                                href="https://t.me/+79668342743"
                                target="_blank"
                                variant="primary"
                                size="xl"
                                className="self-start mt-3"
                            >
                                Order
                            </Button>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {otherServices.length > 0 && (
                <section className="flex flex-col gap-6 mx-6 xl:w-full xl:max-w-6xl xl:mx-auto">
                    <FadeUp>
                        <h2 className="text-center xl:text-4xl">
                            Other services
                        </h2>
                    </FadeUp>
                    <ServicesSlider services={otherServices} />
                </section>
            )}

            <Divider />
            <ContactsSection />
        </main>
    );
}
