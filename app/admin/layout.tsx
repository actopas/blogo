import React from 'react';

import { AdminLayout as AdminLayoutComponent } from '@/features/admin';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}
