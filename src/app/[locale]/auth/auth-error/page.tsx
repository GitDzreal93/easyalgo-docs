import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth.error' })
  
  return {
    title: `${t('title')} - Easy Algo`,
    description: t('defaultMessage'),
  }
}

export default async function AuthError({
  searchParams,
  params: { locale },
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  params: { locale: string }
}) {
  const params = await searchParams
  const t = await getTranslations({ locale, namespace: 'auth.error' })
  
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="sr-only">Easy Algo</span>
          <div className="relative w-12 h-12">
            <div className="absolute -inset-0.5 bg-[var(--color-orange)] rounded-lg blur opacity-30"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-white rounded-lg">
              <Image src="/app_logo.png" alt="Easy Algo" width={32} height={32} />
            </div>
          </div>
        </Link>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[var(--color-navy)]">
            {t('title')}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-navy)]/60">
            {params.error || t('defaultMessage')}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-[var(--color-navy)]/5">
          <div className="space-y-6">
            <p className="text-center text-sm text-[var(--color-navy)]/60">
              {t('tryAgain')} <Link href="/contact" className="text-[var(--color-teal)] hover:text-[var(--color-sky)]">{t('contactSupport')}</Link>。
            </p>
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-teal)] hover:opacity-90 transition-opacity duration-200"
              >
                {t('loginButton')}
              </Link>
              <Link
                href="/"
                className="w-full flex justify-center py-2 px-4 border border-[var(--color-teal)] rounded-md shadow-sm text-sm font-medium text-[var(--color-teal)] bg-white hover:bg-[var(--color-teal)]/5 transition-colors duration-200"
              >
                {t('homeButton')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 