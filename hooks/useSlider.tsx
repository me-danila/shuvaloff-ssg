import { useEffect, useRef, useState } from "react";

export function useSlider() {
    const [current, setCurrent] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const index = Array.from(slider.children).indexOf(
                            entry.target as HTMLElement,
                        );
                        if (index !== -1) setCurrent(index);
                    }
                }
            },
            { root: slider, threshold: 0.6 },
        );

        for (const child of Array.from(slider.children)) {
            observer.observe(child);
        }

        return () => observer.disconnect();
    }, []);

    const scrollTo = (index: number) => {
        setCurrent(index);
        const slider = sliderRef.current;
        if (!slider) return;
        const child = slider.children[index] as HTMLElement;
        slider.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    };

    return { current, sliderRef, scrollTo };
}
