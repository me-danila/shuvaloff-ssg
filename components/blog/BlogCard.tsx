import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/OptimizedImage";
import { type BlogPost, formatPostDate } from "@/lib/blog";

export default function BlogCard({
    post,
    eager = false,
}: {
    post: BlogPost;
    /** true для карточек над сгибом (первый ряд) — иначе lazy */
    eager?: boolean;
}) {
    const href = `/blog/${post.slug}/`;

    return (
        <article className="flex w-full flex-col overflow-hidden rounded-[4px] bg-white pb-7 text-center">
            <h3 className="flex h-[6.5rem] items-start justify-center px-4 py-5 font-history text-[#372a24] text-xl uppercase leading-tight xl:text-[22px]">
                <Link href={href} className="line-clamp-2">
                    {post.title}
                </Link>
            </h3>
            <Link
                href={href}
                className="relative block aspect-[16/11] w-full overflow-hidden"
                tabIndex={-1}
                aria-hidden="true"
            >
                <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    loading={eager ? "eager" : "lazy"}
                    className="object-cover object-center"
                    style={{ objectPosition: post.imagePosition }}
                />
                <time
                    dateTime={post.datePublished}
                    className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-brand-brown text-xs"
                >
                    {formatPostDate(post.datePublished)}
                </time>
            </Link>
            <p className="mt-5 line-clamp-3 h-[4.5rem] px-5 text-[#372a24] text-sm leading-6 xl:text-base">
                {post.description}
            </p>
            <div className="mt-6 px-5">
                <Button
                    href={href}
                    size="xl"
                    className="xl:px-8 xl:py-3 xl:text-base"
                >
                    Читать
                </Button>
            </div>
        </article>
    );
}
