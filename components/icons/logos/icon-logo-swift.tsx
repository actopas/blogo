import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoSwift = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--swift]', className)}></span>
  );
};
