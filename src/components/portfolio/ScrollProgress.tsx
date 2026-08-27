import { motion, useScroll, useSpring } from "framer-motion";
import { useMemo } from "react";
import { portfolio } from "@/config";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { scrollToId } from "@/lib/scroll";

/** A thin glowing vertical line + chapter dots that track scroll position. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const ids = useMemo(() => portfolio.nav.map((n) => n.id), []);
  const active = useActiveSection(ids);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative h-56 w-px bg-glass-border">
        <motion.div
          style={{ scaleY: progress }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-indigo via-primary to-cyan shadow-[0_0_14px_2px_color-mix(in_oklab,var(--indigo)_60%,transparent)]"
        />
      </div>

      <ul className="pointer-events-auto absolute -right-1.5 top-0 flex h-56 flex-col justify-between">
        {portfolio.nav.map((n) => (
          <li key={n.id}>
            <button
              aria-label={`Scroll to ${n.label}`}
              onClick={() => scrollToId(n.id)}
              className={cn(
                "block h-2.5 w-2.5 rounded-full border transition-all duration-300",
                active === n.id
                  ? "scale-125 border-transparent bg-accent shadow-[0_0_12px_2px_color-mix(in_oklab,var(--cyan)_60%,transparent)]"
                  : "border-glass-border bg-background hover:bg-secondary",
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
