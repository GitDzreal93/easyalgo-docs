"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
      })

      if (error) throw error

      setStatus('success')
    } catch (error: any) {
      setError(error.message || '发送重置密码邮件时出现错误')
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="sr-only">Easy Algo</span>
          <div className="relative w-12 h-12">
            <div className="absolute -inset-0.5 bg-[var(--color-orange)] rounded-lg blur opacity-30"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-white rounded-lg">
              <img src="/app_logo.png" alt="Easy Algo" className="w-8 h-8" />
            </div>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-navy)]">
          重置密码
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--color-teal)]">
          输入您的邮箱地址，我们将向您发送重置密码的链接
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-[var(--color-navy)]/5">
          {status === 'success' ? (
            <div className="rounded-md bg-[var(--color-sky)]/5 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-[var(--color-sky)]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-[var(--color-sky)]">
                    重置密码邮件已发送
                  </h3>
                  <div className="mt-2 text-sm text-[var(--color-teal)]">
                    <p>请检查您的邮箱，点击邮件中的链接重置密码。</p>
                  </div>
                  <div className="mt-4">
                    <Link
                      href="/auth/login"
                      className="text-sm font-medium text-[var(--color-orange)] hover:text-[var(--color-orange)]/80 transition-colors duration-200"
                    >
                      返回登录页面 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-[var(--color-orange)]/5 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-[var(--color-orange)]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-[var(--color-orange)]">
                        {error}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-navy)]">
                  邮箱地址
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="block w-full rounded-md border border-[var(--color-navy)]/10 px-3 py-2 bg-white text-[var(--color-navy)] placeholder-[var(--color-navy)]/40 focus:border-[var(--color-sky)] focus:ring-[var(--color-sky)] focus:ring-1 focus:outline-none sm:text-sm transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
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
                    {loading ? '发送中...' : '发送重置链接'}
                  </span>
                </button>
              </div>

              <div className="text-sm text-center">
                <Link
                  href="/auth/login"
                  className="font-medium text-[var(--color-sky)] hover:text-[var(--color-sky)]/80 transition-colors duration-200"
                >
                  返回登录
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
