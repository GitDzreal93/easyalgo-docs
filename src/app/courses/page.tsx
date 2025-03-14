'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';

export default function CoursesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { subscription, isLoading } = useSubscription();

  useEffect(() => {
    // 如果用户未登录，重定向到登录页
    if (!isLoading && !user) {
      router.push('/login?redirect=/docs');
      return;
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-pulse text-[var(--color-teal)]">加载中...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 会员提示区域 */}
        {!subscription && (
          <div className="mb-8 bg-[var(--color-orange)] bg-opacity-10 border-l-4 border-[var(--color-orange)] p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-[var(--color-orange)]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-[var(--color-navy)]">
                  部分内容需要会员权限才能查看。
                  <button 
                    onClick={() => router.push('/pricing')}
                    className="ml-2 text-[var(--color-orange)] hover:text-[var(--color-orange)]/80 font-medium transition-colors duration-200"
                  >
                    成为会员 →
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 课程列表标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-navy)]">
            算法课程
          </h1>
          <p className="mt-2 text-lg text-[var(--color-teal)]">
            从基础到进阶的算法学习之路
          </p>
        </div>

        {/* 课程列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 示例课程卡片 - 免费 */}
          <div className="bg-white rounded-lg shadow-sm border border-[var(--color-navy)]/10 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-[var(--color-teal)] bg-[var(--color-sky)]/10 px-2 py-1 rounded">
                  免费
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-2">
                算法入门基础
              </h3>
              <p className="text-sm text-[var(--color-navy)]/70 mb-4">
                了解基本的数据结构与算法概念，为进阶学习打下基础。
              </p>
              <button className="text-[var(--color-teal)] hover:text-[var(--color-sky)] text-sm font-medium transition-colors duration-200">
                开始学习 →
              </button>
            </div>
          </div>

          {/* 示例课程卡片 - 会员 */}
          <div className="bg-white rounded-lg shadow-sm border border-[var(--color-navy)]/10 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-[var(--color-orange)] bg-[var(--color-orange)]/10 px-2 py-1 rounded">
                  会员专享
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-2">
                高频算法题解析
              </h3>
              <p className="text-sm text-[var(--color-navy)]/70 mb-4">
                深入剖析面试高频算法题，掌握核心解题思路。
              </p>
              {subscription ? (
                <button className="text-[var(--color-teal)] hover:text-[var(--color-sky)] text-sm font-medium transition-colors duration-200">
                  开始学习 →
                </button>
              ) : (
                <button 
                  onClick={() => router.push('/pricing')}
                  className="text-[var(--color-orange)] hover:text-[var(--color-orange)]/80 text-sm font-medium transition-colors duration-200"
                >
                  成为会员解锁 →
                </button>
              )}
            </div>
          </div>

          {/* 更多课程卡片 */}
          <div className="bg-white rounded-lg shadow-sm border border-[var(--color-navy)]/10 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-[var(--color-orange)] bg-[var(--color-orange)]/10 px-2 py-1 rounded">
                  会员专享
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-2">
                系统设计精讲
              </h3>
              <p className="text-sm text-[var(--color-navy)]/70 mb-4">
                从实际案例出发，学习系统设计的核心原则。
              </p>
              {subscription ? (
                <button className="text-[var(--color-teal)] hover:text-[var(--color-sky)] text-sm font-medium transition-colors duration-200">
                  开始学习 →
                </button>
              ) : (
                <button 
                  onClick={() => router.push('/pricing')}
                  className="text-[var(--color-orange)] hover:text-[var(--color-orange)]/80 text-sm font-medium transition-colors duration-200"
                >
                  成为会员解锁 →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
