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
    return serviceDetailParams("ru");
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
    return serviceDetailMetadata("ru", params);
}

export default function ServicePage({ params }: Props) {
    return <ServiceDetailPage params={params} locale="ru" />;
}
