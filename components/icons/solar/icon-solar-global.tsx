/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 18:07:19
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-12 18:07:49
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconSolarGlobal = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[solar--global-linear]', className)}
    ></span>
  );
};
