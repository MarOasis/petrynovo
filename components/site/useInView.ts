"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // respeita quem tem redução de movimento
        const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (prefersReduced) {
            setInView(true);
            return;
        }

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    obs.disconnect(); // anima 1x e para
                }
            },
            { threshold: 0.15, ...options }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [options]);

    return { ref, inView };
}
