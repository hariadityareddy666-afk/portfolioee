import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { portfolio } from "@/config";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = portfolio.projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — ${portfolio.person.name}`;
    const description = `${project.description} Built with ${project.tags.join(", ")}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/projects/${params.id}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/projects/${params.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            dateCreated: project.year,
            keywords: project.tags.join(", "),
            url: `${SITE_URL}/projects/${params.id}`,
            author: { "@type": "Person", name: portfolio.person.name },
          }),
        },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectNotFound() {
  return (
    <ThemeProvider>
      <AnimatedBackground />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 text-center">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="mt-4 text-muted-foreground">
          That project does not exist — here is everything I have built.
        </p>
        <Link
          to="/portfolio"
          search={{ filter: "All" as const }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent"
        >
          Browse the portfolio
        </Link>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <ThemeProvider>
      <AnimatedBackground />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-28">
        <Link
          to="/portfolio"
          search={{ filter: "All" as const }}
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-10"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-glass-border px-3 py-1 text-accent">
              {project.category}
            </span>
            <span className="text-muted-foreground">{project.year}</span>
            {project.role && (
              <span className="text-muted-foreground">· {project.role}</span>
            )}
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open the live site for ${project.title} (opens in a new tab)`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Visit live site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`View the source code for ${project.title} (opens in a new tab)`}
                className="inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Github className="h-4 w-4" aria-hidden="true" /> Source code
              </a>
            )}
          </div>
        </motion.header>

        <section className="glass mt-12 rounded-3xl p-6" aria-labelledby="tech-stack">
          <h2
            id="tech-stack"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Tech stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-secondary/60 px-3 py-1.5 text-xs text-secondary-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>

        {project.overview && project.overview.length > 0 && (
          <section className="mt-12" aria-labelledby="overview">
            <h2 id="overview" className="text-2xl font-semibold">
              About this project
            </h2>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-muted-foreground">
              {project.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <section className="mt-12" aria-labelledby="highlights">
            <h2 id="highlights" className="text-2xl font-semibold">
              What it does
            </h2>
            <ul className="mt-5 space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="Other projects" className="mt-16 border-t border-glass-border pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            More work
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {portfolio.projects
              .filter((p) => p.id !== project.id)
              .map((p) => (
                <li key={p.id}>
                  <Link
                    to="/projects/$id"
                    params={{ id: p.id }}
                    className="glass block rounded-2xl p-5 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="text-xs text-muted-foreground">{p.category}</span>
                    <span className="mt-1 block text-base font-medium">{p.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
