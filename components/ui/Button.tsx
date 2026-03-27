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
    primary: "bg-brand-blue text-white",
    "primary-outline":
        "border border-brand-blue text-brand-blue hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
    xs: "px-4 py-3 text-xs",
    sm: "px-4 py-4 text-sm",
    md: "px-6 py-4 text-sm",
    lg: "px-8 py-4 text-sm",
    xl: "px-10 py-4 text-sm",
};

const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-md tracking-widest transition-[color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-50 disabled:pointer-events-none";

const fillVariants: Record<ButtonVariant, string> = {
    primary: "bg-slate-800",
    "primary-outline": "bg-brand-blue",
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
        return (
            <a
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                className={classes}
            >
                {content}
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
            {content}
        </button>
    );
}
