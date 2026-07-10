import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import StructuredData from "@/components/seo/StructuredData";
import OptimizedImage from "@/components/ui/OptimizedImage";
import {
    formatPostDate,
    getPostMeta,
    getPostSlugs,
    getRelatedPosts,
} from "@/lib/blog";
import { buildBlogPostingSchema } from "@/lib/seo/schema";
import { SITE_NAME } from "@/lib/seo/site";

type Props = {
    params: Promise<{ slug: string }>;
};

import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    const posts = await Promise.all(
        slugs.map(async (slug) => {
            const meta = await getPostMeta(slug);
            return { slug, draft: meta.draft };
        }),
    );
    return posts
        .filter((p) => !p.draft)
        .map((p) => ({
            slug: p.slug,
        }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const meta = await getPostMeta(slug);

    return {
        title: `${meta.title} — ${SITE_NAME}`,
        description: meta.description,
        alternates: {
            canonical: `/blog/${slug}/`,
        },
        ...(meta.draft ? { robots: { index: false, follow: false } } : {}),
        openGraph: {
            type: "article",
            url: `/blog/${slug}/`,
            title: meta.title,
            description: meta.description,
            publishedTime: meta.datePublished,
            modifiedTime: meta.dateModified ?? meta.datePublished,
            authors: [meta.author ?? SITE_NAME],
            ...(meta.tags?.length ? { tags: meta.tags } : {}),
            images: [
                {
                    url: meta.image,
                    width: 1200,
                    height: 630,
                    alt: meta.imageAlt,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: meta.title,
            description: meta.description,
            images: [meta.image],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const { default: Post, meta } = await import(`@/content/blog/${slug}.mdx`);

    if (meta.draft) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(slug, meta.tags);

    return (
        <main className="v2-fonts">
            <StructuredData data={buildBlogPostingSchema({ slug, ...meta })} />
            <article className="mx-6 mt-6 mb-12 md:mx-auto md:w-full md:max-w-3xl xl:mt-10">
                <header>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-brand-brown/60 text-xs uppercase tracking-wide">
                        <nav aria-label="Хлебные крошки" className="contents">
                            <Link href="/" className="hover:text-brand-red">
                                Главная
                            </Link>
                            <span aria-hidden="true">/</span>
                            <Link
                                href="/blog/"
                                className="hover:text-brand-red"
                            >
                                Блог
                            </Link>
                        </nav>
                        <span aria-hidden="true" className="mx-1">
                            ·
                        </span>
                        <time dateTime={meta.datePublished}>
                            {formatPostDate(meta.datePublished)}
                        </time>
                        {meta.author && (
                            <>
                                <span aria-hidden="true" className="mx-1">
                                    ·
                                </span>
                                <Link
                                    href="/blog/author/"
                                    className="hover:text-brand-red"
                                >
                                    {meta.author}
                                </Link>
                            </>
                        )}
                    </div>
                    <h1 className="mt-4 normal-case">{meta.title}</h1>
                    <p className="mt-4 text-base/7 xl:text-lg/8">
                        {meta.description}
                    </p>
                    <div className="relative mt-6 aspect-[3/2] overflow-hidden rounded-sm">
                        <OptimizedImage
                            src={meta.image}
                            alt={meta.imageAlt}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="object-cover"
                            style={{ objectPosition: meta.imagePosition }}
                        />
                    </div>
                </header>
                <div className="mt-8">
                    <Post />
                </div>
            </article>
            {relatedPosts.length > 0 && (
                <section className="bg-brand-light py-8 xl:py-12">
                    <div className="mx-6 xl:mx-auto xl:w-full xl:max-w-7xl">
                        <h2 className="text-center">Читайте также</h2>
                        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {relatedPosts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
