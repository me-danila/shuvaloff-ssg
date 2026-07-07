import type { MDXComponents } from "mdx/types";
import Columns from "@/components/blog/Columns";
import FAQ from "@/components/blog/FAQ";
import Space from "@/components/blog/Space";
import Button from "@/components/ui/Button";
import OptimizedImage from "@/components/ui/OptimizedImage";

/**
 * Глобальный маппинг MDX-элементов. Действует на все .mdx в проекте.
 * Кастомные компоненты (Columns, FAQ) доступны в статьях без импорта.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // ![alt](url "подпись") → figure с оптимизированной картинкой;
        // title (в кавычках) становится видимой подписью figcaption
        img: ({ src, alt, title }) => (
            <figure className="my-6">
                <OptimizedImage
                    src={typeof src === "string" ? src : ""}
                    alt={alt ?? ""}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="h-auto w-full rounded-sm object-cover"
                />
                {title && (
                    <figcaption className="mt-2 text-center text-brand-brown/60 text-xs">
                        {title}
                    </figcaption>
                )}
            </figure>
        ),
        h2: ({ children }) => (
            <h2 className="mt-10 mb-4 text-xl xl:text-[28px]">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-lg xl:text-xl">{children}</h3>
        ),
        p: ({ children }) => <p className="my-4">{children}</p>,
        ul: ({ children }) => (
            <ul className="my-4 flex list-disc flex-col gap-2 pl-6 text-sm/6 xl:text-base/7">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="my-4 flex list-decimal flex-col gap-2 pl-6 text-sm/6 xl:text-base/7">
                {children}
            </ol>
        ),
        a: ({ href, children }) => (
            <a
                href={href}
                className="text-brand-red underline underline-offset-4 hover:text-brand-red-dark"
            >
                {children}
            </a>
        ),
        blockquote: ({ children }) => (
            <blockquote className="my-6 border-brand-red border-l-2 pl-4 italic">
                {children}
            </blockquote>
        ),
        table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm xl:text-base">
                    {children}
                </table>
            </div>
        ),
        th: ({ children }) => (
            <th className="border-brand-brown/20 border-b-2 px-3 py-2 text-left font-bold">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="border-brand-brown/10 border-b px-3 py-2 align-top">
                {children}
            </td>
        ),
        hr: () => <hr className="my-8 border-brand-brown/15" />,
        Button,
        Columns,
        FAQ,
        Space,
        ...components,
    };
}
