import type React from "react";

type ButtonVariant = "primary" | "primary-outline";
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
    primary: "bg-brand-blue text-white hover:bg-slate-800",
    "primary-outline":
        "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
    xs: "px-4 py-3 text-xs",
    sm: "px-4 py-4 text-sm",
    md: "px-6 py-4 text-sm",
    lg: "px-8 py-4 text-sm",
    xl: "px-10 py-4 text-sm",
};

const base =
    "inline-flex items-center justify-center tracking-widest transition-colors rounded-md disabled:opacity-50 disabled:pointer-events-none";

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

    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                className={classes + (uppercase ? " uppercase" : "")}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {children}
        </button>
    );
}
