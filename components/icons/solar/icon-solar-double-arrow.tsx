import React from 'react';

import { cn } from '@/lib/utils';

export const IconSolarDoubleArrow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[solar--double-alt-arrow-right-broken]', className)}
    ></span>
  );
};
