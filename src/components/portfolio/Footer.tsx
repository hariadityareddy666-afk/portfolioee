import { Github, Globe, Instagram, Linkedin, Mail } from "lucide-react";
import { portfolio } from "@/config";

const icons = { Github, Linkedin, Instagram, Mail, Globe };

export function Footer() {
  return (
    <footer className="border-t border-glass-border py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {portfolio.person.name}. {portfolio.footer.note}
        </p>
        <ul className="flex items-center gap-2">
          {portfolio.socials.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={`${s.label} profile (opens in a new tab)`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="grid h-9 w-9 place-items-center rounded-full border border-glass-border text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-accent/50 hover:bg-primary/15 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
