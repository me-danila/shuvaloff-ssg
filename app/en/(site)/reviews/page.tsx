import type { Metadata } from "next";
import ReviewsPage, { reviewsMetadata } from "@/components/pages/ReviewsPage";

export const metadata: Metadata = reviewsMetadata("en");

export default function EnReviews() {
    return <ReviewsPage locale="en" />;
}
