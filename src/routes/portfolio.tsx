import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { z } from "zod";
import { portfolio } from "@/config";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";

const TITLE = `Portfolio — ${portfolio.person.name}`;
const DESCRIPTION = `Projects by ${portfolio.person.name}: Python, C++ and web development builds with the tech stack, source code and live links for each one.`;

const searchSchema = z.object({
  filter: z.enum(["All", "Frontend", "Backend", "Fullstack"]).catch("All"),
});

export const Route = createFileRoute("/portfolio")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/portfolio` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/portfolio` }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { filter } = Route.useSearch();
  const navigate = useNavigate({ from: "/portfolio" });

  const projects =
    filter === "All"
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category === filter);

  return (
    <ThemeProvider>
      <AnimatedBackground />
      <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-28">
        <Link
          to="/"
          hash="projects"
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to portfolio
        </Link>

        <header className="mt-10 max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Portfolio</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Everything I have built so far, with the tech stack behind each one. Filters
            stay in the URL, so you can share a filtered view.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {portfolio.projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => navigate({ search: { filter: f } })}
              aria-current={filter === f ? "true" : undefined}
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
                  layoutId="portfolio-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="glass flex h-full flex-col rounded-3xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full border border-glass-border px-3 py-1 text-xs text-accent">
                    {project.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                </div>

                <h2 className="mt-6 text-2xl font-semibold">{project.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Tech stack
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md bg-secondary/60 px-2.5 py-1 text-[11px] text-secondary-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-glass-border pt-5 text-sm">
                  <a
                    href={project.liveUrl ?? project.repoUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${project.liveUrl ? "Open the live site for" : "View the source code for"} ${project.title} (opens in a new tab)`}
                    className="inline-flex items-center gap-1.5 rounded-md text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {project.liveUrl ? (
                      <>
                        Live site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        <Github className="h-4 w-4" aria-hidden="true" /> View code
                      </>
                    )}
                  </a>
                  {project.liveUrl && project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`View the source code for ${project.title} (opens in a new tab)`}
                      className="inline-flex items-center gap-1.5 rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" /> Code
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {projects.length === 0 && (
          <p className="glass mt-10 rounded-3xl p-10 text-center text-sm text-muted-foreground">
            Nothing in this category yet — more {filter.toLowerCase()} work is on the way.
          </p>
        )}
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
