import { getAllPosts } from "@/lib/blog";
import { getAbsoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo/site";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");

export async function GET() {
    const posts = await getAllPosts();

    const items = posts
        .map((post) => {
            const url = getAbsoluteUrl(`/blog/${post.slug}/`);
            return `        <item>
            <title>${escapeXml(post.title)}</title>
            <link>${url}</link>
            <guid isPermaLink="true">${url}</guid>
            <description>${escapeXml(post.description)}</description>
            <pubDate>${new Date(`${post.datePublished}T00:00:00Z`).toUTCString()}</pubDate>
            <enclosure url="${escapeXml(getAbsoluteUrl(post.image))}" type="image/jpeg" length="0" />
        </item>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${escapeXml(`Блог — ${SITE_NAME}`)}</title>
        <link>${SITE_URL}/blog/</link>
        <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
        <description>Блог бутик-отеля ACADEMIA Особняк Шувалова: аристократический Петербург, история особняка, гиды по городу.</description>
        <language>ru</language>
${items}
    </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
