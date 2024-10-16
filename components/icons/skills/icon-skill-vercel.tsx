import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillVercelDark = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--vercel-dark]', className)}
    ></span>
  );
};

export const IconSkillVercelLight = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--vercel-light]', className)}
    ></span>
  );
};
