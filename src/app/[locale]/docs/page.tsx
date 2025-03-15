import { Metadata } from 'next';
import Link from 'next/link';
import { getDocsData } from '@/lib/docs';
import type { DocNode } from '@/lib/docs';
import { useTranslations } from 'next-intl';

interface PageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Document Center',
  description: 'Browse all available documents',
};

export default async function DocsPage({ params }: PageProps) {
  const t = useTranslations('docs');
  const docs = await getDocsData(params.locale);

  if (docs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-[var(--text)]">{t('title')}</h1>
        <div className="text-center py-12">
          <p className="text-[var(--foreground)]">{t('noDocuments')}</p>
        </div>
      </div>
    );
  }

  // 将所有文档（包括子文档）平铺成一个数组
  const flattenDocs = (docs: DocNode[]): DocNode[] => {
    return docs.reduce((acc: DocNode[], doc) => {
      acc.push(doc);
      if (doc.children && doc.children.length > 0) {
        acc.push(...flattenDocs(doc.children));
      }
      return acc;
    }, []);
  };

  // 获取所有文档并按编辑时间排序
  const allDocs = flattenDocs(docs);
  const sortedDocs = allDocs.sort((a, b) => 
    parseInt(b.obj_edit_time) - parseInt(a.obj_edit_time)
  );

  const renderDocItem = (doc: DocNode) => {
    const normalizedSlug = doc.slug.replace(/^\/+|\/+$/g, '');
    const docPath = normalizedSlug;
    
    return (
      <div key={doc.node_token} className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-[var(--background)] h-full border-[var(--primary)] hover:border-[var(--accent)]">
        <h2 className="text-xl font-semibold mb-2 text-[var(--text)]">{doc.title}</h2>
        <div className="text-[var(--foreground)] opacity-75 mb-4">
          <p>{t('lastUpdated', { date: new Date(parseInt(doc.obj_edit_time) * 1000).toLocaleDateString(params.locale) })}</p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <Link
            href={`/${params.locale}/docs/${docPath}`}
            className="text-[var(--primary)] hover:text-[var(--accent)] font-medium inline-flex items-center transition-colors"
          >
            {t('readMore')} <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--text)]">{t('title')}</h1>
      <div className="bg-[var(--background)] border border-[var(--primary)] p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedDocs.map(renderDocItem)}
        </div>
      </div>
    </div>
  );
} 