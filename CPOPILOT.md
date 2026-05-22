# omnijk.com 项目速览

这是一个基于 Next.js App Router 的个人站点，主要包含首页、博客、项目展示、留言板和 Sanity Studio。前端页面大多是服务端组件，数据来源分为三类：本地静态内容、Sanity 内容库、Prisma 数据库。

## 目录说明

### 根目录配置

- package.json：项目依赖和脚本入口，包含 Next.js、Prisma、Clerk、Sanity、Tailwind 等核心依赖。
- next.config.mjs：Next.js 构建配置。
- middleware.js：路由中间件，通常用于鉴权或重定向。
- tailwind.config.js、postcss.config.mjs、components.json：样式体系和 UI 组件配置。
- sanity.config.js、sanity.cli.js：Sanity Studio 和 Sanity CLI 的配置入口。
- prisma/schema.prisma：数据库模型和连接配置。

### app/

Next.js 页面路由目录，决定站点有哪些页面以及每个页面如何取数。

- app/page.js：首页，聚合博客摘要、个人信息、技能展示等模块。
- app/blog/page.js：博客列表页，从本地 MDX 内容读取文章。
- app/blog/[slug]/page.js：博客详情页，按 slug 读取单篇 MDX。
- app/project/page.js：项目页，从 Sanity 拉取项目数据。
- app/message/page.js：留言板页，读取当前登录用户并展示留言。
- app/actions.js：服务端 Action，处理留言创建并触发页面刷新。
- app/studio/[[...tool]]/page.jsx：Sanity Studio 的挂载路由。
- app/(auth)/...：Clerk 的登录和注册页面。
- app/global.css：全局样式。
- app/layout.js：全站布局、字体、头部、底部、分析脚本和通知组件。

### components/

可复用 UI 组件目录，页面通过这些组件拼装出最终界面。

- 业务组件：Hero、Projects、Blogs、Messages、MessageForm、SkillsBar、Header、Footer 等。
- 状态组件：LoadingState、Skeleton 相关组件。
- UI 基础组件：components/ui 下是按钮、卡片、输入框、抽屉、弹窗等基础控件。

### content/

前端静态内容存放区，目前博客文章放在 content/blog 下，使用 MDX 文件管理。

- 文章正文和元数据都写在 mdx 文件里。
- lib/blog.js 会读取这些文件并用 gray-matter 解析 frontmatter。

### lib/

业务数据访问层，负责把页面和真实数据源连接起来。

- lib/blog.js：读取本地 MDX 博客文章。
- lib/project.js：通过 Sanity client 拉取项目数据。
- lib/db.js：初始化 Prisma 客户端，连接数据库。
- lib/sanity.js：初始化 next-sanity 客户端。
- lib/utils.js：通用工具函数。

### prisma/

数据库建模和迁移目录。

- schema.prisma：定义 Message 模型，并配置 PostgreSQL 数据源。
- migrations/：数据库迁移历史。

### sanity/

Sanity 内容系统配置目录。

- env.js：Sanity 环境变量读取。
- schemaTypes/：Sanity 文档类型定义，目前包含 project。
- structure.js：Sanity Studio 左侧结构配置。
- lib/：Sanity 客户端、图片和实时相关工具。

### public/

静态资源目录。

- images/：图片资源。
- icons/：技能图标和展示图标。
- docs/README_CN.md：中文说明文档。

## 前后端如何交互

这个项目是典型的 Next.js 全栈应用，页面在 app/ 里，数据读取逻辑放在 lib/、prisma/ 和 sanity/ 里。

1. 首页和博客页会在服务端直接调用数据读取函数，例如 lib/blog.js 读取本地 MDX 文件，生成文章列表和详情。
2. 项目页会通过 lib/project.js 使用 Sanity client 查询 project 文档，前端拿到的是 Sanity 返回的 JSON 数据。
3. 留言板页 app/message/page.js 会先通过 Clerk 获取当前登录用户，再渲染留言表单和留言列表。
4. 提交留言时，组件调用 app/actions.js 里的 createMessage 服务端 Action。
5. createMessage 会把表单数据写入 Prisma 管理的 Message 表，写入完成后调用 revalidatePath('/message') 让留言页重新渲染。
6. 留言列表组件 Messages.jsx 会再次通过 Prisma 查询数据库，把最新留言按时间倒序展示出来。

换句话说，前端页面负责展示和交互，真正的数据读写由服务端组件、Server Action、Prisma 和 Sanity 共同完成。

## 前端静态数据在哪里

主要有两类：

- content/blog：博客 MDX 文件，这是最典型的前端静态内容。
- public/：图片、图标和文档等静态资源。

另外，部分页面文案和展示数据也可能直接写在组件里，但主要可维护的静态内容集中在 content/blog 和 public/。

## 后端数据库在哪里配置

数据库相关配置分散在两个地方：

- prisma/schema.prisma：定义数据库类型为 PostgreSQL，并通过 DATABASE_URL 和 DIRECT_URL 连接。
- lib/db.js：创建 PrismaClient，并在环境变量缺失时直接报错，防止服务端在未配置数据库时启动。

实际运行时还需要在环境变量里提供数据库连接串。根据代码，这个项目至少依赖以下环境变量：

- DATABASE_URL
- DIRECT_URL
- NEXT_PUBLIC_SANITY_ID
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET

## 快速定位建议

- 想看首页结构：app/page.js 和 components/Hero.jsx、components/RecentUpdate.jsx。
- 想看博客数据来源：lib/blog.js 和 content/blog/。
- 想看项目数据来源：lib/project.js、sanity/schemaTypes/project.js 和 app/project/page.js。
- 想看留言板数据库写入：app/actions.js、components/MessageForm.jsx、components/Messages.jsx、prisma/schema.prisma 和 lib/db.js。
- 想看 Sanity Studio：sanity.config.js、sanity/structure.js、sanity/schemaTypes/。