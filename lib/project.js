export const projects = [
  {
    _id: "fallback-omnijk-com",
    title: "omnijk.com",
    description: "个人网站，展示项目、技术栈与博客内容。",
    link: "https://github.com/omnijk/omnijk.com",
    tags: ["Next.js", "React", "ECharts", "Tailwind CSS"],
    imageUrl: "/images/avatar.png",
  },
  {
    _id: "fallback-ai-agent-coding",
    title: "AI-Agent-Coding",
    description:
      "一个可本地部署的轻量级 AI Agent 平台，基于 AiSDK 封装可扩展 Tool 与 React 交互界面，支持文件操作、本地工具调用、MCP 内容集成与自动化构建发布流程。",
    link: "https://github.com/omnijk/AI-Coding-Agent",
    tags: ["React", "TypeScript", "Ollama", "AI-SDK"],
    imageUrl: "/images/project1.png",
  },
  {
    _id: "fallback-todolist",
    title: "ToDoList",
    description:
      "一个基于 React + TypeScript + Tailwind CSS 的 TodoList 组件示例。组件的设计思路参考 Ant Design,通过 props 配置外观，通过回调把用户操作抛给外层，由外层统一管理数据。",
    link: "https://github.com/omnijk/React-todolist",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    imageUrl: "/images/project3.png",
  },
];

export async function getProjects() {
  return projects;
}
