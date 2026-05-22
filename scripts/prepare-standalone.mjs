import fs from "node:fs";
import path from "node:path";
const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");
const staticSrcDir = path.join(rootDir, ".next", "static");
const staticDestDir = path.join(standaloneDir, ".next", "static");