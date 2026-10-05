import type { Metadata } from "next";
import BlogPage from "@/components/pages/BlogPage";
import {
    getLocaleAlternates,
    withOfficialSiteSuffix,
} from "@/lib/i18n/metadata";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/site";

const TITLE = "Блог — ACADEMIA Особняк Шувалова";
const DOC_TITLE = withOfficialSiteSuffix(TITLE, "ru");
const DESCRIPTION =
    "Блог бутик-отеля ACADEMIA Особняк Шувалова: аристократический Петербург, история особняка, гиды по городу и советы путешественникам.";

export const metadata: Metadata = {
    title: DOC_TITLE,
    description: DESCRIPTION,
    alternates: {
        ...getLocaleAlternates("/blog/", "ru"),
        types: {
            "application/rss+xml": "/blog/feed.xml",
        },
    },
    openGraph: {
        title: DOC_TITLE,
        description: DESCRIPTION,
        url: "/blog/",
        type: "website",
        images: [
            { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: TITLE },
        ],
    },
};

export default function BlogIndexPage() {
    return <BlogPage page={1} />;
}
