# MediumAPI 配置指南

本项目支持使用 [MediumAPI](https://mediumapi.com/) 来获取 Medium 文章数据，并在 API 配额用完或失败时自动降级到 RSS Feed。

## 为什么使用 MediumAPI？

**RSS Feed 的限制：**
- ❌ 每次只能获取最新 **10 篇文章**
- ❌ 无法分页获取更多历史文章
- ❌ 数据字段有限

**MediumAPI 的优势：**
- ✅ 可以获取用户的 **所有文章**（不限于 10 篇）
- ✅ 支持分页，每次最多返回 250 篇文章 ID
- ✅ 提供更多数据字段（拍手数、阅读时间、评论数等）
- ✅ 更新更及时

## 配置步骤

### 1. 注册 RapidAPI 账号

访问 [RapidAPI](https://rapidapi.com/) 并注册账号。

### 2. 订阅 Medium API

1. 访问 [Medium API 页面](https://rapidapi.com/nishujain199719-vgIfuFHZxVZ/api/medium2)
2. 点击 "Subscribe to Test" 按钮
3. 选择合适的计划：
   - **BASIC（免费）**: 150 次调用/月
   - **PRO**: $4.99/月，2,500 次调用
   - **ULTRA**: $24.99/月，25,000 次调用
   - **MEGA**: $149.95/月，1,250,000 次调用

### 3. 获取 API Key

1. 订阅后，在 API 页面的 "Code Snippets" 区域可以看到示例代码
2. 复制 `X-RapidAPI-Key` 的值（类似 `abcd1234efgh5678...`）

### 4. 配置环境变量

在项目根目录创建 `.env.local` 文件（如果不存在），并添加以下内容：

```env
# Medium 用户名
NEXT_PUBLIC_MEDIUM_SOURCE=jamievaron

# RapidAPI Key（可选）
RAPIDAPI_KEY=your_rapidapi_key_here
```

将 `your_rapidapi_key_here` 替换为您从 RapidAPI 获取的 API Key。

## 工作原理

### 智能降级机制

项目实现了双重保障的数据获取策略：

```
1. 尝试使用 MediumAPI
   ↓
2. 如果失败（配额超限、网络错误等）
   ↓
3. 自动降级到 RSS Feed
   ↓
4. 如果 RSS 也失败
   ↓
5. 返回错误信息
```

### 数据源判断逻辑

- **未配置 `RAPIDAPI_KEY`**: 直接使用 RSS Feed
- **已配置 `RAPIDAPI_KEY`**: 优先使用 MediumAPI
  - 成功 → 返回数据，`dataSource: 'mediumapi'`
  - 失败 → 降级到 RSS Feed，`dataSource: 'rss-fallback'`

### 缓存策略

- **MediumAPI 数据**: 缓存 24 小时
- **RSS Feed 数据**: 缓存 60 秒

这样可以大幅减少 API 调用次数，节省配额。

## 调用次数估算

### 示例场景

假设您有 **50 篇文章**，需要在博客页面显示 **30 篇**：

**每次更新需要的调用次数：**
1. 获取文章 ID 列表: 1 次
2. 获取 30 篇文章详情: 30 次
3. **总计: 31 次**

**每月调用次数：**
- **每日更新**: 31 × 30 = 930 次/月 → 需要 **PRO 计划** ($4.99/月)
- **每周更新**: 31 × 4 = 124 次/月 → **BASIC 免费计划** 足够
- **每两周更新**: 31 × 2 = 62 次/月 → **BASIC 免费计划** 足够

### 优化建议

1. **合理设置缓存时间**: 24 小时缓存可以大幅减少调用
2. **按需更新**: 只在文章有更新时才重新获取数据
3. **限制文章数量**: 如果不需要显示所有文章，可以限制 `limit` 参数

## 监控与调试

### 查看日志

应用会在控制台输出详细的日志信息：

```
[MediumAPI] Fetching articles for jamievaron (limit: 30)
[MediumAPI] Successfully fetched 30 articles
```

或者降级时：

```
[MediumAPI] Quota exceeded, falling back to RSS Feed
[Medium] Using RSS Feed
```

### 检查数据源

API 响应中包含 `dataSource` 字段，可以判断数据来源：

```json
{
  "feed": { ... },
  "articles": [ ... ],
  "source": "jamievaron",
  "dataSource": "mediumapi"  // 或 "rss" 或 "rss-fallback"
}
```

## 常见问题

### Q: 如果不配置 RAPIDAPI_KEY 会怎样？

A: 应用会继续使用 RSS Feed，与之前的行为完全一致，没有任何影响。

### Q: 免费计划够用吗？

A: 如果每周更新一次，并且缓存设置合理，免费的 BASIC 计划（150 次/月）通常足够。

### Q: 如果配额用完了怎么办？

A: 应用会自动降级到 RSS Feed，确保服务不中断。RSS Feed 虽然只能获取 10 篇文章，但至少可以显示最新内容。

### Q: 如何查看剩余配额？

A: 登录 [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard)，在 "My Subscriptions" 中可以查看每个 API 的使用情况。

### Q: 能否只在某些页面使用 MediumAPI？

A: 可以。API 路由支持 `limit` 参数：
- 首页需要 3 篇 → 使用 RSS Feed (`limit=3`)
- 博客页面需要 30 篇 → 使用 MediumAPI (`limit=30`)

由于缓存的存在，即使多次调用也只会消耗一次 API 配额（24 小时内）。

## 技术细节

### 文件结构

```
app/
├── utils/
│   ├── medium.ts              # 原 RSS Feed 实现
│   ├── mediumApi.ts           # MediumAPI 客户端
│   └── mediumApiAdapter.ts    # 数据格式适配器
└── api/
    └── medium/
        └── route.ts           # API 路由（带降级逻辑）
```

### 数据映射

MediumAPI 返回的数据会被自动转换为与 RSS Feed 相同的格式，确保现有组件无需修改：

```typescript
// MediumAPI 响应
{
  id: "abc123",
  title: "Article Title",
  published_at: "2024-01-15 10:30:00",
  image_url: "https://...",
  tags: ["tag1", "tag2"],
  ...
}

// 转换后的 MediumArticle
{
  guid: "abc123",
  title: "Article Title",
  pubDate: "Mon, 15 Jan 2024 10:30:00 GMT",
  coverImage: "https://...",
  categories: ["tag1", "tag2"],
  ...
}
```

### 错误处理

所有 MediumAPI 错误都会被捕获并降级：

- **配额超限 (429)**: 自动降级到 RSS Feed
- **网络超时 (10 秒)**: 自动降级到 RSS Feed
- **服务不可用 (5xx)**: 自动降级到 RSS Feed
- **其他错误**: 自动降级到 RSS Feed

## 升级路径

1. **当前阶段**: 继续使用 RSS Feed（免费、稳定）
2. **添加 API Key**: 启用 MediumAPI（免费 BASIC 计划）
3. **根据需求升级**: 如果需要更频繁的更新，升级到 PRO 计划

整个过程无需修改代码，只需配置环境变量即可。
