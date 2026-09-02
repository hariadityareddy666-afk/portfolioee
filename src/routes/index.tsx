import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { SkillsMarquee } from "@/components/portfolio/SkillsMarquee";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Blog } from "@/components/portfolio/Blog";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { ThemeProvider } from "@/hooks/useTheme";
import { portfolio } from "@/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: portfolio.meta.title },
      { name: "description", content: portfolio.meta.description },
      { name: "keywords", content: portfolio.meta.keywords },
      { name: "author", content: portfolio.person.name },
      { property: "og:title", content: portfolio.meta.title },
      { property: "og:description", content: portfolio.meta.description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: portfolio.person.name,
          jobTitle: portfolio.person.role,
          email: `mailto:${portfolio.person.email}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tamil Nadu",
            addressCountry: "IN",
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Takshashila University",
          },
          knowsAbout: portfolio.skills,
          sameAs: portfolio.socials
            .filter((s) => s.href.startsWith("http"))
            .map((s) => s.href),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <SmoothScroll />
      <AnimatedBackground />
      <ScrollProgress />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        {portfolio.skills.length > 0 && <SkillsMarquee />}
        <About />
        <Projects />
        {portfolio.experience.length > 0 && <Experience />}
        <Blog />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
