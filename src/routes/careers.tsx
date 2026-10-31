import { createFileRoute, Link, useServerFn } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { portfolio } from "@/config";
import { submitApplication } from "@/lib/careers.functions";
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

        <section className="mt-16" aria-labelledby="apply-form">
          <h2 id="apply-form" className="text-2xl font-semibold">
            Apply for a role
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Skip the email — send your details here. Every application is stored and
            lands in my inbox with the role attached.
          </p>
          <ApplicationForm />
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

const inputClass =
  "w-full rounded-xl border border-glass-border bg-secondary/40 px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function ApplicationForm() {
  const submitFn = useServerFn(submitApplication);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const text = (key: string) => String(fd.get(key) ?? "").trim();
    setStatus("submitting");
    setError("");
    try {
      await submitFn({
        data: {
          name: text("name"),
          email: text("email"),
          phone: text("phone") || undefined,
          roleId: text("role"),
          message: text("message"),
          links: text("links") || undefined,
          website: text("website"),
        },
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending your application — please email me at " +
          portfolio.person.email +
          " instead.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="glass mt-6 rounded-3xl p-8 text-center" role="status">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-accent ring-1 ring-primary/30">
          <Send className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 text-base font-medium">Application received</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your details are saved and a copy is in my inbox. I usually reply within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-glass-border px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Send another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass mt-6 grid gap-5 rounded-3xl p-6 sm:grid-cols-2 sm:p-8"
    >
      <div>
        <label htmlFor="apply-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Full name *
        </label>
        <input
          id="apply-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          placeholder="Your name"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="apply-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Email *
        </label>
        <input
          id="apply-email"
          name="email"
          type="email"
          required
          maxLength={255}
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="apply-phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Phone / WhatsApp
        </label>
        <input
          id="apply-phone"
          name="phone"
          type="tel"
          maxLength={20}
          autoComplete="tel"
          placeholder="+91 ..."
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="apply-role" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Role *
        </label>
        <select id="apply-role" name="role" required defaultValue={portfolio.careers.roles[0]?.id} className={inputClass}>
          {portfolio.careers.roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.title}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="apply-links" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Link to your work (optional)
        </label>
        <input
          id="apply-links"
          name="links"
          type="url"
          maxLength={500}
          placeholder="https://github.com/..."
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="apply-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          About the work *
        </label>
        <textarea
          id="apply-message"
          name="message"
          required
          minLength={20}
          maxLength={2000}
          rows={5}
          placeholder="What's the role, the timeline, and anything else I should know?"
          className={inputClass}
        />
      </div>
      {/* Honeypot — hidden from humans, filled in by bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="apply-website">Website</label>
        <input id="apply-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" /> Send application
            </>
          )}
        </button>
      </div>
    </form>
  );
}
