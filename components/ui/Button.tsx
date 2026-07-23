import Link from "next/link";
import type React from "react";
import { isExternalHref } from "@/lib/i18n/routing";

type ButtonVariant = "primary" | "primary-outline" | "light-glass";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
    href?: string;
    target?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    uppercase?: boolean;
    type?: "button" | "submit" | "reset";
};

const variants: Record<ButtonVariant, string> = {
    primary: "bg-brand-red text-white",
    "primary-outline":
        "border border-brand-red text-brand-red hover:text-white",
    // Полупрозрачный белый фон + брендовый красный текст, без обводки; при
    // наведении заливка делает кнопку неотличимой от `primary`.
    "light-glass":
        "bg-white/45 text-brand-red backdrop-blur-sm hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
    xs: "px-4 py-3 text-xs",
    sm: "px-4 py-4 text-sm",
    md: "px-6 py-4 text-sm",
    lg: "px-8 py-4 text-sm",
    xl: "px-10 py-4 text-sm",
};

const base =
    "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md transition-[color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-50 disabled:pointer-events-none";

const fillVariants: Record<ButtonVariant, string> = {
    primary: "bg-brand-red-dark",
    "primary-outline": "bg-brand-red",
    "light-glass": "bg-brand-red",
};

export default function Button({
    variant = "primary",
    size = "md",
    children,
    href,
    target,
    onClick,
    disabled,
    className = "",
    uppercase = true,
    type = "button",
}: ButtonProps) {
    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
    const content = (
        <>
            <span
                aria-hidden="true"
                className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${fillVariants[variant]}`}
            />
            <span className={`relative z-10 ${uppercase ? "uppercase" : ""}`}>
                {children}
            </span>
        </>
    );

    if (href) {
        const rel = target === "_blank" ? "noopener noreferrer" : undefined;
        // Keep a full page load (raw <a>) for links the TravelLine loader or the
        // browser must own on navigation; use client-nav <Link> for the rest.
        const requiresFullNavigation =
            isExternalHref(href) || // http(s):, //, mailto:, tel:
            href.startsWith("#") || // in-page anchor
            href.includes("cert-open") || // TL certificate modal (Phase 1)
            href.includes("tl-booking-open") || // TL booking modal (Phase 1)
            target === "_blank"; // new-tab link

        if (requiresFullNavigation) {
            return (
                <a href={href} target={target} rel={rel} className={classes}>
                    {content}
                </a>
            );
        }

        return (
            <Link href={href} target={target} rel={rel} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {content}
        </button>
    );
}
