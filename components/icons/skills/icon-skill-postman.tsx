import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillPostman = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--postman]', className)}
    ></span>
  );
};
