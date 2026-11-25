import type { Metadata } from "next";
import GiveawayThankYouPage from "@/components/giveaway/GiveawayThankYouPage";
import { pinci } from "@/data/pinciData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: pinci.thankYouPath,
        title: `Вы зарегистрированы в розыгрыше — ACADEMIA × ${pinci.partner}`,
        description: pinci.seo.description,
    }),
    robots: { index: false, follow: false },
};

export default function PinciThankYouPage() {
    return <GiveawayThankYouPage campaign={pinci} />;
}
