import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'

export async function GET(request: Request, { params: { locale } }: { params: { locale: string } }) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')
  const t = await getTranslations({ locale, namespace: 'auth.error' })

  // Handle OAuth or email verification errors
  if (error || error_description) {
    const errorPath = new URL('/auth/auth-error', request.url)
    errorPath.searchParams.set('error', error_description || error || t('authFailed'))
    return NextResponse.redirect(errorPath)
  }

  // Handle successful authentication
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // No code or error present, redirect to error page
  const errorPath = new URL('/auth/auth-error', request.url)
  errorPath.searchParams.set('error', t('invalidRequest'))
  return NextResponse.redirect(errorPath)
} 