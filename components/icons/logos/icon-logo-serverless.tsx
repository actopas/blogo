import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoServerless = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[logos--serverless]', className)}
    ></span>
  );
};
