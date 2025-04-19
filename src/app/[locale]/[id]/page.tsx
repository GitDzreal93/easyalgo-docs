import { redirect } from 'next/navigation';
import { findDocByNumber } from '@/lib/docs';

export default async function NumberRedirectPage({
  params: { locale, id }
}: {
  params: { locale: string; id: string }
}) {
  // 尝试在所有文档中查找对应题号的文档
  const doc = await findDocByNumber(id, locale);
  
  if (doc) {
    // 如果找到文档，重定向到正确的路径
    redirect(`/${locale}/docs/${doc.filepath.replace(/\.mdx$/, '')}`);
  } else {
    // 如果没有找到文档，重定向到文档首页
    redirect(`/${locale}/docs`);
  }
} 