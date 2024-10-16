import React from 'react';

import { cn } from '@/lib/utils';

export const IconBarandX = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[fa6-brands--x-twitter]', className)}
    ></span>
  );
};
//
//fa6-brands--telegram
//fa6-brands--discord
