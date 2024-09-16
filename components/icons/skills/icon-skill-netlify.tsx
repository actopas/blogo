/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 19:58:20
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 19:58:51
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillNetlifyDark = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--netlify-dark]', className)}
    ></span>
  );
};

export const IconSkillNetlifyLight = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--netlify-light]', className)}
    ></span>
  );
};
