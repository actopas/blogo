import React from 'react';

import { cn } from '@/lib/utils';

export const IconMingcuteEmail = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[mingcute--mail-fill]', className)}
    ></span>
  );
};
