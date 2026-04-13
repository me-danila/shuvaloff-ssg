"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function SmoothScroll({ children }: { children: ReactNode }) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [hasCert, setHasCert] = useState(false);

    useEffect(() => {
        const check = () => {
            const next = new URLSearchParams(window.location.search).has(
                "cert-open",
            );
            setHasCert((prev) => (prev === next ? prev : next));
        };
        const scheduleCheck = () => window.setTimeout(check, 0);

        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        const patch = (original: typeof history.pushState) =>
            function (
                this: History,
                ...args: Parameters<typeof history.pushState>
            ) {
                original.apply(this, args);
                scheduleCheck();
            };

        history.pushState = patch(originalPushState);
        history.replaceState = patch(originalReplaceState);
        window.addEventListener("popstate", scheduleCheck);
        check();

        return () => {
            window.removeEventListener("popstate", scheduleCheck);
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
        };
    }, []);

    if (!isDesktop || hasCert) return <>{children}</>;

    return (
        <ReactLenis
            root
            options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
        >
            {children}
        </ReactLenis>
    );
}
