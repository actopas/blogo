import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoEslint = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[logos--eslint-old]', className)}
    ></span>
  );
};
