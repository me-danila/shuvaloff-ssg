import CardServiceBig from "@/components/ui/CardServiceBig";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { AllServices } from "@/data/ServicesData";
import type { Locale } from "@/lib/i18n/routing";

type ServicesGridItem = {
    title: string;
    imgUrl: string;
    slug?: string;
    externalLink?: string;
};

type ServicesGridProps = {
    locale: Locale;
    services?: ServicesGridItem[];
};

export default function ServicesGrid({
    locale,
    services: servicesProp,
}: ServicesGridProps) {
    const services = servicesProp ?? AllServices[locale];

    return (
        <StaggerContainer
            amount="some"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
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
