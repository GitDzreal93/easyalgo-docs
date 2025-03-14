'use client';

import React from 'react';
import { usePaywall } from './context';
import { useSubscription } from '@/hooks/useSubscription';

interface ArticlePaywallProps {
  source?: string;
}

/**
 * 文章底部付费墙组件
 * 显示在文章预览内容底部，提示用户升级会员
 */
export const ArticlePaywall: React.FC<ArticlePaywallProps> = ({ 
  source = 'article'
}) => {
  const { 
    currentPromotion, 
    navigateToPricing,
    config 
  } = usePaywall();
  
  const { subscription } = useSubscription();
  
  if (subscription) {
    return null;
  }
  
  const { title, description, buttonText } = config.articlePaywall;
  
  const handleClick = () => {
    navigateToPricing(
      source, 
      currentPromotion?.couponCode
    );
  };
  
  const formattedDiscountText = currentPromotion 
    ? config.sidebarPromotion.discountText.replace(
        '{discount}', 
        currentPromotion.discountPercentage.toString()
      )
    : '';
  
  return (
    <div className="w-full mt-8 mb-6 rounded-lg overflow-hidden border border-[#8ECAE6]/20 dark:border-[#8ECAE6]/10 bg-white dark:bg-[#023047]/90 shadow-lg">
      {/* 渐变顶部 */}
      <div className="h-1.5 bg-gradient-to-r from-[#8ECAE6] to-[#023047]"></div>
      
      <div className="p-6">
        {/* 主标题 */}
        <h3 className="text-xl font-bold text-[#023047] dark:text-[#8ECAE6] mb-2">
          {title}
        </h3>
        
        {/* 描述文本 */}
        <p className="text-[#023047]/80 dark:text-[#8ECAE6]/80 mb-4">
          {description}
        </p>
        
        {/* 促销信息 (如果有) */}
        {currentPromotion && (
          <div className="mb-4 p-3 bg-[#8ECAE6]/10 dark:bg-[#8ECAE6]/5 rounded-md border border-[#8ECAE6]/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[#023047] dark:text-[#8ECAE6]">
                  {currentPromotion.title}
                </h4>
                <p className="text-sm text-[#023047]/80 dark:text-[#8ECAE6]/80 mt-1">
                  {currentPromotion.description}
                </p>
              </div>
              
              {currentPromotion.discountPercentage > 0 && (
                <div className="flex-shrink-0 bg-[#FFB703] hover:bg-[#FFB703]/90 text-[#023047] px-3 py-1 rounded-full text-sm font-medium transition-colors">
                  {formattedDiscountText}
                </div>
              )}
            </div>
            
            {/* 倒计时显示 */}
            {currentPromotion.endDate && (
              <div className="mt-2 text-xs text-[#023047]/70 dark:text-[#8ECAE6]/70">
                优惠截止日期: {new Date(currentPromotion.endDate).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
        
        {/* 按钮区域 */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={handleClick}
            className="px-6 py-2.5 bg-[#FFB703] hover:bg-[#FFB703]/90 text-[#023047] font-medium rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-[#FFB703]/20"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
