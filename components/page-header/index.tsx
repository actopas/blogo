import React from 'react';

import { useTranslations } from 'next-intl';
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

type PageHeaderProps = {
  breadcrumbList?: { path: string; translationKey: string }[];
  className?: string;
  action?: React.ReactNode;
};

export function PageHeader({
  breadcrumbList,
  className,
  action,
}: PageHeaderProps) {
  const t = useTranslations();

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
                  <Link href={el.path}>{t(el.translationKey)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>
              {labelLink && t(labelLink.translationKey)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        {labelLink && t(labelLink.translationKey)}
      </h2>

      <div className="absolute bottom-0 right-0">{action}</div>
    </div>
  );
}
