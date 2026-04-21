"use client";

import Image from "@/components/ui/OptimizedImage";
import { useLocale } from "@/lib/i18n/useLocale";

type DividerHistoryStyle = 1 | 2 | 3;

type DividerHistoryProps = {
    style: DividerHistoryStyle;
};

const DIVIDER_HISTORY_MAP: Record<
    DividerHistoryStyle,
    {
        src: string;
        width: number;
        height: number;
    }
> = {
    1: {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/img231-Photoroom.png",
        width: 120,
        height: 97,
    },
    2: {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/img245-Photoroom.png",
        width: 150,
        height: 42,
    },
    3: {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/img247-Photoroom-1.png",
        width: 150,
        height: 16,
    },
};

export default function DividerHistory({ style }: DividerHistoryProps) {
    const locale = useLocale();
    const divider = DIVIDER_HISTORY_MAP[style];

    return (
        <Image
            src={divider.src}
            alt={locale === "ru" ? "Разделитель" : "Divider"}
            width={divider.width}
            height={divider.height}
            loading="lazy"
            className="object-contain mx-auto my-4"
        />
    );
}
