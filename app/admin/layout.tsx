import React from 'react';

import { NextThemeProvider } from '@/providers';

import { AdminLayout as AdminLayoutComponent } from '@/features/admin';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider>
      <AdminLayoutComponent>{children}</AdminLayoutComponent>
    </NextThemeProvider>
  );
}
