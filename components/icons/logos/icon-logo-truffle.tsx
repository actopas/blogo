import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoTruffle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--truffle]', className)}></span>
  );
};
