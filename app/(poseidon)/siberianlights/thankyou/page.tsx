import type { Metadata } from "next";
import GiveawayThankYouPage from "@/components/giveaway/GiveawayThankYouPage";
import { siberianLights } from "@/data/siberianLightsData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: siberianLights.thankYouPath,
        title: `Вы зарегистрированы в розыгрыше — ACADEMIA × ${siberianLights.partner}`,
        description: siberianLights.seo.description,
    }),
    robots: { index: false, follow: false },
};

export default function SiberianLightsThankYouPage() {
    return <GiveawayThankYouPage campaign={siberianLights} />;
}
