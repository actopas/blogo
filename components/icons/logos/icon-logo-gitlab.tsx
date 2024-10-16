import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoGitlab = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--gitlab]', className)}></span>
  );
};
