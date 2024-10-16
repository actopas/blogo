import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoJest = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--jest]', className)}></span>
  );
};
