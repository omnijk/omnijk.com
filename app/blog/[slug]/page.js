import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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
      <Link
        href="/blog"
        aria-label="返回博客列表"
        className="fixed left-[1.625rem] top-[10.25rem] z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/70 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground sm:left-[3.625rem] md:left-[5.625rem] min-[896px]:left-[calc(50%-22.375rem)] lg:left-[calc(50%-28.375rem)] xl:left-[calc(50%-36.375rem)]"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

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

        <main className="blog-content mt-16 prose max-w-none dark:prose-invert prose-p:text-foreground prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-strong:font-bold prose-a:text-blue-400 prose-a:opacity-80 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-img:opacity-90 prose-p:tracking-tight prose-p:text-base prose-li:text-base prose-pre:border prose-pre:border-border/60 prose-pre:bg-[#f8fafc] dark:prose-pre:border-white/10 dark:prose-pre:bg-[#0b0b0b]">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
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
                    unoptimized
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
