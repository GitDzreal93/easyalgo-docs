import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { findDocBySlug, getDocContent, getDocsData } from '@/lib/docs';
import ClientBytemdViewer from '@/components/bytemd/client-viewer';
import { getMarkdownClassName } from '@/components/bytemd/styles/markdown';

// Define simple page props interface that matches what Next.js provides
interface PageProps {
  params: any; // Use any to avoid type issues with the params object
}

export const metadata = {
  title: 'Easy Algo - 算法学习文档',
  description: '最简单的算法学习平台，提供详细的算法解析、代码实现和练习题目。让算法学习变得简单有趣。',
  keywords: '算法学习, 编程教程, Easy Algo, 数据结构, 算法解析, 编程入门, 代码实现',
  openGraph: {
    title: 'Easy Algo - 算法学习文档',
    description: '最简单的算法学习平台，让算法学习变得简单有趣',
    type: 'article',
    locale: 'zh_CN',
  },
};

export default async function DocumentPage(props: PageProps) {
  try {
    console.log('开始处理文档路由:', props.params);

    // 处理路径
    let slug: string;
    if (Array.isArray(props.params.slug)) {
      slug = props.params.slug.join('/');
    } else {
      slug = props.params.slug;
    }

    if (!slug) {
      console.log('缺少 slug 参数');
      notFound();
    }

    // 规范化路径
    const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
    console.log('规范化后的路径:', {
      originalSlug: props.params.slug,
      processedSlug: slug,
      normalizedSlug
    });
    
    // 查找文档
    const docs = await getDocsData();
    console.log('获取到文档数据:', docs.map((d: any) => ({
      title: d.title,
      slug: d.slug,
      hasChildren: d.children?.length > 0,
      children: d.children?.map((c: any) => ({ 
        title: c.title, 
        slug: c.slug,
        filename: c.filename
      }))
    })));

    const doc = await findDocBySlug(normalizedSlug);
    console.log('查找文档结果:', doc ? {
      title: doc.title,
      slug: doc.slug,
      filename: doc.filename,
      hasChildren: doc.children?.length > 0,
      path: doc.filename.replace(/^\/+|\/+$/g, '')
    } : '未找到文档');
    
    if (!doc) {
      console.log('未找到文档，返回 404');
      notFound();
    }
    
    // 检查文档类型
    const isChildDoc = doc.filename.includes('/');
    console.log('检查文档类型:', {
      filename: doc.filename,
      isChildDoc,
      path: doc.filename.replace(/^\/+|\/+$/g, '')
    });
    
    // 规范化文件路径
    const normalizedPath = doc.filename.replace(/^\/+|\/+$/g, '');
    console.log('尝试读取文档内容:', {
      filename: doc.filename,
      normalizedPath,
      isChildDoc
    });
    
    const content = await getDocContent(normalizedPath);
    console.log('文档内容读取结果:', {
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
                <Link href={`/docs/${doc.slug.split('/')[0]}`} className="hover:text-[var(--primary)] flex items-center">
                  <ChevronRightIcon className="h-4 w-4 mr-1" />
                  返回上级
                </Link>
              </div>
            )}
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">{doc.title}</h1>
            <div className="flex items-center text-sm text-[var(--text)]">
              <span className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {new Date(parseInt(doc.obj_edit_time) * 1000).toLocaleDateString()}
              </span>
            </div>
          </header>
          <div className="prose max-w-none">
            <p className="text-[var(--text)]">文档内容不存在或正在编辑中</p>
            <p className="text-[var(--text)] opacity-75">文件路径: {normalizedPath}</p>
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
                <Link href={`/docs/${doc.slug.split('/')[0]}`} className="hover:text-[var(--primary)] flex items-center">
                  <ChevronRightIcon className="h-4 w-4 mr-1" />
                  返回上级
                </Link>
              </div>
            )}
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">{doc.title}</h1>
            <div className="flex items-center text-sm text-[var(--text)]">
              <span className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {new Date(parseInt(doc.obj_edit_time) * 1000).toLocaleDateString()}
              </span>
              <span className="mx-2 text-[var(--text)]">·</span>
              <span className="flex items-center">
                <ClockIcon className="mr-2 h-4 w-4" />
                预计阅读时间 {Math.ceil((content?.length || 0) / 500)} 分钟
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
              <p className="text-gray-600">无法渲染文档内容，请稍后再试。</p>
            )}
          </div>
        </article>
      );
    } catch (renderError) {
      console.error('渲染 MDX 内容时出错:', renderError);
      console.error('错误详情:', {
        name: renderError instanceof Error ? renderError.name : 'Unknown',
        message: renderError instanceof Error ? renderError.message : String(renderError)
      });
      return (
        <article className="bg-white rounded-lg shadow-sm p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">渲染错误</h1>
          </header>
          <div className="prose max-w-none">
            <p className="text-gray-600">抱歉，渲染文档内容时出现错误。请稍后再试。</p>
          </div>
        </article>
      );
    }
  } catch (error) {
    console.error('文档页面渲染错误:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 3).join('\n') : undefined
    });
    return (
      <article className="bg-white rounded-lg shadow-sm p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">加载错误</h1>
        </header>
        <div className="prose max-w-none">
          <p className="text-gray-600">抱歉，加载文档时出现错误。请稍后再试。</p>
        </div>
      </article>
    );
  }
}
