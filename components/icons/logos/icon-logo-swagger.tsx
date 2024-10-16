import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoSwagger = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--swagger]', className)}></span>
  );
};
