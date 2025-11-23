# 博客页面文章数量修复说明

## 问题描述

**症状：**
- API 端点 `/api/medium?limit=30` 返回 11 篇文章 ✅
- 博客页面 `console.log(articles)` 只显示 10 篇文章 ❌
- 页面实际显示 2 篇精选 + 8 篇网格 = 10 篇 ❌

**根本原因：**

1. **数据获取方式不一致**
   - API 路由 (`/api/medium`) 使用了 **MediumAPI + RSS Feed 降级** 逻辑
   - 博客页面 (`blog/page.tsx`) 直接调用 `fetchMediumFeed`，只使用 **RSS Feed**
   - RSS Feed 最多只能返回 **10 篇文章**（Medium 的限制）

2. **硬编码限制**
   - Unit5 组件中 `gridArticles = articles.slice(2, 30)` 限制了最多显示 28 篇网格文章

## 解决方案

### 修改 1: 博客页面改用 API 路由

**文件:** `app/blog/page.tsx`

**修改前：**
```typescript
import { DEFAULT_MEDIUM_SOURCE, fetchMediumFeed } from "@/app/utils/medium";

const feed = await fetchMediumFeed(source, 30);
articles = feed.articles;
```

**修改后：**
```typescript
import { DEFAULT_MEDIUM_SOURCE } from "@/app/utils/medium";
import type { MediumArticle } from "@/app/utils/medium";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const response = await fetch(`${baseUrl}/api/medium?source=${source}&limit=30`, {
    next: { revalidate: 60 } // 缓存 60 秒
});

if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
}

const feed = await response.json();
articles = feed.articles;
```

**效果：**
- 现在博客页面也会使用 MediumAPI（如果配置了 RAPIDAPI_KEY）
- 可以获取超过 10 篇文章
- 失败时会自动降级到 RSS Feed

### 修改 2: 移除 Unit5 组件的硬编码限制

**文件:** `app/blog/_components/Unit5/index.tsx`

**修改前（第 86 行）：**
```typescript
const gridArticles = articles.slice(2, 30); // 限制最多 28 篇
```

**修改后：**
```typescript
const gridArticles = articles.slice(2); // 显示所有剩余文章
```

**效果：**
- 不再限制最多 30 篇文章
- 可以显示所有获取到的文章

### 修改 3: 环境变量配置

**文件:** `.env.example`

添加了 `NEXT_PUBLIC_SITE_URL` 配置说明：

```env
# Site URL (used for internal API calls during SSR)
# Development: http://localhost:3000
# Production: https://your-domain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 当前配置状态

根据您的 `.env` 文件：

```env
NEXT_PUBLIC_MEDIUM_SOURCE=PSTAKEResearch
NEXT_PUBLIC_SITE_URL=https://pstake-code.vercel.app
RAPIDAPI_KEY=a16eea636fmshe1dc5df415129cap1c17d4jsn40c897990951
```

✅ **MediumAPI 已启用**，所以现在应该能获取更多文章！

## 预期效果

### 修改前
- 博客页面：最多 10 篇文章（RSS Feed 限制）
- 显示：2 篇精选 + 8 篇网格

### 修改后
- 博客页面：最多 30 篇文章（配置了 MediumAPI）
- 显示：2 篇精选 + 最多 28 篇网格（取决于实际文章数量）

## 验证步骤

1. **重启开发服务器**
   ```bash
   npm run dev
   ```

2. **访问博客页面**
   ```
   http://localhost:3000/blog
   ```

3. **检查控制台输出**
   - 打开浏览器开发者工具（F12）
   - 查看 `console.log(articles)` 输出
   - 应该显示超过 10 篇文章

4. **检查页面显示**
   - 精选区域：2 篇大卡片
   - 网格区域：剩余所有文章
   - 总数应该与 API 返回的数量一致

5. **验证 API 调用**
   - 查看控制台日志：
     - `[MediumAPI] Fetching articles for PSTAKEResearch (limit: 30)`
     - `[MediumAPI] Successfully fetched XX articles`

## 注意事项

1. **缓存策略**
   - 页面级缓存：60 秒（`next: { revalidate: 60 }`）
   - MediumAPI 缓存：24 小时
   - 如果看不到最新文章，等待缓存过期或清除缓存

2. **生产环境**
   - 确保 `NEXT_PUBLIC_SITE_URL` 设置为生产域名
   - Vercel 部署时会自动设置 `VERCEL_URL`，可以使用：
     ```typescript
     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
                     process.env.VERCEL_URL ||
                     'http://localhost:3000';
     ```

3. **开发环境**
   - 本地开发时确保 `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
   - 端口号要与开发服务器一致

## 故障排查

### 如果仍然只显示 10 篇文章

1. **检查环境变量**
   ```bash
   # 检查 RAPIDAPI_KEY 是否配置
   echo $RAPIDAPI_KEY
   ```

2. **检查 API 响应**
   ```bash
   curl "http://localhost:3000/api/medium?limit=30"
   ```

3. **检查日志**
   - 查看服务器控制台
   - 查看浏览器控制台
   - 是否有 `[MediumAPI]` 开头的日志

4. **验证 MediumAPI 配额**
   - 访问 https://rapidapi.com/developer/dashboard
   - 检查是否还有剩余配额
   - 如果配额用完，会自动降级到 RSS Feed（10 篇限制）

## 相关文件

- `app/blog/page.tsx` - 博客页面主文件
- `app/blog/_components/Unit5/index.tsx` - 文章列表组件
- `app/api/medium/route.ts` - Medium API 路由
- `app/utils/mediumApi.ts` - MediumAPI 客户端
- `app/utils/mediumApiAdapter.ts` - 数据适配器
- `.env` - 环境变量配置

## 总结

通过这些修改：
1. ✅ 博客页面现在使用与 API 路由相同的 MediumAPI 逻辑
2. ✅ 移除了 30 篇的硬编码限制
3. ✅ 支持显示所有获取到的文章
4. ✅ 保持了降级机制，确保服务稳定

**现在博客页面应该能正常显示所有文章了！** 🎉
