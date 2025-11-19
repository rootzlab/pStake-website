"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export type UseGsapImmediateOptions = {
    delay?: number;
    duration?: number;
    ease?: string;
    disableY?: boolean;
};

/**
 * GSAP hook for immediate animations on page load (no scroll trigger)
 * Used for hero sections that should animate immediately when page loads
 */
const useGsapImmediate = (options: UseGsapImmediateOptions = {}) => {
    const {
        delay = 0,
        duration = 0.8,
        ease = "power3.out",
        disableY = false,
    } = options;

    const elementRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (typeof window === "undefined") return;

        const target = elementRef.current;
        if (!target) return;

        try {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    target,
                    disableY ? { autoAlpha: 0 } : { autoAlpha: 0, y: 30 },
                    {
                        autoAlpha: 1,
                        ...(disableY ? {} : { y: 0 }),
                        duration,
                        delay,
                        ease,
                        overwrite: "auto",
                    }
                );
            }, target);

            return () => ctx.revert();
        } catch (error) {
            console.error("GSAP animation error:", error);
        }
    }, [delay, duration, ease, disableY]);

    return elementRef;
};

export default useGsapImmediate;
