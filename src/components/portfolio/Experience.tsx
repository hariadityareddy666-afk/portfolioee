import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { portfolio } from "@/config";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've been"
      intro="Teams I've helped build, scale and speed up."
    >
      <ol className="relative border-l border-glass-border pl-6 sm:pl-10">
        {portfolio.experience.map((job, i) => (
          <motion.li
            key={job.id}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 last:mb-0"
          >
            <span className="absolute -left-[31px] top-7 h-3 w-3 rounded-full bg-primary ring-4 ring-background sm:-left-[47px]" />
            <article className="glass rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold">
                  {job.role}{" "}
                  <span className="text-accent">· {job.company}</span>
                </h3>
                <span className="text-sm text-muted-foreground">{job.period}</span>
              </div>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {job.location}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {job.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
