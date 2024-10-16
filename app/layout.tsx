import React from 'react';

import { type Metadata } from 'next';

import { NextThemeProvider, WagmiProvider } from '@/providers';

import { TooltipProvider } from '@/components/ui/tooltip';

import { ClientOnlyToaster } from '@/components/client-only-toaster';
import { Console } from '@/components/console';
import { Fingerprint } from '@/components/fingerprint';
import { ProgressBar } from '@/components/progress-bar';

// Import ProgressBar component
import { DESCRIPTION, NICKNAME, WEBSITE } from '@/constants';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: {
    template: `%s - ${WEBSITE}`,
    default: `${WEBSITE}`,
  },
  description: `${DESCRIPTION}`,
  keywords: NICKNAME,
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      className="scroll-smooth dark"
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/images/favicon-dark.ico" type="image/x-icon" />
      </head>
      <body className="debug-screens scroll-smooth overflow-x-clip">
        <NextThemeProvider attribute="class" defaultTheme="dark">
          <WagmiProvider>
            <TooltipProvider>
              <ProgressBar /> {/* Add ProgressBar component */}
              {children}
              <ClientOnlyToaster />
              <Console />
              <Fingerprint />
            </TooltipProvider>
          </WagmiProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
