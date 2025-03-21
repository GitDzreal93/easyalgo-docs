import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // 配置默认语言
  defaultLocale: 'en',
  // 配置支持的语言
  locales: locales,
  // 添加 localePrefix 配置
  localePrefix: 'as-needed'
});

export const config = {
  // 匹配所有路径，除了api路由、静态文件等
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};