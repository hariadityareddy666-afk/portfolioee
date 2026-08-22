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
  icon: "Github" | "Linkedin" | "Twitter" | "Mail" | "Globe";
}

export const portfolio = {
  meta: {
    title: "Aarav Mehta — Full-Stack Engineer & Interface Craftsman",
    description:
      "Portfolio of Aarav Mehta, a full-stack engineer building fast, accessible, beautifully engineered products with React, TypeScript and Node.",
  },

  person: {
    name: "Aarav Mehta",
    firstName: "Aarav",
    role: "Full-Stack Engineer",
    tagline: "I build fast, accessible interfaces and the systems behind them.",
    location: "Bengaluru, India · Remote friendly",
    availability: "Available for select freelance work",
    email: "hello@aaravmehta.dev",
    phone: "+91 98765 43210",
    resumeFileName: "Aarav-Mehta-Resume.txt",
    bio: [
      "I'm a full-stack engineer with 7+ years spent shipping products that feel instant. My work sits at the seam between design and infrastructure — component systems, rendering performance, type-safe APIs and the boring reliability work that makes all of it hold up.",
      "Lately I've been focused on edge rendering, design tokens at scale, and building developer tooling that removes friction for the teams around me.",
    ],
    stats: [
      { label: "Years shipping", value: "7+" },
      { label: "Products launched", value: "34" },
      { label: "Open-source stars", value: "5.2k" },
    ],
  },

  socials: [
    { label: "GitHub", href: "https://github.com", icon: "Github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { label: "X / Twitter", href: "https://x.com", icon: "Twitter" },
    { label: "Email", href: "mailto:hello@aaravmehta.dev", icon: "Mail" },
  ] as SocialLink[],

  nav: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],

  skills: [
    "TypeScript",
    "React 19",
    "Next.js",
    "TanStack Start",
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "Tailwind CSS",
    "Framer Motion",
    "Rust",
    "Go",
    "Docker",
    "Kubernetes",
    "AWS",
    "Cloudflare Workers",
    "Redis",
    "Prisma",
    "Vitest",
    "Playwright",
    "Figma",
  ],

  projectFilters: ["All", "Frontend", "Backend", "Fullstack"] as const,

  projects: [
    {
      id: "orbit",
      title: "Orbit Analytics",
      description:
        "Realtime product analytics dashboard rendering 2M events/day with sub-100ms interaction latency and streaming charts.",
      category: "Fullstack",
      tags: ["React", "ClickHouse", "WebSockets"],
      year: "2026",
      liveUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
    {
      id: "prism",
      title: "Prism Design System",
      description:
        "A 90-component design system with token pipelines, automated a11y checks and visual regression on every PR.",
      category: "Frontend",
      tags: ["Design Tokens", "Radix", "Storybook"],
      year: "2025",
      liveUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
    {
      id: "relay",
      title: "Relay Edge Gateway",
      description:
        "Multi-tenant API gateway on Cloudflare Workers with per-key rate limiting, caching and zero cold starts.",
      category: "Backend",
      tags: ["Rust", "Workers", "Redis"],
      year: "2025",
      repoUrl: "https://github.com",
    },
    {
      id: "atlas",
      title: "Atlas Commerce",
      description:
        "Headless storefront platform with edge-rendered catalogue pages and a 98 Lighthouse score at 40k SKUs.",
      category: "Fullstack",
      tags: ["Next.js", "Stripe", "Postgres"],
      year: "2024",
      liveUrl: "https://example.com",
    },
    {
      id: "lumen",
      title: "Lumen Motion Kit",
      description:
        "An open-source animation primitives library for React — scroll orchestration, magnetic cursors, shared layouts.",
      category: "Frontend",
      tags: ["Framer Motion", "TypeScript"],
      year: "2024",
      repoUrl: "https://github.com",
    },
    {
      id: "forge",
      title: "Forge Job Runner",
      description:
        "Distributed background job engine with exactly-once semantics, backpressure and a live introspection UI.",
      category: "Backend",
      tags: ["Go", "NATS", "Postgres"],
      year: "2023",
      repoUrl: "https://github.com",
    },
  ] as Project[],

  experience: [
    {
      id: "exp-1",
      role: "Staff Frontend Engineer",
      company: "Northwind Labs",
      period: "2023 — Present",
      location: "Remote",
      summary:
        "Lead the web platform team behind a product used by 400k developers monthly.",
      highlights: [
        "Cut median page load from 3.1s to 780ms by moving to edge SSR + streaming.",
        "Built the design-token pipeline now used across 6 product surfaces.",
        "Mentor 5 engineers; own the frontend architecture RFC process.",
      ],
    },
    {
      id: "exp-2",
      role: "Senior Full-Stack Engineer",
      company: "Cobalt Systems",
      period: "2020 — 2023",
      location: "Bengaluru",
      summary: "Owned billing, auth and the public API of a B2B SaaS at scale.",
      highlights: [
        "Designed a usage-metering pipeline handling 90M events/month.",
        "Reduced infra spend 38% via query tuning and smarter caching layers.",
        "Shipped the public REST + GraphQL API and its SDKs.",
      ],
    },
    {
      id: "exp-3",
      role: "Frontend Engineer",
      company: "Studio Kernel",
      period: "2019 — 2020",
      location: "Pune",
      summary: "Built marketing sites and product UIs for early-stage startups.",
      highlights: [
        "Delivered 14 client projects with an average 95+ Lighthouse score.",
        "Introduced component-driven workflow that halved handoff time.",
      ],
    },
  ] as ExperienceItem[],

  contact: {
    heading: "Let's build something sharp",
    subheading:
      "Have a product in mind, a team to strengthen, or a gnarly performance problem? Send a note — I reply within two business days.",
    /** Drop a Formspree (or any POST) endpoint here to go live. */
    formEndpoint: "",
  },

  footer: {
    note: "Designed and built from scratch. No templates.",
  },
};

export type PortfolioConfig = typeof portfolio;
