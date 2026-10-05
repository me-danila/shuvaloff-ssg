import type { Metadata } from "next";
import NationalAward2026Page from "@/components/pages/NationalAward2026Page";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/national-award-2026/",
    title: "Номинация на премию «Лучший бутик-отель 2026» — ACADEMIA Особняк Шувалова",
    description:
        "Особняк Шувалова номинирован на «Национальную гостиничную премию» в категории «Лучший бутик-отель 2026». Поддержите нас своим голосом!",
});

export default function NationalAward2026() {
    return <NationalAward2026Page locale="ru" />;
}
