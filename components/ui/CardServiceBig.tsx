"use client";

import Image from "@/components/ui/OptimizedImage";
import { localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

type CardServiceBigProps = {
    title: string;
    imgUrl: string;
    slug?: string;
    externalLink?: string;
};

export default function CardServiceBig({
    title,
    imgUrl,
    slug,
    externalLink,
}: CardServiceBigProps) {
    const locale = useLocale();
    const details = locale === "ru" ? "Подробнее" : "Details";

    const href = slug
        ? localizeHref(`/services/${slug}/`, locale)
        : (externalLink ?? "#");
    const isExternal = Boolean(externalLink);

    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="relative rounded-md overflow-hidden aspect-3/2 flex-1"
        >
            <Image
                src={imgUrl}
                alt={title}
                fill
                sizes="(max-width: 1200px) 100vw, 50vw"
                loading="lazy"
                className="object-cover object-center"
            />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)",
                }}
            />

            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10 xl:p-8">
                <p className="font-baskerville uppercase text-xl xl:text-2xl xl:leading-tight">
                    {title}
                </p>
                <p className="flex items-center gap-6 uppercase tracking-widest text-sm">
                    {details}
                    <span className="text-2xl mb-1">›</span>
                </p>
            </div>
        </a>
    );
}
