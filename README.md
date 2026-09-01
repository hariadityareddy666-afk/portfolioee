# Portfolio Glow

Build a complete, fully functional, and production-ready personal developer portfolio web application. It must be a highly premium, modern Single Page Application (SPA) using React, Tailwind CSS, and Framer Motion.

1. Data Architecture & Content Management (Crucial)

Do not hardcode my personal information directly into the JSX.

Create a centralized data/portfolio.json or config.ts file that stores all my content (Name, Bio, Social Links, Experience Array, Projects Array, Skills Array).

The entire application should dynamically map over this data file so I can easily update my portfolio later by changing just one file.

2. Core Functionality & Features

Working Navigation: Create a sticky header with a backdrop blur. Implement smooth scrolling to page sections (Hero, About, Projects, Experience, Contact). Use an Intersection Observer to highlight the active section link in the navbar as the user scrolls.

Theme Toggle: Implement a fully working Dark/Light mode toggle switch in the navbar that persists the user's choice in localStorage. Default to Dark mode.

Project Filtering: In the Projects section, create working filter buttons (e.g., "All", "Frontend", "Backend", "Fullstack"). When clicked, smoothly animate the filtering of the project grid using Framer Motion's AnimatePresence.

Functional Contact Form: Build a contact form with Name, Email, and Message fields. Implement form validation (required fields, valid email format). Add a simulated loading state (spinner on the submit button) and a success toast notification when submitted. (Prepare the form so it can easily be hooked up to an API like Formspree).

Resume Download: Add a prominent "Download Resume" button in the Hero or About section that simulates a file download.

3. Premium Design & Aesthetics

Vibe: Sleek, futuristic, and highly polished. Use a refined dark mode palette (deep slate, true black, with electric indigo or cyan accents).

Glassmorphism: Use frosted glass effects (backdrop-blur) for the navbar, project cards, and floating elements.

Typography: Use a modern font like 'Inter' or 'Space Grotesk'. Clean hierarchy with oversized headings for impact.

Background: Include a subtle, animated background (like slow-moving blurred gradient meshes or a subtle grid pattern) to give the site depth.

4. High-End Animations (Framer Motion)

Page Load: Elements should reveal smoothly on initial load (staggered fade-up animations).

Scroll Animations: Sections should animate into view as the user scrolls down.

Micro-interactions: Add magnetic hover effects to primary buttons. Project cards should tilt slightly on mouse hover or have image scale-up effects.

Skills Marquee: Create an infinitely scrolling horizontal ticker for my skills/technologies.

5. Responsive & Production Ready

Ensure flawless responsiveness across Mobile, Tablet, and Desktop. Use modern CSS Grid and Flexbox.

Include SEO best practices: semantic HTML tags (<header>, <main>, <section>, <article>).

Use Lucide React for all icons.

Please generate the complete codebase for this functional application.

⚙️ What makes this prompt different (and better):

The config.ts Requirement: This is the most important part. By asking Lovable to put all your data in one config file, you won't have to hunt through hundreds of lines of React code to change a paragraph of text. You just update the JSON/Config file!

State Management: It explicitly asks for working React state (Dark Mode, Form Validation, Project Filtering).

Scroll Spying: It asks for an "Intersection Observer", which is the technical term for making the navbar underline change based on what part of the page you are reading.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://portfolioee.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a51eaae7-c5b3-4ee1-9e96-10e970034f52).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
