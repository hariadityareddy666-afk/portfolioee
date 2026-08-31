import { useState } from "react";
import { portfolio } from "@/config";
import { cn } from "@/lib/utils";

/**
 * Profile photo with an accent glow ring.
 * Set `person.photoUrl` in src/config.ts (or drop the file in src/assets and
 * import it) to swap in a real photo — otherwise a clean monogram is shown.
 * While the photo loads a subtle glow pulse is rendered; if it fails to load
 * the monogram fallback takes over automatically.
 */
export function Avatar({
  className,
  rounded = "full",
}: {
  className?: string;
  rounded?: "full" | "square";
}) {
  const { person } = portfolio;
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    person.photoUrl ? "loading" : "error",
  );

  const initials = person.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("");
  const alt = `Portrait photo of ${person.name}`;

  return (
    <div
      className={cn(
        "glow-ring relative overflow-hidden border border-glass-border bg-secondary/40",
        rounded === "full" ? "rounded-full" : "rounded-3xl",
        className,
      )}
    >
      {/* Loading skeleton: soft accent glow pulse */}
      {status === "loading" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-indigo/20 via-secondary/40 to-cyan/20"
        />
      )}

      {status !== "error" && person.photoUrl ? (
        <img
          src={person.photoUrl}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            status === "loaded" ? "opacity-100" : "opacity-0",
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="grid h-full w-full place-items-center bg-gradient-to-br from-indigo/25 via-transparent to-cyan/25"
        >
          <span aria-hidden="true" className="font-display text-[clamp(1.75rem,12cqw,4rem)] font-bold tracking-tight text-foreground">
            {initials}
          </span>
        </div>
      )}
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-accent/30" />
    </div>
  );
}
