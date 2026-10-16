import type React from "react";

/**
 * Ссылка пункта меню лендинга (хедер и футер). Якоря — с путем лендинга:
 * меню стоит и на /xx/booking/, где секций нет; на самом лендинге браузер
 * просто прокручивает к секции. Внешние ссылки — в новой вкладке.
 */
export default function LandingNavLink({
    href,
    home,
    className,
    onClick,
    children,
}: {
    href: string;
    home: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}) {
    const isAnchor = href.startsWith("#");
    return (
        <a
            href={isAnchor ? `${home}${href}` : href}
            target={isAnchor ? undefined : "_blank"}
            rel={isAnchor ? undefined : "noopener noreferrer"}
            onClick={onClick}
            className={className}
        >
            {children}
        </a>
    );
}
