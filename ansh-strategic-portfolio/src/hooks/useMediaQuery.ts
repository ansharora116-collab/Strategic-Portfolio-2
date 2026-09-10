import { useEffect, useState } from 'react';

/** Subscribes to a media query, SSR-safe and cleaned up on unmount. */
export function useMediaQuery(query: string, initial = false): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True when the visitor has asked for less motion. Never animate against it. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** True on pointing devices that can hover — gates every hover-only affordance. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

/** True on the compact layout, where boards simplify and motion shortens. */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 760px)');
}
