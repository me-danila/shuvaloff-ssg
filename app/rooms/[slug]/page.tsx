import type { Metadata } from "next";
import RoomDetailPage, {
    roomDetailMetadata,
    roomDetailParams,
} from "@/components/pages/RoomDetailPage";

type Props = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return roomDetailParams("ru");
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
    return roomDetailMetadata("ru", params);
}

export default function RoomPage({ params }: Props) {
    return <RoomDetailPage params={params} locale="ru" />;
}
