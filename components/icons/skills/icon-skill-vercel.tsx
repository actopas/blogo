/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 17:43:38
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 17:45:17
 */
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
