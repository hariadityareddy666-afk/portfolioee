import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { portfolio } from "@/config";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";

const { person, gallery } = portfolio;

const TITLE = `Gallery — Work samples by ${person.name}, developer from Sompeta, Andhra Pradesh`;
const DESCRIPTION =
  "Work samples from Hari Aditya Reddy — live sites, code repositories and documents, each with a direct link. Developer based in Sompeta, Srikakulam district, Andhra Pradesh, India.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Hari Aditya Reddy work samples, developer portfolio Sompeta, web development samples Srikakulam, Python projects Andhra Pradesh, live project links India",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/gallery` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/gallery` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}/gallery`,
          author: { "@type": "Person", name: person.name },
          hasPart: gallery.map((item) => ({
            "@type": "CreativeWork",
            name: item.title,
            description: item.description,
            url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
          })),
        }),
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <ThemeProvider>
      <AnimatedBackground />
      <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-28">
        <Link
          to="/portfolio"
          search={{ filter: "All" as const }}
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to portfolio
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-10 max-w-2xl"
        >
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Work gallery</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Every sample of my work in one place — live sites, code and documents. Each
            card opens the real thing: no screenshots standing in for projects that exist.
          </p>
        </motion.header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {gallery.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
              className="glass group flex h-full flex-col overflow-hidden rounded-3xl"
            >
              {item.image && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    loading="lazy"
                    decoding="async"
                    width={1024}
                    height={640}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="self-start rounded-full border border-glass-border px-3 py-1 text-xs text-accent">
                  {item.tag}
                </span>
                <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-5 border-t border-glass-border pt-4">
                  <a
                    href={item.url}
                    {...(item.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    aria-label={`Open ${item.title}${item.external ? " (opens in a new tab)" : ""}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.external && item.url.includes("github.com") && (
                      <Github className="h-4 w-4" aria-hidden="true" />
                    )}
                    {item.external ? "Open" : "View"}{" "}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
