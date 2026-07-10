import type { Metadata } from "next";
import BlogPage from "@/components/pages/BlogPage";
import { getAllPosts, POSTS_PER_PAGE } from "@/lib/blog";
import { getLocaleAlternates } from "@/lib/i18n/metadata";

type Props = {
    params: Promise<{ page: string }>;
};

export const dynamicParams = false;

// Страницы 2..N; первая страница живёт на /blog/.
// output: export запрещает пустой generateStaticParams, поэтому /blog/page/2/
// существует всегда: пока статей ≤ 9 — пустая и noindex.
export async function generateStaticParams() {
    const posts = await getAllPosts();
    const totalPages = Math.max(2, Math.ceil(posts.length / POSTS_PER_PAGE));
    return Array.from({ length: totalPages - 1 }, (_, index) => ({
        page: String(index + 2),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { page } = await params;
    const posts = await getAllPosts();
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const isEmptyPage = Number(page) > totalPages;
    const title = `Блог — страница ${page} — ACADEMIA Особняк Шувалова`;

    return {
        title,
        description: `Статьи блога бутик-отеля ACADEMIA Особняк Шувалова, страница ${page}.`,
        alternates: getLocaleAlternates(`/blog/page/${page}/`, "ru"),
        ...(isEmptyPage ? { robots: { index: false, follow: true } } : {}),
    };
}

export default async function BlogPaginatedPage({ params }: Props) {
    const { page } = await params;
    return <BlogPage page={Number(page)} />;
}
