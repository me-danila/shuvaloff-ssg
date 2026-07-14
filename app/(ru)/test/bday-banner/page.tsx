import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import BirthdayBannerSection from "@/components/sections/BirthdayBannerSection";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: "/test/bday-banner/",
        title: "Отель ACADEMIA Особняк Шувалова — Санкт-Петербург",
        description:
            "Отель в историческом особняке XIX века в центре Санкт-Петербурга",
    }),
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <div className="v2-fonts">
            <HomePage locale="ru" afterOffers={<BirthdayBannerSection />} />
        </div>
    );
}
