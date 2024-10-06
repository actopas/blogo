import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

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
  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main className="min-h-[calc(100vh-190px)]">{children}</main>
      <Footer />
      {/* <BackToTop /> */}
    </NextIntlClientProvider>
  );
}
