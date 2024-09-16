/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 19:13:13
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 19:13:44
 */
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
