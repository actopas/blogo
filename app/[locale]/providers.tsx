'use client';

import { type ReactNode } from 'react';

import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

export function Providers({
  children,
  messages,
}: {
  children: ReactNode;
  messages: AbstractIntlMessages;
}) {
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
