"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function SmoothScroll({ children }: { children: ReactNode }) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    if (!isDesktop) return <>{children}</>;

    return (
        <ReactLenis
            root
            options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
        >
            {children}
        </ReactLenis>
    );
}
