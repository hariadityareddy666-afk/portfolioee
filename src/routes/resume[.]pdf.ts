import { createFileRoute } from "@tanstack/react-router";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { portfolio } from "@/config";

const PAGE = { w: 595.28, h: 841.89 };
const MARGIN = 54;
const INK = rgb(0.09, 0.1, 0.13);
const MUTED = rgb(0.38, 0.4, 0.45);
const ACCENT = rgb(0.24, 0.28, 0.85);

/** Builds the resume PDF straight from src/config.ts so it never goes stale. */
async function buildResumePdf() {
  const { person, education, experience, skillGroups, projects, achievements } = portfolio;

  const doc = await PDFDocument.create();
  doc.setTitle(`${person.name} — Resume`);
  doc.setAuthor(person.name);
  doc.setSubject(person.role);
  doc.setProducer("portfolio");

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([PAGE.w, PAGE.h]);
  let y = PAGE.h - MARGIN;
  const maxW = PAGE.w - MARGIN * 2;

  function ensure(space: number) {
    if (y - space < MARGIN) {
      page = doc.addPage([PAGE.w, PAGE.h]);
      y = PAGE.h - MARGIN;
    }
  }

  function wrap(text: string, font: typeof regular, size: number, width: number) {
    const words = text.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > width && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function text(
    value: string,
    opts: {
      size?: number;
      font?: typeof regular;
      color?: ReturnType<typeof rgb>;
      indent?: number;
      gap?: number;
    } = {},
  ) {
    const size = opts.size ?? 10;
    const font = opts.font ?? regular;
    const indent = opts.indent ?? 0;
    const lines = wrap(value.replace(/[^\x20-\x7E]/g, "-"), font, size, maxW - indent);
    for (const line of lines) {
      ensure(size + 4);
      y -= size + 3;
      page.drawText(line, {
        x: MARGIN + indent,
        y,
        size,
        font,
        color: opts.color ?? INK,
      });
    }
    y -= opts.gap ?? 0;
  }

  function heading(label: string) {
    ensure(40);
    y -= 20;
    page.drawText(label.toUpperCase(), {
      x: MARGIN,
      y,
      size: 9,
      font: bold,
      color: ACCENT,
    });
    y -= 6;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE.w - MARGIN, y },
      thickness: 0.6,
      color: rgb(0.85, 0.86, 0.9),
    });
    y -= 4;
  }

  function bullet(value: string) {
    const lines = wrap(value.replace(/[^\x20-\x7E]/g, "-"), regular, 10, maxW - 14);
    lines.forEach((line, i) => {
      ensure(14);
      y -= 13;
      if (i === 0) {
        page.drawText("-", { x: MARGIN, y, size: 10, font: regular, color: ACCENT });
      }
      page.drawText(line, { x: MARGIN + 14, y, size: 10, font: regular, color: INK });
    });
  }

  // Header
  text(person.name, { size: 22, font: bold });
  text(person.role, { size: 12, color: MUTED });
  text(
    [person.location, person.email, `${person.phone} (${person.phoneNote})`]
      .filter(Boolean)
      .join("  |  "),
    { size: 9, color: MUTED },
  );
  text(portfolio.socials.map((s) => s.href).join("  |  "), { size: 8, color: MUTED });

  heading("Profile");
  person.bio.forEach((p) => text(p, { size: 10, color: INK, gap: 4 }));

  if (education.length) {
    heading("Education");
    education.forEach((ed) => {
      text(`${ed.degree} — ${ed.institution}`, { size: 11, font: bold });
      text(`${ed.period}  |  ${ed.location}`, { size: 9, color: MUTED });
      ed.details.forEach(bullet);
      y -= 4;
    });
  }

  if (experience.length) {
    heading("Experience & activities");
    experience.forEach((job) => {
      text(`${job.role} — ${job.company}`, { size: 11, font: bold });
      text(`${job.period}  |  ${job.location}`, { size: 9, color: MUTED });
      if (job.summary) text(job.summary, { size: 10 });
      job.highlights.forEach(bullet);
      y -= 4;
    });
  }

  if (skillGroups.length) {
    heading("Skills");
    skillGroups.forEach((group) => {
      text(`${group.label}: ${group.items.join(", ")}`, { size: 10 });
    });
  }

  if (projects.length) {
    heading("Projects");
    projects.forEach((p) => {
      text(`${p.title} (${p.year})`, { size: 11, font: bold });
      text(p.description, { size: 10 });
      if (p.tags.length) text(p.tags.join(", "), { size: 9, color: MUTED });
      y -= 4;
    });
  }

  if (achievements.length) {
    heading("Achievements");
    achievements.forEach(bullet);
  }

  return await doc.save();
}

export const Route = createFileRoute("/resume.pdf")({
  server: {
    handlers: {
      GET: async () => {
        const bytes = await buildResumePdf();
        return new Response(bytes as unknown as BodyInit, {
          headers: {
            "content-type": "application/pdf",
            "content-disposition": `inline; filename="${portfolio.person.resumeFileName}"`,
            "cache-control": "public, max-age=600",
          },
        });
      },
    },
  },
});
