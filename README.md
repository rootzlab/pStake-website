This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### 方法一：通过 Vercel CLI 部署

1. **安装 Vercel CLI**（如果还没有安装）：
```bash
npm i -g vercel
```

2. **登录 Vercel**：
```bash
vercel login
```

3. **部署项目**：
```bash
vercel
```

4. **生产环境部署**：
```bash
vercel --prod
```

### 方法二：通过 Vercel 网站部署（推荐）

1. **推送代码到 GitHub/GitLab/Bitbucket**
   - 确保你的代码已经推送到 Git 仓库

2. **访问 Vercel 网站**
   - 前往 [https://vercel.com](https://vercel.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录

3. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你的 Git 仓库
   - Vercel 会自动检测 Next.js 项目

4. **配置环境变量**（可选）
   - 在项目设置中添加以下环境变量（如果需要）：
     - `NEXT_PUBLIC_MEDIUM_SOURCE`: Medium 用户名（默认: jamievaron）
     - `MEDIUM_SOURCE`: Medium 用户名（服务器端）
     - `MEDIUM_HTTP_PROXY`: HTTP 代理（如果需要）
     - `HTTPS_PROXY`: HTTPS 代理（如果需要）
     - `HTTP_PROXY`: HTTP 代理（如果需要）

5. **部署**
   - 点击 "Deploy" 按钮
   - Vercel 会自动构建并部署你的项目

### 部署后

- Vercel 会自动为你的项目生成一个 URL（例如：`your-project.vercel.app`）
- 每次推送到主分支都会自动触发新的部署
- 你可以在 Vercel 仪表板中查看部署日志和性能指标

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

Create a `.env.local` file (or reuse `.env.example`) and define the Medium RSS source handle:

```
NEXT_PUBLIC_MEDIUM_SOURCE=jamievaron
```

You can replace `jamievaron` with any other Medium username or publication slug; the value is used both on the server (fetching RSS) and on the client when generating internal links.
