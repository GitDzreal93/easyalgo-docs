import { DocsLayout } from '@/components/docs/DocsLayout';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: {
    template: '%s - Easy Algo',
    default: 'Easy Algo'
  },
  description: 'Professional algorithm learning platform providing data structures, algorithms, and LeetCode solutions.',
  keywords: 'algorithm tutorial,data structures,LeetCode solutions,algorithm learning,interview algorithms,programming',
  authors: [{ name: 'Easy Algo Team' }],
  openGraph: {
    title: 'Easy Algo',
    description: 'Professional algorithm learning platform.',
    type: 'website',
    siteName: 'Easy Algo'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Algo',
    description: 'Professional algorithm learning platform.'
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

export default async function Layout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  return <DocsLayout locale={params.locale}>{children}</DocsLayout>;
} 