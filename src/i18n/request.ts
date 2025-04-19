import { getRequestConfig } from 'next-intl/server';

// 可用的语言列表
export const locales = ['en', 'zh'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Asia/Shanghai',
    locale: locale
  };
}); 