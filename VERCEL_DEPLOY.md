# Vercel 部署指南

## 🚀 快速部署

### 方法一：通过 Vercel 网站部署（推荐，最简单）

**这是最简单的方式，推荐使用！**

1. **访问 Vercel 网站**
   - 打开 [https://vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录（如果没有账号，先注册）

2. **导入项目**
   - 点击右上角 "Add New..." → "Project"
   - 在 "Import Git Repository" 中选择你的仓库：`vxy-git/pstake-code`
   - 如果没有看到仓库，点击 "Adjust GitHub App Permissions" 授权访问

3. **配置项目**（Vercel 会自动检测，通常无需修改）
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: `./`（默认）
   - **Build Command**: `pnpm run build`（已在 vercel.json 中配置）
   - **Output Directory**: `.next`（Next.js 默认）
   - **Install Command**: `pnpm install`（已在 vercel.json 中配置）

4. **配置环境变量**（可选）
   在 "Environment Variables" 部分添加：
   - `NEXT_PUBLIC_MEDIUM_SOURCE`: Medium 用户名（默认: jamievaron，可选）
   - `MEDIUM_SOURCE`: Medium 用户名（服务器端，可选）
   - 如果需要代理，可添加：`MEDIUM_HTTP_PROXY`、`HTTPS_PROXY` 或 `HTTP_PROXY`

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成（通常 1-3 分钟）
   - 部署完成后会显示项目 URL

6. **自动部署设置**
   - ✅ 默认已启用：每次推送到 `main` 分支会自动触发生产部署
   - ✅ 推送到其他分支会创建预览部署
   - 可以在项目设置中调整这些行为

### 方法二：通过 Vercel CLI 部署

**注意**：需要先在终端手动登录 Vercel

1. **安装 Vercel CLI**（已完成 ✅）
   ```bash
   pnpm add -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```
   - 这会打开浏览器，按照提示完成登录
   - 或者使用部署脚本（见下方）

3. **部署项目**
   
   **方式 A：使用部署脚本（推荐）**
   ```bash
   ./deploy.sh
   ```
   
   **方式 B：手动部署**
   ```bash
   # 预览部署（测试）
   vercel
   
   # 生产环境部署
   vercel --prod
   ```

## 配置说明

### vercel.json 配置

项目已配置 `vercel.json`，包含以下设置：
- **构建命令**: `pnpm run build`
- **开发命令**: `pnpm run dev`
- **安装命令**: `pnpm install`
- **框架**: Next.js
- **区域**: 香港 (hkg1)

### 自动部署

- 每次推送到主分支（main/master）会自动触发生产部署
- 推送到其他分支会创建预览部署
- 可以在 Vercel 仪表板中查看所有部署历史

### 自定义域名

1. 在 Vercel 项目设置中进入 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

## 故障排除

### 构建失败

1. **检查 Node.js 版本**
   - Vercel 默认使用 Node.js 18.x
   - 如需特定版本，在 `package.json` 中添加：
     ```json
     {
       "engines": {
         "node": "18.x"
       }
     }
     ```

2. **检查依赖安装**
   - 确保 `pnpm-lock.yaml` 已提交到仓库
   - 检查 `package.json` 中的依赖是否正确

3. **查看构建日志**
   - 在 Vercel 仪表板中查看详细的构建日志
   - 检查是否有错误信息

### 环境变量问题

- 确保环境变量名称正确
- 区分 `NEXT_PUBLIC_*`（客户端）和普通环境变量（服务器端）
- 修改环境变量后需要重新部署

## 性能优化

- Vercel 自动启用 Next.js 的所有优化功能
- 静态资源会自动通过 CDN 分发
- API 路由会自动进行边缘函数优化

## 支持

如有问题，请查看：
- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)

