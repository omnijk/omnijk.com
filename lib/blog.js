import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { extractHeadings } from "./toc";

const rootDirectory = path.join(process.cwd(), "content", "blog");
const SLUG_PATTERN = /^[\p{L}\p{N}_-]+$/u;

function normalizeSlug(slug) {
  return slug.replace(/\.(md|mdx)$/i, "");
}

function resolveBlogFilePath(slug) {
  const normalizedSlug = normalizeSlug(slug);

  if (!SLUG_PATTERN.test(normalizedSlug)) {
    return null;
  }

  const candidates = [
    path.join(rootDirectory, `${normalizedSlug}.md`),
    path.join(rootDirectory, `${normalizedSlug}.mdx`),
  ];
  const filePath = candidates.find((candidate) => fs.existsSync(candidate));

  if (!filePath) {
    return null;
  }

  const relativePath = path.relative(rootDirectory, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  return filePath;
}

export async function getBlogBySlug(slug) {
  const filePath = resolveBlogFilePath(slug);

  if (!filePath) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

  const { data, content } = matter(fileContent);

  return {
    metadata: { ...data, slug: normalizeSlug(slug) },
    content,
    headings: extractHeadings(content),
  };
}

function getPublishedTime(value) {
  const timestamp = new Date(value ?? "").getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export async function getBlogs() {
  const posts = fs
    .readdirSync(rootDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.mdx?$/i.test(entry.name))
    .map((entry) => getBlogMetadata(entry.name));

  return posts.sort(
    (a, b) => getPublishedTime(b.publishedAt) - getPublishedTime(a.publishedAt)
  );
}

export function getBlogMetadata(filepath) {
  const slug = normalizeSlug(filepath);
  const filePath = path.join(rootDirectory, filepath);
  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  const { data } = matter(fileContent);
  return { ...data, slug };
}
