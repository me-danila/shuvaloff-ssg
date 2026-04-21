"use client";

import Link from "next/link";
import Image from "@/components/ui/OptimizedImage";
import { useLocale } from "@/lib/i18n/useLocale";

const SOCIAL_LINKS = [
    {
        labels: { ru: "Telegram", en: "Telegram" },
        href: "https://t.me/academia_land_hotels",
        icon: "/icons/tg-icon.svg",
    },
    {
        labels: { ru: "ВКонтакте", en: "VK" },
        href: "https://vk.com/academia.hotels",
        icon: "/icons/vk-icon.svg",
    },
    {
        labels: { ru: "Дзен", en: "Zen" },
        href: "https://dzen.ru/id/68d159b4a453c61d666c47fb",
        icon: "/icons/zen-icon.svg",
    },
];

interface SocialLinksProps {
    invert?: boolean;
    iconSize?: number;
    className?: string;
}

export default function SocialLinks({
    invert = false,
    iconSize = 28,
    className = "",
}: SocialLinksProps) {
    const locale = useLocale();

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {SOCIAL_LINKS.map(({ labels, href, icon }) => (
                <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={labels[locale]}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                >
                    <Image
                        src={icon}
                        alt={labels[locale]}
                        width={iconSize}
                        height={iconSize}
                        className={`brightness-0 ${invert ? "invert" : ""}`}
                    />
                </Link>
            ))}
        </div>
    );
}
