import fs from "node:fs";
import path from "node:path";

export type BlogPostMeta = {
    /** Заголовок статьи (H1, title, og:title, schema headline). До ~110 симв. */
    title: string;
    /** Описание (meta description, og:description, лид статьи). 120–160 симв. */
    description: string;
    /** Featured image: путь в /public, напр. "/images/blog/foo.jpg" */
    image: string;
    /** Alt для featured image */
    imageAlt: string;
    /**
     * CSS object-position для кропа featured image (шапка статьи и карточка).
     * Например "center top", "left center", "70% 30%". По умолчанию center.
     */
    imagePosition?: string;
    /** ISO-дата первой публикации: "2026-07-07" */
    datePublished: string;
    /** ISO-дата последнего содержательного обновления */
    dateModified?: string;
    /** Автор. Не указан — публикуется от имени отеля */
    author?: string;
    /** Ключевые темы → schema keywords */
    tags?: string[];
    /** true — статья не публикуется (нет в списке, sitemap, RSS) */
    draft?: boolean;
};

export type BlogPost = BlogPostMeta & { slug: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const POSTS_PER_PAGE = 9;

export const getBlogPageHref = (page: number) =>
    page <= 1 ? "/blog/" : `/blog/page/${page}/`;

export function getPostSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs
        .readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPostMeta(slug: string): Promise<BlogPostMeta> {
    const { meta } = await import(`@/content/blog/${slug}.mdx`);
    return meta as BlogPostMeta;
}

export async function getAllPosts(): Promise<BlogPost[]> {
    const posts = await Promise.all(
        getPostSlugs().map(async (slug) => ({
            ...(await getPostMeta(slug)),
            slug,
        })),
    );

    return posts
        .filter((post) => !post.draft)
        .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

/**
 * Статьи для блока «Читайте также»: сначала по пересечению тегов,
 * при равенстве — по свежести.
 */
export async function getRelatedPosts(
    slug: string,
    tags: string[] = [],
    limit = 3,
): Promise<BlogPost[]> {
    const posts = await getAllPosts();
    return posts
        .filter((post) => post.slug !== slug)
        .map((post) => ({
            post,
            score: post.tags?.filter((tag) => tags.includes(tag)).length ?? 0,
        }))
        .sort(
            (a, b) =>
                b.score - a.score ||
                b.post.datePublished.localeCompare(a.post.datePublished),
        )
        .slice(0, limit)
        .map(({ post }) => post);
}

export function formatPostDate(isoDate: string): string {
    return new Date(`${isoDate}T00:00:00`).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
