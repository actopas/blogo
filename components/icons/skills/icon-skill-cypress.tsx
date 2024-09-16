/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 17:43:39
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 17:44:35
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillCypressDark = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--cypress-dark]', className)}
    ></span>
  );
};

export const IconSkillCypressLight = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--cypress-light]', className)}
    ></span>
  );
};
