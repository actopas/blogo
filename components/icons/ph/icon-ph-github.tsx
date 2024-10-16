import React from 'react';

import { cn } from '@/lib/utils';

export const IconPhGithub = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[ph--github-logo-bold]', className)}
    ></span>
  );
};
