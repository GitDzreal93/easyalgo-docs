import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'error'
  });

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
                404
              </h1>
              <h2 className="text-xl text-[var(--foreground)] mb-6">
                {t('pageNotFound')}
              </h2>
              <p className="text-[var(--text)] mb-8">
                {t('pageNotFoundDesc')}
              </p>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary)]/90"
              >
                {t('backToHome')}
              </Link>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 