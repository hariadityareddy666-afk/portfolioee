import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Inertia-based (momentum) scrolling. Disabled entirely when the user
 * prefers reduced motion; lighter on touch devices.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      lerp: isTouch ? 0.14 : 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      syncTouch: false,
    });

    window.__lenis = lenis;
    document.documentElement.style.scrollBehavior = "auto";

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
      document.documentElement.style.removeProperty("scroll-behavior");
    };
  }, []);

  return null;
}
