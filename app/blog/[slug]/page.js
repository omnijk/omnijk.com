import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import CodeCopyMount from "@/components/CodeCopyMount";
import HashScroll from "@/components/HashScroll";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import { getBlogBySlug, getBlogs } from "@/lib/blog";
import { createHeadingSlugger, textFromChildren } from "@/lib/toc";

const baseMdxComponents = {
  pre: (props) => (
    <pre
      className="overflow-x-auto rounded-lg border border-border/60 bg-[#f8fafc] p-4 text-sm dark:border-white/10 dark:bg-[#0b0b0b]"
      {...props}
    />
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
};

export default async function Blog({ params }) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { metadata, content, headings } = blog;
  const { title, summary, image, author, publishedAt, tag } = metadata;
  const relatedPosts = (await getBlogs())
    .filter((post) => post.slug !== slug)
    .slice(0, 3);
  const toHeadingId = createHeadingSlugger();
  const mdxComponents = {
    ...baseMdxComponents,
    h2: ({ children, ...props }) => (
      <h2
        id={toHeadingId(textFromChildren(children)) || undefined}
        className="scroll-mt-28"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        id={toHeadingId(textFromChildren(children)) || undefined}
        className="scroll-mt-28"
        {...props}
      >
        {children}
      </h3>
    ),
  };

  return (
    <section className="w-full">
      <HashScroll />
      <Link
        href="/blog"
        aria-label="返回博客列表"
        className="fixed left-[1.625rem] top-[10.25rem] z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/70 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground sm:left-[3.625rem] md:left-[5.625rem] min-[896px]:left-[calc(50%-22.375rem)] lg:left-2 xl:left-[max(0.5rem,calc(50%-40rem))]"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <article className="mx-auto mt-16 w-full max-w-[1088px]">
        {image && (
          <div className="mx-auto mb-10 w-full max-w-3xl xl:mx-0">
            <div className="relative flex aspect-[240/135] w-full items-center justify-center overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={title || ""}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="grid w-full gap-10 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start">
          <div className="mx-auto w-full min-w-0 max-w-3xl xl:mx-0">
            <header id="article-start" className="scroll-mt-24">
              <p className="mb-2 text-sm text-muted-foreground">
                {publishedAt ?? ""} | {tag}
              </p>

              <h1 className="mb-2 text-4xl font-bold">{title}</h1>

              <p className="mb-6 text-muted-foreground">{author}</p>

              <p className="">{summary}</p>
            </header>

            <div className="blog-content prose mt-16 max-w-none dark:prose-invert prose-p:text-foreground prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-strong:font-bold prose-a:text-blue-400 prose-a:opacity-80 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-img:opacity-90 prose-p:tracking-tight prose-p:text-base prose-li:text-base prose-pre:border prose-pre:border-border/60 prose-pre:bg-[#f8fafc] dark:prose-pre:border-white/10 dark:prose-pre:bg-[#0b0b0b]">
              <MDXRemote
                source={content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
                components={mdxComponents}
              />
              <CodeCopyMount />
            </div>
          </div>

          <aside className="mx-auto flex w-full max-w-3xl flex-col gap-6 xl:sticky xl:top-24 xl:mx-0 xl:max-w-none">
            <div className="hidden xl:block">
              <TableOfContents headings={headings} />
            </div>
            <RelatedPosts posts={relatedPosts} />
          </aside>
        </div>
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
