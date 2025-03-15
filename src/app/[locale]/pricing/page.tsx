'use client';

import { useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { StripeCheckoutButton } from '@/components/stripe/StripeCheckoutButton';
import { useTranslations } from 'next-intl';

interface Plan {
  name: string;
  description: string;
  price: string;
  interval: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

export default function PricingPage({ searchParams }: { searchParams: Promise<{ canceled?: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  const { subscription, isLoading } = useSubscription();
  const { use } = require('react');
  const params = use(searchParams);
  const canceled = params.canceled;
  const t = useTranslations('pricing');

  const plans: Plan[] = [
    {
      name: t('plans.basic.name'),
      description: t('plans.basic.description'),
      price: t('plans.basic.price.monthly'),
      interval: t('period'),
      features: t('plans.basic.features', {}, { returnObjects: true }),
      cta: t('cta.basic'),
      highlighted: false,
    },
    {
      name: t('plans.pro.name'),
      description: t('plans.pro.description'),
      price: t('plans.pro.price.monthly'),
      interval: t('period'),
      features: t('plans.pro.features', {}, { returnObjects: true }),
      cta: t('cta.pro'),
      highlighted: true,
      badge: t('savePercent'),
    },
  ];

  // 处理免费计划的点击
  const handleFreePlanClick = () => {
    router.push('/docs');
  };

  // 处理会员计划的点击
  const handlePremiumPlanClick = () => {
    if (!user) {
      router.push('/login?redirect=/pricing');
      return;
    }
  };

  // 渲染购买按钮
  const renderActionButton = (plan: Plan) => {
    if (!plan.cta || plan.cta.trim() === '') return null;

    // 免费计划
    if (!plan.highlighted) {
      return (
        <button
          onClick={handleFreePlanClick}
          className="mt-8 block w-full bg-[var(--color-teal)] hover:opacity-90 text-white rounded-md py-2 px-4 font-medium text-sm transition-opacity duration-200"
        >
          {plan.cta}
        </button>
      );
    }

    // 会员计划
    if (isLoading) {
      return (
        <button
          disabled
          className="mt-8 block w-full bg-gray-300 cursor-not-allowed text-white rounded-md py-2 px-4 font-medium text-sm"
        >
          {t('common.loading')}
        </button>
      );
    }

    if (subscription) {
      return (
        <button
          disabled
          className="mt-8 block w-full bg-gray-300 cursor-not-allowed text-white rounded-md py-2 px-4 font-medium text-sm"
        >
          {t('common.alreadyMember')}
        </button>
      );
    }

    if (!user) {
      return (
        <button
          onClick={handlePremiumPlanClick}
          className="mt-8 block w-full bg-[var(--color-orange)] hover:opacity-90 text-white rounded-md py-2 px-4 font-medium text-sm transition-opacity duration-200"
        >
          {plan.cta}
        </button>
      );
    }

    return (
      <StripeCheckoutButton
        priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || ''}
        className="mt-8 block w-full bg-[var(--color-orange)] hover:opacity-90 text-white rounded-md py-2 px-4 font-medium text-sm transition-opacity duration-200"
      >
        {plan.cta}
      </StripeCheckoutButton>
    );
  };

  return (
    <main className="flex flex-col items-center">
      {/* 取消支付提示使用警示性的橙色 */}
      {canceled && (
        <div className="w-full bg-[var(--color-orange)] bg-opacity-10 border-l-4 border-[var(--color-orange)] p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-[var(--color-orange)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-[var(--color-navy)]">
                {t('messages.paymentCanceled')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 会员状态提示 */}
      {subscription && (
        <div className="w-full bg-[var(--color-sky)] bg-opacity-10 border-l-4 border-[var(--color-sky)] p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-[var(--color-sky)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-[var(--color-navy)]">
                {t('messages.alreadyMember')}
                <button 
                  onClick={() => router.push('/docs')}
                  className="ml-2 text-[var(--color-teal)] hover:text-[var(--color-sky)] font-medium transition-colors duration-200"
                >
                  {t('messages.startReading')} →
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 标题区域使用深色调 */}
      <div className="bg-[var(--background)] py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-[var(--color-navy)] sm:text-5xl sm:tracking-tight lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-5 text-xl text-[var(--color-teal)]">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* 价格卡片区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 lg:gap-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${
                plan.highlighted
                  ? 'bg-[var(--color-sky)] border-[var(--color-sky)]'
                  : 'bg-white border-[var(--color-navy)] border-opacity-10'
              } border rounded-lg shadow-sm divide-y divide-[var(--color-navy)] divide-opacity-10 flex-1 max-w-md mx-auto sm:mx-0`}
            >
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-[var(--color-navy)] flex items-center">
                  {plan.name}
                  {plan.badge && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-yellow)] text-[var(--color-navy)]">
                      {plan.badge}
                    </span>
                  )}
                </h2>
                <p className="mt-4 text-sm text-[var(--color-navy)] opacity-80">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-[var(--color-navy)]">
                    {plan.price}
                  </span>
                  <span className="text-base font-medium text-[var(--color-navy)] opacity-80">
                    {plan.interval}
                  </span>
                </p>
                {renderActionButton(plan)}
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-[var(--color-navy)] tracking-wide uppercase">
                  {t('features')}
                </h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon
                        className={`flex-shrink-0 h-5 w-5 ${
                          plan.highlighted ? 'text-[var(--color-navy)]' : 'text-[var(--color-teal)]'
                        }`}
                      />
                      <span className="text-sm text-[var(--color-navy)] opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 