import { client } from "./sanity";

export async function getProjects() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !process.env.NEXT_PUBLIC_SANITY_ID) {
    return [];
  }

  const query = `*[_type == 'project'] | order(_updatedAt desc) {
        title,
          _id,
          link,
          description,
          tags,
          "imageUrl": image.asset->url
    }`;

  try {
    const projects = await client.fetch(query, {}, { cache: "no-store" });
    return Array.isArray(projects) ? projects : [];
  } catch (error) {
    console.error("Failed to load projects:", error);
    return [];
  }
}
