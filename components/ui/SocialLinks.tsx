import Link from "next/link";
import Image from "@/components/ui/OptimizedImage";

const SOCIAL_LINKS = [
    {
        label: "Telegram",
        href: "https://t.me/academia_land_hotels",
        icon: "/icons/tg-icon.svg",
    },
    {
        label: "ВКонтакте",
        href: "https://vk.com/academia.hotels",
        icon: "/icons/vk-icon.svg",
    },
    {
        label: "Дзен",
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
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                >
                    <Image
                        src={icon}
                        alt={label}
                        width={iconSize}
                        height={iconSize}
                        className={`brightness-0 ${invert ? "invert" : ""}`}
                    />
                </Link>
            ))}
        </div>
    );
}
