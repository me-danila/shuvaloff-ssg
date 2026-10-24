import type { Metadata } from "next";
import PoseidonPage from "@/components/pages/PoseidonPage";
import {
    POSEIDON_PATH,
    poseidonImages,
    poseidonSeo,
} from "@/data/poseidonData";
import { buildPageMetadata } from "@/lib/i18n/metadata";

// Отдельная группа роутов: страница не оборачивается в SiteShell (хедер и
// футер основного сайта) — у промо свои хедер и футер.
export const metadata: Metadata = buildPageMetadata({
    locale: "ru",
    path: POSEIDON_PATH,
    title: poseidonSeo.title,
    description: poseidonSeo.description,
    ogImage: poseidonImages.hero,
});

export default function Poseidon() {
    return <PoseidonPage />;
}
