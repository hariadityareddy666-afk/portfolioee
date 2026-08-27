import { portfolio } from "@/config";
import { cn } from "@/lib/utils";

/**
 * Profile photo with an accent glow ring.
 * Set `person.photoUrl` in src/config.ts (or drop the file in src/assets and
 * import it) to swap in a real photo — otherwise a clean monogram is shown.
 */
export function Avatar({
  className,
  rounded = "full",
}: {
  className?: string;
  rounded?: "full" | "square";
}) {
  const { person } = portfolio;
  const initials = person.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("");

  return (
    <div
      className={cn(
        "glow-ring relative overflow-hidden border border-glass-border bg-secondary/40",
        rounded === "full" ? "rounded-full" : "rounded-3xl",
        className,
      )}
    >
      {person.photoUrl ? (
        <img
          src={person.photoUrl}
          alt={`Portrait of ${person.name}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-indigo/25 via-transparent to-cyan/25">
          <span className="font-display text-[clamp(1.75rem,12cqw,4rem)] font-bold tracking-tight text-foreground">
            {initials}
          </span>
        </div>
      )}
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-accent/30" />
    </div>
  );
}
