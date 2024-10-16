import React from 'react';

import { cn } from '@/lib/utils';

export const IconBarandTelegram = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[fa6-brands--telegram]', className)}
    ></span>
  );
};
