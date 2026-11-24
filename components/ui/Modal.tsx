"use client";

import { useLayoutEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n/useLocale";

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
    bgColor?: string;
    /** Доп. классы панели, например ограничение высоты для прокрутки внутри. */
    panelClassName?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
}

export function Modal({
    open,
    onClose,
    children,
    maxWidth = "max-w-2xl",
    bgColor = "bg-white",
    panelClassName = "",
    ariaLabel,
    ariaLabelledby,
}: Props) {
    const locale = useLocale();
    const closeLabel = locale === "ru" ? "Закрыть" : "Close";

    const dialogRef = useRef<HTMLDialogElement>(null);

    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        if (!open || !dialog) return;

        const trigger = document.activeElement;
        dialog.showModal();
        dialog.focus({ preventScroll: true });
        return () => {
            dialog.close();
            if (trigger instanceof HTMLElement) {
                trigger.focus({ preventScroll: true });
            }
        };
    }, [open]);

    if (!open) return null;

    return (
        <dialog
            ref={dialogRef}
            aria-label={ariaLabelledby ? undefined : ariaLabel}
            aria-labelledby={ariaLabelledby}
            data-lenis-prevent
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overscroll-contain bg-transparent px-4 py-8 outline-none backdrop:bg-black/70 open:flex open:items-center open:justify-center"
        >
            <button
                aria-label={closeLabel}
                aria-hidden="true"
                tabIndex={-1}
                className="absolute inset-0"
                onClick={onClose}
                type="button"
            />
            <div
                className={`relative max-h-full w-full ${bgColor} ${maxWidth} overflow-y-auto overscroll-contain rounded-md text-black ${panelClassName}`}
            >
                {children}
            </div>
            <button
                aria-label={closeLabel}
                type="button"
                onClick={onClose}
                className="absolute top-2 right-3 cursor-pointer text-neutral-100 hover:text-neutral-200"
            >
                ✕
            </button>
        </dialog>
    );
}
