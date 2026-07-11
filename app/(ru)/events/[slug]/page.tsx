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
    return eventDetailParams("ru");
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
    return eventDetailMetadata("ru", params);
}

export default function EventPage({ params }: Props) {
    return <EventDetailPage params={params} locale="ru" />;
}
