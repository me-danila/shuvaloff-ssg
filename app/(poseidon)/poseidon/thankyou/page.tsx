import type { Metadata } from "next";
import PoseidonThankYouPage from "@/components/pages/PoseidonThankYouPage";
import { POSEIDON_THANKYOU_PATH, poseidonSeo } from "@/data/poseidonData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

// Служебная страница после отправки формы: с промокодом, поэтому вне
// индекса и sitemap.
export const metadata: Metadata = {
    ...buildPageMetadata({
        locale: "ru",
        path: POSEIDON_THANKYOU_PATH,
        title: "Вы зарегистрированы в розыгрыше — ACADEMIA × Посейдон",
        description: poseidonSeo.description,
    }),
    robots: { index: false, follow: false },
};

export default function PoseidonThankYou() {
    return <PoseidonThankYouPage />;
}
