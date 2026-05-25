import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeCopyMount from "@/components/CodeCopyMount";
import { getBlogBySlug, getBlogs } from "@/lib/blog";

export default async function Blog({ params }) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { metadata, content } = blog;
  const { title, summary, image, author, publishedAt, tag } = metadata;

  return (
    <section className="flex pr-8 mx-auto">
      <aside className="relative hidden pt-14 2xl:block">
        <Link
          href="/blog"
          className="sticky flex items-center gap-1 py-2 pl-4 pr-5 rounded-full top-10 text-foreground font-semibold bg-[#f2f2f21a] shadow-md dark:shadow-none"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
      </aside>

      <article className="w-full max-w-3xl mx-auto mt-16">
        <header>
          {image && (
            <div className="relative w-full flex justify-center items-center mb-10 overflow-hidden rounded-lg aspect-[240/135]">
              <Image
                src={image}
                alt={title || ""}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          <p className="mb-2 text-sm text-muted-foreground">
            {publishedAt ?? ""} | {tag}
          </p>

          <h1 className="mb-2 text-4xl font-bold">{title}</h1>

          <p className="mb-6 text-muted-foreground">{author}</p>

          <p className="">{summary}</p>
        </header>

        <main className="blog-content mt-16 prose max-w-none dark:prose-invert prose-p:text-foreground prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-strong:font-bold prose-a:text-blue-400 prose-a:opacity-80 prose-code:text-foreground prose-img:opacity-90 prose-p:tracking-tight prose-p:text-base prose-li:text-base prose-pre:border prose-pre:border-border/60 prose-pre:bg-[#f8fafc] dark:prose-pre:border-white/10 dark:prose-pre:bg-[#0b0b0b]">
          <MDXRemote
            source={content}
            components={{
              pre: (props) => (
                <pre className="overflow-x-auto rounded-lg border border-border/60 bg-[#f8fafc] p-4 text-sm dark:border-white/10 dark:bg-[#0b0b0b]" {...props} />
              ),
              img: ({ src, alt }) => {
                if (!src) return null;

                return (
                  <Image
                    src={src}
                    alt={alt ?? ""}
                    width={1200}
                    height={675}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="mb-6 h-auto w-full rounded-lg object-cover"
                  />
                );
              },
            }}
          />
          <CodeCopyMount />
        </main>
      </article>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
