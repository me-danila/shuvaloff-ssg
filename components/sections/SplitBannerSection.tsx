import type { ReactNode } from "react";
import Image from "@/components/ui/OptimizedImage";

// Секция «текст + фото» в две колонки: на десктопе текст слева, фото справа
// до края экрана; на мобильных фото сверху. Текстовая колонка выровнена по
// контентной ширине сайта (max-w-7xl) за счет левого отступа.

type SplitBannerSectionProps = {
    children: ReactNode;
    image: {
        src: string;
        alt: string;
        /** Доп. классы картинки (object-position и т.п.). */
        className?: string;
        loading?: "eager" | "lazy";
    };
    /** Фон секции. */
    className?: string;
    /** Классы текстовой колонки (выравнивание по вертикали и т.п.). */
    textClassName?: string;
    /** Высота / пропорции фото-колонки. */
    imageWrapClassName?: string;
};

export default function SplitBannerSection({
    children,
    image,
    className = "bg-[#ededeb]",
    textClassName = "",
    imageWrapClassName = "min-h-[300px] xl:min-h-[520px]",
}: SplitBannerSectionProps) {
    return (
        <section className={className}>
            <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[1fr_1.15fr] xl:gap-6">
                <div
                    className={`flex flex-col items-start gap-4 px-6 py-10 text-left text-brand-brown xl:py-12 xl:pr-4 xl:pl-[max(1.5rem,calc((100vw-84rem)/2))] ${textClassName}`}
                >
                    {children}
                </div>
                <div
                    className={`relative order-first w-full self-stretch overflow-hidden xl:order-last ${imageWrapClassName}`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 55vw"
                        loading={image.loading ?? "lazy"}
                        className={`object-cover ${image.className ?? ""}`}
                    />
                </div>
            </div>
        </section>
    );
}
