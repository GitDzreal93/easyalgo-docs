'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [user, router, redirect]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="sr-only">Easy Algo</span>
          <div className="relative w-12 h-12">
            <div className="absolute -inset-0.5 bg-[var(--color-orange)] rounded-lg blur opacity-30"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-[var(--color-sky)] text-white rounded-lg">
              <span className="text-xl font-bold">EA</span>
            </div>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-navy)]">
          登录账号
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--color-teal)]">
          或者{' '}
          <Link
            href="/auth/register"
            className="font-medium text-[var(--color-orange)] hover:text-[var(--color-orange)]/80 transition-colors duration-200"
          >
            注册新账号
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-[var(--color-navy)]/5">
          <AuthForm type="login" />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-navy)]/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[var(--color-navy)]/60">
                  还没有账号？
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/register"
                className="w-full flex justify-center py-2 px-4 border border-[var(--color-sky)] rounded-md text-sm font-medium text-[var(--color-sky)] bg-white hover:bg-[var(--color-sky)]/5 transition-colors duration-200"
              >
                立即注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
