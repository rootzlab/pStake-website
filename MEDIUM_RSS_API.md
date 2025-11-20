# Medium RSS API 完整文档

## 📡 接口概述

Medium 为每个用户和出版物自动生成 RSS Feed,无需申请 API Key,完全免费使用。

---

## 🔗 RSS Feed URL 格式

### 1. 个人用户 Feed

```
https://medium.com/feed/@username
```

或

```
https://username.medium.com/feed
```

**示例**:
- `https://medium.com/feed/@jamesprivett29`
- `https://timdenning.medium.com/feed`

### 2. 出版物 Feed

```
https://medium.com/{publication-name}/feed
```

**示例**:
- `https://medium.com/javascript-scene/feed`
- `https://medium.com/better-programming/feed`

### 3. 自定义域名出版物

```
https://custom-domain.com/feed
```

---

## 📦 返回数据格式

### RSS Feed Header (Channel 信息)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>用户名或出版物名称</title>
    <link>https://medium.com/@username</link>
    <description>用户简介</description>
    <lastBuildDate>Wed, 09 Oct 2025 12:00:00 GMT</lastBuildDate>
    <image>
      <url>用户头像 URL</url>
      <title>用户名</title>
      <link>https://medium.com/@username</link>
    </image>
    <language>en</language>

    <!-- 文章列表 -->
    <item>...</item>
    <item>...</item>
    ...
  </channel>
</rss>
```

### Article Item 数据结构

每篇文章包含以下字段:

```xml
<item>
  <!-- 文章标题 -->
  <title>文章标题</title>

  <!-- 文章链接 -->
  <link>https://medium.com/@username/article-slug-123abc</link>

  <!-- 唯一标识符 -->
  <guid isPermaLink="false">https://medium.com/p/123abc</guid>

  <!-- 发布时间 (RFC 822 格式) -->
  <pubDate>Wed, 09 Oct 2025 12:00:00 GMT</pubDate>

  <!-- 作者 -->
  <dc:creator>作者名称</dc:creator>

  <!-- 标签/分类 (最多5个) -->
  <category>JavaScript</category>
  <category>Web Development</category>
  <category>React</category>

  <!-- 文章摘要 (付费文章仅显示摘要) -->
  <description><![CDATA[
    <div>
      <img src="封面图片URL" />
      <p>文章开头部分...</p>
    </div>
  ]]></description>

  <!-- 完整文章内容 (免费文章才有完整内容) -->
  <content:encoded><![CDATA[
    <div>
      <h1>文章标题</h1>
      <figure>
        <img src="封面图片URL" />
        <figcaption>图片说明</figcaption>
      </figure>
      <p>文章段落...</p>
      <h2>小标题</h2>
      <p>更多内容...</p>
      <!-- 完整的 HTML 内容 -->
    </div>
  ]]></content:encoded>

  <!-- 封面图片 (部分 feed 中包含) -->
  <enclosure url="封面图片URL" type="image/jpeg" length="12345" />
</item>
```

---

## 🔑 关键字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `<title>` | String | 文章标题 |
| `<link>` | URL | 文章完整链接 |
| `<guid>` | String | 文章唯一标识符 |
| `<pubDate>` | Date | 发布时间 (RFC 822 格式) |
| `<dc:creator>` | String | 作者名称 |
| `<category>` | String[] | 文章标签(可有多个) |
| `<description>` | HTML | 文章摘要或预览 |
| `<content:encoded>` | HTML | 完整文章内容(仅免费文章) |
| `<enclosure>` | Object | 封面图片信息 |

---

## ⚠️ 重要限制

### 1. 文章数量限制
- **每个 Feed 只返回最新 10 篇文章**
- 无分页功能,无法获取更早的文章
- 如需更多文章,需使用 Medium API 或自建数据库

### 2. 付费墙限制
- **付费文章不返回完整内容**
- `<description>` 只包含文章摘要
- `<content:encoded>` 字段不存在或被截断
- 免费文章才有完整 HTML 内容

### 3. CORS 限制
- **浏览器直接请求会遇到 CORS 错误**
- 需要通过服务器端请求
- 或使用代理服务 (如 rss2json)

### 4. 更新延迟
- RSS Feed 可能有 5-15 分钟延迟
- 非实时更新
- `<lastBuildDate>` 显示最后更新时间

---

## 🛠️ 使用方式

### 方式 1: 服务器端解析 RSS (推荐)

使用 Node.js 的 `rss-parser` 库:

```bash
npm install rss-parser
```

```typescript
import Parser from 'rss-parser';

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
  contentSnippet: string;
  categories: string[];
  thumbnail?: string;
}

