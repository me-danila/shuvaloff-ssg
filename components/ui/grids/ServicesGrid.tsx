"use client";

import CardServiceBig from "@/components/ui/CardServiceBig";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { AllServices } from "@/data/ServicesData";
import { useLocale } from "@/lib/i18n/useLocale";

export default function ServicesGrid() {
    const locale = useLocale();
    const services = AllServices[locale];

    return (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {services.map((service) => (
                <StaggerItem key={service.title} className="flex">
                    <CardServiceBig
                        title={service.title}
                        imgUrl={service.imgUrl}
                        slug={service.slug}
                        externalLink={service.externalLink}
                        showOrder
                    />
                </StaggerItem>
            ))}
        </StaggerContainer>
    );
}
