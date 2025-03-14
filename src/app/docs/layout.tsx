import { DocsLayout } from '@/components/docs/DocsLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - Easy Algo 算法学习平台',
    default: 'Easy Algo - 通俗易懂的算法学习平台'
  },
  description: '专业的算法教程网站，提供数据结构与算法详解、LeetCode 题解、面试算法指南。通过清晰的图解和实例，让算法学习变得简单有趣。',
  keywords: '算法教程,数据结构,LeetCode题解,算法学习,面试算法,图解算法,编程入门,算法解析,代码示例,在线学习',
  authors: [{ name: 'Easy Algo Team' }],
  openGraph: {
    title: 'Easy Algo - 通俗易懂的算法学习平台',
    description: '专业的算法教程网站，提供数据结构与算法详解、LeetCode 题解、面试算法指南。',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Easy Algo'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Algo - 通俗易懂的算法学习平台',
    description: '专业的算法教程网站，提供数据结构与算法详解、LeetCode 题解、面试算法指南。'
  },
  alternates: {
    canonical: 'https://easyalgo.com/docs'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  }
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <DocsLayout>{children}</DocsLayout>;
}