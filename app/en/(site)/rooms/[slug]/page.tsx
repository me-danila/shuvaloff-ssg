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
    return roomDetailParams("en");
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
    return roomDetailMetadata("en", params);
}

export default function RoomPageEn({ params }: Props) {
    return <RoomDetailPage params={params} locale="en" />;
}
