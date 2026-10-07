import type { Metadata } from "next";
import PhotoShootPage from "@/components/pages/PhotoShootPage";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
    locale: "en",
    path: "/photo-shoot/",
    title: "Photoshoot in the Historic Interiors of the Shuvaloff Mansion",
    description:
        "An exquisite historical setting for your striking shots in the atmosphere of a 19th-century count's mansion in the heart of Saint Petersburg.",
});

export default function PhotoShoot() {
    return <PhotoShootPage locale="en" />;
}
