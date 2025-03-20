"use client";

import React from 'react';
import { MarkdownRenderer } from './markdown-renderer';

interface BytemdViewerProps {
  body: string;
  className?: string;
}

export const BytemdViewer: React.FC<BytemdViewerProps> = ({ 
  body, 
  className = ''
}) => {
  return <MarkdownRenderer content={body} className={className} />;
};