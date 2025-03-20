'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { DocNode } from '@/lib/docs';
import { DocsSearch } from './DocsSearch';
import { useTranslations, useLocale } from 'next-intl';

// 提取通用的排序函数
const sortByPosition = (items: DocNode[]) => [...items].sort((a, b) => a.position - b.position);

// 提取通用的文档链接组件
const DocLink = ({ doc, isActive, depth = 0 }: { doc: DocNode; isActive: boolean; depth?: number }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const normalizedSlug = doc.slug.replace(/^\/+|\/+$/g, '');
  const href = `/${locale}/docs/${normalizedSlug}`;
  
  // 获取当前路径，用于精确匹配当前文档
  const normalizedPathname = pathname?.replace(/^\/+|\/+$/g, '');
  
  // 生成两种可能的文档路径（带语言前缀和不带语言前缀）
  const normalizedDocPath = `docs/${doc.slug}`.replace(/^\/+|\/+$/g, '');
  const normalizedDocPathWithLocale = `${locale}/docs/${doc.slug}`.replace(/^\/+|\/+$/g, '');
  
  // 检查是否匹配任一路径
  const isExactMatch = normalizedPathname === normalizedDocPath || normalizedPathname === normalizedDocPathWithLocale;
  
  // 使用传入的 isActive 参数来决定是否高亮
  const shouldHighlight = isActive || isExactMatch;
  
  console.log('DocLink 路径匹配:', {
    title: doc.title,
    pathname,
    normalizedPathname,
    normalizedDocPath,
    normalizedDocPathWithLocale,
    isExactMatch,
    isActive,
    shouldHighlight
  });

  return (
    <Link 
      href={href}
      className={clsx(
        'block py-1.5 px-3 rounded-md transition-all duration-200 relative',
        'text-sm leading-5',
        shouldHighlight
          ? [
              'text-[var(--color-navy)] dark:text-[var(--color-yellow)] font-medium',
              'bg-[var(--color-sky)]/10 dark:bg-[var(--color-sky)]/5',
              'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2',
              'before:w-1 before:h-4 before:bg-[var(--color-yellow)]',
              'before:rounded-r-full'
            ]
          : [
              'text-[var(--color-navy)]/70 dark:text-[var(--color-sky)]/70',
              'hover:text-[var(--color-navy)] dark:hover:text-[var(--color-sky)]',
              'hover:bg-[var(--color-sky)]/10',
              depth === 0 && 'font-medium'
            ]
      )}
      title={doc.title}
    >
      {doc.title}
    </Link>
  );
};

// 分类目录组件
const CategorySection = ({ doc, isActive }: { doc: DocNode; isActive: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const t = useTranslations('docs');
  const pathname = usePathname();
  const locale = useLocale();
  
  // 检查当前文档是否被选中
  const normalizedPathname = pathname?.replace(/^\/+|\/+$/g, '');
  const normalizedDocPath = `docs/${doc.slug}`.replace(/^\/+|\/+$/g, '');
  const normalizedDocPathWithLocale = `${locale}/docs/${doc.slug}`.replace(/^\/+|\/+$/g, '');
  const isCurrentDoc = normalizedPathname === normalizedDocPath || normalizedPathname === normalizedDocPathWithLocale;
  
  console.log('CategorySection 路径匹配:', {
    title: doc.title,
    pathname,
    normalizedPathname,
    normalizedDocPath,
    normalizedDocPathWithLocale,
    isCurrentDoc,
    isActive
  });
  
  return (
    <div className="space-y-0.5">
      <div className="flex items-center">
        <DocLink doc={doc} isActive={isCurrentDoc} depth={0} />
        {doc.children?.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={clsx(
              'p-1 rounded-md ml-1 text-[var(--color-navy)]/50 hover:text-[var(--color-navy)] dark:text-[var(--color-sky)]/50 dark:hover:text-[var(--color-sky)]',
              'transition-transform duration-200',
              isExpanded ? 'transform rotate-180' : ''
            )}
            title={isExpanded ? t('collapse') : t('expand')}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        )}
      </div>
      {isExpanded && doc.children?.length > 0 && (
        <ul className="ml-3 pl-3 border-l border-[var(--color-sky)]/20 dark:border-[var(--color-sky)]/10 space-y-0.5">
          {sortByPosition(doc.children).map(child => {
            // 检查子文档是否被选中
            const normalizedChildPath = `docs/${child.slug}`.replace(/^\/+|\/+$/g, '');
            const normalizedChildPathWithLocale = `${locale}/docs/${child.slug}`.replace(/^\/+|\/+$/g, '');
            const isChildActive = normalizedPathname === normalizedChildPath || normalizedPathname === normalizedChildPathWithLocale;
            
            console.log('子文档路径匹配:', {
              parentTitle: doc.title,
              childTitle: child.title,
              normalizedChildPath,
              normalizedChildPathWithLocale,
              normalizedPathname,
              isChildActive
            });
            
            return (
              <li key={child.node_token}>
                <DocLink doc={child} isActive={isChildActive} depth={1} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default function DocsSidebar({ docs }: { docs: DocNode[] }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('docs');
  
  console.log('DocsSidebar 当前路径:', pathname);
  
  // Sort docs by position to ensure correct order
  const sortedDocs = sortByPosition(docs);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[var(--color-navy)] rounded-lg border border-[var(--color-sky)]/30 dark:border-[var(--color-sky)]/20 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      {/* 搜索区域 */}
      <div className="shrink-0 px-4 py-4 border-b border-[var(--color-sky)]/20">
        <DocsSearch docs={docs} placeholder={t('search')} />
      </div>
      
      {/* 导航区域 */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 min-h-0 scrollbar-thin scrollbar-thumb-[var(--color-sky)]/20 hover:scrollbar-thumb-[var(--color-sky)]/30 scrollbar-track-transparent">
        <ul className="space-y-2">
          {sortedDocs.map(doc => {
            // 检查当前文档或其子文档是否被选中
            const normalizedPathname = pathname?.replace(/^\/+|\/+$/g, '');
            const normalizedDocPath = `docs/${doc.slug}`.replace(/^\/+|\/+$/g, '');
            const normalizedDocPathWithLocale = `${locale}/docs/${doc.slug}`.replace(/^\/+|\/+$/g, '');
            const isCurrentDoc = normalizedPathname === normalizedDocPath || normalizedPathname === normalizedDocPathWithLocale;
            
            console.log('检查文档路径:', {
              title: doc.title,
              pathname,
              normalizedPathname,
              normalizedDocPath,
              normalizedDocPathWithLocale,
              isCurrentDoc
            });
            
            // 检查子文档
            const isChildActive = doc.children?.some(child => {
              const normalizedChildPath = `docs/${child.slug}`.replace(/^\/+|\/+$/g, '');
              const normalizedChildPathWithLocale = `${locale}/docs/${child.slug}`.replace(/^\/+|\/+$/g, '');
              const isMatch = normalizedPathname === normalizedChildPath || normalizedPathname === normalizedChildPathWithLocale;
              
              console.log('检查子文档路径:', {
                parentTitle: doc.title,
                childTitle: child.title,
                normalizedChildPath,
                normalizedChildPathWithLocale,
                normalizedPathname,
                isMatch
              });
              
              return isMatch;
            });

            return (
              <li key={doc.node_token}>
                <CategorySection 
                  doc={doc} 
                  isActive={isCurrentDoc || isChildActive}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
