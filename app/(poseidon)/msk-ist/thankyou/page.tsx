import type { Metadata } from "next";
import GiveawayThankYouPage from "@/components/giveaway/GiveawayThankYouPage";
import { mskIst } from "@/data/mskIstData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: mskIst.thankYouPath,
        title: `Вы зарегистрированы в розыгрыше — ACADEMIA × ${mskIst.partner}`,
        description: mskIst.seo.description,
    }),
    robots: { index: false, follow: false },
};

export default function MskIstThankYouPage() {
    return <GiveawayThankYouPage campaign={mskIst} />;
}
