import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight, Code2, GitFork, Github, Star } from "lucide-react";
import { motion } from "framer-motion";
import { portfolio } from "@/config";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";

const TITLE = `GitHub Repositories — ${portfolio.person.name}`;
const DESCRIPTION = `All public GitHub repositories by ${portfolio.person.name}, developer from Sompeta, Andhra Pradesh — tech stack, source code and live links.`;

export const Route = createFileRoute("/repositories")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/repositories` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/repositories` }],
  }),
  component: RepositoriesPage,
});

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const data = (await res.json()) as GitHubRepo[];
  return data.filter((r) => !r.fork);
}

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const tech = [repo.language, ...repo.topics].filter(Boolean) as string[];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-shadow duration-300 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{repo.name}</h2>
        <span className="shrink-0 text-xs text-muted-foreground">
          Updated {new Date(repo.updated_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {repo.description ?? "No description yet — check the code on GitHub."}
      </p>

      {tech.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {[...new Set(tech)].map((t) => (
            <li
              key={t}
              className="rounded-md bg-secondary/60 px-2.5 py-1 text-[11px] text-secondary-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden="true" /> {repo.stargazers_count}
          <span className="sr-only">stars</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" aria-hidden="true" /> {repo.forks_count}
          <span className="sr-only">forks</span>
        </span>
      </div>

      <div className="mt-5 flex items-center gap-4 border-t border-glass-border pt-5 text-sm">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          aria-label={`View the source code of ${repo.name} on GitHub (opens in a new tab)`}
          className="inline-flex items-center gap-1.5 rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Github className="h-4 w-4" aria-hidden="true" /> Code
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open the live site for ${repo.name} (opens in a new tab)`}
            className="inline-flex items-center gap-1.5 rounded-md text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Live site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function RepositoriesPage() {
  const username = portfolio.person.githubUsername;
  const { data: repos, isLoading, isError } = useQuery({
    queryKey: ["github-repos", username],
    queryFn: () => fetchRepos(username),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const githubUrl = portfolio.socials.find((s) => s.label === "GitHub")?.href;

  return (
    <ThemeProvider>
      <AnimatedBackground />
      <main id="main" className="relative mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back home
          </Link>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            GitHub repositories
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Everything I publish on GitHub — pulled live from my profile, with the
            tech stack, source code and live links for each project.
          </p>

          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit my GitHub profile (opens in a new tab)"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Github className="h-4 w-4" aria-hidden="true" /> @{username}
          </a>
        </motion.div>

        {isLoading && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading repositories">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass h-56 animate-pulse rounded-3xl" />
            ))}
          </div>
        )}

        {isError && (
          <div className="glass mt-12 rounded-3xl p-10 text-center">
            <p className="text-base font-medium">Couldn't load repositories right now</p>
            <p className="mt-2 text-sm text-muted-foreground">
              GitHub may be rate-limiting requests. You can still browse everything on my profile.
            </p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Github className="h-4 w-4" aria-hidden="true" /> Open GitHub
            </a>
          </div>
        )}

        {repos && repos.length === 0 && (
          <div className="glass mt-12 rounded-3xl p-10 text-center">
            <Code2 className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
            <p className="mt-4 text-base font-medium">Repositories coming soon</p>
            <p className="mt-2 text-sm text-muted-foreground">
              I'm preparing my first public repositories. Watch this space.
            </p>
          </div>
        )}

        {repos && repos.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
