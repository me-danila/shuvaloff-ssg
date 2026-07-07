import type { Metadata } from "next";
import PetsPage from "@/components/pages/PetsPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Проживание с животным — ACADEMIA Особняк Шувалова",
    description:
        "Проживание с кошками и собаками в ACADEMIA Особняк Шувалова: подготовленные аксессуары, забота о питомце и комфортный отдых вместе.",
    alternates: getLocaleAlternates("/services/pets/", "ru"),
};

export default function Pets() {
    return <PetsPage locale="ru" />;
}
