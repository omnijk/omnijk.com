import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 生成 standalone 输出，便于在无完整构建环境的服务器上运行
  output: "standalone",
  // next的<Image>组件不允许加载未经授权的域名图片
  // 导致报错，GET _next/image?url=%2Fimages%2Fhome.png 400 (Bad Request)
  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
      { hostname: "cdn.sanity.io" },
      { hostname: "i.scdn.co" },
      {
        protocol: 'https', 
        hostname: 'omnijk.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.omnijk.com',
        pathname: '/images/**',
      },
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
