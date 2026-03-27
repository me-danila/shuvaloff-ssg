"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import {
    forwardRef,
    type ReactNode,
} from "react";

type BaseDivProps = Omit<HTMLMotionProps<"div">, "children">;
const GENTLE_EASE = [0.22, 1, 0.36, 1] as const;

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
    mode = "mount",
    once = true,
    ...props
}: MotionProps) {
    return (
        <motion.div
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
        </motion.div>
    );
}

export function FadeUp({
    children,
    delay = 0,
    duration = 0.7,
    mode = "mount",
    y = 18,
    once = true,
    ...props
}: MotionProps) {
    return (
        <motion.div
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
        </motion.div>
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
    }
>(
    (
        {
            children,
            delay = 0,
            mode = "mount",
            staggerChildren = 0.1,
            once = true,
            onScroll,
            ...props
        },
        ref,
    ) => {
        return (
            <motion.div
                ref={ref}
                onScroll={onScroll}
                initial="hidden"
                animate={mode === "mount" ? "show" : undefined}
                whileInView={mode === "inView" ? "show" : undefined}
                viewport={
                    mode === "inView" ? { once, amount: 0.08 } : undefined
                }
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
            </motion.div>
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
        <motion.div
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
        </motion.div>
    );
}
