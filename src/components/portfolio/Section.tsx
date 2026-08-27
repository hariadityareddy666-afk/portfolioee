import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Chapter wash: a soft color band that sweeps through as the section passes.
  const washOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 0.6, 0.6, 0]);
  const washY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["4%", "-6%"]);

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative scroll-mt-28 py-24 sm:py-32", className)}
    >
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ opacity: washOpacity, y: washY }}
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklab,var(--indigo)_22%,transparent),transparent_70%)]"
        />
      )}

      <div className="mx-auto w-full max-w-6xl px-6">
        {(eyebrow || title) && (
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={reduced ? undefined : { y: headerY }}
            className="mb-14 max-w-2xl"
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </span>
            )}
            {title && <h2 className="mt-5 text-4xl font-bold sm:text-5xl">{title}</h2>}
            {intro && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </motion.header>
        )}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
