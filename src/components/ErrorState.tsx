'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface ErrorStateProps {
  error: Error;
}

export function ErrorState({ error }: ErrorStateProps) {
  const t = useTranslations('docs');
  
  return (
    <article className="bg-[var(--background)] rounded-lg shadow-sm p-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">
          {t('errorTitle')}
        </h1>
        <p className="text-[var(--text)] mb-6">
          {t('errorMessage')}
        </p>
        <div className="text-sm text-[var(--text)] opacity-75 mb-6">
          <code className="bg-[var(--background-secondary)] px-2 py-1 rounded">
            {error.message}
          </code>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[var(--primary)] bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t('backToHome')}
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[var(--primary)] bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {t('retry')}
          </button>
        </div>
      </div>
    </article>
  );
} 