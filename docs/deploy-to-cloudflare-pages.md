# 将 Duckfolio 部署到 Cloudflare Pages

本文档指导您将 Next.js 项目 Duckfolio 部署到 Cloudflare Pages。以下步骤和常见问题解答确保您能顺利完成部署。确保您已准备好 GitHub 和 Cloudflare 账户。

> [!NOTE]
> Vercel CLI 不支持在 Windows 下构建 Next.js，因此建议使用 Linux 或 macOS（未经测试）。GitHub Codespaces 提供开箱即用的环境，本文档以其为部署环境。

> [!NOTE]
> GitHub Codespaces 是付费服务，提供免费额度。请确认额度足够，以避免意外费用。详情见 [GitHub Codespaces 计费](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-codespaces/about-billing-for-github-codespaces#monthly-included-storage-and-core-hours-for-personal-accounts)。

## 部署步骤

### 1. Fork 仓库

- 访问 Duckfolio 的 GitHub 仓库。
- 点击右上角“Fork”按钮，将仓库复制到您的 GitHub 账户。

### 2. 在 Codespaces 中打开仓库

- 在 Fork 的仓库页面，点击绿色“Code”按钮，选择“Codespaces”选项。
- 创建或打开一个 Codespace 环境。

### 3. 更新 `platform-config` 文件

- 打开 `public/platform-config` 文件，根据自己的需要进行修改，修改完成后保存。

### 3. 执行部署命令

- 在 Codespaces 终端中运行：
  ```bash
  pnpm i && pnpm run deploy
  ```

### 4. 登录 Cloudflare（首次部署）

首次部署时，Wrangler 会提示登录 Cloudflare。

> [!NOTE]
> 若您在本地部署，Wrangler 会自动打开浏览器完成登录，无需手动操作。  
> 对于 Codespace 下部署，请按照下列步骤操作。

#### Codespaces 中的 Wrangler 登录

1. 在 Codespaces 界面，找到“端口”标签，创建 `8976` 端口映射。
2. 右键端口，选择“复制本地地址”（如 `https://bug-free-space-pancake-69pqw6r67pg3rrpq-8976.app.github.dev/`）。
3. 点击终端中 Wrangler 提供的登录链接，完成登录流程。
4. 登录后，页面跳转至 `https://localhost:8976/` 并失败。将地址替换为复制的 Codespaces 地址。
5. 完成 GitHub 认证后，访问 Wrangler OAuth 服务器，显示登录成功。

> [!NOTE]
> 若在本地部署，Wrangler 会自动打开浏览器完成登录，无需上述步骤。

**替代方法**：设置 `CLOUDFLARE_API_TOKEN` 环境变量以跳过交互式登录。参考 [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)。

### 5. 创建或选择项目

- 首次部署时，Wrangler 提示“Create a new project”，确认即可。
- 若提示选择分支，可直接选择 `main` 分支。

### 6. 配置自定义域名

- 访问 [Cloudflare 仪表板](https://dash.cloudflare.com/)，找到“Workers & Pages”中的 Duckfolio 项目。
- 进入“自定义域”，添加您的域名。
- 若域名非 Cloudflare 托管，按照提示添加 DNS 记录。

### 7. 验证部署

- 等待几分钟（通常 5-10 分钟）以确保 DNS 和 SSL 生效。
- 使用自定义域名访问 Duckfolio，确认网站正常运行。

### 8. 完成部署

- 若页面成功加载，部署完成。

## 常见问题解答（FAQ）

### 为什么部署失败，提示 `sh: 1: wrangler: not found`？

pnpm 可能未正确安装 Wrangler CLI。  

可以尝试使用 npm 进行部署：

```bash
npm i && npm run deploy
```

或全局安装 Wrangler：
```bash
npm install -g @cloudflare/wrangler
```

### 为什么自定义域名访问提示 SSL 错误？

Cloudflare 需要一些时间验证域名 DNS 正确性（即使是由 Cloudflare 托管的域名）。通常 5-10 分钟内完成，验证通过后，仍需要一定时间申请 SSL 证书，整个过程大约 10-20 分钟。