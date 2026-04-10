"use client";

import { useEffect } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
}

export function Modal({ open, onClose, children, maxWidth = "2xl" }: Props) {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
        >
            <button
                aria-label="Close modal"
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
                type="button"
            />
            <div
                className={`relative z-10 bg-white w-full max-w-${maxWidth} min-h-fit overflow-y-auto rounded-md text-black`}
            >
                {children}
            </div>
            <button
                type="button"
                onClick={onClose}
                className="absolute top-2 right-3 z-10 cursor-pointer text-neutral-100 hover:text-neutral-200"
            >
                ✕
            </button>
        </div>
    );
}
