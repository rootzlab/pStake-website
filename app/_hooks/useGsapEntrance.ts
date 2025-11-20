"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

export type UseGsapEntranceOptions = {
    delay?: number;
    duration?: number;
    start?: string;
    once?: boolean;
    ease?: string;
    disableY?: boolean;
};

const useGsapEntrance = (options: UseGsapEntranceOptions = {}) => {
    const {
        delay = 0,
        duration = 0.9,
        start = "top 80%",
        once = true,
        ease = "power3.out",
        disableY = false,
    } = options;

    const elementRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (typeof window === "undefined") return;

        const target = elementRef.current;
        if (!target) return;

        try {
            if (!scrollTriggerRegistered) {
                gsap.registerPlugin(ScrollTrigger);
                scrollTriggerRegistered = true;
            }

            const ctx = gsap.context(() => {
                gsap.fromTo(
                    target,
                    disableY ? { autoAlpha: 0 } : { autoAlpha: 0, y: 50 },
                    {
                        autoAlpha: 1,
                        ...(disableY ? {} : { y: 0 }),
                        duration,
                        delay,
                        ease,
                        overwrite: "auto",
                        scrollTrigger: {
                            trigger: target,
                            start,
                            once,
                        },
                    }
                );
            }, target);

            return () => ctx.revert();
        } catch (error) {
            console.error("GSAP animation error:", error);
        }
    }, [delay, duration, ease, start, once, disableY]);

    return elementRef;
};

export default useGsapEntrance;
