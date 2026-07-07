"use client";

import { ChatCenteredTextIcon } from "@phosphor-icons/react";
import { useState } from "react";

type ReviewsWidgetToggleProps = {
    buttonLabel: string;
    title: string;
};

export default function ReviewsWidgetToggle({
    buttonLabel,
    title,
}: ReviewsWidgetToggleProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {!open && (
                <button
                    type="button"
                    className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-6 rounded-md bg-brand-red p-8 text-center text-white transition-colors hover:bg-brand-red-dark"
                    onClick={() => setOpen(true)}
                >
                    <ChatCenteredTextIcon aria-hidden="true" weight="fill" />
                    <span className="uppercase">{buttonLabel}</span>
                </button>
            )}

            {open && (
                <div className="col-span-full bg-brand-light px-4 py-10 sm:px-8">
                    <h2 className="mb-8 text-center">{title}</h2>
                    <div id="tl-reviews-widget" className="w-full" />
                </div>
            )}
        </>
    );
}
