"use client";

import React from 'react';
import { Viewer } from '@bytemd/react';
import { useTheme } from 'next-themes';
import { plugins, sanitize } from "../config";

// 导入主题样式
import '../styles/custom-theme.css';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-theme">
      <Viewer 
        value={content} 
        plugins={plugins}
        sanitize={sanitize}
      />
    </div>
  );
}; 