import type { Metadata } from "next";
import ReviewsPage, { reviewsMetadata } from "@/components/pages/ReviewsPage";

export const metadata: Metadata = reviewsMetadata("ru");

export default function Reviews() {
    return <ReviewsPage locale="ru" />;
}
