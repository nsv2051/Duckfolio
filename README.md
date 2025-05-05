# 🦆 Duckfolio

**Duckfolio** 是一个简洁、现代、有趣的个人主页模板。

本项目旨在为开发者、设计师或创作者提供一个清爽、易于维护的在线名片，快速展示你的个人信息、社交链接与博客等内容。  
同时也展示了如何使用现代 Web 技术（Next.js、TailwindCSS、Shadcn UI 等）构建轻量级的静态网站。

---

## ✨ 项目特色

- 🚀 使用 **Next.js 15 + Turbopack**，极速开发体验
- 🎨 采用 **Tailwind CSS 4** 实现原子化、响应式布局
- 🌗 支持 **深色/浅色主题自动切换**
- 💫 利用 **Framer Motion** 增添自然平滑的过渡动画
- 🧩 使用 **Shadcn UI** 构建现代交互组件
- 🧠 通过 **Zustand** 管理全局状态（如主题）
- 📱 完全响应式，适配移动端和大屏设备
- 🧼 结构清晰，易于维护和定制

---

## 🖼️ 页面预览

### 首页 - Profile  
![Preview](https://blog.yorlg.it/wp-content/uploads/2025/05/Duckfolio-Preview1.png)

### 链接页 - Links  
![Preview](https://blog.yorlg.it/wp-content/uploads/2025/05/Duckfolio-Preview2.png)

---

## 🛠️ 使用技术

| 技术                                                      | 用途         |
| --------------------------------------------------------- | ------------ |
| [Next.js](https://nextjs.org/)                            | 框架         |
| [Turbopack](https://turbo.build/pack)                     | 构建工具     |
| [Tailwind CSS](https://tailwindcss.com/)                  | 样式框架     |
| [Shadcn UI](https://ui.shadcn.com/ )                      | 无障碍组件库 |
| [Framer Motion](https://www.framer.com/motion/)           | 动画库       |
| [Zustand](https://github.com/pmndrs/zustand)              | 状态管理     |
| [next-themes](https://github.com/pacocoursey/next-themes) | 主题切换     |
| [Lucide Icons](https://lucide.dev/)                       | 图标         |

---

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/Yorlg/Duckfolio.git
cd duckfolio

# 安装依赖
pnpm install

# 项目打包
pnpm build

# 启动服务器
pnpm dev
```
### 2. 使用 Docker 部署

```bash
docker pull yorlg/duckfolio:latest
docker run -p 3000:3000 yorlg/duckfolio:latest
```
访问 http://localhost:3000 查看网站

使用 Docker Compose 部署

```bash
services:
  duckfolio:
    image: yorlg/duckfolio:latest
    container_name: duckfolio
    ports:
      - "3000:3000"
    restart: unless-stopped
```
然后运行:
```bash
docker-compose up -d
```
自行构建 Docker 镜像
```bash
git clone https://github.com/Yorlg/Duckfolio.git
cd duckfolio
docker build -t duckfolio .
docker run -p 3000:3000 duckfolio
```

> [!INFO]  
> 项目的配置文件位于 `public/profile.json`，你可以在这里修改个人信息、社交链接等内容。