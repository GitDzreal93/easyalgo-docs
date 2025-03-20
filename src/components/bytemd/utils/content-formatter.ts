/**
 * 预处理Markdown内容
 * @param content 原始Markdown内容
 * @returns 格式化后的Markdown内容
 */
export const preprocessMarkdown = (content: string): string => {
  try {
    // 只保留换行符统一处理
    return content.replace(/\r\n/g, '\n');
  } catch (error) {
    console.error('MarkdownRenderer: 内容预处理错误', error);
    return content;
  }
};
