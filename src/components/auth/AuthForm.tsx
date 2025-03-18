"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useTranslations } from 'next-intl'

interface AuthFormProps {
  type: 'login' | 'register'
}

export default function AuthForm({ type }: AuthFormProps) {
  const { signIn, signUp, signInWithProvider, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const t = useTranslations(`auth.${type}`)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (type === 'login') {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    await signInWithProvider(provider)
  }

  return (
    <>
      {error && (
        <div className={`p-4 rounded-md mb-4 ${
          error.isInfo 
            ? 'bg-[var(--color-sky)]/5 text-[var(--color-sky)]' 
            : 'bg-[var(--color-orange)]/5 text-[var(--color-orange)]'
        }`}>
          {error.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-navy)]">
            {t('email')}
          </label>
          <div className="mt-1 relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border border-[var(--color-navy)]/10 px-3 py-2 bg-white text-[var(--color-navy)] placeholder-[var(--color-navy)]/40 focus:border-[var(--color-sky)] focus:ring-[var(--color-sky)] focus:ring-1 focus:outline-none sm:text-sm transition-colors duration-200"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--color-navy)]">
            {t('password')}
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md border border-[var(--color-navy)]/10 px-3 py-2 bg-white text-[var(--color-navy)] placeholder-[var(--color-navy)]/40 focus:border-[var(--color-sky)] focus:ring-[var(--color-sky)] focus:ring-1 focus:outline-none sm:text-sm transition-colors duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {type === 'login' && (
              <Link 
                href="/auth/reset-password" 
                className="font-medium text-[var(--color-sky)] hover:text-[var(--color-sky)]/80 transition-colors duration-200"
              >
                {t('forgotPassword')}
              </Link>
            )}
          </div>
          <div className="text-sm">
            <Link 
              href={type === 'login' ? '/auth/register' : '/auth/login'} 
              className="font-medium text-[var(--color-sky)] hover:text-[var(--color-sky)]/80 transition-colors duration-200"
            >
              {type === 'login' ? t('noAccount') : t('hasAccount')}
            </Link>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-[var(--color-orange)] hover:bg-[var(--color-orange)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <span className="absolute inset-0 flex items-center justify-center">
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </span>
          <span className={loading ? 'opacity-0' : 'opacity-100'}>
            {t('submit')}
          </span>
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-navy)]/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[var(--color-navy)]/60">
              {t('or')}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialLogin('github')}
            className="relative w-full inline-flex justify-center py-2 px-4 border border-[var(--color-navy)]/10 rounded-md bg-white text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-sky)]/5 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => handleSocialLogin('google')}
            className="relative w-full inline-flex justify-center py-2 px-4 border border-[var(--color-navy)]/10 rounded-md bg-white text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-sky)]/5 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}