import React from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

type AdminPageHeaderProps = {
  breadcrumbList?: { path: string; label: string }[];
  className?: string;
  action?: React.ReactNode;
};

export function AdminPageHeader({
  breadcrumbList,
  className,
  action,
}: AdminPageHeaderProps) {
  const linkList = breadcrumbList?.slice(0, breadcrumbList.length - 1);
  const labelLink = breadcrumbList?.[breadcrumbList.length - 1];

  return (
    <div className={cn('relative', className)}>
      <Breadcrumb className={cn('mb-2')}>
        <BreadcrumbList>
          {linkList?.map((el) => (
            <React.Fragment key={el.path}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={el.path}>{el.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{labelLink?.label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        {labelLink?.label}
      </h2>

      <div className="absolute bottom-0 right-0">{action}</div>
    </div>
  );
}
