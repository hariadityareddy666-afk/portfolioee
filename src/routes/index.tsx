import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { SkillsMarquee } from "@/components/portfolio/SkillsMarquee";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
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
      { property: "og:title", content: portfolio.meta.title },
      { property: "og:description", content: portfolio.meta.description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
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
      <Navbar />
      <main>
        <Hero />
        {portfolio.skills.length > 0 && <SkillsMarquee />}
        <About />
        <Projects />
        {portfolio.experience.length > 0 && <Experience />}
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
