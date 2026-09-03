import { motion } from "framer-motion";
import { ArrowUpRight, Rss } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { portfolio } from "@/config";
import { Section } from "./Section";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function Blog() {
  const { posts } = portfolio.blog;
  if (posts.length === 0) return null;

  return (
    <Section
      id="blog"
      eyebrow="Blog"
      title={portfolio.blog.heading}
      intro={portfolio.blog.subheading}
    >
      <div className="mb-8 flex justify-start">
        <a
          href="/rss.xml"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Subscribe to the RSS feed (opens in a new tab)"
          className="inline-flex items-center gap-2 rounded-full border border-glass-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Rss className="h-3.5 w-3.5" aria-hidden="true" /> Subscribe via RSS
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group glass flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-300 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
          >
            {post.coverImage && (
              <div className="aspect-[3/2] overflow-hidden border-b border-glass-border bg-secondary/30">
                <img
                  src={post.coverImage}
                  alt={post.coverAlt ?? ""}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>{post.readingTime}</span>
              </div>

              <h3 className="mt-4 text-xl font-semibold leading-snug">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-secondary/60 px-2.5 py-1 text-[11px] text-secondary-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-glass-border pt-5 text-sm">
                {post.externalUrl ? (
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Read ${post.title} (opens in a new tab)`}
                    className="inline-flex items-center gap-1.5 rounded-md text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    aria-label={`Read ${post.title}`}
                    className="inline-flex items-center gap-1.5 rounded-md text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
