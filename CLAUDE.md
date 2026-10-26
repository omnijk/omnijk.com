# CLAUDE.md

本文件是给 AI 编码助手（Claude Code 及其他 agent）的项目约定。修改代码前请先读完本文件。

## 顶级要求（强制遵循）

1. **语言**：所有回答、注释、文档和提交说明一律使用中文。
2. **不做兼容**：代码只保留当前正确的实现。旧逻辑如果与现在的设计冲突，就是错误的，直接修改或删除；禁止为了兼容旧行为保留分支、别名、废弃字段或过渡代码。
3. **架构优先**：设计保持简单、不冗余。任何修改都不要打补丁，即使改动更大、更麻烦，也要从结构上解决。若判断问题来自架构设计，先向用户说明并询问是否调整设计，禁止擅自堆叠临时方案。
4. **禁止兜底式修 bug**：不得用默认值兜底、`if` 特判、存在性检测、延时、重试、吞异常等方式掩盖问题。必须定位并修复根因。
5. **全链路排查**：bug 往往表现在前端，根因可能在数据层、服务端或构建链路。修复前先走通完整链路、找到根因；未确认根因之前禁止开始改代码。

> 以上要求偏向谨慎而非速度；对于琐碎任务，可自行判断合理的执行尺度。

## 文档分工

- `README.md`：面向使用者，只保留项目介绍、安装、启动和部署。
- `CLAUDE.md`：面向 AI 与开发者，统一记录开发约束、目录结构、修改流程和踩坑经验。
- 新的注意事项、环境问题、协作规则都更新到本文件，不要再写进 README。

## 项目概览

- 个人站点：Next.js 14 App Router + React 18 + Tailwind CSS + Framer Motion + ECharts。
- 页面：`/` 首页、`/blog`、`/blog/[slug]`、`/project`、`/tech-stack`、`/message`。
- 内容全部本地化：博客在 `content/blog/*.mdx`，项目在 `lib/project.js`，经历在 `app/message/page.js`。
- 不需要 `.env`，不依赖数据库、Redis、CMS、认证。不要重新引入已删除的 Prisma、Sanity、Clerk、Spotify 等模块。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 开发服务器，默认 http://localhost:3000 |
| `npm run lint` | ESLint 检查 |
| `npm run build` | 生产构建，生成 `.next/standalone`（执行前必须先停掉 dev） |
| `npm start` | 运行 `.next/standalone/server.js`（需先 build） |

## 构建产物

- `next.config.mjs` 固定 `output: "standalone"`，生产构建会生成 `.next/standalone`。
- `postbuild` 执行 `scripts/prepare-standalone.mjs`，把 `.next/static` 和 `public` 复制进 standalone 目录。
- 启动 standalone：`npm start`，等价于 `node .next/standalone/server.js`，端口用 `PORT` 控制。
- `.next/standalone` 只由生产构建生成；dev 会重写 `.next`，部署前必须重新 `npm run build`。

## 最重要的规则：dev 与 build 不能同时运行

- `next dev` 和 `next build` 共用 `.next` 目录。dev 运行时执行 build 会覆盖开发服务器的构建产物，导致：
  - 页面 500：`Cannot find module './vendor-chunks/...'`
  - CSS 404，页面变成无样式的裸 HTML
- **执行 `npm run build` 前必须先停止 dev server（Ctrl+C）。**
- 如果已经触发：停止 dev → 删除 `.next` → 重新 `npm run dev`；或者 touch `next.config.mjs` 让 dev 自动重启。不要通过改业务代码来“修”这个问题。
- 不要同时启动两个 dev server 抢同一个端口。

## 修改流程

1. 先看 `git status`，不要覆盖用户尚未提交的改动。
2. 小步修改，不要顺手重构无关文件。
3. 改完先跑 `npm run lint`；需要验证生产构建时，先停 dev 再 build。
4. 验证至少覆盖：`/`、`/blog`、一篇博客详情、`/project`、`/tech-stack`、`/message`。
5. 测试产生的截图、Chrome profile、临时脚本要清理，不要提交 `.next`、日志或临时文件。


## 代码结构

- `app/layout.js`：全局布局、字体、Header/Footer。
- `components/Header.jsx`、`Navbar.jsx`、`MobileMenu.jsx`、`Avatar.jsx`、`ThemeToggle.jsx`：导航体系。
- `components/TableOfContents.jsx`、`RelatedPosts.jsx`：博客详情页右侧目录与相关推荐。
- `components/ui/`：只保留实际使用的 shadcn 组件（button、sheet、skeleton），不要新增未使用的 UI 文件。
- `lib/blog.js`：读取本地 MDX；`lib/toc.js`：从 Markdown 提取 h2/h3 并生成标题 ID；`lib/project.js`：静态项目数据。
- 图片在 `public/images`，图标在 `public/icons`。删除资源前先全库搜索引用。

## 内容维护

- 新博客：在 `content/blog/<slug>.mdx` 新建，frontmatter 包含 `title`、`summary`、`image`、`author`、`publishedAt`、`tag`。
- 项目：修改 `lib/project.js` 中的 `projects`。
- 经历：修改 `app/message/page.js` 中的 `experiences`。
- 技能：首页在 `components/SkillsBar.jsx`，技术栈页在 `components/TechStackRadar.jsx`。

## 依赖与清理

- 新增依赖前先确认现有依赖能实现；不要为小效果引入大包。
- 删除“未使用”的功能或资源前，先全库搜索引用，并确认不影响博客界面。
- 依赖以 `package.json` 为准，`npm install` 后保持 `package-lock.json` 同步。

## 环境说明

- Windows + PowerShell，Node 22（项目要求 Node.js >= 18.18）。
- 在受限沙箱中执行 `next dev` / `next build` 可能因管道子进程报 `spawn EPERM`，这属于环境限制，不要因此修改项目代码。
