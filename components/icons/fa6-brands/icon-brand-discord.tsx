import React from 'react';

import { cn } from '@/lib/utils';

export const IconBarandDiscord = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[fa6-brands--discord]', className)}
    ></span>
  );
};
