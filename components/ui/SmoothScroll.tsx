"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function SmoothScroll({ children }: { children: ReactNode }) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [hasCert, setHasCert] = useState(false);

    useEffect(() => {
        const check = () =>
            setHasCert(
                new URLSearchParams(window.location.search).has("cert-open"),
            );

        const patch = (original: typeof history.pushState) =>
            function (
                this: History,
                ...args: Parameters<typeof history.pushState>
            ) {
                original.apply(this, args);
                check();
            };

        history.pushState = patch(history.pushState);
        history.replaceState = patch(history.replaceState);
        window.addEventListener("popstate", check);
        check();

        return () => {
            window.removeEventListener("popstate", check);
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
