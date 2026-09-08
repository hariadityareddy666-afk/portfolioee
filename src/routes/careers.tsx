import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { portfolio } from "@/config";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";

const { person, careers } = portfolio;

const TITLE = `Careers & Hiring — ${person.name}, Developer in Sompeta, Andhra Pradesh`;
const DESCRIPTION =
  "Hire Hari Aditya Reddy — web development, Python and open-source roles. Available remotely across India and locally in Sompeta, Srikakulam district, Andhra Pradesh. Roles, responsibilities and how to apply.";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "hire developer Sompeta, web developer Srikakulam, Andhra Pradesh developer for hire, Python freelancer Andhra Pradesh, web development intern India, student developer Srikakulam district",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/careers` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/careers` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `${SITE_URL}/careers`,
          name: TITLE,
          description: DESCRIPTION,
          mainEntity: {
            "@type": "Person",
            name: person.name,
            email: `mailto:${person.email}`,
            telephone: person.phone,
            jobTitle: person.role,
            seeks: careers.roles.map((r) => ({
              "@type": "Demand",
              name: r.title,
              description: r.summary,
              availableAtOrFrom: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: person.address.locality,
                  addressRegion: person.address.region,
                  postalCode: person.address.postalCode,
                  addressCountry: person.address.country,
                },
              },
            })),
            address: {
              "@type": "PostalAddress",
              addressLocality: person.address.locality,
              addressRegion: person.address.region,
              postalCode: person.address.postalCode,
              addressCountry: person.address.country,
            },
            areaServed: [
              "Sompeta, Andhra Pradesh",
              "Srikakulam district, Andhra Pradesh",
              "Andhra Pradesh, India",
              "India (remote)",
            ],
          },
        }),
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <ThemeProvider>
      <AnimatedBackground />
      <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back home
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-10 max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-glass-border px-3 py-1 text-xs text-accent">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Sompeta · Srikakulam district · Andhra Pradesh · Remote across India
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            {careers.heading}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {careers.intro}
          </p>
        </motion.header>

        <section className="mt-14" aria-labelledby="roles">
          <h2 id="roles" className="text-2xl font-semibold">
            Roles I'm open to
          </h2>
          <div className="mt-6 space-y-6">
            {careers.roles.map((role, i) => (
              <motion.article
                key={role.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
                className="glass rounded-3xl p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold">{role.title}</h3>
                <p className="mt-2 text-xs text-accent">{role.type}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {role.location}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {role.summary}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {role.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2.5 text-sm text-muted-foreground">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      What I look for
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {role.requirements.map((r) => (
                        <li key={r} className="flex gap-2.5 text-sm text-muted-foreground">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="how-to-apply">
          <h2 id="how-to-apply" className="text-2xl font-semibold">
            How to apply
          </h2>
          <ol className="mt-6 space-y-4">
            {careers.howToApply.map((step, i) => (
              <li key={step} className="glass flex gap-4 rounded-2xl p-5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> Email me
            </a>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Use the contact form <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${person.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {person.phone} ({person.phoneNote})
            </a>
          </div>
        </section>

        <section className="glass mt-16 rounded-3xl p-6 sm:p-8" aria-labelledby="where">
          <h2 id="where" className="text-2xl font-semibold">
            Where I work from
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            My home base is {person.homeTown} — pin code {person.address.postalCode}. I take
            on remote work anywhere in India and can meet in person around Sompeta,
            Srikakulam and the wider Srikakulam district in Andhra Pradesh. During term time
            I study at Takshashila University in Tamil Nadu, so weekday work is remote and
            local Andhra Pradesh projects run on evenings, weekends and university breaks.
          </p>
          <address className="mt-5 not-italic text-sm text-muted-foreground">
            {person.address.locality}, {person.address.district} District,{" "}
            {person.address.region} {person.address.postalCode}, India
          </address>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
