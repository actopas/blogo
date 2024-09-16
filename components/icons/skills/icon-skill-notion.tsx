/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 16:58:14
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 16:58:38
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillNotionDark = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--notion-dark]', className)}
    ></span>
  );
};

export const IconSkillNotionLight = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--notion-light]', className)}
    ></span>
  );
};
