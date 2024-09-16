import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillAwsDark = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--aws-dark]', className)}
    ></span>
  );
};

export const IconSkillAwsLight = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--aws-light]', className)}
    ></span>
  );
};
