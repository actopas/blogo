import React from 'react';

import { cn } from '@/lib/utils';

export const IconSolarGlobal = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[solar--global-linear]', className)}
    ></span>
  );
};
