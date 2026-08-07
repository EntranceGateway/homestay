import { useCallback, useEffect, useState } from 'react';

interface ScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
    const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', triggerOnce = true } = options;
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const ref = useCallback((node: HTMLDivElement | null) => {
        setElement(node);
    }, []);

    useEffect(() => {
        if (!element) return;

        // intersectionRatio is visible area / total area, so an element taller than the
        // viewport can never reach a high threshold and would never reveal. Clamp to half
        // of what this element can actually hit. Short elements keep the requested value.
        const reachable = window.innerHeight / Math.max(element.offsetHeight, 1);
        const safeThreshold = Math.min(threshold, reachable / 2);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold: safeThreshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [element, threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
}
