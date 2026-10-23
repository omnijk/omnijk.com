import Link from "next/link";

export default function RelatedPosts({ posts }) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="rounded-xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_18px_40px_-30px_rgba(15,23,42,0.25)] dark:border-white/[0.08] dark:bg-neutral-950">
      <h2 className="border-b border-black/[0.06] pb-4 text-[17px] font-semibold tracking-[-0.01em] text-foreground dark:border-white/[0.08]">
        相关推荐
      </h2>

      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}#article-start`}
              className="group block"
            >
              <h3 className="line-clamp-2 text-[15px] font-medium leading-6 text-foreground transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-400">
                {post.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {post.publishedAt} · {post.tag}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
