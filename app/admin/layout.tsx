import React from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { NextThemeProvider } from '@/providers';

import { AdminLayout } from '@/features/admin';

export default async function AdminLocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    // Handle error or use default messages
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextThemeProvider>
            <AdminLayout>{children}</AdminLayout>
          </NextThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
