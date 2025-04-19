import clsx from 'clsx';

export function getMarkdownClassName(additionalClasses?: string) {
  return clsx(
    'markdown-body',
    'prose prose-slate max-w-none',
    'prose-h1:mt-8 prose-h1:mb-4 prose-h1:text-2xl prose-h1:font-bold',
    'prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-xl prose-h2:font-bold',
    'prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-lg prose-h3:font-bold',
    'prose-h4:mt-4 prose-h4:mb-2 prose-h4:font-bold',
    'prose-p:my-4 prose-p:leading-7',
    'prose-blockquote:my-4 prose-blockquote:pl-4 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:text-gray-700',
    'prose-ul:my-4 prose-ul:list-disc prose-ul:pl-5',
    'prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-5',
    'prose-li:my-2',
    'prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:bg-gray-100',
    'prose-pre:p-4 prose-pre:my-4 prose-pre:rounded-lg prose-pre:bg-gray-900 prose-pre:text-gray-100',
    'prose-img:my-4 prose-img:rounded-lg',
    'prose-hr:my-8 prose-hr:border-gray-200',
    'prose-table:my-4 prose-table:w-full prose-table:border-collapse',
    'prose-th:p-2 prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100',
    'prose-td:p-2 prose-td:border prose-td:border-gray-300',
    'prose-a:text-blue-600 prose-a:hover:text-blue-800',
    additionalClasses
  );
} 