import type { Metadata } from "next";
import PetsPage from "@/components/pages/PetsPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/services/pets/",
    title: "Проживание с животным — ACADEMIA Особняк Шувалова",
    description:
        "Проживание с кошками и собаками в ACADEMIA Особняк Шувалова: подготовленные аксессуары, забота о питомце и комфортный отдых вместе.",
});

export default function Pets() {
    return <PetsPage locale="ru" />;
}
