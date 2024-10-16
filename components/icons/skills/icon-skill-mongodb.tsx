import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillMongodb = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--mongodb]', className)}
    ></span>
  );
};
