import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");
const staticSrcDir = path.join(rootDir, ".next", "static");
const staticDestDir = path.join(standaloneDir, ".next", "static");
const publicSrcDir = path.join(rootDir, "public");
const publicDestDir = path.join(standaloneDir, "public");

function copyDirectory(src, dest, label) {
  if (!fs.existsSync(src)) {
    throw new Error(`缺少 ${label} 源目录：${src}`);
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true, force: true });
}

if (!fs.existsSync(standaloneDir)) {
  throw new Error("未生成 .next/standalone，请检查 next.config.mjs 中的 output 配置");
}

copyDirectory(staticSrcDir, staticDestDir, ".next/static");
copyDirectory(publicSrcDir, publicDestDir, "public");

console.log("standalone 产物已准备完成：.next/standalone");