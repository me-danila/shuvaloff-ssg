import type { Metadata } from "next";
import AllServicesPage from "@/components/pages/AllServicesPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: "/services/all/",
    title: "Все услуги — ACADEMIA Особняк Шувалова",
    description:
        "Полный каталог дополнительных услуг и возможностей для гостей ACADEMIA Особняк Шувалова",
});

export default function AllServices() {
    return <AllServicesPage locale="ru" />;
}
