import React from 'react';

import { cn } from '@/lib/utils';

export const IconPhHandArrow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[ph--hand-arrow-up-thin]', className)}
    ></span>
  );
};
//fa6-brands--x-twitter
//fa6-brands--telegram
//fa6-brands--discord
