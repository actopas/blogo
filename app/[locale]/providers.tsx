'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/navigation';

export function Providers({ children, messages }) {
  const router = useRouter();
  return (
    <NextIntlClientProvider messages={messages} router={router}>
      {children}
    </NextIntlClientProvider>
  );
}
