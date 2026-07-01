# 2.4.0 (2026-07-01)

### 新增

- `/admin` 文章列表支持编辑、删除、公开/草稿切换和文章查看。
- 新增 `/api/admin/posts` 的完整 CRUD 能力：列表、单篇读取、发布/更新、状态切换、删除。
- 新增 Vercel 部署文档 `docs/deploy-to-Vercel.md`。
- ~~新增 Cloudflare Workers 部署文档 `docs/deploy-to-Cloudflare.md`~~。
- 新增后台接口响应安全解析，避免 Vercel 返回 HTML 时前端显示 JSON 解析异常。

### 变更

- 将 `AdminPanel.tsx` 拆分为文章编辑、文章列表、站点配置、首页概览、通知栈和公共控件等模块。
- 所有 `/api/admin/*` 路由强制动态执行并禁用缓存，降低 Vercel 部署环境下接口被静态化或缓存误判的风险。
- README 部署说明改为 Vercel / ~~Cloudflare Workers~~，并移除旧 Netlify 说明。
- 管理后台菜单按钮样式改为明确的 active / inactive 状态。
- 首页概览移除“浏览数据”和“访问数据”占位模块。

### 修复

- 修复错误管理员口令或部署返回 HTML 时显示 `Unexpected token '<'` 的问题。
- 修复文章保存成功但响应结果为空时的前端类型问题。
- 修复 Turbopack 构建时本地路径追踪范围过大的警告。

### 移除

- 移除旧 Netlify 部署文档 `docs/deploy-to-netlify.md`。
- 移除 `.gitignore` 中的 Netlify 目录忽略项。

# 2.3.0 (2026-7-1)

### 新增

- 新增 `/admin` 管理后台，支持文章发布、编辑、删除及站点配置管理
  - 文章通过 GitHub API 提交到指定仓库分支（默认 `deploy`）
  - 支持草稿（draft）标记，草稿文章不在前台展示
  - 支持平台配置（platform-config）在线编辑
- 新增基于 Plate.js 的富文本编辑器（`/editor`），包含完整插件体系
  - 基础节点、列表、表格、代码块、数学公式、媒体、表情、提及等
  - 拖拽、固定/浮动工具栏、斜杠命令、评论、建议
  - Markdown 导入导出、DOCX 导出
- 新增 AI 写作能力（AI Copilot），支持生成、编辑、评论等命令
  - 兼容 OpenAI 及 AI Gateway 两种接入方式
- 新增媒体上传与管理 API（`/api/media`、`/api/admin/media`）
- 新增 `.env.example` 环境变量模板
- 新增 Vercel 与 Cloudflare Workers 部署文档

### 变更

- `src/lib/config.ts` 改为运行时读取 `platform-config.json`，并提供兜底配置
- `src/lib/blog.ts` 新增 draft 字段支持，草稿文章自动过滤
- `src/app/not-found.tsx` 改用统一的 `renderMarkdownToHtml` 渲染 404 内容
- `src/app/layout.tsx` 移除 Inter 字体加载
- `RootLayoutClient` 在 `/admin` 路径下隐藏导航与页脚，使用全宽布局
- `next.config.ts` 重写 rewrites 规则，新增 turbopack root 配置
- `components.json` 调整组件别名路径（`@/components`、`@/components/ui`）
- `globals.css` 新增 `@theme inline` 主题变量映射及完整 CSS 变量定义
- Node 引擎要求提升至 `>=22.22.1`，pnpm 要求 `>=11`

### 移除

- 移除 Netlify 部署方案及 Decap CMS（原 `admin/index.html`、`config.yml`）
- 移除 `allowedDeprecatedVersions` 与 `onlyBuiltDependencies` 配置

### 样式与代码规范

- 全局将 Tailwind 任意值语法 `text-[var(--theme-primary)]` 规范化为 `text-(--theme-primary)`
- 将 `h-4 w-4` 统一为 `size-4`，`bg-gradient-to-r` 改为 `bg-linear-to-r`
- `dropdown-menu.tsx` 将 `data-[disabled]` 简化为 `data-disabled`，`min-w-[8rem]` 改为 `min-w-32`
- 新增 `eslint-plugin-better-tailwindcss` 规范 Tailwind 类名写法

# 2.2.0 (2025-5-10)

### 新增

- 新增 404 页面处理，提供友好的错误提示
- 新增 Cloudflare Workers 部署指南文档
- 新增 Vercel 部署支持及文档
- 新增动态配置更新支持（Node.js 运行时）

### 变更

- 主分支拆分部署方式，移除 Cloudflare Pages 的部署流程
- 移除边缘运行时配置
- 优化配置获取逻辑，简化 Node.js 运行时逻辑
- 更新组件路径并简化主题样式
- 移除不必要的图片远程模式配置
- 优化自定义鼠标的速度计算逻辑
- 更新部署分支为 `deploy`，后端分支从 `deploy` 更新为 `main`
- 精简 Node.js 引擎版本约束

### 移除

- 移除 Docker 版本的支持
- 移除 Docker 镜像构建和推送工作流
- 移除 `netlify.toml` 中的多余配置
- 移除 `wrangler` 配置文件

### 依赖

- 升级 `next` 从 15.3.1 → 16.2.6
- 升级 `wrangler` 从 4.51.0 → 4.59.1
- 升级 `postcss` 从 8.5.6 → 8.5.10

# 2.1.0 (2025-5-06)

### 新增

- 新增根据头像自动生成主题色功能
- 新增自定义光标组件
- 使用 View Transitions API 优化主题切换效果，增加视图过渡动画
- 新增移动设备支持和滑动事件处理
- 新增环境变量支持和配置初始化功能
- 增加 Cloudflare Pages 支持
- 增加 Avatar 来源白名单，支持开箱即用的 URL 形式 Avatar
- 增加示例用的简单 Docker Compose 配置文件
- 增加 Cloudflare Pages 部署教程文档

### 变更

- 重构配置管理结构，替换 `profile.json` 并更新相关逻辑
- 重组组件结构并更新配置
- 优化移动端显示效果
- 优化 Dockerfile
- 更新 Docker 部署说明，添加配置文件挂载选项
- 更新文档和配置，增强 Docker 部署说明及配置文件读取逻辑
- 工作流改进

### 修复

- 修复部署 Cloudflare Pages 失败的问题
- 修复若干 Bug

# 2.0.0 (2025-5-05)

### 新增

- 项目初始化，基于 Next.js + React + Tailwind CSS 构建
- 替换 Radix UI 为 Shadcn UI
- 优化主页布局和动画效果
- 添加 Dockerfile 和 GitHub Actions 工作流以构建和部署 Docker 镜像
- 更新 README，添加 Docker 部署说明
- 将配置文件提取到 `public` 目录下方便更改
- 合并 GitHub Action Workflow 以节省构建时间
- 构建用 Workflow 支持手动触发执行
