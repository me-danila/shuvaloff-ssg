import { GENTLE_EASE } from "@/components/ui/Motion";

/**
 * Общая анимация выезжающих меню: основной хедер (components/layout/Header)
 * и мобильное меню лендингов (components/landing/LandingHeader).
 */

export const OVERLAY_TRANSITION = {
    duration: 0.32,
    ease: GENTLE_EASE,
} as const;

export const PANEL_TRANSITION = {
    duration: 0.58,
    ease: GENTLE_EASE,
} as const;

export const overlayVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
};

export const menuListVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.055,
            delayChildren: 0.08,
        },
    },
};

export const menuItemVariants = {
    hidden: { opacity: 0, x: -18 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.42,
            ease: GENTLE_EASE,
        },
    },
};
