import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMemo, useState, type MouseEvent } from "react";
import { portfolio, type Project } from "@/config";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

function ProjectCard({ project }: { project: Project }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 20 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1200px]"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-shadow duration-300 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-glass-border px-3 py-1 text-xs text-accent">
            {project.category}
          </span>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>

        <h3 className="mt-6 text-2xl font-semibold">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-secondary/60 px-2.5 py-1 text-[11px] text-secondary-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-4 border-t border-glass-border pt-5 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Live site <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Github className="h-4 w-4" /> Code
            </a>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? portfolio.projects
        : portfolio.projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects built to last"
      intro="A few things I have built while learning — small, finished and real."
    >
      {portfolio.projects.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center">
          <p className="text-base font-medium">Project details coming soon</p>
          <p className="mt-2 text-sm text-muted-foreground">
            I'm putting my work together. In the meantime, my code lives on GitHub.
          </p>
          <a
            href={portfolio.socials.find((s) => s.label === "GitHub")?.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit my GitHub profile (opens in a new tab)"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Github className="h-4 w-4" /> View GitHub
          </a>
        </div>
      ) : (
      <>
      <div className="mb-10 flex flex-wrap gap-2">
        {portfolio.projectFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              filter === f
                ? "text-primary-foreground"
                : "border border-glass-border text-muted-foreground hover:text-foreground",
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12">
        <Link
          to="/portfolio"
          search={{ filter: filter as "All" | "Frontend" | "Backend" | "Fullstack" }}
          className="inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Open the full portfolio
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      </>
      )}
    </Section>
  );
}
