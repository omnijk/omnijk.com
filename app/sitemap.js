import { getBlogs } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

function toLastModified(value) {
  const date = new Date(value ?? "");
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap() {
  const blogs = await getBlogs();
  const pages = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/project`, changeFrequency: "monthly", priority: 0.5 },
    {
      url: `${SITE_URL}/tech-stack`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${SITE_URL}/message`, changeFrequency: "monthly", priority: 0.5 },
  ];
  const postEntries = blogs.map((post) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: toLastModified(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...postEntries];
}
