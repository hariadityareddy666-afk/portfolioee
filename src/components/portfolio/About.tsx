import { motion } from "framer-motion";
import { portfolio } from "@/config";
import { Avatar } from "./Avatar";
import { Section } from "./Section";

export function About() {
  const { person } = portfolio;

  return (
    <Section id="about" eyebrow="About" title="A little about me" intro={person.tagline}>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-xs"
        >
          <Avatar rounded="square" className="aspect-square w-full" />
          <figcaption className="mt-4 text-center text-sm">
            <span className="font-medium">{person.name}</span>
            <span className="block text-muted-foreground">{person.location}</span>
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

          {person.stats.length > 0 && (
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
          )}
        </div>
      </div>
    </Section>
  );
}
