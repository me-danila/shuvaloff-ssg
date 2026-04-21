import type { Metadata } from "next";
import AllServicesPage from "@/components/pages/AllServicesPage";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    title: "Все услуги — ACADEMIA Особняк Шувалова",
    description:
        "Полный каталог дополнительных услуг и возможностей для гостей ACADEMIA Особняк Шувалова",
    alternates: getLocaleAlternates("/services/all/", "ru"),
};

export default function AllServices() {
    return <AllServicesPage locale="ru" />;
}
