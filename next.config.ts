import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 添加主题相关的环境变量
  env: {
    PRIMARY_COLOR: '#8ECAE6',
    ACCENT_COLOR: '#FFB703',
    TEXT_COLOR: '#023047',
  },
  // 从 next.config.js 合并的配置
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

// 应用 MDX 和 next-intl 配置
export default withNextIntl(withMDX(nextConfig));
