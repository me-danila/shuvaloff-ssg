import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import ContactsSection from "@/components/sections/ContactsSection";
import StructuredData from "@/components/seo/StructuredData";
import Divider from "@/components/ui/Divider";
import { getAllPosts, getBlogPageHref, POSTS_PER_PAGE } from "@/lib/blog";
import { buildBlogIndexSchema } from "@/lib/seo/schema";

export default async function BlogPage({ page }: { page: number }) {
    const posts = await getAllPosts();
    const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
    const pagePosts = posts.slice(
        (page - 1) * POSTS_PER_PAGE,
        page * POSTS_PER_PAGE,
    );

    return (
        <main className="v2-fonts flex flex-col gap-4 xl:gap-10">
            <StructuredData data={buildBlogIndexSchema({ posts: pagePosts })} />
            <section className="mx-6 mt-6 xl:mx-auto xl:w-full xl:max-w-7xl">
                <div className="md:text-center">
                    <h1>Блог</h1>
                    <p className="mt-3 max-w-xl md:mx-auto">
                        Аристократический Петербург, история особняка Шувалова
                        и гиды по городу от команды отеля
                    </p>
                </div>
            </section>
            <section className="bg-brand-light py-8 xl:py-12">
                <div className="mx-6 flex flex-col gap-8 xl:mx-auto xl:w-full xl:max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {pagePosts.map((post, index) => (
                            <BlogCard
                                key={post.slug}
                                post={post}
                                eager={index < 3}
                            />
                        ))}
                        {pagePosts.length === 0 && (
                            <p className="md:col-span-2 xl:col-span-3">
                                Скоро здесь появятся первые статьи.
                            </p>
                        )}
                    </div>
                    {totalPages > 1 && (
                        <nav aria-label="Страницы блога">
                            <ul className="flex items-center justify-center gap-6">
                                <li>
                                    {page > 1 ? (
                                        <Link
                                            href={getBlogPageHref(page - 1)}
                                            rel="prev"
                                            aria-label="Предыдущая страница"
                                            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white"
                                        >
                                            <ArrowLeftIcon
                                                size={20}
                                                weight="light"
                                            />
                                        </Link>
                                    ) : (
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-600 opacity-40">
                                            <ArrowLeftIcon
                                                size={20}
                                                weight="light"
                                            />
                                        </span>
                                    )}
                                </li>
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1,
                                ).map((pageNumber) => (
                                    <li key={pageNumber}>
                                        {pageNumber === page ? (
                                            <span
                                                aria-current="page"
                                                className="font-bold text-brand-red text-sm"
                                            >
                                                {pageNumber}
                                            </span>
                                        ) : (
                                            <Link
                                                href={getBlogPageHref(
                                                    pageNumber,
                                                )}
                                                className="text-sm text-stone-500 transition-colors hover:text-brand-red"
                                            >
                                                {pageNumber}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                                <li>
                                    {page < totalPages ? (
                                        <Link
                                            href={getBlogPageHref(page + 1)}
                                            rel="next"
                                            aria-label="Следующая страница"
                                            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-600 transition-colors duration-300 hover:bg-stone-100 active:bg-[#5c1f26] active:text-white"
                                        >
                                            <ArrowRightIcon
                                                size={20}
                                                weight="light"
                                            />
                                        </Link>
                                    ) : (
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-600 opacity-40">
                                            <ArrowRightIcon
                                                size={20}
                                                weight="light"
                                            />
                                        </span>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
