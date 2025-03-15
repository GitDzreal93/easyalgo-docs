import React from 'react';
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

export default async function DocumentPage(props: PageProps) {
  const t = useTranslations('docs');
  
  try {
    console.log('Processing document route:', props.params);

    // Handle path
    let slug: string;
    if (Array.isArray(props.params.slug)) {
      slug = props.params.slug.join('/');
    } else {
      slug = props.params.slug;
    }

    if (!slug) {
      console.log('Missing slug parameter');
      notFound();
    }

    // Normalize path
    const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
    console.log('Normalized path:', {
      originalSlug: props.params.slug,
      processedSlug: slug,
      normalizedSlug
    });
    
    // Find document
    const docs = await getDocsData(props.params.locale);
    console.log('Retrieved document data:', docs.map((d: DocNode) => ({
      title: d.title,
      slug: d.slug,
      hasChildren: d.children?.length > 0,
      children: d.children?.map((c: DocNode) => ({ 
        title: c.title, 
        slug: c.slug,
        filename: c.filename
      }))
    })));

    const doc = await findDocBySlug(normalizedSlug, props.params.locale);
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
    
    const content = await getDocContent(normalizedPath, props.params.locale);
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
                <Link href={`/${props.params.locale}/docs/${doc.slug.split('/')[0]}`} className="hover:text-[var(--primary)] flex items-center">
                  <ChevronRightIcon className="h-4 w-4 mr-1" />
                  {t('backToParent')}
                </Link>
              </div>
            )}
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">{doc.title}</h1>
            <div className="flex items-center text-sm text-[var(--text)]">
              <span className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {new Date(parseInt(doc.obj_edit_time) * 1000).toLocaleDateString(props.params.locale)}
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

    try {
      return (
        <article className="bg-[var(--background)] rounded-lg shadow-sm p-6">
          <header className="mb-8">
            {isChildDoc && (
              <div className="flex items-center text-sm text-[var(--text)] mb-4">
                <Link href={`/${props.params.locale}/docs/${doc.slug.split('/')[0]}`} className="hover:text-[var(--primary)] flex items-center">
                  <ChevronRightIcon className="h-4 w-4 mr-1" />
                  {t('backToParent')}
                </Link>
              </div>
            )}
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">{doc.title}</h1>
            <div className="flex items-center text-sm text-[var(--text)]">
              <span className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {new Date(parseInt(doc.obj_edit_time) * 1000).toLocaleDateString(props.params.locale)}
              </span>
              <span className="mx-2 text-[var(--text)]">·</span>
              <span className="flex items-center">
                <ClockIcon className="mr-2 h-4 w-4" />
                {t('estimatedReadingTime', { minutes: Math.ceil((content?.length || 0) / 500) })}
              </span>
            </div>
          </header>

          <div className="max-w-none">
            {content ? (
              <div className="mdx-content">
                <ClientBytemdViewer 
                  content={content} 
                  className={getMarkdownClassName()} 
                />
              </div>
            ) : (
              <p className="text-gray-600">{t('renderError')}</p>
            )}
          </div>
        </article>
      );
    } catch (renderError) {
      console.error('Error rendering MDX content:', renderError);
      console.error('Error details:', {
        name: renderError instanceof Error ? renderError.name : 'Unknown',
        message: renderError instanceof Error ? renderError.message : String(renderError)
      });
      return (
        <article className="bg-white rounded-lg shadow-sm p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('renderErrorTitle')}</h1>
          </header>
          <div className="prose max-w-none">
            <p className="text-gray-600">{t('renderErrorMessage')}</p>
          </div>
        </article>
      );
    }
  } catch (error) {
    console.error('Document page render error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 3).join('\n') : undefined
    });
    return (
      <article className="bg-white rounded-lg shadow-sm p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('loadErrorTitle')}</h1>
        </header>
        <div className="prose max-w-none">
          <p className="text-gray-600">{t('loadErrorMessage')}</p>
        </div>
      </article>
    );
  }
} 