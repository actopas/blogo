import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import { NextThemeProvider } from '@/providers';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export const revalidate = 60;

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} style={{ colorScheme: 'dark' }} className="dark">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextThemeProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-190px)]">{children}</main>
            <Footer />
            {/* <BackToTop /> */}
          </NextThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
