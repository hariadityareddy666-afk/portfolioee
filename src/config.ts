/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this file only.
 *  Every section of the site maps over the data below.
 * ─────────────────────────────────────────────────────────────
 */

export type ProjectCategory = "Frontend" | "Backend" | "Fullstack";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  year: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  /** Must match an icon name exported by lucide-react */
  icon: "Github" | "Linkedin" | "Instagram" | "Mail" | "Globe";
}

export const portfolio = {
  meta: {
    title: "Hari Aditya Reddy — Developer Portfolio",
    description:
      "Personal portfolio of Hari Aditya Reddy, a developer based in Sompeta, Srikakulam District, Andhra Pradesh, India.",
  },

  person: {
    name: "Hari Aditya Reddy",
    firstName: "Hari",
    role: "Developer",
    tagline: "Building on the web, one project at a time.",
    location: "Sompeta, Srikakulam District, Andhra Pradesh, India",
    availability: "Open to opportunities",
    email: "",
    phone: "",
    resumeFileName: "Hari-Aditya-Reddy-Resume.txt",
    bio: [
      "I'm Hari Aditya Reddy, a developer based in Sompeta, Srikakulam District, Andhra Pradesh, India.",
      "A fuller bio is on the way — for now, the quickest way to see what I'm working on is GitHub, or you can reach me through the links below.",
    ],
    /** Add real numbers here when you have them. */
    stats: [] as { label: string; value: string }[],
  },

  socials: [
    { label: "GitHub", href: "https://github.com/hariadityareddy666-afk", icon: "Github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hari-aditya-reddy-8a283b383?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      icon: "Linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/hariadityareddy_100?igsi=MW5zNjZuOGRlNmxnMw==",
      icon: "Instagram",
    },
  ] as SocialLink[],

  nav: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],

  /** Add the tools you actually work with. */
  skills: [] as string[],

  projectFilters: ["All", "Frontend", "Backend", "Fullstack"] as const,

  /** Add real projects here — the section shows an honest placeholder while it's empty. */
  projects: [] as Project[],

  /** Add real roles here — the section is hidden while it's empty. */
  experience: [] as ExperienceItem[],

  contact: {
    heading: "Get in touch",
    subheading:
      "The best way to reach me right now is through LinkedIn or Instagram. You can also leave a note below.",
    /** Drop a Formspree (or any POST) endpoint here to go live. */
    formEndpoint: "",
  },

  footer: {
    note: "Built from scratch.",
  },
};

export type PortfolioConfig = typeof portfolio;
