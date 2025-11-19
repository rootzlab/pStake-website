# MediumAPI 快速开始指南

## 🚀 5 分钟快速启用

### 步骤 1: 获取 API Key

1. 访问 https://rapidapi.com/nishujain199719-vgIfuFHZxVZ/api/medium2
2. 点击 "Subscribe to Test"
3. 选择 **BASIC 免费计划**（150 次/月）
4. 复制您的 API Key

### 步骤 2: 配置环境变量

在项目根目录创建或编辑 `.env.local` 文件：

```env
RAPIDAPI_KEY=your_api_key_here
```

### 步骤 3: 重启服务器

```bash
npm run dev
```

### 步骤 4: 验证

访问 http://localhost:3000/api/medium?limit=30

检查响应中的 `dataSource` 字段：
- `"mediumapi"` = ✅ 成功使用 MediumAPI
- `"rss-fallback"` = ⚠️ API 失败，降级到 RSS Feed
- `"rss"` = ℹ️ 未配置 API Key，使用 RSS Feed

## 📊 现在能做什么

### 之前（RSS Feed）
- ❌ 最多获取 10 篇文章
- ❌ 无法分页
- ❌ 数据字段有限

### 现在（MediumAPI）
- ✅ 获取所有文章（不限数量）
- ✅ 支持分页
- ✅ 更多数据字段（拍手数、阅读时间等）
- ✅ 失败自动降级，服务永不中断

## 💰 成本估算

### 免费计划（150 次/月）

**适用场景：**
- 显示 30 篇文章
- 每周更新一次
- 24 小时缓存

**计算：**
- 每次更新：31 次调用（1 次列表 + 30 次详情）
- 每周更新：31 × 4 = **124 次/月** ✅

### PRO 计划（$4.99/月，2,500 次）

**适用场景：**
- 显示 30 篇文章
- 每日更新
- 24 小时缓存

**计算：**
- 每天更新：31 × 30 = **930 次/月** ✅

## 🔧 常见问题

### Q: 如果不配置会怎样？
A: 继续使用 RSS Feed，与之前完全一样。

### Q: 配额用完了怎么办？
A: 自动降级到 RSS Feed，服务不中断。

### Q: 如何查看剩余配额？
A: 访问 https://rapidapi.com/developer/dashboard

### Q: 可以只在某些页面使用吗？
A: 可以。通过 `limit` 参数控制：
- 首页：`/api/medium?limit=3` → 使用 RSS
- 博客：`/api/medium?limit=30` → 使用 MediumAPI

## 📝 日志示例

### 成功使用 MediumAPI
```
[MediumAPI] Fetching articles for jamievaron (limit: 30)
[MediumAPI] Successfully fetched 30 articles
```

### 降级到 RSS Feed
```
[MediumAPI] Quota exceeded, falling back to RSS Feed
[Medium] Using RSS Feed
```

## 📚 更多文档

- 详细配置指南：`docs/MEDIUMAPI_SETUP.md`
- 集成报告：`MEDIUMAPI_INTEGRATION.md`
- 测试脚本：`scripts/test-medium-api.js`

## ✅ 验证清单

- [ ] 获取了 RapidAPI Key
- [ ] 在 `.env.local` 中配置了 `RAPIDAPI_KEY`
- [ ] 重启了开发服务器
- [ ] 访问了 `/api/medium?limit=30`
- [ ] 看到了 `dataSource: "mediumapi"`
- [ ] 博客页面显示了 30 篇文章

## 🎯 下一步

### 立即可用
- ✅ 显示 30 篇文章
- ✅ 自动降级保障

### 可选优化
- [ ] 添加定时任务预加载数据
- [ ] 数据库缓存
- [ ] 显示拍手数和阅读时间

### 高级功能
- [ ] 搜索功能
- [ ] 相关文章推荐
- [ ] 文章内容展示

---

**就这么简单！** 🎉

配置完成后，您的 Medium 博客将能够显示所有文章，不再受限于 10 篇的限制。
