import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface SearchResult {
  title: string;
  slug: string;
  parentTitle?: string;
  preview?: string;
  isParent?: boolean;
}

interface SearchPopoverProps {
  query: string;
  onQueryChange: (query: string) => void;
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  onClose: () => void;
  isLoading: boolean;
}

export function SearchPopover({
  query,
  onQueryChange,
  results,
  onSelect,
  onClose,
  isLoading,
}: SearchPopoverProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('docs');
  
  // 自动聚焦输入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // 处理ESC键关闭弹窗
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative w-full max-w-2xl transform overflow-hidden rounded-xl 
            bg-[var(--background)]/90 backdrop-blur-md
            border border-[var(--primary)]/20
            shadow-[0_0_25px_rgba(var(--primary-rgb),0.2)]
            transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 搜索输入框 */}
          <div className="p-5 border-b border-[var(--primary)]/10">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder={t('search')}
                className="w-full pl-10 pr-4 py-3 text-sm
                  bg-[var(--background)]/50 
                  text-[var(--text)]
                  placeholder-[var(--text)]/50
                  border border-[var(--primary)]/30
                  rounded-lg
                  backdrop-blur-sm
                  focus:outline-none 
                  focus:border-[var(--accent)]
                  focus:ring-2 
                  focus:ring-[var(--accent)]/20
                  transition-all duration-200"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-[var(--primary)]" />
            </div>
          </div>

          {/* 搜索结果 */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
              </div>
            ) : results.length > 0 ? (
              <ul className="divide-y divide-[var(--primary)]/10">
                {results.map((result, index) => (
                  <li key={result.slug + index}>
                    <button
                      onClick={() => onSelect(result)}
                      className="w-full px-5 py-4 text-left 
                        hover:bg-[var(--primary)]/5
                        focus:outline-none 
                        focus:bg-[var(--primary)]/5
                        transition-all duration-200
                        group"
                    >
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-[var(--text)]
                            group-hover:text-[var(--accent)]
                            transition-colors duration-200">
                            {result.title}
                          </span>
                          {result.isParent && (
                            <span className="px-2 py-0.5 text-xs font-medium 
                              text-[var(--accent)] bg-[var(--accent)]/10 
                              rounded-full border border-[var(--accent)]/20">
                              {t('backToParent')}
                            </span>
                          )}
                        </div>
                        {result.parentTitle && (
                          <div className="text-xs text-[var(--text)]/60">
                            {result.parentTitle}
                          </div>
                        )}
                        {result.preview && (
                          <div className="text-sm text-[var(--text)]/80 line-clamp-2">
                            <span className="text-[var(--primary)] font-medium">{t('found')}：</span>
                            {result.preview}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              query && (
                <div className="px-5 py-8 text-center text-sm text-[var(--text)]/60">
                  {t('noResults')}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 