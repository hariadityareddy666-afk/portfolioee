import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Mail, MapPin, Phone } from "lucide-react";
import { portfolio } from "@/config";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Footer } from "@/components/portfolio/Footer";

const TITLE = `Resume — ${portfolio.person.name}`;
const DESCRIPTION = `Resume of ${portfolio.person.name}: B.Tech education at Takshashila University, experience, projects and technical skills in C, C++, Python and web development.`;

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `${SITE_URL}/resume` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/resume` }],
  }),
  component: ResumePage,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ResumePage() {
  const { person, education, experience, skillGroups, projects, achievements } =
    portfolio;

  return (
    <ThemeProvider>
      <AnimatedBackground />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <header className="mt-10">
          <h1 className="text-4xl font-bold sm:text-5xl">{person.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{person.role}</p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" /> {person.location}
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <a href={`mailto:${person.email}`} className="hover:text-accent">
                {person.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" /> {person.phone} ({person.phoneNote})
            </li>
          </ul>

          <a
            href={person.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            download={person.resumeFileName}
            className="glow-ring mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-95"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </header>

        <Block title="Profile">
          <div className="space-y-4">
            {person.bio.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </Block>

        <Block title="Education">
          <ul className="space-y-6">
            {education.map((ed) => (
              <li key={ed.id} className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold">{ed.degree}</h3>
                  <span className="text-sm text-muted-foreground">{ed.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">
                  {ed.institution} · {ed.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {ed.details.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Work & activities">
          <ul className="space-y-6">
            {experience.map((job) => (
              <li key={job.id} className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold">
                    {job.role} <span className="text-accent">· {job.company}</span>
                  </h3>
                  <span className="text-sm text-muted-foreground">{job.period}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{job.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Skills">
          <dl className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label} className="glass rounded-2xl p-5">
                <dt className="text-sm font-medium">{group.label}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-secondary/60 px-2.5 py-1 text-[11px] text-secondary-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Projects">
          <ul className="space-y-4">
            {projects.map((p) => (
              <li key={p.id} className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className="text-xs text-muted-foreground">{p.year}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Achievements">
          <ul className="space-y-2">
            {achievements.map((a) => (
              <li
                key={a}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {a}
              </li>
            ))}
          </ul>
        </Block>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
