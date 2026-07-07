"use client";

import { type HTMLMotionProps, m } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type BaseDivProps = Omit<HTMLMotionProps<"div">, "children">;
export const GENTLE_EASE = [0.22, 1, 0.36, 1] as const;

type MotionProps = BaseDivProps & {
    children: ReactNode;
    delay?: number;
    duration?: number;
    mode?: "mount" | "inView";
    y?: number;
    once?: boolean;
};

export function FadeIn({
    children,
    delay = 0,
    duration = 0.55,
    mode = "inView",
    once = true,
    ...props
}: MotionProps) {
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={mode === "mount" ? { opacity: 1 } : undefined}
            whileInView={mode === "inView" ? { opacity: 1 } : undefined}
            viewport={mode === "inView" ? { once, amount: 0.12 } : undefined}
            transition={{
                duration,
                delay,
                ease: GENTLE_EASE,
            }}
            {...props}
        >
            {children}
        </m.div>
    );
}

export function FadeUp({
    children,
    delay = 0,
    duration = 0.7,
    mode = "inView",
    y = 18,
    once = true,
    ...props
}: MotionProps) {
    return (
        <m.div
            initial={{ opacity: 0, y }}
            animate={mode === "mount" ? { opacity: 1, y: 0 } : undefined}
            whileInView={mode === "inView" ? { opacity: 1, y: 0 } : undefined}
            viewport={mode === "inView" ? { once, amount: 0.12 } : undefined}
            transition={{
                duration,
                delay,
                ease: GENTLE_EASE,
            }}
            {...props}
        >
            {children}
        </m.div>
    );
}

export const StaggerContainer = forwardRef<
    HTMLDivElement,
    BaseDivProps & {
        children: ReactNode;
        delay?: number;
        mode?: "mount" | "inView";
        staggerChildren?: number;
        once?: boolean;
        amount?: "some" | "all" | number;
    }
>(
    (
        {
            children,
            delay = 0,
            mode = "inView",
            staggerChildren = 0.1,
            once = true,
            amount = 0.08,
            onScroll,
            ...props
        },
        ref,
    ) => {
        return (
            <m.div
                ref={ref}
                onScroll={onScroll}
                initial="hidden"
                animate={mode === "mount" ? "show" : undefined}
                whileInView={mode === "inView" ? "show" : undefined}
                viewport={mode === "inView" ? { once, amount } : undefined}
                variants={{
                    hidden: {},
                    show: {
                        transition: {
                            staggerChildren,
                            delayChildren: delay,
                        },
                    },
                }}
                {...props}
            >
                {children}
            </m.div>
        );
    },
);

StaggerContainer.displayName = "StaggerContainer";

export function StaggerItem({
    children,
    y = 16,
    ...props
}: BaseDivProps & {
    children: ReactNode;
    y?: number;
}) {
    return (
        <m.div
            variants={{
                hidden: { opacity: 0, y },
                show: { opacity: 1, y: 0 },
            }}
            transition={{
                duration: 0.72,
                ease: GENTLE_EASE,
            }}
            {...props}
        >
            {children}
        </m.div>
    );
}
