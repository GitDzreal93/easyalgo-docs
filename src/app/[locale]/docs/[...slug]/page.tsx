import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { findDocBySlug, getDocContent, getDocsData, type DocNode } from '@/lib/docs';
import ClientBytemdViewer from '@/components/bytemd/client-viewer';
import { getMarkdownClassName } from '@/components/bytemd/styles/markdown';
import { useTranslations } from 'next-intl';

// Define simple page props interface that matches what Next.js provides
interface PageProps {
  params: {
    locale: string;
    slug: string[];
  };
}

export const metadata = {
  title: 'Easy Algo - Document Center',
  description: 'The simplest algorithm learning platform, providing detailed algorithm analysis, code implementation, and practice problems.',
  keywords: 'algorithm learning, programming tutorial, Easy Algo, data structures, algorithm analysis, programming basics, code implementation',
  openGraph: {
    title: 'Easy Algo - Document Center',
    description: 'The simplest algorithm learning platform',
    type: 'article',
  },
};

// 加载状态组件
function LoadingState() {
  return (
    <div className="animate-pulse bg-[var(--background)] rounded-lg shadow-sm p-6">
      <div className="mb-8">
        <div className="h-8 bg-[var(--primary)]/20 rounded w-3/4 mb-4"></div>
        <div className="flex items-center space-x-4">
          <div className="h-4 bg-[var(--primary)]/10 rounded w-24"></div>
          <div className="h-4 bg-[var(--primary)]/10 rounded w-24"></div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-[var(--primary)]/10 rounded w-full"></div>
        <div className="h-4 bg-[var(--primary)]/10 rounded w-5/6"></div>
        <div className="h-4 bg-[var(--primary)]/10 rounded w-4/6"></div>
      </div>
    </div>
  );
}

// 文档内容组件
async function DocumentContent({ params, t }: { params: PageProps['params']; t: any }) {
  try {
    console.log('Processing document route:', params);
    
    // 等待并解构参数
    const { locale, slug } = await Promise.resolve(params);
    
    // Handle path
    let normalizedSlug: string;
    if (Array.isArray(slug)) {
      normalizedSlug = slug.join('/').replace(/^\/+|\/+$/g, '');
    } else {
      normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
    }

    if (!normalizedSlug) {
      console.log('Missing slug parameter');
      notFound();
    }

    console.log('Normalized path:', {
      originalSlug: slug,
      normalizedSlug
    });
    
    // Find document
    const doc = await findDocBySlug(normalizedSlug, locale);
    console.log('Document search result:', doc ? {
      title: doc.title,
      slug: doc.slug,
      filename: doc.filename,
      hasChildren: doc.children?.length > 0,
      path: doc.filename.replace(/^\/+|\/+$/g, '')
    } : 'Document not found');
    
    if (!doc) {
      console.log('Document not found, returning 404');
      notFound();
    }
    
    // Check document type
    const isChildDoc = doc.filename.includes('/');
    console.log('Checking document type:', {
      filename: doc.filename,
      isChildDoc,
      path: doc.filename.replace(/^\/+|\/+$/g, '')
    });
    
    // Normalize file path
    const normalizedPath = doc.filename.replace(/^\/+|\/+$/g, '');
    console.log('Attempting to read document content:', {
      filename: doc.filename,
      normalizedPath,
      isChildDoc
    });
    
    const content = await getDocContent(normalizedPath, locale);
    console.log('Document content read result:', {
      path: normalizedPath,
      hasContent: !!content,
      contentLength: content?.length
    });

    if (!content) {
      return (
        <article className="bg-[var(--background)] rounded-lg shadow-sm p-6">
          <header className="mb-8">
            {isChildDoc && (
              <div className="flex items-center text-sm text-[var(--text)] mb-4">
                <Link href={`/${locale}/docs/${doc.slug.split('/')[0]}`} className="hover:text-[var(--primary)] flex items-center">
                  <ChevronRightIcon className="h-4 w-4 mr-1" />
                  {t('backToParent')}
                </Link>
              </div>
            )}
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">{doc.title}</h1>
            <div className="flex items-center text-sm text-[var(--text)]">
              <span className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {new Date(parseInt(doc.obj_edit_time) * 1000).toLocaleDateString(locale)}
              </span>
            </div>
          </header>
          <div className="prose max-w-none">
            <p className="text-[var(--text)]">{t('contentNotAvailable')}</p>
            <p className="text-[var(--text)] opacity-75">{t('filePath')}: {normalizedPath}</p>
          </div>
        </article>
      );
    }

    return (
      <article className="bg-[var(--background)] rounded-lg shadow-sm p-6">
        <header className="mb-8">
          {isChildDoc && (
            <div className="flex items-center text-sm text-[var(--text)] mb-4">
              <Link href={`/${locale}/docs/${doc.slug.split('/')[0]}`} className="hover:text-[var(--primary)] flex items-center">
                <ChevronRightIcon className="h-4 w-4 mr-1" />
                {t('backToParent')}
              </Link>
            </div>
          )}
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">{doc.title}</h1>
          <div className="flex items-center text-sm text-[var(--text)]">
            <span className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(parseInt(doc.obj_edit_time) * 1000).toLocaleDateString(locale)}
            </span>
            <span className="mx-2 text-[var(--text)]">·</span>
            <span className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              {t('estimatedReadingTime', { minutes: Math.ceil(content.length / 500) })}
            </span>
          </div>
        </header>

        <div className="max-w-none">
          <div className="mdx-content">
            <ClientBytemdViewer 
              content={content} 
              className={getMarkdownClassName()} 
            />
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Document content error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 3).join('\n') : undefined
    });
    
    return (
      <article className="bg-[var(--background)] rounded-lg shadow-sm p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">{t('errorTitle')}</h1>
        </header>
        <div className="prose max-w-none">
          <p className="text-[var(--text)]">{t('errorMessage')}</p>
          <p className="text-[var(--text)] opacity-75">
            {error instanceof Error ? error.message : String(error)}
          </p>
        </div>
      </article>
    );
  }
}

export default function DocumentPage(props: PageProps) {
  const t = useTranslations('docs');

  return (
    <Suspense fallback={<LoadingState />}>
      {/* @ts-expect-error Async Server Component */}
      <DocumentContent params={props.params} t={t} />
    </Suspense>
  );
} 