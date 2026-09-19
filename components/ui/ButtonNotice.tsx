import type React from "react";

/**
 * Текст, оформленный как primary-кнопка, но никуда не ведущий:
 * без ховера и курсора. На мобиле — во всю ширину, на десктопе — по тексту.
 */
export default function ButtonNotice({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p className={`flex justify-center ${className}`}>
            <span className="inline-flex w-full items-center justify-center rounded-md bg-brand-red px-8 py-4 text-center text-sm uppercase text-white xl:w-auto">
                {children}
            </span>
        </p>
    );
}
