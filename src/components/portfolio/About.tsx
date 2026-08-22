import { motion } from "framer-motion";
import { Download } from "lucide-react";
import avatar from "@/assets/avatar.jpg";
import { portfolio } from "@/config";
import { downloadResume } from "@/lib/resume";
import { MagneticButton } from "./MagneticButton";
import { Section } from "./Section";

export function About() {
  const { person } = portfolio;

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineering with taste and rigor"
      intro={person.tagline}
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glow-ring relative overflow-hidden rounded-3xl border border-glass-border"
        >
          <img
            src={avatar}
            alt={`Portrait of ${person.name}`}
            loading="lazy"
            width={816}
            height={816}
            className="h-full w-full object-cover"
          />
          <figcaption className="glass absolute inset-x-3 bottom-3 rounded-2xl px-4 py-3 text-sm">
            <span className="font-medium">{person.name}</span>
            <span className="block text-muted-foreground">{person.role}</span>
          </figcaption>
        </motion.figure>

        <div>
          {person.bio.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="mb-5 text-base leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </motion.p>
          ))}

          <div className="mt-8 grid grid-cols-3 gap-3">
            {person.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="glass rounded-2xl p-4"
              >
                <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <MagneticButton
              className="border border-glass-border bg-glass text-foreground hover:bg-secondary/60"
              onClick={downloadResume}
            >
              <Download className="h-4 w-4" />
              Download resume
            </MagneticButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
