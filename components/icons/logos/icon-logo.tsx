'use client';

import { cn } from '@/lib/utils';

export const IconLogoLight = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      {...props}
      src="/images/favicon-light.ico"
      className={cn('w-6 h-6', className)}
      alt=""
      aria-hidden="true"
    />
  );
};
export const IconLogoDark = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      {...props}
      src="/images/favicon-dark.ico"
      className={cn('w-6 h-6', className)}
      alt=""
      aria-hidden="true"
    />
  );
};
