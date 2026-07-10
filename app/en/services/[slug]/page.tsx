import type { Metadata } from "next";
import ServiceDetailPage, {
    serviceDetailMetadata,
    serviceDetailParams,
} from "@/components/pages/ServiceDetailPage";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return serviceDetailParams("en");
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
    return serviceDetailMetadata("en", params);
}

export default function ServicePageEn({ params }: Props) {
    return <ServiceDetailPage params={params} locale="en" />;
}
