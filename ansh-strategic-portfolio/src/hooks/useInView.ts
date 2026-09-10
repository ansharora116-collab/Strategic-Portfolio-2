import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Fraction of the element that must be visible before it counts. */
  threshold?: number;
  /** Margin around the root, e.g. '0px 0px -12% 0px' to trigger slightly early. */
  rootMargin?: string;
  /** Stop observing after the first intersection (the usual case for reveals). */
  once?: boolean;
}

/**
 * Lightweight visibility hook. Reveals use this rather than ScrollTrigger —
 * it is cheaper, needs no cleanup context, and degrades to "visible" when
 * IntersectionObserver is unavailable.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
