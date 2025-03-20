"use client";

import React, { useMemo, useEffect, useState } from 'react';
import { Viewer } from '@bytemd/react';
import { useTheme } from 'next-themes';
import { plugins, sanitize } from "../config";
import { preprocessMarkdown } from '../utils/content-formatter';
import { enhanceMarkdownRendering } from '../utils/dom-enhancer';
import { analyzeHeadingStructure, optimizeHeadingDisplay } from '../utils/heading-manager';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = ''
}) => {
  const { theme } = useTheme();
  const [processedContent, setProcessedContent] = useState(content);
  const [renderError, setRenderError] = useState<string | null>(null);

  // 主题相关类名
  const themeClass = useMemo(() => {
    return theme === 'dark' ? 'markdown-theme-dark' : 'markdown-theme';
  }, [theme]);

  // 内容预处理
  useEffect(() => {
    try {
      let contentToProcess = content;
      const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
      
      if (frontmatterMatch) {
        contentToProcess = content.replace(frontmatterMatch[0], '');
      }
      
      const processed = preprocessMarkdown(contentToProcess);
      setProcessedContent(processed);
      setRenderError(null);
    } catch (error) {
      console.error('MarkdownRenderer: 内容预处理错误', error);
      setRenderError(error instanceof Error ? error.message : String(error));
      setProcessedContent(content);
    }
  }, [content]);

  // DOM增强
  useEffect(() => {
    const timers = [100, 300, 500, 1000].map(delay => 
      setTimeout(() => {
        enhanceMarkdownRendering();
      }, delay)
    );
    
    return () => timers.forEach(clearTimeout);
  }, [processedContent]);

  // 标题优化
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const timer1 = setTimeout(analyzeHeadingStructure, 100);
    const timer2 = setTimeout(optimizeHeadingDisplay, 300);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [processedContent]);

  if (renderError) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded">
        <h3 className="text-red-600 font-medium">渲染错误</h3>
        <p className="text-red-500 mt-2">{renderError}</p>
      </div>
    );
  }

  const combinedClassName = `${themeClass} ${className}`;
  
  return (
    <div className={combinedClassName}>
      <Viewer 
        value={processedContent} 
        plugins={plugins} 
        sanitize={sanitize}
      />
    </div>
  );
}; 