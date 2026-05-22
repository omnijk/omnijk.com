import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 生成 standalone 输出，便于在无完整构建环境的服务器上运行
  output: "standalone",
  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
      { hostname: "cdn.sanity.io" },
      { hostname: "i.scdn.co" },
    ],
  },
  pageExtensions: ["js", "jsx", "mdx"],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react/compiler-runtime": path.resolve(
        process.cwd(),
        "lib/react-compiler-runtime-shim.js"
      ),
    };
    return config;
  },
};

export default nextConfig;
