import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  Code2,
  GraduationCap,
  Rocket,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { portfolio } from "@/config";
import { scrollToId } from "@/lib/scroll";
import { Section } from "./Section";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Trophy,
  Code2,
  Rocket,
  Sparkles,
};

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="timeline"
      eyebrow="Timeline"
      title="Career milestones"
      intro="The short version of how I got here — school in Sompeta, a B.Tech in Tamil Nadu, and a habit of finishing what I start."
    >
      <div ref={ref} className="relative pl-10 sm:pl-14">
        <div
          aria-hidden
          className="absolute left-3 top-2 h-full w-px bg-glass-border sm:left-5"
        />
        {!reduced && (
          <>
            <motion.div
              aria-hidden
              style={{ scaleY: lineScale }}
              className="absolute left-3 top-2 h-full w-px origin-top bg-gradient-to-b from-primary via-accent to-transparent sm:left-5"
            />
            <motion.div
              aria-hidden
              style={{ top: glowY }}
              className="absolute left-3 h-24 w-px -translate-x-1/2 bg-accent/60 blur-[6px] sm:left-5"
            />
          </>
        )}

        <ol className="space-y-10">
          {portfolio.milestones.map((m, i) => {
            const Icon = ICONS[m.icon] ?? Sparkles;
            return (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-10 top-1 grid h-6 w-6 place-items-center rounded-full border border-glass-border bg-background text-accent sm:-left-14 sm:h-8 sm:w-8"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>

                <div className="glass rounded-3xl p-6 transition-shadow duration-300 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                    {m.year}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {portfolio.experience.length > 0 && (
        <div className="mt-12">
          <button
            onClick={() => scrollToId("experience")}
            className="inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See the detailed experience <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </Section>
  );
}
