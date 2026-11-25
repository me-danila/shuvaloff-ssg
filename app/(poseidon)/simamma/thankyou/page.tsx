import type { Metadata } from "next";
import GiveawayThankYouPage from "@/components/giveaway/GiveawayThankYouPage";
import { simamma } from "@/data/simammaData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: simamma.thankYouPath,
        title: `Вы зарегистрированы в розыгрыше — ACADEMIA × ${simamma.partner}`,
        description: simamma.seo.description,
    }),
    robots: { index: false, follow: false },
};

export default function SimammaThankYouPage() {
    return <GiveawayThankYouPage campaign={simamma} />;
}
