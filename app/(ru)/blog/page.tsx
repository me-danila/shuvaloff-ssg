import type { Metadata } from "next";
import BlogPage from "@/components/pages/BlogPage";
import {
    getLocaleAlternates,
    withOfficialSiteSuffix,
} from "@/lib/i18n/metadata";

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
    },
};

export default function BlogIndexPage() {
    return <BlogPage page={1} />;
}
