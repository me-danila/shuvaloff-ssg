import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import ServicesSlider from "@/components/ui/slider/ServicesSlider";
import { AllServices } from "@/data/ServicesData";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return AllServices.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = AllServices.find((s) => s.slug === slug);
    if (!service) return {};
    return {
        title: `${service.title} — ACADEMIA Особняк Шувалова`,
        description: service.subtitle,
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const service = AllServices.find((s) => s.slug === slug);
    if (!service) notFound();

    const otherServices = AllServices.filter(
        (s) => s.slug && !s.externalLink && s.slug !== slug,
    );

    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:w-full xl:max-w-6xl xl:mx-auto">
                <h1 className="md:text-center my-4">{service.title}</h1>
                <div className="flex flex-col xl:flex-row-reverse xl:items-start gap-6 xl:gap-8">
                    <div className="relative w-full aspect-4/3 xl:aspect-square rounded-md overflow-hidden xl:flex-1">
                        <Image
                            src={service.imgUrl}
                            alt={service.title}
                            fill
                            priority
                            sizes="(max-width: 1280px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-4 xl:flex-1 xl:gap-3">
                        <p>{service.subtitle}</p>
                        {service.fullDescription && (
                            <p className="mb-2 xl:mb-4">
                                {service.fullDescription}
                            </p>
                        )}

                        {service.links && service.links.length > 0 && (
                            <div className="flex flex-col gap-1">
                                {service.links.map((link) => (
                                    <a
                                        key={link.href}
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
                                ))}
                            </div>
                        )}

                        {service.price && (
                            <p className="mt-2 italic">
                                Стоимость: {service.price}
                            </p>
                        )}
                        {service.comment && (
                            <p className="-mt-2 xl:-mt-3">{service.comment}</p>
                        )}

                        <Button
                            href="https://t.me/+79668342743"
                            target="_blank"
                            variant="primary"
                            size="xl"
                            className="self-start mt-3"
                        >
                            Заказать
                        </Button>
                    </div>
                </div>
            </section>

            {otherServices.length > 0 && (
                <section className="flex flex-col gap-6 mx-6 xl:w-full xl:max-w-6xl xl:mx-auto">
                    <h2 className="text-center xl:text-4xl">Другие услуги</h2>
                    <ServicesSlider services={otherServices} />
                </section>
            )}

            <Divider />
            <ContactsSection />
        </main>
    );
}
