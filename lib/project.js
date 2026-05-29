import { client } from "./sanity";

const fallbackProjects = [
  {
    _id: "fallback-ai-agent-coding",
    title: "AI-Agent-Coding",
    description:
      "一个可本地部署的轻量级 AI Agent 平台，基于 AiSDK 封装可扩展 Tool 与 React 交互界面，支持文件操作、本地工具调用、MCP 内容集成与自动化构建发布流程。",
    link: "https://github.com/omnijk/AI-Coding-Agent",
    tags: ["React", "TypeScript", "Ollama", "AI-SDK"],
    imageUrl: "/images/project1.png",
  },
];

export async function getProjects() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !process.env.NEXT_PUBLIC_SANITY_ID) {
    return fallbackProjects;
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
    return Array.isArray(projects) && projects.length ? projects : fallbackProjects;
  } catch (error) {
    console.error("Failed to load projects:", error);
    return fallbackProjects;
  }
}
