import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoPrettier = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--prettier]', className)}></span>
  );
};
