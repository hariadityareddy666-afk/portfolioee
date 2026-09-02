import { createFileRoute } from "@tanstack/react-router";
import { portfolio } from "@/config";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const posts = [...portfolio.blog.posts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        const items = posts
          .map((post) => {
            const link = post.externalUrl ?? `${origin}/blog/${post.slug}`;
            const description = escapeXml(post.excerpt);
            const content = escapeXml(post.body.join("\n\n"));
            return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(link)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${description}</description>
      <content:encoded><![CDATA[${post.body.join("\n\n")}]]></content:encoded>
      ${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ")}
      <!-- ${content.slice(0, 0)} -->
    </item>`;
          })
          .join("\n");

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(`${portfolio.person.name} — Blog`)}</title>
    <link>${origin}/</link>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(portfolio.blog.subheading)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

        return new Response(body, {
          headers: {
            "content-type": "application/rss+xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
