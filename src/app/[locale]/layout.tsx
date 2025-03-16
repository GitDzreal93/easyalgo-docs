import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

const ClientLayout = require('@/components/layout/ClientLayout').default;

const geist = Geist({
  subsets: ["latin"],
});

// 基础元数据
const baseMetadata: Metadata = {
  metadataBase: new URL('https://easyalgo.com'),
  authors: [{ name: 'Easy Algo Team' }],
  creator: 'Easy Algo Team',
  publisher: 'Easy Algo',
  formatDetection: {
    email: false,
    telephone: false,
  },
  verification: {
    google: 'google-site-verification-code',
  },
  other: {
    'baidu-site-verification': 'baidu-site-verification-code'
  },
  robots: {
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

// 本地化元数据
const localizedMetadata = {
  zh: {
    title: {
      default: "Easy Algo - 通俗易懂的算法学习平台",
      template: '%s | Easy Algo'
    },
    description: "专业的算法教程网站，提供数据结构与算法详解、LeetCode 题解、面试算法指南。通过清晰的图解和实例，让算法学习变得简单有趣。",
    keywords: ['算法教程', '数据结构', 'LeetCode题解', '算法学习', '面试算法', '编程入门', '算法解析', '代码示例'],
    openGraph: {
      locale: 'zh_CN',
      title: 'Easy Algo - 通俗易懂的算法学习平台',
      description: '专业的算法教程网站，提供数据结构与算法详解、LeetCode 题解、面试算法指南。',
      alt: 'Easy Algo - 算法学习平台'
    }
  },
  en: {
    title: {
      default: "Easy Algo - Learn Algorithms Made Easy",
      template: '%s | Easy Algo'
    },
    description: "Professional algorithm tutorial website offering data structures, algorithm explanations, LeetCode solutions, and interview guides. Learn algorithms through clear illustrations and examples.",
    keywords: ['algorithm tutorial', 'data structures', 'LeetCode solutions', 'algorithm learning', 'interview prep', 'programming basics', 'algorithm analysis', 'code examples'],
    openGraph: {
      locale: 'en_US',
      title: 'Easy Algo - Learn Algorithms Made Easy',
      description: 'Professional algorithm tutorial website with data structures, algorithm explanations, and LeetCode solutions.',
      alt: 'Easy Algo - Algorithm Learning Platform'
    }
  }
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  { params }: RootLayoutProps
): Promise<Metadata> {
  const { locale } = await params;
  if (!['en', 'zh'].includes(locale)) {
    return baseMetadata;
  }

  const meta = localizedMetadata[locale as keyof typeof localizedMetadata];
  const metadata: Metadata = {
    ...baseMetadata,
    ...meta,
    openGraph: {
      type: 'website',
      url: 'https://easyalgo.com',
      siteName: 'Easy Algo',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: meta.openGraph.alt
        }
      ],
      ...meta.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      images: ['/og-image.png'],
    },
  };

  return metadata;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  if (!['en', 'zh'].includes(locale)) {
    notFound();
  }

  // 设置请求的语言环境
  setRequestLocale(locale);

  let messages;
  try {
    messages = require(`../../messages/${locale}.json`);
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