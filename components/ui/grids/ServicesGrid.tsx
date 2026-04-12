"use client";

import Button from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { AllServices } from "@/data/ServicesData";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

export default function ServicesGrid() {
    const locale = useLocale();
    const services = AllServices[locale];
    const orderLabel = locale === "ru" ? "Заказать" : "Order";
    const detailsLabel = locale === "ru" ? "Подробнее" : "Details";

    return (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {services.map((service) => {
                const href = service.slug
                    ? localizeHref(`/services/${service.slug}/`, locale)
                    : (service.externalLink ?? "#");
                const isExternal = Boolean(service.externalLink);

                return (
                    <StaggerItem
                        key={service.title}
                        className="relative aspect-square rounded-md overflow-hidden group flex"
                    >
                        <Image
                            src={service.imgUrl}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/50" />
                        <div className="absolute inset-0 flex flex-col justify-between text-white p-6 xl:p-8">
                            <p className="font-baskerville uppercase leading-tight xl:text-2xl">
                                {service.title}
                            </p>
                            <div className="flex items-center gap-4 justify-between">
                                {service.slug && (
                                    <Button
                                        href="https://t.me/+79668342743"
                                        target="_blank"
                                        variant="primary"
                                    >
                                        {orderLabel}
                                    </Button>
                                )}
                                <a
                                    href={href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={
                                        isExternal
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="flex items-center gap-3 uppercase tracking-widest text-sm"
                                >
                                    {detailsLabel}
                                    <span className="text-2xl mb-1">
                                        &rsaquo;
                                    </span>
                                </a>
                            </div>
                        </div>
                    </StaggerItem>
                );
            })}
        </StaggerContainer>
    );
}
