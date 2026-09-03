/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this file only.
 *  Every section of the site maps over the data below.
 * ─────────────────────────────────────────────────────────────
 */
import profilePhotoAsset from "./assets/profile-photo.jpg.asset.json";
import resumeAsset from "./assets/resume.pdf.asset.json";
import blogHackathonImg from "./assets/blog-hackathon.jpg";
import blogDsaImg from "./assets/blog-dsa.jpg";
import blogWebdevImg from "./assets/blog-webdev.jpg";

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

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  /** Set for posts hosted elsewhere; otherwise the post renders at /blog/{slug}. */
  externalUrl?: string;
  coverImage?: string;
  coverAlt?: string;
  body: string[];
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  /** lucide-react icon name */
  icon: "GraduationCap" | "Trophy" | "Code2" | "Rocket" | "Sparkles";
}

export interface SocialLink {
  label: string;
  href: string;
  /** Must match an icon name exported by lucide-react */
  icon: "Github" | "Linkedin" | "Instagram" | "Mail" | "Globe";
}

export const portfolio = {
  meta: {
    title: "Hari Aditya Reddy — Developer & B.Tech Student in India",
    description:
      "Portfolio of Hari Aditya Reddy, a developer and B.Tech student at Takshashila University, Tamil Nadu, India. C, C++, Python and web development projects, resume and blog.",
    keywords:
      "Hari Aditya Reddy, developer India, B.Tech student portfolio, Takshashila University, Python developer Tamil Nadu, web developer Andhra Pradesh",
  },

  person: {
    name: "Hari Aditya Reddy",
    firstName: "Hari",
    role: "Developer",
    tagline:
      "First-year B.Tech student turning curiosity into working software — one project, one commit at a time.",
    location: "Tamil Nadu, India",
    homeTown: "Sompeta, Srikakulam District, Andhra Pradesh, India",
    availability: "Open to internships & collaborations",
    email: "hariadityareddy666@gmail.com",
    phone: "+91 95159 69666",
    phoneNote: "WhatsApp only",
    resumeFileName: "Hari-Aditya-Reddy-Resume.pdf",
    /** Generated on the fly from this config at /resume.pdf — always in sync. */
    resumeUrl: "/resume.pdf",
    /** Previous static upload, kept as an archive reference. */
    resumeArchiveUrl: resumeAsset.url,
    photoUrl: profilePhotoAsset.url,
    bio: [
      "I'm Hari Aditya Reddy, a first-year B.Tech student at Takshashila University in Tamil Nadu, originally from Sompeta in Srikakulam District, Andhra Pradesh.",
      "I'm building my foundation in C, C++, Python and Java while spending most of my free time on web development — HTML, CSS and JavaScript — and on data structures and algorithms.",
      "I placed first in the university-wide Base44 hackathon, I'm an active member of the college coding club, and I'm slowly moving toward AI and machine learning. If you're building something interesting, I'd love to help.",
    ],
    stats: [
      { label: "Graduating", value: "2029" },
      { label: "Hackathon wins", value: "1st" },
      { label: "Languages", value: "4+" },
    ] as { label: string; value: string }[],
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
    { label: "Email", href: "mailto:hariadityareddy666@gmail.com", icon: "Mail" },
  ] as SocialLink[],

  nav: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "timeline", label: "Timeline" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ],

  /** Standalone pages linked from the navbar. */
  pages: [
    { to: "/about", label: "About me" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/resume", label: "Resume" },
  ] as { to: "/about" | "/portfolio" | "/resume"; label: string }[],

  milestones: [
    {
      id: "school",
      year: "2024",
      title: "Finished school in Sompeta",
      description:
        "Wrapped up school in Sompeta, Srikakulam District, and started teaching myself to code with C and Python in the gap before university.",
      icon: "Sparkles",
    },
    {
      id: "first-code",
      year: "2024",
      title: "First programs that actually ran",
      description:
        "Built a Python calculator with real input validation and hand-coded my first web page with HTML and CSS.",
      icon: "Code2",
    },
    {
      id: "btech",
      year: "2025",
      title: "Started B.Tech at Takshashila University",
      description:
        "Joined the first-year B.Tech cohort in Tamil Nadu and became an active member of the college coding club.",
      icon: "GraduationCap",
    },
    {
      id: "base44",
      year: "2025",
      title: "First place, Base44 hackathon",
      description:
        "Won the university-wide Base44 hackathon by scoping ruthlessly and shipping a build that actually worked on demo day.",
      icon: "Trophy",
    },
    {
      id: "now",
      year: "2026",
      title: "Building in public, heading toward AI",
      description:
        "Practising DSA in C++, shipping web projects like this site, and starting on machine learning fundamentals.",
      icon: "Rocket",
    },
  ] as Milestone[],

  skills: [
    "C",
    "C++",
    "Python",
    "Java",
    "HTML",
    "CSS",
    "JavaScript",
    "MySQL",
    "Git",
    "GitHub",
    "VS Code",
    "DSA",
    "OOP",
  ] as string[],

  skillGroups: [
    { label: "Languages", items: ["C", "C++", "Python", "Java (basic)"] },
    { label: "Web development", items: ["HTML", "CSS", "JavaScript"] },
    { label: "Databases", items: ["MySQL (basic queries)"] },
    {
      label: "Tools",
      items: ["Git / GitHub", "Visual Studio Code", "Video creation", "Ad creation"],
    },
    {
      label: "Concepts",
      items: [
        "Data Structures & Algorithms (introductory)",
        "Object-Oriented Programming",
      ],
    },
    {
      label: "Soft skills",
      items: [
        "Problem-solving & logical thinking",
        "Team collaboration & communication",
        "Adaptability & eagerness to learn",
        "Time management",
      ],
    },
  ] as SkillGroup[],

  education: [
    {
      id: "btech",
      degree: "Bachelor of Technology (B.Tech)",
      institution: "Takshashila University",
      period: "1st Year · Expected graduation 2029",
      location: "Tamil Nadu, India",
      details: [
        "Building a core foundation in programming, data structures and algorithms.",
        "Active member of the college coding club.",
        "Completed an online certification in Python basics.",
      ],
    },
  ] as EducationItem[],

  achievements: [
    "First place, Base44 hackathon — university-wide.",
    "Participated in university-level coding competitions and hackathons.",
    "Completed online certification in Python basics.",
    "Active member of the college coding club.",
  ] as string[],

  personalStatement:
    "I care about finishing things. I would rather ship a small program that works than plan a large one that never runs. Right now that means learning the fundamentals properly — C, C++, Python, data structures — and turning each one into something I can point at. Coming from a small town in Andhra Pradesh, the internet is what taught me to build, so I try to build in public and share what I learn along the way.",

  interests: [
    "Exploring new programming languages",
    "Competitive coding challenges",
    "Open-source contributions",
    "Learning AI & machine learning",
  ] as string[],

  projectFilters: ["All", "Frontend", "Backend", "Fullstack"] as const,

  projects: [
    {
      id: "python-calculator",
      title: "Python Calculator App",
      description:
        "A command-line calculator built in Python covering the four basic operations, with input parsing and error handling for invalid entries and division by zero.",
      category: "Backend",
      tags: ["Python", "CLI", "Error handling"],
      year: "2025",
      repoUrl: "https://github.com/hariadityareddy666-afk",
    },
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      description:
        "A personal webpage designed and hand-coded with HTML and CSS — my first real exercise in layout, typography and responsive design.",
      category: "Frontend",
      tags: ["HTML", "CSS", "Responsive"],
      year: "2025",
      repoUrl: "https://github.com/hariadityareddy666-afk",
    },
    {
      id: "base44-hackathon",
      title: "Base44 Hackathon Build",
      description:
        "The project that took first place in the university-wide Base44 hackathon — built end to end under time pressure with a small team.",
      category: "Fullstack",
      tags: ["Hackathon", "Teamwork", "Rapid prototyping"],
      year: "2025",
      repoUrl: "https://github.com/hariadityareddy666-afk",
    },
  ] as Project[],

  experience: [
    {
      id: "coding-club",
      role: "Member",
      company: "Takshashila University Coding Club",
      period: "2025 — Present",
      location: "Tamil Nadu, India",
      summary:
        "Active member of the college coding club, taking part in weekly practice sessions and internal contests.",
      highlights: [
        "Competed in university-level coding competitions and hackathons.",
        "Placed first in the university-wide Base44 hackathon.",
        "Practice DSA problems regularly with peers and review each other's solutions.",
      ],
    },
    {
      id: "self-taught",
      role: "Self-directed Developer",
      company: "Personal projects",
      period: "2024 — Present",
      location: "Remote",
      summary:
        "Learning by shipping — small Python tools and hand-built web pages, each one pushing a little further than the last.",
      highlights: [
        "Built a Python calculator app with clean input validation.",
        "Designed and coded a personal portfolio page with HTML and CSS.",
        "Completed an online certification in Python basics.",
      ],
    },
  ] as ExperienceItem[],

  blog: {
    heading: "Writing",
    subheading: "Notes from a first-year student learning to build in public.",
    posts: [
      {
        slug: "winning-the-base44-hackathon",
        title: "What winning the Base44 hackathon taught me about shipping",
        excerpt:
          "First place at a university-wide hackathon came down to scoping ruthlessly and shipping something that actually ran.",
        date: "2026-02-14",
        readingTime: "4 min read",
        tags: ["Hackathon", "Teamwork"],
        coverImage: blogHackathonImg,
        coverAlt: "Glowing neon trophy over a dark wireframe landscape",
        body: [
          "Going into the Base44 hackathon I assumed the winning team would be the one with the cleverest idea. It wasn't. It was the team whose demo worked.",
          "We spent the first hour arguing about features and the next hour cutting almost all of them. What was left was small enough that we could actually finish it, test it, and rehearse the demo twice before presenting.",
          "The three things that mattered: pick a problem you can explain in one sentence, get something running end to end in the first half of the time, and spend the last hour on polish rather than new features.",
          "I came out of it more convinced than ever that finishing is a skill in itself — and one you only get by finishing things.",
        ],
      },
      {
        slug: "learning-dsa-as-a-first-year",
        title: "Learning data structures and algorithms as a first-year student",
        excerpt:
          "How I approach DSA without a computer science background yet — slowly, in C++, and by writing things twice.",
        date: "2026-01-08",
        readingTime: "5 min read",
        tags: ["DSA", "C++"],
        coverImage: blogDsaImg,
        coverAlt: "Cyan nodes and edges forming a data structure graph on a dark background",
        body: [
          "Data structures and algorithms felt impossible when I started. Every solution online looked like it came from someone who already knew the answer.",
          "What changed things for me was writing every solution twice: once badly, on my own, and once again after reading a better approach. The second version is where the learning happens, because you can feel exactly which part of your thinking was wrong.",
          "I work mostly in C++ because it forces me to think about memory and types, and that has made Python feel much clearer by contrast.",
          "I'm still early. Arrays, strings, linked lists, stacks and queues are comfortable; trees and graphs are the current wall. That's fine — the wall moves.",
        ],
      },
      {
        slug: "from-html-css-to-real-web-apps",
        title: "From HTML and CSS to building real web apps",
        excerpt:
          "My first portfolio was a static page. Here's what changed when I started thinking in components and state.",
        date: "2025-11-22",
        readingTime: "4 min read",
        tags: ["Web development", "JavaScript"],
        coverImage: blogWebdevImg,
        coverAlt: "Neon browser window wireframe surrounded by floating UI component blocks",
        body: [
          "My first portfolio was a single HTML file with a stylesheet next to it. It worked, and I was proud of it, but every change meant editing the same markup in four places.",
          "The shift happened when I stopped thinking about pages and started thinking about pieces: a card, a nav, a section — each one described once and reused.",
          "JavaScript stopped being decoration and became the thing that holds state. That single idea, that the interface is a function of data, reorganised how I write everything.",
          "This site is the result. The entire thing reads from one configuration file, which means updating my work is editing data, not markup.",
        ],
      },
    ] as BlogPost[],
  },

  contact: {
    heading: "Get in touch",
    subheading:
      "Send a message below and it lands straight in my inbox. You can also reach me on LinkedIn or WhatsApp.",
  },

  footer: {
    note: "Built from scratch.",
  },
};

export type PortfolioConfig = typeof portfolio;
