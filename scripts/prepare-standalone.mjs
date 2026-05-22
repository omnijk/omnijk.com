import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");
const staticSrcDir = path.join(rootDir, ".next", "static");
const staticDestDir = path.join(standaloneDir, ".next", "static");
const publicSrcDir = path.join(rootDir, "public");
const publicDestDir = path.join(standaloneDir, "public");

function safeCopy(src, dest, label) {
  if (!fs.existsSync(src)) {
    console.warn(`[postbuild] Skip ${label}: source not found at ${src}`);
    return;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true, force: true });
  console.log(`[postbuild] Copied ${label}: ${src} -> ${dest}`);
}

if (!fs.existsSync(standaloneDir)) {
  console.warn(`[postbuild] Standalone directory not found at ${standaloneDir}`);
  process.exit(0);
}

safeCopy(staticSrcDir, staticDestDir, ".next/static");
safeCopy(publicSrcDir, publicDestDir, "public");
