import { portfolio } from "@/config";

/**
 * Simulated resume download. Swap the blob for a real PDF URL when ready:
 * `const a = document.createElement("a"); a.href = "/resume.pdf"; ...`
 */
export function downloadResume() {
  const { person, experience, skills } = portfolio;
  const lines = [
    person.name,
    person.role,
    `${person.location} · ${person.email}`,
    "",
    "SUMMARY",
    ...person.bio,
    "",
    "EXPERIENCE",
    ...experience.flatMap((e) => [
      `${e.role} — ${e.company} (${e.period}, ${e.location})`,
      ...e.highlights.map((h) => `  • ${h}`),
      "",
    ]),
    "SKILLS",
    skills.join(", "),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = person.resumeFileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