async function getMediumArticles(username: string): Promise<MediumArticle[]> {
  const parser = new Parser({
    customFields: {
      item: [
        ['content:encoded', 'content'],
        ['dc:creator', 'creator']
      ]
    }
  });

  const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);

  return feed.items.map(item => ({
    title: item.title || '',
    link: item.link || '',
    pubDate: item.pubDate || '',
    creator: item.creator || '',
    content: item.content || '',
    contentSnippet: item.contentSnippet || '',
    categories: item.categories || [],
    thumbnail: extractThumbnail(item.content || item['content:encoded'])
  }));
}

// 从 HTML 内容中提取第一张图片
function extractThumbnail(html: string): string | undefined {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : undefined;
}

// 使用示例
const articles = await getMediumArticles('jamesprivett29');
console.log(articles);
```

---

### 方式 2: 使用 RSS2JSON API (客户端)

由于 CORS 限制,浏览器端可使用第三方转换服务:

**API Endpoint**:
```
https://api.rss2json.com/v1/api.json?rss_url={MEDIUM_RSS_URL}
```

**完整示例**:
```
https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jamesprivett29
```

**返回 JSON 格式**:

```json
{
  "status": "ok",
  "feed": {
    "url": "https://medium.com/@jamesprivett29",
    "title": "用户名",
    "link": "https://medium.com/@jamesprivett29",
    "author": "",
    "description": "用户简介",
    "image": "用户头像URL"
  },
  "items": [
    {
      "title": "文章标题",
      "pubDate": "2025-10-09 12:00:00",
      "link": "https://medium.com/@jamesprivett29/article-slug",
      "guid": "https://medium.com/p/abc123",
      "author": "作者名",
      "thumbnail": "封面图片URL",
      "description": "文章摘要...",
      "content": "<div>完整HTML内容...</div>",
      "enclosure": {},
      "categories": ["JavaScript", "React"]
    }
  ]
}
```

**客户端使用示例**:

```typescript
"use client"
import { useState, useEffect } from 'react';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  categories: string[];
}

export default function MediumFeed({ username }: { username: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const rssUrl = `https://medium.com/feed/@${username}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();

        if (data.status === 'ok') {
          setArticles(data.items);
        } else {
          throw new Error('Invalid response from RSS2JSON');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [username]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      {articles.map((article, index) => (
        <a key={index} href={article.link} target="_blank" rel="noopener noreferrer">
          <div>
            <img src={article.thumbnail} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{new Date(article.pubDate).toLocaleDateString('zh-CN')}</p>
            <div>{article.categories.join(', ')}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
```

**RSS2JSON 免费版限制**:
- 每天 10,000 次请求
- 无需注册
- 有时不稳定
- 可能返回旧数据(有缓存)

---

### 方式 3: Next.js 构建时获取 (最优方案)

在 Next.js App Router 中,服务器组件可以直接异步获取数据:

```typescript
// app/blog/page.tsx
import Parser from 'rss-parser';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
}

async function getMediumArticles(): Promise<Article[]> {
  const parser = new Parser();
  const feed = await parser.parseURL('https://medium.com/feed/@your-username');

  return feed.items.slice(0, 10).map(item => {
    // 从 content 中提取第一张图片
    const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
    const thumbnail = imgMatch ? imgMatch[1] : '/img/default.jpg';

    return {
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      thumbnail
    };
  });
}

// 服务器组件 - 构建时执行
export default async function BlogPage() {
  const articles = await getMediumArticles();

  return (
    <div>
      <h1>博客文章</h1>
      <div>
        {articles.map((article, index) => (
          <a key={index} href={article.link} target="_blank">
            <img src={article.thumbnail} alt={article.title} />
            <h2>{article.title}</h2>
            <time>{article.pubDate}</time>
          </a>
        ))}
      </div>
    </div>
  );
}

// 配置重新验证时间 (可选,需要非静态导出)
export const revalidate = 3600; // 每小时重新验证
```

---

## 📋 实际 RSS XML 示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>James Privett</title>
    <link>https://medium.com/@jamesprivett29</link>
    <description>Stories by James Privett on Medium</description>
    <lastBuildDate>Wed, 09 Oct 2025 10:30:00 GMT</lastBuildDate>
    <language>en</language>

    <item>
      <title>How to Get Article Data from Medium Using an RSS Feed</title>
      <link>https://medium.com/@jamesprivett29/05-how-to-get-article-data-from-medium-using-an-rss-feed-8f72f9df988f</link>
      <guid isPermaLink="false">https://medium.com/p/8f72f9df988f</guid>
      <pubDate>Tue, 08 Oct 2025 14:20:00 GMT</pubDate>
      <dc:creator>James Privett</dc:creator>
      <category>JavaScript</category>
      <category>Medium</category>
      <category>RSS</category>
      <description><![CDATA[
        <div>
          <img src="https://cdn-images-1.medium.com/max/1024/1*abc123.jpeg" />
          <p>Medium has no official API for reading articles, but you can use the RSS feed instead...</p>
        </div>
      ]]></description>
      <content:encoded><![CDATA[
        <div>
          <h1>How to Get Article Data from Medium Using an RSS Feed</h1>
          <figure>
            <img src="https://cdn-images-1.medium.com/max/1024/1*abc123.jpeg" />
          </figure>
          <p>Medium has no official API for reading articles...</p>
          <!-- 完整文章 HTML -->
        </div>
      ]]></content:encoded>
    </item>

    <!-- 更多文章... -->
  </channel>
</rss>
```

---

## 🎯 最佳实践

### 1. 图片提取

Medium RSS 的图片可能在多个位置:
- `<enclosure>` 标签
- `<description>` 中的 `<img>` 标签
- `<content:encoded>` 中的第一张图片

推荐解析策略:

```typescript
function extractThumbnail(item: any): string {
  // 优先级 1: enclosure
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }

  // 优先级 2: content:encoded 中的第一张图
  if (item['content:encoded']) {
    const match = item['content:encoded'].match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
  }

  // 优先级 3: description 中的图片
  if (item.description) {
    const match = item.description.match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
  }

  // 默认图片
  return '/img/default-thumbnail.jpg';
}
```

### 2. 日期格式化

RSS 返回的日期是 RFC 822 格式,需要转换:

```typescript
function formatDate(rssDate: string): string {
  const date = new Date(rssDate);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
```

### 3. HTML 内容清理

如果要在页面显示文章内容,需要清理 HTML:

```typescript
import DOMPurify from 'isomorphic-dompurify';

function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'img', 'a', 'ul', 'ol', 'li', 'strong', 'em'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title']
  });
}
```

### 4. 缓存策略

避免频繁请求 Medium RSS:

```typescript
// 简单内存缓存
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_DURATION = 3600000; // 1 小时

