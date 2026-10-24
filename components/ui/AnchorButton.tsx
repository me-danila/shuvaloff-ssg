"use client";

import type { ComponentProps } from "react";
import Button from "@/components/ui/Button";

// Кнопка-якорь (href="#id") с плавной прокруткой к цели. Отступ под
// фиксированную шапку задает сама цель (scroll-mt-*), scrollIntoView его
// учитывает. Без JS работает как обычная ссылка на якорь.

type AnchorButtonProps = Omit<
    ComponentProps<typeof Button>,
    "href" | "onClick" | "type" | "target"
> & {
    /** id цели без «#». */
    targetId: string;
};

export default function AnchorButton({
    targetId,
    ...buttonProps
}: AnchorButtonProps) {
    const scrollToTarget = (e: React.MouseEvent<HTMLElement>) => {
        const el = document.getElementById(targetId);
        if (!el) return;
        e.preventDefault();
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
        });
        history.replaceState(null, "", `#${targetId}`);
    };

    return (
        <Button
            {...buttonProps}
            href={`#${targetId}`}
            onClick={scrollToTarget}
        />
    );
}
