/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:24
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 01:46:50
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconMingcuteLoadingLine = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[mingcute--loading-line]', className)}
    ></span>
  );
};
