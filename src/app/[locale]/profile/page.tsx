'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { useTranslations } from 'next-intl';
import { isPaymentEnabled } from '@/components/paywall/config';

function ProfileContent() {
  const { user, loading: authLoading, error: authError, getSession } = useAuth();
  const { subscription } = useSubscription();  // 只用来判断是否已付费
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const t = useTranslations('profile');
  const commonT = useTranslations('common');

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/login?redirect=/profile');
        return;
      }
    };

    checkAuth();

    if (searchParams.get('payment') === 'success') {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [getSession, router, searchParams]);

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {authError.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* 支付成功提示 */}
      {showSuccessMessage && (
        <div className="mb-8">
          <div className="rounded-md bg-[var(--color-teal)] bg-opacity-10 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-[var(--color-teal)]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-[var(--color-navy)]">支付成功！</h3>
                <div className="mt-2 text-sm text-[var(--color-navy)] opacity-80">
                  <p>感谢您的购买！您现在可以访问所有会员内容了。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 个人资料 */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">{t('title')}</h2>
          <div className="mt-6">
            <dl className="divide-y divide-[var(--color-navy)]/10">
              <div className="py-3 flex justify-between text-sm">
                <dt className="text-[var(--color-navy)]/60">{t('email')}</dt>
                <dd className="text-[var(--color-navy)]">{user.email}</dd>
              </div>
              <div className="py-3 flex justify-between text-sm">
                <dt className="text-[var(--color-navy)]/60">ID</dt>
                <dd className="text-[var(--color-navy)]">{user.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* 会员状态 */}
      {isPaymentEnabled() && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-[var(--color-navy)]">{t('membershipStatus')}</h2>
            {subscription ? (
              <div className="mt-6">
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-[var(--color-teal)] bg-opacity-10 text-[var(--color-teal)]">
                    {t('lifetimeMember')}
                  </span>
                </div>
                <p className="mt-4 text-sm text-[var(--color-navy)] opacity-60">
                  {t('lifetimeMemberMessage')}
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-[var(--color-navy)] bg-opacity-10 text-[var(--color-navy)]">
                    {t('freeUser')}
                  </span>
                </div>
                <p className="text-[var(--color-navy)] opacity-60 mt-4 mb-4">
                  {t('upgradeMessage')}
                </p>
                <a
                  href="/pricing"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--color-teal)] hover:opacity-90 transition-opacity duration-200"
                >
                  {t('viewPlans')}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileContent />
    </Suspense>
  );
} 