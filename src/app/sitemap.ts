import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  // 支持的语言列表
  const locales = ['zh', 'en']
  
  // 基础路由配置
  const routes = [
    {
      url: '',
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: '/docs',
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
    // {
    //   url: '/pricing',
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.7,
    // },
    // {
    //   url: '/profile',
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.6,
    // },
  ]

  // 为每个语言生成对应的 URL
  const sitemapEntries = locales.flatMap(locale =>
    routes.map(route => ({
      url: `${baseUrl}/${locale}${route.url}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  )

  return sitemapEntries
} 