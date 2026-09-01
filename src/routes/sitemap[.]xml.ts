import { createFileRoute } from "@tanstack/react-router";
import { portfolio } from "@/config";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;

        const urls: { loc: string; priority: string }[] = [
          { loc: "/", priority: "1.0" },
          { loc: "/resume", priority: "0.8" },
          ...portfolio.blog.posts
            .filter((p) => !p.externalUrl)
            .map((p) => ({ loc: `/blog/${p.slug}`, priority: "0.6" })),
        ];

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${origin}${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
