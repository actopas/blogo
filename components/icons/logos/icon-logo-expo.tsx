import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoExpo = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[logos--expo-icon]', className)}
    ></span>
  );
};
