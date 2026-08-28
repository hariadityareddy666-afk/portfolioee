import { motion } from "framer-motion";
import { ArrowDown, FileText, Github, Globe, Instagram, Linkedin, Mail } from "lucide-react";
import { portfolio } from "@/config";
import { MagneticButton } from "./MagneticButton";
import { Avatar } from "./Avatar";
import { scrollToId } from "@/lib/scroll";
import { downloadResume } from "@/lib/resume";

const icons = { Github, Linkedin, Instagram, Mail, Globe };

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
        <motion.div variants={item}>
          <Avatar className="h-28 w-28 sm:h-32 sm:w-32" />
        </motion.div>

        <motion.span
          variants={item}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1.5 text-xs text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {person.availability}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.95]"
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
            onClick={() => scrollToId("projects")}
          >
            View my work
            <ArrowDown className="h-4 w-4" />
          </MagneticButton>

          <MagneticButton
            className="border border-glass-border bg-glass text-foreground hover:bg-secondary/60"
            onClick={() => scrollToId("contact")}
          >
            Get in touch
          </MagneticButton>

          <MagneticButton
            className="border border-glass-border bg-glass text-foreground hover:bg-secondary/60"
            href={person.resumeUrl || undefined}
            onClick={person.resumeUrl ? undefined : downloadResume}
            ariaLabel={
              person.resumeUrl
                ? "View resume (opens in a new tab)"
                : "Download resume"
            }
          >
            <FileText className="h-4 w-4" />
            Resume
          </MagneticButton>
        </motion.div>

        <motion.ul variants={item} className="mt-12 flex flex-wrap items-center gap-3">
          {socials.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${s.label} profile (opens in a new tab)`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-glass-border bg-glass text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-accent/50 hover:bg-primary/15 hover:text-accent"
                >
                  <Icon className="h-[1.15rem] w-[1.15rem]" />
                </a>
              </li>
            );
          })}
          <li className="ml-1 text-sm text-muted-foreground">{person.location}</li>
        </motion.ul>
      </motion.div>
    </section>
  );
}
