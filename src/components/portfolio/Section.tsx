import { motion } from "framer-motion";
import type { ReactNode } from "react";
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
  return (
    <section id={id} className={cn("scroll-mt-28 py-24 sm:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
        {(eyebrow || title) && (
          <motion.header
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 max-w-2xl"
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-5 text-4xl font-bold sm:text-5xl">{title}</h2>
            )}
            {intro && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
