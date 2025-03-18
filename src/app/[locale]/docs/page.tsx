import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getDocsData } from '@/lib/docs';
import type { DocNode } from '@/lib/docs';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Document Center',
  description: 'Browse all available documents',
};

// 分离文档列表组件
async function DocsList({ locale }: { locale: string }) {
  const t = await getTranslations({
    locale: locale,
    namespace: 'docs'
  });

  console.log('开始加载文档页面数据...', { locale });
  const docs = await getDocsData(locale);
  console.log('文档数据加载完成', { docsCount: docs.length });

  if (!docs || docs.length === 0) {
    console.log('没有找到文档数据');
    return (
      <div className="py-12 text-center">
        <p className="text-[var(--foreground)]">{t('noDocuments')}</p>
      </div>
    );
  }

  // 将所有文档（包括子文档）平铺成一个数组
  const flattenDocs = (docs: DocNode[]): DocNode[] => {
    console.log('开始平铺文档数据...');
    const result = docs.reduce((acc: DocNode[], doc) => {
      acc.push(doc);
      if (doc.children && doc.children.length > 0) {
        acc.push(...flattenDocs(doc.children));
      }
      return acc;
    }, []);
    console.log('文档平铺完成，总数:', result.length);
    return result;
  };

  // 获取所有文档并按编辑时间排序
  console.log('开始处理文档排序...');
  const allDocs = flattenDocs(docs);
  const sortedDocs = allDocs.sort((a, b) => 
    parseInt(b.obj_edit_time) - parseInt(a.obj_edit_time)
  );
  console.log('文档排序完成，准备渲染');

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {sortedDocs.map((doc) => {
        const normalizedSlug = doc.slug.replace(/^\/+|\/+$/g, '');
        const docPath = normalizedSlug;
        
        return (
          <div key={doc.node_token} className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-[var(--background)] h-full border-[var(--primary)] hover:border-[var(--accent)]">
            <h2 className="text-xl font-semibold mb-2 text-[var(--text)]">{doc.title}</h2>
            <div className="text-[var(--foreground)] opacity-75 mb-4">
              <p>{t('lastUpdated', { date: new Date(parseInt(doc.obj_edit_time) * 1000).toLocaleDateString(locale) })}</p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <Link
                href={`/${locale}/docs/${docPath}`}
                className="text-[var(--primary)] hover:text-[var(--accent)] font-medium inline-flex items-center transition-colors"
              >
                {t('readMore')} <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 加载状态组件
function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-6 bg-[var(--background)] h-full border-[var(--primary)] animate-pulse">
          <div className="h-6 bg-[var(--primary)]/20 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-[var(--primary)]/10 rounded w-1/2 mb-6"></div>
          <div className="h-4 bg-[var(--primary)]/10 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}

// 错误边界组件
function ErrorDisplay({ error }: { error: Error }) {
  return (
    <div className="py-12 text-center">
      <p className="text-[var(--foreground)] text-red-500">发生错误</p>
      <p className="text-[var(--foreground)] mt-2 opacity-75">{error.message}</p>
    </div>
  );
}

export default async function DocsPage({ params }: PageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'docs'
  });

  console.log("=========== hdz ===DocsPage=> " + params.locale)
  console.log("=========== hdz ==DocsPage==> " + t('readMore'))

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[var(--text)]">{t('title')}</h1>
      <div className="bg-[var(--background)] border border-[var(--primary)] p-6 rounded-lg">
        <Suspense fallback={<LoadingState />}>
          <DocsList locale={params.locale} />
        </Suspense>
      </div>
    </div>
  );
} 