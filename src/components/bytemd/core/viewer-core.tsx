"use client";

import React from 'react';
import { MarkdownRenderer } from './markdown-renderer';
import { PaywallProvider } from "../../paywall/context";
import { detectPremiumContent } from "../../paywall/config";
import { PaywallPreview } from "../../paywall/PaywallPreview";

interface BytemdViewerProps {
  body: string;
  showPaywall?: boolean;  // 是否显示付费墙
  className?: string;
}

export const BytemdViewer: React.FC<BytemdViewerProps> = ({ 
  body, 
  showPaywall = true,
  className = ''
}) => {
  // 检测是否为付费内容
  const { isPremium } = detectPremiumContent(body);

  // 如果需要显示付费墙且内容是付费的
  if (showPaywall && isPremium) {
    return (
      <PaywallProvider>
        <PaywallPreview content={body} />
      </PaywallProvider>
    );
  }

  // 普通内容直接渲染
  return <MarkdownRenderer content={body} className={className} />;
};