import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// 使用服务端安全的 i18n 请求配置文件
const withNextIntl = createNextIntlPlugin('./i18n.request.ts');

const nextConfig: NextConfig = {
  // 切换为默认输出，以支持服务端运行和动态/构建时数据抓取
  trailingSlash: true,
  async rewrites() {
    return [
      {
        // 允许 API 路径同时兼容 /api/foo 与 /api/foo/
        source: "/api/:path*/",
        destination: "/api/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
