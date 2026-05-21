import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_NAME_EN, SITE_URL } from "@/lib/seo/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_NAME,
        short_name: "ACADEMIA",
        description: `${SITE_NAME} / ${SITE_NAME_EN}`,
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1e2b3c",
        icons: [
            {
                src: `${SITE_URL}/favicon.ico`,
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: `${SITE_URL}/apple-icon.png`,
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}
