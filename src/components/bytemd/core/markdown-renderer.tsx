"use client";

import React, { useMemo, useState } from 'react';
import { Viewer } from '@bytemd/react';
import { useTheme } from 'next-themes';
import { plugins, sanitize } from "../config";
import { ThemeSwitcher } from './theme-switcher';

// 导入主题样式
import '../styles/notion-theme.css';
import '../styles/juejin-theme.css';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content
}) => {
  const { theme } = useTheme();
  const [markdownTheme, setMarkdownTheme] = useState<string>('juejin');

  // 根据当前主题和 Markdown 主题选择合适的类名
  const themeClass = useMemo(() => {
    const isDark = theme === 'dark';
    
    switch (markdownTheme) {
      case 'notion':
        return isDark ? 'notion-theme notion-theme-dark' : 'notion-theme';
      case 'juejin':
      default:
        return 'juejin-theme';
    }
  }, [theme, markdownTheme]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <ThemeSwitcher 
        currentTheme={markdownTheme}
        onThemeChange={setMarkdownTheme}
      />
      <div className={themeClass}>
        <Viewer 
          value={content} 
          plugins={plugins} 
          sanitize={sanitize}
        />
      </div>
    </div>
  );
}; 