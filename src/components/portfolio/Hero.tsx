import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Globe, Linkedin, Mail, Twitter } from "lucide-react";
import { portfolio } from "@/config";
import { MagneticButton } from "./MagneticButton";
import { downloadResume } from "@/lib/resume";

const icons = { Github, Linkedin, Twitter, Mail, Globe };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const { person, socials } = portfolio;

  return (
    <section id="hero" className="relative flex min-h-screen items-center pt-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl px-6"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1.5 text-xs text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {person.availability}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-7 max-w-4xl text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.95]"
        >
          <span className="block text-foreground">{person.name}</span>
          <span className="text-gradient block">{person.role}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          {person.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton
            className="glow-ring bg-primary text-primary-foreground hover:opacity-95"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            View selected work
            <ArrowDown className="h-4 w-4" />
          </MagneticButton>

          <MagneticButton
            className="border border-glass-border bg-glass text-foreground hover:bg-secondary/60"
            onClick={downloadResume}
          >
            <Download className="h-4 w-4" />
            Download resume
          </MagneticButton>
        </motion.div>

        <motion.ul variants={item} className="mt-12 flex items-center gap-3">
          {socials.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-glass-border bg-glass text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              </li>
            );
          })}
          <li className="ml-2 text-sm text-muted-foreground">{person.location}</li>
        </motion.ul>
      </motion.div>
    </section>
  );
}
