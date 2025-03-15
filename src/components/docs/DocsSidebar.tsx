'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import type { DocNode } from '@/lib/docs';
import { DocsSearch } from './DocsSearch';

// 提取通用的排序函数
const sortByPosition = (items: DocNode[]) => [...items].sort((a, b) => a.position - b.position);

// 提取通用的文档链接组件
const DocLink = ({ doc, isActive, depth = 0 }: { doc: DocNode; isActive: boolean; depth?: number }) => {
  const normalizedSlug = doc.slug.replace(/^\/+|\/+$/g, '');
  const href = `/docs/${normalizedSlug}`;
  
  // 获取当前路径，用于精确匹配当前文档
  const pathname = usePathname();
  const normalizedPathname = pathname?.replace(/^\/+|\/+$/g, '');
  const normalizedDocPath = `docs/${doc.slug}`.replace(/^\/+|\/+$/g, '');
  const isExactMatch = normalizedPathname === normalizedDocPath;
  
  return (
    <Link 
      href={href}
      className={clsx(
        'block py-1.5 px-3 rounded-md transition-all duration-200 relative',
        'text-sm leading-5',
        isExactMatch 
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
              'hover:bg-[var(--color-sky)]/10'
            ],
        depth === 0 && !isExactMatch && 'font-medium'
      )}
      title={doc.title}
    >
      {doc.title}
    </Link>
  );
};

const SidebarItem = ({ doc, _isActive }: { doc: DocNode; isActive?: boolean }) => {
  // ... existing code ...
};

export default function DocsSidebar({ docs }: { docs: DocNode[] }) {
  const pathname = usePathname();
  console.log('当前路径:', pathname);
  
  // Sort docs by position to ensure correct order
  const sortedDocs = sortByPosition(docs);
  console.log('文档数据:', {
    totalDocs: docs.length,
    docs: docs.map(d => ({ 
      title: d.title, 
      slug: d.slug,
      hasChildren: d.children?.length > 0,
      children: d.children?.map(c => ({ 
        title: c.title, 
        slug: c.slug,
        filename: c.filename
      })),
      filename: d.filename
    }))
  });

  // 检查一个文档是否处于活动状态
  const isDocActive = (doc: DocNode) => {
    if (!pathname) {
      console.log('路径为空');
      return false;
    }

    // 规范化路径，移除开头和结尾的斜杠
    const normalizedPathname = pathname.replace(/^\/+|\/+$/g, '');
    const normalizedDocPath = `docs/${doc.slug}`.replace(/^\/+|\/+$/g, '');
    
    console.log('检查文档:', {
      title: doc.title,
      slug: doc.slug,
      pathname,
      normalizedPathname,
      normalizedDocPath
    });
    
    // 直接匹配当前文档
    const isCurrentDoc = normalizedPathname === normalizedDocPath;
    if (isCurrentDoc) {
      console.log('找到当前文档:', doc.title);
      return true;
    }
    
    // 检查子文档
    if (doc.children?.length) {
      for (const child of doc.children) {
        const normalizedChildPath = `docs/${child.slug}`.replace(/^\/+|\/+$/g, '');
        const isChildMatch = normalizedPathname === normalizedChildPath;
        
        console.log('检查子文档:', {
          parentTitle: doc.title,
          childTitle: child.title,
          childSlug: child.slug,
          normalizedChildPath,
          normalizedPathname,
          isMatch: isChildMatch
        });
        
        if (isChildMatch) {
          console.log('找到匹配的子文档:', {
            parentTitle: doc.title,
            childTitle: child.title
          });
          return true;
        }
      }
    }
    
    return false;
  };

  // Render child docs for a parent doc
  const renderChildDocs = (parentDoc: DocNode) => {
    if (!parentDoc.children?.length) {
      console.log('文档没有子节点:', {
        title: parentDoc.title,
        slug: parentDoc.slug
      });
      return null;
    }
    
    const sortedChildren = sortByPosition(parentDoc.children);
    console.log('渲染子文档:', { 
      parentTitle: parentDoc.title, 
      parentSlug: parentDoc.slug,
      parentFilename: parentDoc.filename,
      totalChildren: sortedChildren.length,
      children: sortedChildren.map(c => ({ 
        title: c.title, 
        slug: c.slug,
        filename: c.filename,
        position: c.position
      }))
    });
    
    return (
      <ul className="ml-3 pl-3 border-l border-[var(--color-sky)]/20 dark:border-[var(--color-sky)]/10">
        {sortedChildren.map(child => {
          console.log('渲染子文档链接:', {
            parentTitle: parentDoc.title,
            childTitle: child.title,
            childSlug: child.slug,
            childFilename: child.filename
          });
          return (
            <li key={child.node_token}>
              <DocLink doc={child} isActive={isDocActive(child)} depth={1} />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[var(--color-navy)] rounded-lg border border-[var(--color-sky)]/30 dark:border-[var(--color-sky)]/20 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      {/* 搜索区域 */}
      <div className="flex-none px-4 py-4 border-b border-[var(--color-sky)]/20">
        <DocsSearch docs={docs} />
      </div>
      
      {/* 导航区域 */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {sortedDocs.map(doc => (
            <li key={doc.node_token} className="space-y-0.5">
              <DocLink doc={doc} isActive={isDocActive(doc)} depth={0} />
              {doc.children?.length > 0 && (
                <ul className="ml-3 pl-3 border-l border-[var(--color-sky)]/20 dark:border-[var(--color-sky)]/10">
                  {sortByPosition(doc.children).map(child => (
                    <li key={child.node_token}>
                      <DocLink doc={child} isActive={isDocActive(child)} depth={1} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
