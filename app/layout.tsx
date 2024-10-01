import React from 'react';

import { type Metadata } from 'next';

import { NextThemeProvider, WagmiProvider } from '@/providers';

import { TooltipProvider } from '@/components/ui/tooltip';

import { ClientOnlyToaster } from '@/components/client-only-toaster';
import { Console } from '@/components/console';
import { Fingerprint } from '@/components/fingerprint';

import { NICKNAME, SLOGAN, WEBSITE } from '@/constants';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: {
    template: `%s - ${WEBSITE}`,
    default: `${WEBSITE}`,
  },
  description: `${SLOGAN}`,
  keywords: NICKNAME,
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/favicon-dark.ico" type="image/x-icon" />
      </head>
      <body className="debug-screens scroll-smooth overflow-x-clip">
        <TooltipProvider>
          <NextThemeProvider attribute="class">
            <WagmiProvider>
              {children}

              <ClientOnlyToaster />

              <Console />

              <Fingerprint />
            </WagmiProvider>
          </NextThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
