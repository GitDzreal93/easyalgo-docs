'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function DocsTableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    // 打印调试信息
    console.log('DocsTableOfContents: 开始获取标题元素');
    
    // 检查所有的标题元素，包括那些没有ID的
    const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3'));
    console.log('DocsTableOfContents: 所有标题元素', {
      total: allHeadings.length,
      h1Count: document.querySelectorAll('h1').length,
      h2Count: document.querySelectorAll('h2').length,
      h3Count: document.querySelectorAll('h3').length,
      allHeadings: allHeadings.map(h => ({
        tagName: h.tagName,
        id: h.id,
        text: h.textContent,
        hasId: !!h.id,
        className: h.className
      }))
    });
    
    // 特别检查 h1 元素
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length > 0) {
      console.log('DocsTableOfContents: 找到 h1 元素', {
        count: h1Elements.length,
        details: Array.from(h1Elements).map(h1 => ({
          id: h1.id,
          text: h1.textContent,
          className: h1.className,
          style: h1.getAttribute('style'),
          computedDisplay: getComputedStyle(h1).display,
          computedVisibility: getComputedStyle(h1).visibility,
          parentNode: h1.parentNode ? {
            tagName: h1.parentNode.nodeName,
            className: (h1.parentNode as HTMLElement).className
          } : null
        }))
      });
    } else {
      console.log('DocsTableOfContents: 没有找到 h1 元素');
      
      // 如果没有找到 h1 元素，尝试查找包含"一级目录"文本的元素
      const allElements = document.querySelectorAll('*');
      const elementsWithText = Array.from(allElements).filter(el => 
        el.textContent && el.textContent.includes('一级目录')
      );
      
      if (elementsWithText.length > 0) {
        console.log('DocsTableOfContents: 找到包含"一级目录"文本的元素', {
          count: elementsWithText.length,
          elements: elementsWithText.map(el => ({
            tagName: el.tagName,
            id: el.id,
            className: el.className,
            textContent: el.textContent
          }))
        });
      }
    }
    
    // 获取所有标题元素 (只获取 h1, h2, h3)
    const elements = Array.from(document.querySelectorAll('h1, h2, h3'))
      .filter(element => element.id) // 只获取有id的标题
      .map(element => ({
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName[1]),
      }));
    
    console.log('DocsTableOfContents: 过滤后的标题元素', elements);
    setHeadings(elements);

    // 监听滚动事件来更新活动标题
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px'
      }
    );

    // 添加调试信息
    console.log('DocsTableOfContents: 设置交叉观察器');
    const headingsWithId = Array.from(document.querySelectorAll('h1, h2, h3')).filter(h => h.id);
    console.log(`DocsTableOfContents: 找到 ${headingsWithId.length} 个有ID的标题元素`);
    
    // 如果没有找到有ID的 h1 元素，尝试手动添加一个
    const h1WithId = Array.from(document.querySelectorAll('h1')).filter(h => h.id);
    if (h1WithId.length === 0) {
      console.log('DocsTableOfContents: 没有找到有ID的 h1 元素，尝试手动添加');
      
      // 尝试找到包含"一级目录"文本的 h1 元素
      const h1Elements = Array.from(document.querySelectorAll('h1'));
      const h1WithText = h1Elements.find(h => h.textContent?.includes('一级目录'));
      
      if (h1WithText) {
        console.log('DocsTableOfContents: 找到包含"一级目录"文本的 h1 元素，添加ID');
        h1WithText.id = 'heading-一级目录';
        observer.observe(h1WithText);
        
        // 更新标题列表
        setHeadings(prev => [
          {
            id: 'heading-一级目录',
            text: '一级目录',
            level: 1
          },
          ...prev
        ]);
      }
    }
    
    document.querySelectorAll('h1, h2, h3').forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // 考虑固定导航栏的高度
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="h-full">
      <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-[#8ECAE6]/20 shadow-lg shadow-[#8ECAE6]/5 p-5 dark:bg-[#023047]/50 dark:border-[#8ECAE6]/10">
        <h3 className="text-base font-semibold text-[#023047] dark:text-white mb-6 pb-3 border-b border-[#8ECAE6]/10">
          本页目录
        </h3>
        <ul className="relative space-y-2.5">
          {headings.map((heading, index) => (
            <li
              key={heading.id}
              className={clsx(
                "relative group transition-all duration-200",
                heading.level > 1 && "ml-4"
              )}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={clsx(
                  'relative flex items-center w-full text-left',
                  'py-1.5 pl-4 pr-3 rounded-lg transition-all duration-200',
                  'hover:bg-[#8ECAE6]/5 dark:hover:bg-[#8ECAE6]/10',
                  'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2',
                  'before:w-[3px] before:h-[18px] before:rounded-full before:transition-all before:duration-200',
                  activeId === heading.id
                    ? [
                        'bg-[#8ECAE6]/5 dark:bg-[#8ECAE6]/10',
                        'before:bg-[#FFB703] before:shadow-[0_0_8px_rgba(255,183,3,0.5)]',
                        'text-[#023047] dark:text-[#FFB703] font-medium'
                      ]
                    : [
                        'before:bg-transparent group-hover:before:bg-[#8ECAE6]/30',
                        'text-[#023047]/70 dark:text-[#8ECAE6]/70'
                      ]
                )}
              >
                <span
                  className={clsx(
                    'transition-all duration-200',
                    heading.level === 1 && 'text-[15px] font-medium',
                    heading.level === 2 && 'text-[14px]',
                    heading.level === 3 && 'text-[13px] font-light',
                  )}
                >
                  {heading.text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
