import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoWeb3 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--web3js]', className)}></span>
  );
};
