#!/bin/bash

# Vercel 部署脚本
# 使用 pnpm 作为包管理器

echo "🚀 开始部署到 Vercel..."

# 检查是否已登录
if ! vercel whoami &> /dev/null; then
    echo "❌ 未登录 Vercel，请先登录："
    echo "   运行: vercel login"
    echo "   或者访问: https://vercel.com 通过网站部署"
    exit 1
fi

echo "✅ 已登录 Vercel"

# 部署到生产环境
echo "📦 开始部署..."
vercel --prod

echo "✨ 部署完成！"

