import Link from 'next/link';
import { getDocsData } from '@/lib/docs';
import type { DocNode } from '@/lib/docs';
import DocsSidebar from './DocsSidebar';
import DocsTableOfContentsWrapper from './DocsTableOfContentsWrapper';
import { ClientDocsLayout } from './ClientDocsLayout';

interface DocsLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export async function DocsLayout({ children, locale }: DocsLayoutProps) {
  // Get the docs data directly from the server with the current locale
  const docs = await getDocsData(locale);
  
  return (
    <ClientDocsLayout>
      <div className="max-w-[90rem] mx-auto">
        <div className="flex gap-8 py-8">
          {/* 左侧边栏 */}
          <aside className="w-72 flex-shrink-0">
            {docs.length > 0 && <DocsSidebar docs={docs} />}
          </aside>

          {/* 主内容区 */}
          <main className="flex-1 min-w-0">
            <div className="max-w-4xl mx-auto">
              <div className="pb-8">
                {children}
              </div>
            </div>
          </main>

          {/* 右侧目录 */}
          <aside className="w-64 hidden xl:block flex-shrink-0">
            <DocsTableOfContentsWrapper />
          </aside>
        </div>
      </div>
    </ClientDocsLayout>
  );
}