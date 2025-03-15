const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // 启用实验性的 App Router 国际化功能
  experimental: {
    appDir: true,
  }
}

module.exports = withNextIntl(nextConfig); 