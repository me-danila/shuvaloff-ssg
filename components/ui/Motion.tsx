"use client";

import { type HTMLMotionProps, m } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type BaseDivProps = Omit<HTMLMotionProps<"div">, "children">;
export const GENTLE_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * prefers-reduced-motion без расхождения гидрации. framer-motion'овский
 * useReducedMotion отдаёт на сервере null, а на клиенте сразу true — и
 * `initial` (opacity 0 vs 1) расходится с SSR-разметкой. useMediaQuery
 * возвращает false до монтирования, поэтому `initial` всегда одинаковый, а
 * при reduce элемент после гидрации мгновенно показывается через `animate`.
 */
const useReduceMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

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
    const shouldReduce = useReduceMotion();
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={
                shouldReduce || mode === "mount" ? { opacity: 1 } : undefined
            }
            whileInView={
                !shouldReduce && mode === "inView" ? { opacity: 1 } : undefined
            }
            viewport={mode === "inView" ? { once, amount: 0.12 } : undefined}
            transition={
                shouldReduce
                    ? { duration: 0 }
                    : { duration, delay, ease: GENTLE_EASE }
            }
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
    const shouldReduce = useReduceMotion();
    return (
        <m.div
            initial={{ opacity: 0, y }}
            animate={
                shouldReduce || mode === "mount"
                    ? { opacity: 1, y: 0 }
                    : undefined
            }
            whileInView={
                !shouldReduce && mode === "inView"
                    ? { opacity: 1, y: 0 }
                    : undefined
            }
            viewport={mode === "inView" ? { once, amount: 0.12 } : undefined}
            transition={
                shouldReduce
                    ? { duration: 0 }
                    : { duration, delay, ease: GENTLE_EASE }
            }
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
        const shouldReduce = useReduceMotion();
        return (
            <m.div
                ref={ref}
                onScroll={onScroll}
                initial="hidden"
                animate={shouldReduce || mode === "mount" ? "show" : undefined}
                whileInView={
                    !shouldReduce && mode === "inView" ? "show" : undefined
                }
                viewport={mode === "inView" ? { once, amount } : undefined}
                variants={{
                    hidden: {},
                    show: {
                        transition: shouldReduce
                            ? { staggerChildren: 0, delayChildren: 0 }
                            : { staggerChildren, delayChildren: delay },
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
    const shouldReduce = useReduceMotion();
    return (
        <m.div
            variants={{
                hidden: { opacity: 0, y },
                show: { opacity: 1, y: 0 },
            }}
            transition={
                shouldReduce
                    ? { duration: 0 }
                    : { duration: 0.72, ease: GENTLE_EASE }
            }
            {...props}
        >
            {children}
        </m.div>
    );
}
