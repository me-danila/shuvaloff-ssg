import type { Metadata } from "next";
import GiveawayThankYouPage from "@/components/giveaway/GiveawayThankYouPage";
import { poseidon } from "@/data/poseidonData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: poseidon.thankYouPath,
        title: `Вы зарегистрированы в розыгрыше — ACADEMIA × ${poseidon.partner}`,
        description: poseidon.seo.description,
    }),
    robots: { index: false, follow: false },
};

export default function PoseidonThankYouPage() {
    return <GiveawayThankYouPage campaign={poseidon} />;
}
