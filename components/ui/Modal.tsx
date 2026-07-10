"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n/useLocale";

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
    bgColor?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
}

export function Modal({
    open,
    onClose,
    children,
    maxWidth = "max-w-2xl",
    bgColor = "bg-white",
    ariaLabel,
    ariaLabelledby,
}: Props) {
    const locale = useLocale();
    const closeLabel = locale === "ru" ? "Закрыть" : "Close";

    const dialogRef = useRef<HTMLDivElement>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Capture the trigger element, move focus into the dialog, and restore
    // focus to the trigger on close. tabIndex=-1 + outline-none means this
    // programmatic focus is invisible to mouse users.
    useEffect(() => {
        if (!open) return;

        previouslyFocused.current =
            document.activeElement as HTMLElement | null;
        dialogRef.current?.focus({ preventScroll: true });

        return () => {
            previouslyFocused.current?.focus?.({ preventScroll: true });
        };
    }, [open]);

    // Escape to close + Tab/Shift+Tab focus trap.
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onCloseRef.current();
                return;
            }
            if (e.key !== "Tab") return;

            const dialog = dialogRef.current;
            if (!dialog) return;

            const focusable = Array.from(
                dialog.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
            ).filter(
                (el) =>
                    el.offsetWidth > 0 ||
                    el.offsetHeight > 0 ||
                    el === document.activeElement,
            );
            if (focusable.length === 0) {
                e.preventDefault();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;

            if (active === dialog) {
                e.preventDefault();
                (e.shiftKey ? last : first).focus();
                return;
            }
            if (e.shiftKey) {
                if (active === first || !dialog.contains(active)) {
                    e.preventDefault();
                    last.focus();
                }
            } else if (active === last || !dialog.contains(active)) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    if (!open) return null;

    return (
        <div
            ref={dialogRef}
            aria-label={ariaLabelledby ? undefined : ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none"
            role="dialog"
            tabIndex={-1}
        >
            <button
                aria-label={closeLabel}
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
                type="button"
            />
            <div
                className={`relative z-10 w-full ${bgColor} ${maxWidth} min-h-fit overflow-y-auto rounded-md text-black`}
            >
                {children}
            </div>
            <button
                aria-label={closeLabel}
                type="button"
                onClick={onClose}
                className="absolute top-2 right-3 z-10 cursor-pointer text-neutral-100 hover:text-neutral-200"
            >
                ✕
            </button>
        </div>
    );
}
