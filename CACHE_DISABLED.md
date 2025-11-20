# 所有缓存已禁用

## 修改内容

### 1. API 路由缓存已禁用

**文件:** `app/api/medium/route.ts`

**修改:**
- 第 8-10 行：注释掉 MediumAPI 缓存 Map
- 第 18-40 行：移除所有缓存逻辑，每次都重新调用 MediumAPI

**修改前:**
```typescript
const mediumApiCache = new Map<...>();

// 检查缓存
const cached = mediumApiCache.get(cacheKey);
if (cached && cached.expiresAt > now) {
    return cached.data;
}

// 缓存数据
mediumApiCache.set(cacheKey, {...});
```

**修改后:**
```typescript
// 缓存已禁用
// const mediumApiCache = new Map<...>();

// 每次都重新获取
const apiArticles = await getMediumUserArticles(source, limit);
```

### 2. RSS Feed 缓存已禁用

**文件:** `app/utils/medium.ts`

**修改:**
- 第 313-316 行：注释掉所有缓存 Map
- 第 318-322 行：简化为直接调用，不检查缓存

**修改前:**
```typescript
const feedCache = new Map<...>();

const cached = feedCache.get(cacheKey);
if (cached && cached.expiresAt > now) return cached.data;

feedCache.set(cacheKey, cacheEntry);
```

**修改后:**
```typescript
// 缓存已禁用
export async function fetchMediumFeed(...) {
  return await fetchMediumFeedUncached(source, limit);
}
```

### 3. Next.js 页面缓存已禁用

**文件:** `app/pages/blog/page.tsx`

**修改:**
- 第 15 行：添加 `export const dynamic = 'force-dynamic'`
- 第 38-40 行：fetch 使用 `cache: 'no-store'`

## 当前状态

### ✅ 所有缓存层级已完全禁用

| 缓存层级 | 状态 | 说明 |
|---------|------|------|
| MediumAPI 缓存（24h） | ❌ 已禁用 | 每次都调用 API |
| RSS Feed 缓存（60s） | ❌ 已禁用 | 每次都获取 Feed |
| Next.js 页面缓存 | ❌ 已禁用 | force-dynamic |
| fetch 缓存 | ❌ 已禁用 | cache: 'no-store' |
| 浏览器缓存 | ⚠️ 需手动清除 | 硬刷新 |

## 使用说明

### 1. 重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)
npm run dev
```

### 2. 访问博客页面

```
http://localhost:3000/blog
```

### 3. 验证效果

**每次刷新页面，终端都会显示:**
```
[MediumAPI] Fetching articles for PSTAKEResearch (limit: 30)
[MediumAPI] Successfully fetched 11 articles
```

**浏览器 Console 会显示:**
```javascript
Array(11) [ {…}, {…}, ... ]  // 11 个元素
```

**页面会显示:**
- 2 篇精选文章（大卡片）
- 9 篇网格文章
- **总计 11 篇**

## 注意事项

### ⚠️ API 调用次数

由于禁用了所有缓存，**每次页面刷新都会调用 MediumAPI**：

**开发环境:**
- 每次刷新 = 1 次获取列表 + 30 次获取详情 = 31 次调用
- 如果频繁刷新，很快会用完免费配额（150 次/月）

**建议:**
1. 开发时尽量减少刷新次数
2. 调试完成后恢复缓存
3. 或升级到 PRO 计划（$4.99/月，2,500 次）

### ⚠️ 性能影响

**禁用缓存的影响:**
- 每次请求都需要等待 API 响应
- 页面加载时间会变长（约 2-5 秒）
- 服务器负载增加

**建议:**
- 仅在调试时禁用缓存
- 调试完成后恢复缓存设置

## 恢复缓存

如果需要恢复缓存，请执行以下操作：

### 1. 恢复 MediumAPI 缓存

**文件:** `app/api/medium/route.ts`

取消注释第 8-10 行，并恢复 fetchWithMediumApi 函数中的缓存逻辑。

### 2. 恢复 RSS Feed 缓存

**文件:** `app/utils/medium.ts`

取消注释第 313-316 行的 Map 定义，并恢复 fetchMediumFeed 函数中的缓存逻辑。

### 3. 恢复页面缓存

**文件:** `app/pages/blog/page.tsx`

```typescript
// 移除 force-dynamic
// export const dynamic = 'force-dynamic';

// 恢复 revalidate
export const revalidate = 300; // 5 分钟

// fetch 改为
const response = await fetch(`${baseUrl}/api/medium?source=${source}&limit=30`, {
    next: { revalidate: 300 }
});
```

## 总结

✅ **所有缓存已完全禁用**
- 每次访问都获取最新数据
- 适合调试和开发
- 注意 API 配额消耗

✅ **预期效果**
- 页面应显示 11 篇文章（2 精选 + 9 网格）
- Console 应输出 11 个元素
- 终端应每次都显示 "[MediumAPI] Fetching..."

⚠️ **重要提醒**
- 调试完成后建议恢复缓存
- 避免频繁刷新页面浪费 API 配额
- 生产环境务必启用缓存

---

**现在重启服务器，应该就能看到所有文章了！** 🎉
