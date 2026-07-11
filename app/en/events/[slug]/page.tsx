import type { Metadata } from "next";
import EventDetailPage, {
    eventDetailMetadata,
    eventDetailParams,
} from "@/components/pages/EventDetailPage";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return eventDetailParams("en");
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
    return eventDetailMetadata("en", params);
}

export default function EventPageEn({ params }: Props) {
    return <EventDetailPage params={params} locale="en" />;
}
