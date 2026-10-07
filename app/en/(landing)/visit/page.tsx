import type { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";
import { LANDING_DICTIONARIES } from "@/data/landing";
import { buildLandingMetadata } from "@/lib/i18n/metadata";

const dict = LANDING_DICTIONARIES.en;

export const metadata: Metadata = buildLandingMetadata({
    locale: "en",
    draft: dict.draft,
    ...dict.meta,
});

export default function Page() {
    return <LandingPage dict={dict} />;
}
