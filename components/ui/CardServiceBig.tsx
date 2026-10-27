"use client";

import type React from "react";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/OptimizedImage";
import { type Locale, localizeHref } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";
import { ORDER_URL } from "@/lib/seo/site";

type CardServiceBigCtaLabel = string | Partial<Record<Locale, string>>;

type CardServiceBigProps = {
    title: string;
    imgUrl: string;
    /** object-position фото (по умолчанию — центр). */
    imgPosition?: string;
    subtitle?: string;
    slug?: string;
    externalLink?: string;
    /**
     * Индивидуальная страница услуги: «Подробнее» ведет сюда, а «Заказать» —
     * на типовую /services/<slug>/ вместо мессенджера.
     */
    detailsHref?: string;
    ctaLabel?: CardServiceBigCtaLabel;
    /** Показывать раздельные действия: «Заказать» (если есть slug) + «Подробнее». */
    showOrder?: boolean;
    backgroundClassName?: string;
    /** Своя ссылка вместо страницы услуги (например, бронирование номера). */
    href?: string;
    /** Строка под фото (например, площадь номера). */
    meta?: React.ReactNode;
    /**
     * Высота заголовка. По умолчанию фиксированная — под названия услуг в
     * 2–3 строки; для однострочных названий (номера) — "" (по содержимому).
     */
    titleHeightClassName?: string;
    /** Отступ от заголовка до описания. */
    subtitleSpacingClassName?: string;
    /** id карточки — цель якорной ссылки (вместе с scroll-mt в className). */
    id?: string;
    /** Доп. классы карточки. */
    className?: string;
    /** Фото над заголовком (по умолчанию — заголовок над фото). */
    imageFirst?: boolean;
    /** Пропорции фото. */
    imageAspectClassName?: string;
    /** Блок под описанием (состав услуги, цена). */
    details?: React.ReactNode;
    /**
     * Карточка без своей страницы: заголовок и фото не ссылки, единственная
     * кнопка — «Заказать» (ORDER_URL, новая вкладка).
     */
    orderOnly?: boolean;
};

export default function CardServiceBig({
    title,
    imgUrl,
    imgPosition,
    subtitle,
    slug,
    externalLink,
    detailsHref,
    ctaLabel,
    showOrder = false,
    backgroundClassName = "bg-white",
    href: hrefOverride,
    meta,
    titleHeightClassName = "h-[6.5rem]",
    subtitleSpacingClassName = "mt-5",
    id,
    className = "",
    imageFirst = false,
    imageAspectClassName = "aspect-[16/11]",
    details: detailsSlot,
    orderOnly = false,
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

    const href =
        hrefOverride ??
        (slug
            ? localizeHref(`/services/${slug}/`, locale)
            : (externalLink ?? "#"));

    // «Подробнее» — индивидуальная страница, если есть; «Заказать» тогда ведет
    // на типовую страницу услуги (href), а не в мессенджер.
    const detailsButtonHref = detailsHref
        ? localizeHref(detailsHref, locale)
        : href;
    const orderHref = detailsHref ? href : ORDER_URL;

    // Фото над заголовком — через order-first: разметка одна для обоих порядков.
    const imageClass = `relative block ${imageAspectClassName} w-full overflow-hidden ${imageFirst ? "order-first" : ""}`;
    const image = (
        <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            loading="lazy"
            className="object-cover object-center"
            style={imgPosition ? { objectPosition: imgPosition } : undefined}
        />
    );

    return (
        <article
            id={id}
            className={`flex w-full flex-col overflow-hidden rounded-[4px] ${backgroundClassName} pb-7 text-center ${className}`}
        >
            <h3
                className={`flex ${titleHeightClassName} items-start justify-center px-4 py-5 font-history text-xl uppercase leading-tight text-[#372a24] xl:text-[21px]`}
            >
                {orderOnly ? (
                    title
                ) : (
                    <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="transition-colors hover:text-brand-red"
                    >
                        {title}
                    </a>
                )}
            </h3>
            {orderOnly ? (
                <div className={imageClass}>{image}</div>
            ) : (
                <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={title}
                    className={imageClass}
                >
                    {image}
                </a>
            )}
            {meta && (
                <div className="mt-5 flex justify-center px-5 text-xs text-[#372a24]/80">
                    {meta}
                </div>
            )}
            {subtitle && (
                <p
                    className={`${subtitleSpacingClassName} flex-1 px-5 text-sm leading-6 text-[#372a24] xl:text-base`}
                >
                    {subtitle}
                </p>
            )}
            {detailsSlot && <div className="mt-5 px-5">{detailsSlot}</div>}
            {orderOnly ? (
                <div className="mt-6 px-5">
                    <Button
                        href={ORDER_URL}
                        target="_blank"
                        variant="primary"
                        size="sm"
                        className="xl:px-8"
                    >
                        {orderLabel}
                    </Button>
                </div>
            ) : showOrder ? (
                <div className="mt-6 flex min-h-[3.25rem] items-center gap-2 px-5">
                    {slug && (
                        <Button
                            href={orderHref}
                            target={detailsHref ? undefined : "_blank"}
                            variant="primary"
                            size="sm"
                            className="shrink-0 xl:px-6"
                        >
                            {orderLabel}
                        </Button>
                    )}
                    <Button
                        href={detailsButtonHref}
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
                        href={detailsButtonHref}
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
