import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { portfolio } from "@/config";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Footer } from "@/components/portfolio/Footer";

function getPost(slug: string) {
  return portfolio.blog.posts.find((p) => p.slug === slug && !p.externalUrl);
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Post not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const title = `${post.title} — ${portfolio.person.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Person", name: portfolio.person.name },
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <ThemeProvider>
      <AnimatedBackground />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-28">
        <Link
          to="/"
          hash="blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <article className="mt-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            {post.title}
          </h1>

          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-secondary/60 px-2.5 py-1 text-[11px] text-secondary-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-5">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
