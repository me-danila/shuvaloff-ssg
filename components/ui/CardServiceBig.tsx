"use client";

import Button from "@/components/ui/Button";
import Image from "@/components/ui/OptimizedImage";
import { type Locale, localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";
import { ORDER_URL } from "@/lib/seo/site";

type CardServiceBigCtaLabel = string | Partial<Record<Locale, string>>;

type CardServiceBigProps = {
    title: string;
    imgUrl: string;
    subtitle?: string;
    slug?: string;
    externalLink?: string;
    ctaLabel?: CardServiceBigCtaLabel;
    /** Показывать раздельные действия: «Заказать» (если есть slug) + «Подробнее». */
    showOrder?: boolean;
    backgroundClassName?: string;
};

export default function CardServiceBig({
    title,
    imgUrl,
    subtitle,
    slug,
    externalLink,
    ctaLabel,
    showOrder = false,
    backgroundClassName = "bg-white",
}: CardServiceBigProps) {
    const locale = useLocale();
    const isExternal = Boolean(externalLink);
    const defaultDetailsLabel = locale === "ru" ? "Подробнее" : "Details";
    const externalLabel = locale === "ru" ? "Перейти на сайт" : "Visit website";
    const orderLabel = locale === "ru" ? "Заказать" : "Order";
    const details = isExternal
        ? externalLabel
        : typeof ctaLabel === "string"
          ? ctaLabel
          : (ctaLabel?.[locale] ?? defaultDetailsLabel);

    const href = slug
        ? localizeHref(`/services/${slug}/`, locale)
        : (externalLink ?? "#");

    return (
        <article
            className={`flex w-full flex-col overflow-hidden rounded-[4px] ${backgroundClassName} pb-7 text-center`}
        >
            <h3 className="flex h-[6.5rem] items-start justify-center px-4 py-5 font-history text-xl uppercase leading-tight text-[#372a24] xl:text-[21px]">
                <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="transition-colors hover:text-brand-red"
                >
                    {title}
                </a>
            </h3>
            <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={title}
                className="relative block aspect-[16/11] w-full overflow-hidden"
            >
                <Image
                    src={imgUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover object-center"
                />
            </a>
            {subtitle && (
                <p className="mt-5 flex-1 px-5 text-sm leading-6 text-[#372a24] xl:text-base">
                    {subtitle}
                </p>
            )}
            {showOrder ? (
                <div className="mt-6 flex min-h-[3.25rem] items-center gap-2 px-5">
                    {slug && (
                        <Button
                            href={ORDER_URL}
                            target="_blank"
                            variant="primary"
                            size="sm"
                            className="shrink-0 xl:px-6"
                        >
                            {orderLabel}
                        </Button>
                    )}
                    <Button
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        variant={slug ? "primary-outline" : "primary"}
                        size="sm"
                        className="shrink-0 xl:px-6"
                    >
                        {details}
                    </Button>
                </div>
            ) : (
                <div className="mt-6 px-5">
                    <Button
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        size="xl"
                        className="xl:px-8 xl:py-3 xl:text-base"
                    >
                        {details}
                    </Button>
                </div>
            )}
        </article>
    );
}
