import { portfolio } from "@/config";

export function SkillsMarquee() {
  const row = [...portfolio.skills, ...portfolio.skills];

  return (
    <div className="marquee-mask relative overflow-hidden border-y border-glass-border py-6">
      <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
        {row.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="whitespace-nowrap rounded-full border border-glass-border bg-glass px-5 py-2 text-sm text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
