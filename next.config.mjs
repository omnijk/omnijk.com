/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "mdx"],
  async headers() {
    // HTML 入口不跟随静态资源的 immutable/一年缓存，每次部署后能立即拿到新页面。
    // /_next/static/* 仍由 Next 默认的 max-age=31536000, immutable 处理。
    const htmlRoutes = [
      "/",
      "/blog",
      "/blog/:slug",
      "/project",
      "/tech-stack",
      "/message",
    ];

    return htmlRoutes.map((source) => ({
      source,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate",
        },
      ],
    }));
  },
};

export default nextConfig;
