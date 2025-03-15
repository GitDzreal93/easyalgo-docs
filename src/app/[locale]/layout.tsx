import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

const ClientLayout = dynamic(() => import('@/components/layout/ClientLayout'));

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://easyalgo.com'),
  title: {
    default: "Easy Algo - 通俗易懂的算法学习平台",
    template: '%s | Easy Algo'
  },
  description: "专业的算法教程网站，提供数据结构与算法详解、LeetCode 题解、面试算法指南。通过清晰的图解和实例，让算法学习变得简单有趣。",
  keywords: ['算法教程', '数据结构', 'LeetCode题解', '算法学习', '面试算法', '编程入门', '算法解析', '代码示例'],
  authors: [{ name: 'Easy Algo Team' }],
  creator: 'Easy Algo Team',
  publisher: 'Easy Algo',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://easyalgo.com',
    siteName: 'Easy Algo',
    title: 'Easy Algo - 通俗易懂的算法学习平台',
    description: '专业的算法教程网站，提供数据结构与算法详解、LeetCode 题解、面试算法指南。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Easy Algo - 算法学习平台'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Algo - 通俗易懂的算法学习平台',
    description: '专业的算法教程网站，提供数据结构与算法详解、LeetCode 题解、面试算法指南。',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  other: {
    'baidu-site-verification': 'baidu-site-verification-code'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://easyalgo.com',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  
  // 设置请求的语言环境
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geist.className} min-h-screen bg-white flex flex-col`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 