async function getCachedArticles(username: string) {
  const cacheKey = `medium_${username}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const articles = await getMediumArticles(username);
  cache.set(cacheKey, { data: articles, timestamp: Date.now() });

  return articles;
}
```

---

## 🔍 测试你的 RSS Feed

### 在线测试工具:
1. **RSS Validator**: https://validator.w3.org/feed/
2. **RSS Preview**: https://rss.app/
3. **Feedly**: https://feedly.com/i/discover

### 测试步骤:
1. 创建 Medium 账号
2. 发布至少一篇文章
3. 访问 `https://medium.com/feed/@your-username`
4. 查看返回的 XML
5. 验证数据结构是否完整

---

## 📚 相关资源

- [Medium RSS 官方文档](https://help.medium.com/hc/en-us/articles/214874118)
- [RSS 2.0 规范](https://www.rssboard.org/rss-specification)
- [rss-parser GitHub](https://github.com/rbren/rss-parser)
- [RSS2JSON API](https://rss2json.com/)
- [Medium 详细分析](https://quickcoder.org/rss-overview/)

---

## ❓ 常见问题

### Q: RSS Feed 多久更新一次?
A: 通常在发布新文章后 5-15 分钟内更新。

### Q: 可以获取超过 10 篇文章吗?
A: 不能,RSS Feed 限制为最新 10 篇。如需更多,可以:
- 定期抓取并存储到数据库
- 使用 Medium Partner API (需申请)
- 使用网页爬虫(可能违反 ToS)

### Q: 付费文章能显示完整内容吗?
A: 不能,付费文章的 `<content:encoded>` 会被截断。

### Q: CORS 错误怎么办?
A: 使用服务器端请求或 RSS2JSON 等代理服务。

### Q: RSS2JSON 不稳定怎么办?
A: 可以使用备用方案:
- **Meed.js**: https://meed.js.org/
- **自建代理**: 使用 Next.js API Routes
- **NoCodeAPI**: https://nocodeapi.com/ (付费但更稳定)

---

## 🎉 总结

Medium RSS Feed 是免费、简单、可靠的获取文章数据的方式:

✅ **优点**:
- 无需 API Key
- 完全免费
- 数据结构清晰
- 支持所有用户和出版物

⚠️ **限制**:
- 只返回最新 10 篇
- 付费文章内容不完整
- 有 CORS 限制
- 更新有延迟

对于展示个人博客文章列表,RSS Feed 完全够用!
