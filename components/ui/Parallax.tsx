"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type ParallaxProps = {
    children: ReactNode;
    offset?: number;
    className?: string;
};

export function Parallax({ children, offset = 50, className }: ParallaxProps) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        if (!isDesktop) {
            setIsActivated(false);
            return;
        }

        const activate = () => {
            if (window.scrollY > 0) {
                setIsActivated(true);
            }
        };

        window.addEventListener("scroll", activate, { passive: true });
        activate();

        return () => window.removeEventListener("scroll", activate);
    }, [isDesktop]);

    if (!isDesktop) return <div className={className}>{children}</div>;
    if (!isActivated) return <div className={className}>{children}</div>;

    return (
        <ParallaxDesktop className={className} offset={offset}>
            {children}
        </ParallaxDesktop>
    );
}

function ParallaxDesktop({
    children,
    offset,
    className,
}: Required<Pick<ParallaxProps, "children" | "offset">> &
    Pick<ParallaxProps, "className">) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div className="relative h-full w-full" style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}
