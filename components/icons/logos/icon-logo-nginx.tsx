import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoNginx = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--nginx]', className)}></span>
  );
};
