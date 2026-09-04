import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, GraduationCap, MapPin, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { portfolio } from "@/config";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Avatar } from "@/components/portfolio/Avatar";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";

const TITLE = `About — ${portfolio.person.name}`;
const DESCRIPTION = `About ${portfolio.person.name}: B.Tech student at Takshashila University, from Sompeta in Andhra Pradesh — education, achievements and what I care about as a developer.`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `${SITE_URL}/about` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

function Block({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Trophy;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16"
    >
      <h2 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        <Icon className="h-4 w-4" aria-hidden="true" /> {title}
      </h2>
      <div className="mt-6">{children}</div>
    </motion.section>
  );
}

function AboutPage() {
  const { person, education, achievements, skillGroups, interests, personalStatement } =
    portfolio;

  return (
    <ThemeProvider>
      <AnimatedBackground />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to portfolio
        </Link>

        <header className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center">
          <Avatar rounded="square" className="h-32 w-32 shrink-0" />
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              About {person.firstName}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {person.tagline}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" /> {person.homeTown}
            </p>
          </div>
        </header>

        <Block title="Personal statement" icon={Sparkles}>
          <p className="glass rounded-3xl p-6 text-base leading-relaxed text-muted-foreground">
            {personalStatement}
          </p>
          <div className="mt-6 space-y-4">
            {person.bio.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </Block>

        <Block title="Education" icon={GraduationCap}>
          <ul className="space-y-5">
            {education.map((item) => (
              <li key={item.id} className="glass rounded-3xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold">{item.degree}</h3>
                  <span className="text-sm text-muted-foreground">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{item.institution}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((d) => (
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

        <Block title="Achievements" icon={Trophy}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {achievements.map((a) => (
              <li key={a} className="glass rounded-2xl p-5 text-sm leading-relaxed">
                {a}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Skills" icon={Sparkles}>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label} className="glass rounded-2xl p-5">
                <h3 className="text-sm font-semibold">{group.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-secondary/60 px-2.5 py-1 text-[11px] text-secondary-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Outside the coursework" icon={Sparkles}>
          <ul className="flex flex-wrap gap-2">
            {interests.map((i) => (
              <li
                key={i}
                className="rounded-full border border-glass-border px-4 py-2 text-sm text-muted-foreground"
              >
                {i}
              </li>
            ))}
          </ul>
        </Block>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See my projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View resume
          </Link>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
