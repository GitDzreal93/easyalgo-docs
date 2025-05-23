import fs from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';
import { cache } from 'react';

export interface DocNode {
  depth: number;
  title: string;
  node_token: string;
  parent_node_token: string;
  obj_create_time: string;
  obj_edit_time: string;
  obj_token: string;
  children: DocNode[];
  has_child: boolean;
  slug: string;
  position: number;
  filename: string;
  filepath: string;
  tag?: string[];
}

export interface PageParams {
  locale: string;
  slug: string | string[];
}

// Helper function to safely get slug from params
export async function getSlugFromParams(params: any): Promise<string> {
  try {
    console.log('处理路由参数:', params);
    
    // In Next.js 15, we need to await params before accessing its properties
    const awaitedParams = await params;
    console.log('解析后的参数:', awaitedParams);
    
    if (!awaitedParams || !awaitedParams.slug) {
      console.error('无效的参数:', { params: awaitedParams });
      throw new Error('Invalid or missing slug parameter');
    }
    
    // Handle both string and array formats
    const rawSlug = Array.isArray(awaitedParams.slug)
      ? awaitedParams.slug.join('/')
      : awaitedParams.slug;
    
    console.log('原始 slug:', {
      slug: awaitedParams.slug,
      isArray: Array.isArray(awaitedParams.slug),
      rawSlug
    });
      
    // Process the slug to handle multi-level routes
    const decodedSlug = decodeURIComponent(rawSlug);
    const normalizedSlug = decodedSlug
      .replace(/\/+/g, '/') // 替换多个斜杠为单个斜杠
      .replace(/^\/+|\/+$/g, ''); // 移除开头和结尾的斜杠
    
    console.log('处理后的 slug:', {
      raw: rawSlug,
      decoded: decodedSlug,
      normalized: normalizedSlug
    });
    
    return normalizedSlug;
  } catch (error) {
    console.error('处理 slug 参数时出错:', error);
    throw error;
  }
}

export const getDocsData = cache(async (locale: string = 'zh'): Promise<DocNode[]> => {
  try {
    console.log('开始加载文档数据...', { locale });
    const docsPath = path.join(process.cwd(), 'docs', locale, 'docs.json');
    console.log('文档路径:', docsPath);
    
    // 检查文件是否存在
    if (!fs.existsSync(docsPath)) {
      console.error('docs.json 文件不存在:', docsPath);
      console.log('返回空数组，因为文档不存在');
      return [];
    }
    
    // 读取文件内容
    console.log('开始读取文件内容...');
    const data = await readFile(docsPath, 'utf8');
    console.log('成功读取 docs.json 文件，内容长度:', data.length);
    
    if (!data || data.trim().length === 0) {
      console.error('docs.json 文件为空');
      return [];
    }
    
    // 解析 JSON
    try {
      console.log('开始解析 docs.json 数据...');
      const docs = JSON.parse(data);
      
      // 验证数据结构
      if (!Array.isArray(docs)) {
        console.error('无效的 docs.json 格式: 根节点必须是数组');
        return [];
      }
      
      // 验证每个文档对象的必要字段
      const validDocs = docs.filter(doc => {
        const isValid = doc && 
          typeof doc === 'object' && 
          typeof doc.title === 'string' && 
          typeof doc.node_token === 'string' && 
          typeof doc.slug === 'string';
        
        if (!isValid) {
          console.error('发现无效的文档对象:', doc);
        }
        return isValid;
      });
      
      console.log('文档数据解析成功，有效文档数量:', validDocs.length);
      
      // 确保所有文档都有正确的 position 字段
      const docsWithPosition = validDocs.map((doc, index) => ({
        ...doc,
        position: typeof doc.position === 'number' ? doc.position : index
      }));
      
      // 按 position 排序
      const sortedDocs = docsWithPosition.sort((a, b) => a.position - b.position);
      console.log('文档排序完成，返回结果');
      
      return sortedDocs;
    } catch (parseError) {
      console.error('解析 docs.json 时出错:', parseError);
      throw new Error(`解析文档数据失败: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }
  } catch (error) {
    console.error('加载文档数据时出错:', error);
    throw error; // 重新抛出错误，让上层处理
  }
});

export const getDocContent = cache(async (filepath: string, locale: string = 'zh'): Promise<string | null> => {
  try {
    console.log('尝试读取文件:', {
      filepath,
      locale,
      docsDir: path.join(process.cwd(), 'docs', locale),
    });

    const docsDir = path.join(process.cwd(), 'docs', locale);
    const fullPath = path.join(docsDir, filepath);

    if (!fs.existsSync(fullPath)) {
      console.log('文件不存在:', {
        filepath,
        fullPath,
        docsDir
      });
      return null;
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    return content;
  } catch (error) {
    console.error('读取文档内容时出错:', error);
    return null;
  }
});

export const findDocBySlug = cache(async (slug: string, locale: string = 'zh'): Promise<DocNode | null> => {
  console.log('开始根据 slug 查找文档:', { slug, locale });
  const docs = await getDocsData(locale);
  console.log('获取到文档数据:', docs.map((d: DocNode) => ({
    title: d.title,
    slug: d.slug,
    children: d.children?.map((c: DocNode) => ({ title: c.title, slug: c.slug }))
  })));
  
  // 规范化输入的 slug
  const normalizedTargetSlug = slug.replace(/^\/+|\/+$/g, '');
  console.log('规范化后的目标 slug:', normalizedTargetSlug);
  
  // 递归查找文档
  const findDoc = (nodes: DocNode[], targetSlug: string): DocNode | null => {
    for (const node of nodes) {
      // 规范化当前节点的 slug
      const normalizedNodeSlug = node.slug.replace(/^\/+|\/+$/g, '');
      
      console.log('检查节点:', { 
        title: node.title,
        nodeSlug: normalizedNodeSlug,
        targetSlug: targetSlug,
        isMatch: normalizedNodeSlug === targetSlug,
        hasChildren: node.children?.length > 0
      });
      
      // 直接匹配
      if (normalizedNodeSlug === targetSlug) {
        console.log('找到匹配的文档:', {
          title: node.title,
          slug: node.slug,
          filename: node.filename,
          hasChildren: node.children?.length > 0
        });
        return node;
      }

      // 如果是父节点，检查其子节点
      if (node.children && node.children.length > 0) {
        const childDoc = findDoc(node.children, targetSlug);
        if (childDoc) {
          return childDoc;
        }
      }
    }
    return null;
  };
  
  const doc = findDoc(docs, normalizedTargetSlug);
  
  if (!doc) {
    console.log('未找到文档');
    return null;
  }
  
  return doc;
});

export const findDocByNumber = cache(async (number: string, locale: string = 'zh'): Promise<DocNode | null> => {
  console.log('开始根据题号查找文档:', { number, locale });
  const docs = await getDocsData(locale);
  
  // 递归查找文档
  const findDoc = (nodes: DocNode[]): DocNode | null => {
    for (const node of nodes) {
      // 检查当前节点的文件名是否匹配题号
      if (node.filename === `${number}.mdx`) {
        return node;
      }
      
      // 如果有子节点，递归查找
      if (node.children && node.children.length > 0) {
        const found = findDoc(node.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };
  
  const doc = findDoc(docs);
  console.log('查找结果:', doc ? {
    title: doc.title,
    filepath: doc.filepath,
    filename: doc.filename
  } : '未找到文档');
  
  return doc;
});
