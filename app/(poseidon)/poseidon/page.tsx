import type { Metadata } from "next";
import PoseidonPage from "@/components/pages/PoseidonPage";
import {
    POSEIDON_PATH,
    poseidonImages,
    poseidonSeo,
} from "@/data/poseidonData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

// Отдельная группа роутов: страница не оборачивается в SiteShell — у промо
// свой хедер; в футере баннеры партнеров + общий футер сайта (PoseidonFooter).
export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: POSEIDON_PATH,
    title: poseidonSeo.title,
    description: poseidonSeo.description,
    ogImage: poseidonImages.og,
});

export default function Poseidon() {
    return <PoseidonPage />;
}
