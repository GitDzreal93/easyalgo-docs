import { NextResponse } from 'next/server';
import { getDocsData, getDocContent } from '@/lib/docs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'zh';
    const docs = await getDocsData(locale);
    return NextResponse.json(docs);
  } catch (error) {
    console.error('Error in docs API:', error);
    return NextResponse.json({ error: 'Failed to fetch docs data' }, { status: 500 });
  }
}

// 搜索API
export async function POST(request: Request) {
  try {
    const { query, locale = 'zh' } = await request.json();
    
    // 如果查询为空，返回空结果
    if (!query?.trim()) {
      return NextResponse.json([]);
    }

    const docs = await getDocsData(locale);
    const results = [];
    const normalizedQuery = query.toLowerCase().trim();

    // 遍历所有文档
    for (const doc of docs) {
      // 搜索主文档
      const content = await getDocContent(doc.filename, locale);
      const normalizedTitle = doc.title.toLowerCase();
      const normalizedContent = content?.toLowerCase() || '';

      if (content && (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedContent.includes(normalizedQuery)
      )) {
        // 计算相关性分数
        const titleMatch = normalizedTitle.includes(normalizedQuery);
        const score = titleMatch ? 2 : 1;

        results.push({
          title: doc.title,
          slug: doc.slug,
          preview: extractPreview(content, query),
          isParent: true,
          score
        });
      }

      // 搜索子文档
      if (doc.children) {
        for (const child of doc.children) {
          const childContent = await getDocContent(child.filename, locale);
          const normalizedChildTitle = child.title.toLowerCase();
          const normalizedChildContent = childContent?.toLowerCase() || '';

          if (childContent && (
            normalizedChildTitle.includes(normalizedQuery) ||
            normalizedChildContent.includes(normalizedQuery)
          )) {
            // 计算相关性分数
            const titleMatch = normalizedChildTitle.includes(normalizedQuery);
            const score = titleMatch ? 2 : 1;

            results.push({
              title: child.title,
              slug: child.slug,
              preview: extractPreview(childContent, query),
              parentTitle: doc.title,
              isParent: false,
              score
            });
          }
        }
      }
    }

    // 按相关性分数排序
    results.sort((a, b) => b.score - a.score);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json({ error: 'Failed to search docs' }, { status: 500 });
  }
}

// 提取匹配内容的预览
function extractPreview(content: string, query: string): string {
  const normalizedContent = content.toLowerCase();
  const normalizedQuery = query.toLowerCase().trim();
  
  // 查找最佳匹配位置
  const index = normalizedContent.indexOf(normalizedQuery);
  
  if (index === -1) {
    // 如果没有精确匹配，尝试找到包含查询词的句子
    const sentences = content.split(/[.。!！?？\n]+/);
    const matchingSentence = sentences.find(s => 
      s.toLowerCase().includes(normalizedQuery)
    );
    if (matchingSentence) {
      return matchingSentence.trim();
    }
    return '';
  }
  
  // 找到匹配位置的完整句子
  const sentenceStart = content.lastIndexOf('.', index);
  const sentenceEnd = content.indexOf('.', index + normalizedQuery.length);
  
  if (sentenceStart === -1 || sentenceEnd === -1) {
    // 如果找不到句子边界，使用固定长度
    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 50);
    let preview = content.slice(start, end).trim();
    
    if (start > 0) preview = '...' + preview;
    if (end < content.length) preview = preview + '...';
    
    return preview;
  }
  
  // 返回完整的句子
  return content.slice(sentenceStart + 1, sentenceEnd).trim();
}
