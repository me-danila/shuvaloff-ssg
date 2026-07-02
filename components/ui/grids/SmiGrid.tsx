"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import { smiArticles } from "@/data/smiData";
import type { Locale } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/useLocale";

const buttonTextByLocale: Record<Locale, string> = {
    ru: "Читать",
    en: "Read",
};

export default function SmiGrid() {
    const locale = useLocale();

    return (
        <StaggerContainer className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {smiArticles.map((article) => (
                <StaggerItem key={article.externalUrl} className="h-full">
                    <a
                        href={article.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/card flex h-full flex-col overflow-hidden rounded-[4px] bg-white pb-7 text-center"
                    >
                        <div className="relative aspect-[16/11] w-full overflow-hidden">
                            <Image
                                src={article.backgroundImageUrl}
                                alt={article.text}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute inset-0 flex items-center justify-center px-8">
                                <Image
                                    src={article.logoUrl}
                                    alt=""
                                    width={260}
                                    height={80}
                                    className="h-12 max-h-12 w-auto max-w-full object-contain md:h-14 md:max-h-14"
                                    unoptimized
                                />
                            </div>
                        </div>
                        <p className="mt-5 flex min-h-[3rem] items-start justify-center px-5 text-sm leading-6 text-[#372a24] xl:text-base">
                            {article.text}
                        </p>
                        <div className="mt-auto px-5 pt-4">
                            <span className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md border border-brand-red px-10 py-4 text-sm text-brand-red transition-[color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:text-white xl:px-8 xl:py-3 xl:text-base">
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 origin-bottom scale-y-0 bg-brand-red transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-y-100"
                                />
                                <span className="relative z-10 uppercase">
                                    {buttonTextByLocale[locale]}
                                </span>
                            </span>
                        </div>
                    </a>
                </StaggerItem>
            ))}
        </StaggerContainer>
    );
}
