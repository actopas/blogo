/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-13 18:20:59
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-13 18:21:28
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconSolarDoubleArrow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[solar--double-alt-arrow-right-broken]', className)}
    ></span>
  );
};
