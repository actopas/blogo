import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoElectron = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--electron]', className)}></span>
  );
};
